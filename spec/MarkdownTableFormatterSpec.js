describe("MarkdownTableFormatter", function() {
  var mtf;

  beforeEach(function() {
    mtf = new MarkdownTableFormatter();
  });

  it("should not alter an already formatted table", function() {
    var formatted_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |";
    expect(mtf.format_table(formatted_table)).toEqual(formatted_table);
  });

});