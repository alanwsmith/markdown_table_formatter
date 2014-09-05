describe("MarkdownTableFormatter", function() {

  // TODO: Add test where the first data cell is the longest cell.
  // TODO: Add test with some rows not having all cells.
  // TODO: Add test where there are more body columns than header columns.
  // TODO: Right justify numbers
  // TODO: Deal with lines that don't have a starting "|"
  // TODO: Deal with lines that don't have an ending "|"

  var mtf;
  var column_widths;
  var input_cells;
  var input_table;
  var output_cells;
  var output_table;
  

  beforeEach(function() {
    
    mtf = new MarkdownTableFormatter();
    mtf.initialize();
    
    column_widths = new Array();
    input_cells = new Array();
    input_table = "";
    output_cells = new Array();
    output_table = "";

  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("set_input_cells", function() {

    it("should properly create the array of arrays for all table cells", function() {
      input_table = "|h1_c|h2_c|\n|-|-|\n|d1_c|d2_c|";
      
      mtf.set_input_cells(input_table);
      expect(mtf.input_cells[0].length).toEqual(4);
      expect(mtf.input_cells[0][0]).toEqual('');
      expect(mtf.input_cells[0][1]).toEqual('h1_c');
      expect(mtf.input_cells[0][2]).toEqual('h2_c');
      expect(mtf.input_cells[0][3]).toEqual('');

      expect(mtf.input_cells[1].length).toEqual(4);
      expect(mtf.input_cells[1][0]).toEqual('');
      expect(mtf.input_cells[1][1]).toEqual('-');
      expect(mtf.input_cells[1][2]).toEqual('-');
      expect(mtf.input_cells[1][3]).toEqual('');

      expect(mtf.input_cells[2].length).toEqual(4);
      expect(mtf.input_cells[2][0]).toEqual('');
      expect(mtf.input_cells[2][1]).toEqual('d1_c');
      expect(mtf.input_cells[2][2]).toEqual('d2_c');
      expect(mtf.input_cells[2][3]).toEqual('');
      
    });


    it("should properly remove white space when loading the table", function() {

      input_table = "|h1| h2| h3 |h4  |\n|-|-|-|-|\n| d1| d2 |d3|d4  |";

      mtf.set_input_cells(input_table);

      expect(mtf.input_cells[0][0]).toEqual('');
      expect(mtf.input_cells[0][1]).toEqual('h1');
      expect(mtf.input_cells[0][2]).toEqual('h2');
      expect(mtf.input_cells[0][3]).toEqual('h3');
      expect(mtf.input_cells[0][4]).toEqual('h4');
      expect(mtf.input_cells[0][5]).toEqual('');

      expect(mtf.input_cells[2][0]).toEqual('');
      expect(mtf.input_cells[2][1]).toEqual('d1');
      expect(mtf.input_cells[2][2]).toEqual('d2');
      expect(mtf.input_cells[2][3]).toEqual('d3');
      expect(mtf.input_cells[2][4]).toEqual('d4');
      expect(mtf.input_cells[2][5]).toEqual('');

    });

    it("should chop down separator to a single one to prevent throwing off widths", function() {
      
      input_table = "|h1|h2|\n|------|---------|\n|d1|d2|";

      mtf.set_input_cells(input_table);

      expect(mtf.input_cells[1][0]).toEqual('');
      expect(mtf.input_cells[1][1]).toEqual('-');
      expect(mtf.input_cells[1][2]).toEqual('-');
      expect(mtf.input_cells[1][3]).toEqual('');

    });  


  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("set_column_widths", function() {

    it("should properly identify target column widths when source has no padding", function() {
      
      input_cells = [ ['', 'h1', 'h2', 'h3', ''], ['', '-', '-', '-', ''], ['', 'd1', 'd2', 'd3', ''] ];

      mtf.set_column_widths(input_cells);

      expect(mtf.column_widths[0]).toBe(0);
      expect(mtf.column_widths[1]).toBe(2);
      expect(mtf.column_widths[2]).toBe(2);
      expect(mtf.column_widths[3]).toBe(2);
      expect(mtf.column_widths[4]).toBe(0);
    });

    it("should properly identify column widths when the header is longer than the cells", function() {

      input_cells = [ ['', 'header_long', 'header', ''], ['', '-', '-', ''], ['', 'd1', 'd2', ''] ];

      mtf.set_column_widths(input_cells);

      expect(mtf.column_widths[0]).toBe(0);
      expect(mtf.column_widths[1]).toBe(11);
      expect(mtf.column_widths[2]).toBe(6);
      expect(mtf.column_widths[3]).toBe(0);
      
    });

    it("should properly set column widths when a cell in the last row is the longest", function() {

      input_cells = [ ['', 'h1', 'h2', ''], ['', '-', '-', ''], ['', 'data_cell', 'long_data_cell', ''] ];

      mtf.set_column_widths(input_cells);

      expect(mtf.column_widths[0]).toBe(0);
      expect(mtf.column_widths[1]).toBe(9);
      expect(mtf.column_widths[2]).toBe(14);
      expect(mtf.column_widths[3]).toBe(0);
    });

  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("set_output_cells", function() {

    it("should properly pad header output_cells", function() {

      input_cells = [ ['', 'h1', 'h2', 'h3', ''] ];
      column_widths = [0, 2, 2, 2, 0];
      
      mtf.set_output_cells(input_cells, column_widths);

      expect(mtf.output_cells).toBeDefined();
      expect(mtf.output_cells).toEqual([ ['', ' h1 ', ' h2 ', ' h3 ', ''] ]);

    });

    it("should properly expand separator output_cells", function() {

      input_cells = [ ['', 'h1', 'h2', 'h3', ''], ['', '-', '-', '-', ''] ];
      column_widths = [0, 2, 2, 2, 0];
      output_cells = [ ['', ' h1 ', ' h2 ', ' h3 ', ''], ['', '----', '----', '----', ''] ];
      
      mtf.set_output_cells(input_cells, column_widths);

      expect(mtf.output_cells).toEqual(output_cells);

    });

    it("should properly expand a full set of basic data cells", function() {
      input_cells = [ ['', 'h1', 'h2', 'h3', ''], ['', '-', '-', '-', ''], ['', 'd1', 'd2', 'd3', ''] ];
      column_widths = [0, 2, 2, 2, 0];
      output_cells = [ ['', ' h1 ', ' h2 ', ' h3 ', ''], ['', '----', '----', '----', ''], ['', ' d1 ', ' d2 ', ' d3 ', ''] ];
      
      mtf.set_output_cells(input_cells, column_widths);
      
      expect(mtf.output_cells).toEqual(output_cells);

    });

    it("should properly expand data cells based on header length", function() {
      input_cells = [ ['', 'h1_long', 'h2_longer', 'h3', ''], ['', '-', '-', '-', ''], ['', 'd1', 'd2', 'd3', ''] ];
      column_widths = [0, 7, 9, 2, 0];
      output_cells = [ ['', ' h1_long ', ' h2_longer ', ' h3 ', ''], ['', '---------', '-----------', '----', ''], ['', ' d1      ', ' d2        ', ' d3 ', ''] ];

      mtf.set_output_cells(input_cells, column_widths);

      expect(mtf.output_cells).toEqual(output_cells);

    });

    // it("should fill in missing data cells", function() {
    //   output_cells_original = [ 
    //     ['', ' h1 ', ' h2 ', ' h3 ', ''], 
    //     ['', '----', '----', '----', ''], 
    //     ['', ' d1 ', ' d2 ', '', '']
    //   ];
      
    //   column_widths = [0, 2, 2, 2, 0];
      
    //   output_cells_updated = [ 
    //     ['', ' h1 ', ' h2 ', ' h3 ', ''], 
    //     ['', '----', '----', '----', ''], 
    //     ['', ' d1 ', ' d2 ', '', '']
    //   ];




    //   mtf.pad_missing_output_cells(output_cells_original, column_widths);

    //   expect(mtf.output_cells).toEqual(output_cells_updated);

    // });

  });

  ////////////////////////////////////////////////////////////////////////////////

  describe("set_output_table", function() {

    it("should properly build a basic table", function() {

      output_cells = [ ['', ' h1 ', ' h2 ', ' h3 ', ''], ['', '----', '----', '----', ''], ['', ' d1 ', ' d2 ', ' d3 ', ''] ];

      output_table = "";
      output_table += "| h1 | h2 | h3 |\n";
      output_table += "|----|----|----|\n";
      output_table += "| d1 | d2 | d3 |\n";

      mtf.set_output_table(output_cells)

      expect(mtf.output_table).toEqual(output_table);
    });

  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("Test full table builds", function() {

    // Note that the tool puts a newline after the last row. This is 
    // desired, but can catch you off guard if you don't notice and 
    // add it when writing test comparisons.

    it("should not alter an already formatted table", function() {
      input_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |";
      output_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |\n";
      expect(mtf.format_table(input_table)).toEqual(output_table);
    });

    it("should update a standard table properly", function() {
      input_table = ""
      input_table += "|h1|h2_more|h3_longer|\n";
      input_table += "|-|-|-|\n";
      input_table += "|d1|d2|d3|";

      output_table = "";
      output_table += "| h1 | h2_more | h3_longer |\n";
      output_table += "|----|---------|-----------|\n";
      output_table += "| d1 | d2      | d3        |\n";

      expect(mtf.format_table(input_table)).toEqual(output_table);
      
    });

  });

});
