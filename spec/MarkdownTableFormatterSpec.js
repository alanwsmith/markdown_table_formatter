describe("MarkdownTableFormatter", function() {
  var mtf;
  var input_table;
  var output_table;
  var input_cells;
  var column_widths;

  // TODO: Add test where the first data cell is the longest cell.
  // TODO: Check to make sure array lengths are accurate for hand built tests.

  beforeEach(function() {
    mtf = new MarkdownTableFormatter();
    input_table = "";
    output_table = "";
    input_cells = new Array();
    column_widths = new Array();
  });

  it("should not alter an already formatted table", function() {
    input_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |";
    output_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |"
    expect(mtf.format_table(input_table)).toEqual(output_table);
  });

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


  it("should properly create the array of arrays for all table cells", function() {
    input_table = "|h1_c|h2_c|\n|-|-|\n|d1_c|d2_c|";
    
    mtf.set_input_cells(input_table);
    expect(mtf.input_cells[0][0]).toEqual('');
    expect(mtf.input_cells[0][1]).toEqual('h1_c');
    expect(mtf.input_cells[0][2]).toEqual('h2_c');
    expect(mtf.input_cells[0][3]).toEqual('');

    expect(mtf.input_cells[1][0]).toEqual('');
    expect(mtf.input_cells[1][1]).toEqual('-');
    expect(mtf.input_cells[1][2]).toEqual('-');
    expect(mtf.input_cells[1][3]).toEqual('');

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

  it("should properly pad header output_cells", function() {

    input_cells = [ ['', 'h1', 'h2', 'h3', ''] ];
    column_widths = [0, 2, 2, 2, 0];
    
    mtf.set_output_cells(input_cells, column_widths);

    expect(mtf.output_cells).toBeDefined();
    expect(mtf.output_cells).toEqual([ ['', ' h1 ', ' h2 ', ' h3 ', ''] ]);


  });


  // // TODO: Use this test when the return columns are set properly.
  // it("should update a standard table properly", function() {
  //   input_table = ""
  //   input_table += "|h1|h2_more|h3_longer|\n";
  //   input_table += "|-|-|-|\n";
  //   input_table += "|d1|d2|d3|";

  //   output_table = "";
  //   output_table += "| h1 | h2_more | h3_longer |\n";
  //   output_table += "|----|---------|-----------|\n";
  //   output_table += "| d1 | d2      | d3        |";

  //   expect(mtf.format_table(input_table)).toEqual(output_table);
    
  // });

});