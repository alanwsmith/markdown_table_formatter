describe("MarkdownTableFormatter", function() {
  var mtf;

  beforeEach(function() {
    mtf = new MarkdownTableFormatter();
  });

  it("should not alter an already formatted table", function() {
    var formatted_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |";
    expect(mtf.format_table(formatted_table)).toEqual(formatted_table);
  });

  it("should properly identify target column widths when source has no padding", function() {
    var formatted_table = "|h1|h2|h3|\n|-|-|-|\n|d1|d2|d3|";

    mtf.format_table(formatted_table);
    expect(mtf.column_widths[0]).toBe(2);
    expect(mtf.column_widths[1]).toBe(2);
    expect(mtf.column_widths[2]).toBe(2);
  });

});