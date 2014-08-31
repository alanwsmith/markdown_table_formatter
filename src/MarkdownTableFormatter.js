function MarkdownTableFormatter() {
}

////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.format_table = function(input_table) {
  this.input_table = input_table;
  this.set_input_cells(input_table);
  this.set_column_widths(this.input_cells);

  // var return_table = "";

  // for (var row_i = 0, row_l = this.input_cells.length; row_i < row_l; row_i = row_i + 1) {
  //   return_table += "|";
  //   for (var col_i = 1, col_l = this.input_cells[row_i].length; col_i < col_l; col_i = col_i + 1) {

  //   }
  //   return_table += "|\n";
  // }

  return input_table;
};


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.set_column_widths = function(input_cells) {

  this.column_widths = new Array();

  for (var row_i = 0, row_l = input_cells.length; row_i < row_l; row_i = row_i + 1) {
    for (var col_i = 0, col_l = input_cells[row_i].length; col_i < col_l; col_i = col_i + 1) {
      if (typeof this.column_widths[col_i] === 'undefined') {
        this.column_widths[col_i] = input_cells[row_i][col_i].length;
      }
      else if (this.column_widths[col_i] < input_cells[row_i][col_i].length) {
        this.column_widths[col_i] = input_cells[row_i][col_i].length;
      }
    }
  }
}


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.set_input_cells = function(input_table) {

  this.input_cells = new Array();

  var input_line_array = input_table.split("\n");

  for (var lines_i = 0, lines_l = input_line_array.length; lines_i < lines_l; lines_i = lines_i + 1) {
    this.input_cells[lines_i] = new Array();
    var current_cols_array = input_line_array[lines_i].split("\|");

    for (var cols_i = 0, cols_l = current_cols_array.length; cols_i < cols_l; cols_i = cols_i + 1) {
      var cell_data = current_cols_array[cols_i];

      // chomp leading and trailing space
      cell_data = cell_data.replace(/^\s+/g,"");
      cell_data = cell_data.replace(/\s+$/g,"");

      // reduce separator dashes to one so they don't throw off width calculation
      cell_data = cell_data.replace(/^\-+$/,"-");

      this.input_cells[lines_i][cols_i] = cell_data;
    }
  }
}


MarkdownTableFormatter.prototype.set_output_cells = function (input_cells, column_widths) {

  this.output_cells = new Array();

  for (var row_i = 0, row_l = input_cells.length; row_i < row_l; row_i = row_i + 1) {
    this.output_cells[row_i] = new Array();

    // TODO: Avoid hard-coding the separator in the second row.

    for (var col_i = 0, col_l = input_cells[row_i].length; col_i < col_l; col_i = col_i + 1) {

      var output_cell = ""; // Create an empty string to start with;

      if (col_i > 0 && col_i < (col_l - 1)) {
        output_cell += " "; // Start with a space for header and data cells.
        output_cell += input_cells[row_i][col_i];
        output_cell += " "; // Add the last space.
      }
      // input_cells[row_i][col_i];
      this.output_cells[row_i][col_i] = output_cell; 
    }
  }

}