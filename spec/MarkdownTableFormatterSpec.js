describe("MarkdownTableFormatter", function() {

  // Initialize variables
  var mtf;

  beforeEach(function() {    
    mtf = new MarkdownTableFormatter();

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

  describe("add_missing_cell_columns", function() {

    it("should added empty cells where necessary", function() {

      // GIVEN
      mtf.cells = [ 
        ['h1', 'h2', 'h3', "h4"], 
        ['-','-', '-', '-'], 
        ['d1','d2','d3'] 
      ];

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

  describe("initialization", function() {

    it("should initialize instance variables", function() {

      // GIVEN
      // Initialization happened in before.

      // THEN
      expect(mtf.cells.length).toEqual(0);
      expect(mtf.output_table).toEqual("");

    });
  });


  ////////////////////////////////////////////////////////////////////////////////

  describe("Integration Tests", function() {

    it("should build a basic table", function() {

      // WHEN
      mtf.format_table("|h1|h2|\n|-|-|\n|d1|d2|");

      // THEN 
      expect(mtf.output_table).toEqual("| h1 | h2 |\n|----|----|\n| d1 | d2 |\n");

    });

  });


});