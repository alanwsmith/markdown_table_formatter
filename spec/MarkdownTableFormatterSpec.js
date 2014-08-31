describe("MarkdownTableFormatter", function() {
  var mtf;
  var input_table;

  beforeEach(function() {
    mtf = new MarkdownTableFormatter();
    input_table = "";
  });

  it("should not alter an already formatted table", function() {
    input_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |";
    expect(mtf.format_table(input_table)).toEqual("| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |");
  });

  // it("should properly set the input_table when format_table() is called.", function() {

  // });

  it("should properly identify target column widths when source has no padding", function() {
    input_table = "|h1|h2|h3|\n|-|-|-|\n|d1|d2|d3|";
    mtf.format_table(input_table);
    expect(mtf.column_widths[0]).toBe(2);
    expect(mtf.column_widths[1]).toBe(2);
    expect(mtf.column_widths[2]).toBe(2);
  });

});