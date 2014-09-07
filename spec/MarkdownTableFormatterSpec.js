describe("MarkdownTableFormatter", function() {

  // Initialize variables
  var mtf;
  var table = "";

  beforeEach(function() {    
    mtf = new MarkdownTableFormatter();
    table = "";

  });

  ////////////////////////////////////////////////////////////////////////////////

  describe("add_missing_cell_columns", function() {

    it("should added empty cells where necessary", function() {

      // GIVEN
      mtf.cells = [ 
        ['h1', 'h2', 'h3', "h4"], 
        ['-','-', '-', '-'], 
        ['d1','d2','d3'] 
      ];

      mtf.column_widths = [2,2,2,2];


      // WHEN
      mtf.add_missing_cell_columns();

      // THEN 
      expect(mtf.cells).toEqual([
        ['h1', 'h2', 'h3', "h4"], 
        ['-','-', '-', '-'], 
        ['d1','d2','d3', '']
      ]);


    });
  });



  ////////////////////////////////////////////////////////////////////////////////
  describe("get_column_widths", function() {

    it("should load the proper column widths", function() {

      // GIVEN
      mtf.cells = [
        ['h1', 'h2', 'header_number_3'],
        ['-','-','-'],
        ['data_1', 'd2', 'data_3']
      ];

      // WHEN
      mtf.get_column_widths();

      // THEN
      expect(mtf.column_widths).toEqual([6,2,15]);

    });

  });


  ////////////////////////////////////////////////////////////////////////////////
  describe("import_table", function() {

    it("should import a basic table properly", function() {

      // WHEN
      mtf.import_table('|h1|h2|\n|-|-|\n|d1|d2|');

      // THEN
      expect(mtf.cells).toEqual([ ['h1', 'h2'], ['-','-'], ['d1','d2'] ]);

    });

    it("should strip external white space when importing table", function() {

      // WHEN
      mtf.import_table('| h1 |h2 |  h3|\n|-|-|-|\n|   d1|d2   |       d3     |');

      // THEN
      expect(mtf.cells).toEqual([ ['h1', 'h2', 'h3'], ['-','-', '-'], ['d1','d2','d3'] ]);

    });

  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("initialization", function() {

    it("should initialize instance variables", function() {

      // GIVEN
      // Initialization happened in before.

      // THEN
      expect(mtf.cells.length).toEqual(0);
      expect(mtf.output_table).toEqual("");
      expect(mtf.column_widths).toEqual([]);

    });
  });



  ////////////////////////////////////////////////////////////////////////////////

  describe("pad_cells_for_output", function() {

    it("should add the proper white space to each cell", function() {

      // GIVEN
      mtf.cells = [
        ['h1', 'header', 'header_number_3'],
        ['--', '------', '---------------'],
        ['data_1', 'd2', 'data_3']
      ];

      // WHEN
      mtf.get_column_widths();
      mtf.pad_cells_for_output();

      // THEN
      expect(mtf.cells).toEqual([
        ['h1    ', 'header', 'header_number_3'],
        ['------', '------', '---------------'],
        ['data_1', 'd2    ', 'data_3         ']
      ]);

    });

  });



  ////////////////////////////////////////////////////////////////////////////////

  describe("Integration Tests", function() {

    it("should build a basic table", function() {

      // GIVEN 
      table = "|h1|h2|\n|--|--|\n|d1|d2|";

      // WHEN
      mtf.format_table(table);

      // THEN 
      expect(mtf.output_table).toEqual("| h1 | h2 |\n|----|----|\n| d1 | d2 |\n");

    });

    it("should format a table with different length cells", function() {

      // GIVEN 
      table = "|h1|h2|header3|\n|-----|----------|-------|\n|data1|data_cell2|d3|";

      // WHEN
      mtf.format_table(table);

      // THEN 
      expect(mtf.output_table).toEqual("| h1    | h2         | header3 |\n|-------|------------|---------|\n| data1 | data_cell2 | d3      |\n");      

    });

    it("should build a table where cells are added", function() {

      // GIVEN
      table = "|h1|h2|\n|-|-|\n|d1|d2|\n|e1|";

      // WHEN
      mtf.format_table(table);

      // THEN 
      expect(mtf.output_table).toEqual("| h1 | h2 |\n|----|----|\n| d1 | d2 |\n| e1 |    |\n");

    });

  });


});