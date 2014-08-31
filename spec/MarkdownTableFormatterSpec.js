describe("MarkdownTableFormatter", function() {
  var mtf;
  var input_table;
  var output_table;

  beforeEach(function() {
    mtf = new MarkdownTableFormatter();
    input_table = "";
    output_table = "";
  });

  it("should not alter an already formatted table", function() {
    input_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |";
    output_table = "| h1 | h2 | h3 |\n|----|----|----|\n| d1 | d2 | d3 |"
    expect(mtf.format_table(input_table)).toEqual(output_table);
  });

  it("should properly identify target column widths when source has no padding", function() {
    input_table = "|h1|h2|h3|\n|-|-|-|\n|d1|d2|d3|";
    mtf.format_table(input_table);
    expect(mtf.column_widths[0]).toBe(2);
    expect(mtf.column_widths[1]).toBe(2);
    expect(mtf.column_widths[2]).toBe(2);
  });

  it("should properly identify a second set of target column widths when source has no padding", function() {
    input_table = "|h1_b|h2_b|h3_b|\n|-|-|-|\n|d1_b|d2_b|d3_b|";
    mtf.format_table(input_table);
    expect(mtf.column_widths[0]).toBe(4);
    expect(mtf.column_widths[1]).toBe(4);
    expect(mtf.column_widths[2]).toBe(4);
  });

});