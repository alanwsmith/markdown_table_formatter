function MarkdownTableFormatter() {

  // Setup instance variables.
  this.cells = new Array();
  this.column_widths = new Array();
  this.output_table = "";

}


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.add_missing_cell_columns = function() {
  for (var row_i = 0, row_l = this.cells.length; row_i < row_l; row_i = row_i + 1) {
    for (var col_i = 0, col_l = this.column_widths.length; col_i < col_l; col_i = col_i + 1) {
      if (typeof this.cells[row_i][col_i] === 'undefined') {
        this.cells[row_i][col_i] = '';
      }      
    }
  }
}





////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.format_table = function(table) {

  this.import_table(table);
  this.get_column_widths();
  this.add_missing_cell_columns();
  this.pad_cells_for_output();

  // Header
  this.output_table = "| ";
  this.output_table += this.cells[0].join(" | ");
  this.output_table += " |\n";

  // Separator 
  this.output_table += "|-";
  this.output_table += this.cells[1].join("-|-");
  this.output_table += "-|\n";


  for (var row_i = 2, row_l = this.cells.length; row_i < row_l; row_i = row_i + 1) {
    this.output_table += "| ";
    this.output_table += this.cells[row_i].join(" | ");
    this.output_table += " |\n";
  }

  return this.output_table;
}



////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.get_column_widths = function() {

  for (var row_i = 0, row_l = this.cells.length; row_i < row_l; row_i = row_i + 1) {
    for (var col_i = 0, col_l = this.cells[row_i].length; col_i < col_l; col_i = col_i + 1) {
      if (typeof this.column_widths[col_i] === 'undefined') {
        this.column_widths[col_i] = this.cells[row_i][col_i].length;
      }
      else if (this.column_widths[col_i] < this.cells[row_i][col_i].length) {
        this.column_widths[col_i] = this.cells[row_i][col_i].length;
      }
    }
  }

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
      this.cells[row_i][col_i] = this.cells[row_i][col_i].replace(/^\s+/g,"");
      this.cells[row_i][col_i] = this.cells[row_i][col_i].replace(/\s+$/g,"");

      // If it's the separator row, just put in a single dash
      if (row_i == 1) {
        this.cells[row_i][col_i] = "-";
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.pad_cells_for_output = function() {

  for (var row_i = 0, row_l = this.cells.length; row_i < row_l; row_i = row_i + 1) {
    for (var col_i = 0, col_l = this.cells[row_i].length; col_i < col_l; col_i = col_i + 1) {

      // Handle anything that's not the separator row
      if (row_i != 1) {
        while(this.cells[row_i][col_i].length < this.column_widths[col_i]) {
          this.cells[row_i][col_i] += " ";
        }
      }
      // Handle the separator row.
      else {
        while(this.cells[row_i][col_i].length < this.column_widths[col_i]) {
          this.cells[row_i][col_i] += "-";
        }
      }
    }
  }
}
