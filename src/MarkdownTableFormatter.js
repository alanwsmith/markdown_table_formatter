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

}



////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.get_column_widths = function() {

  this.column_widths = new Array();

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

  // Remove leading empty lines
  while (table_rows[0].indexOf('|') == -1) {
    table_rows.shift();
  }

  for (var row_i = 0, row_l = table_rows.length; row_i < row_l; row_i = row_i + 1) {

    // TODO: Set up the indexes so that empty lines at either the top or bottom will
    // be removed. Right now, this is only helpful for empty lines at the bottom.
    if(table_rows[row_i].indexOf('|') == -1) {
      continue;
    }

    this.cells[row_i] = new Array();

    var row_columns = table_rows[row_i].split("\|");

    for (var col_i = 0, col_l = row_columns.length; col_i < col_l; col_i = col_i + 1) {
      this.cells[row_i][col_i] = row_columns[col_i]
      this.cells[row_i][col_i] = this.cells[row_i][col_i].replace(/^\s+/g,"");
      this.cells[row_i][col_i] = this.cells[row_i][col_i].replace(/\s+$/g,"");

      // If it's the separator row, parse down the dashes
      // Only do this if it matches to avoid adding a
      // dash in an empty column and messing with the column widths.
      if (row_i == 1) {
        this.cells[row_i][col_i] = this.cells[row_i][col_i].replace(/-+/g,"-");
      }
    }
  }


  // Remove leading and trailing rows if they are empty.
  this.get_column_widths();
  
  if (this.column_widths[0] == 0) {
    for (var row_i = 0, row_l = this.cells.length; row_i < row_l; row_i = row_i + 1) {
      this.cells[row_i].shift();
    }
  }

  this.get_column_widths();

  // check to see if the last item in column widths is empty
  if (this.column_widths[ (this.column_widths.length - 1) ] == 0) {
    for (var row_i = 0, row_l = this.cells.length; row_i < row_l; row_i = row_i + 1) {
      // Only remove the row if it is in the proper last slot.
      if (this.cells[row_i].length == this.column_widths.length) {
        this.cells[row_i].pop();
      }
    }    
  }

  this.get_column_widths();

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
