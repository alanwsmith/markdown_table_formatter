function MarkdownTableFormatter() {

  // Setup instance variables.
  this.cells = new Array();

}

////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.import_table = function(table) {
  
  var table_rows = table.split("\n");

  for (var row_i = 0, row_l = table_rows.length; row_i < row_l; row_i = row_i + 1) {

    this.cells[row_i] = new Array();

    var row_columns = table_rows[row_i].split("\|");

    // TODO: Update so removal of first and last empty columns
    // is only done with "|data|data|" rows and note for
    // "data|data" rows without leading and ending pipes.
    row_columns.shift();
    row_columns.pop();

    for (var col_i = 0, col_l = row_columns.length; col_i < col_l; col_i = col_i + 1) {
      this.cells[row_i][col_i] = row_columns[col_i]
      
    }
  }
}
