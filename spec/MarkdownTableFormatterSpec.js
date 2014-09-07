describe("MarkdownTableFormatter", function() {

  var mtf;

  beforeEach(function() {    
    mtf = new MarkdownTableFormatter();
  });

  describe("initialization", function() {

    it("should initialize instance variables", function() {

      // GIVEN
      // Initialization happened in before.

      // THEN
      expect(mtf.cells.length).toEqual(0);

    });
  });




});