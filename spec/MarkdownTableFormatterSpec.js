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

  it("should properly create the array of arrays for all table cells", function() {
    input_table = "|h1_c|h2_c|\n|-|-|\n|d1_c|d2_c|";
    
    mtf.set_input_cells(input_table);
    expect(mtf.input_cells[0][0]).toEqual('h1_c');
    expect(mtf.input_cells[0][1]).toEqual('h2_c');
    expect(mtf.input_cells[1][0]).toEqual('-');
    expect(mtf.input_cells[1][1]).toEqual('-');
    expect(mtf.input_cells[2][0]).toEqual('d1_c');
    expect(mtf.input_cells[2][1]).toEqual('d2_c');

  });

});