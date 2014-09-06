function MarkdownTableFormatter() {

  // Setup instance variables.
  this.body_cells = new Array();
  this.column_widths = new Array();
  this.header_cells = new Array();
  this.input_cells = new Array();
  this.output_cells = new Array();
  this.output_table = "";
  this.source_table = "";

}

////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.add_missing_input_cells = function() {
  for (var row_i = 0, row_l = this.input_cells.length; row_i < row_l; row_i = row_i + 1) {    
    for (var col_i = 0, col_l = this.column_widths.length; col_i < col_l; col_i = col_i + 1) {
      if (typeof this.input_cells[row_i][col_i] === 'undefined') {
        this.input_cells[row_i][col_i] = '';
      }      
    }
  }  
}


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.format_table = function(input_table) {
  this.set_input_cells(input_table);
  this.set_column_widths();
  this.add_missing_input_cells();
  this.set_output_cells(this.input_cells, this.column_widths);
  this.set_output_table(this.output_cells);
  return this.output_table;
};



////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.load_body_cells = function() {

  var body_array = this.source_table.split("\n");

  // shift two off the front to get to the actual data
  body_array.shift();
  body_array.shift();  

  for (var line_index = 0, line_count = body_array.length; line_index < line_count; line_index = line_index + 1) {

    // Skip lines that don't have a pipe
    if(body_array[line_index].indexOf('|') == -1) {
      continue;
    }

    // subtract two to adjust for data array
    this.body_cells[line_index] = body_array[line_index].split("\|");

    for (var cell_index = 0, cell_count = this.body_cells[line_index].length; cell_index < cell_count; cell_index = cell_index + 1) {
      this.body_cells[line_index][cell_index] = this.body_cells[line_index][cell_index].replace(/^\s+/g,"");
      this.body_cells[line_index][cell_index] = this.body_cells[line_index][cell_index].replace(/\s+$/g,"");
    }
  }
}


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.load_header_cells = function() {

  // TODO: Make sure the first line really has data and is the header.
  // TODO: Determine if multiple rows of headers should be dealt with.

  var source_table_lines = this.source_table.split("\n");
  this.header_cells = source_table_lines[0].split('\|');

  for (var cell_index = 0, cell_count = this.header_cells.length; cell_index < cell_count; cell_index = cell_index + 1) {
    this.header_cells[cell_index] = this.header_cells[cell_index].replace(/^\s+/g,"");
    this.header_cells[cell_index] = this.header_cells[cell_index].replace(/\s+$/g,"");
  }
}


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.set_column_widths = function() {

  this.column_widths = new Array();

  for (var row_i = 0, row_l = this.input_cells.length; row_i < row_l; row_i = row_i + 1) {
    for (var col_i = 0, col_l = this.input_cells[row_i].length; col_i < col_l; col_i = col_i + 1) {
      if (typeof this.column_widths[col_i] === 'undefined') {
        this.column_widths[col_i] = this.input_cells[row_i][col_i].length;
      }
      else if (this.column_widths[col_i] < this.input_cells[row_i][col_i].length) {
        this.column_widths[col_i] = this.input_cells[row_i][col_i].length;
      }
    }
  }
}


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.set_input_cells = function(input_table) {

  this.input_cells = new Array();

  var input_line_array = input_table.split("\n");

  for (var lines_i = 0, lines_l = input_line_array.length; lines_i < lines_l; lines_i = lines_i + 1) {

    var current_cols_array = input_line_array[lines_i].split("\|");

    if (current_cols_array.length > 1) {

      this.input_cells[lines_i] = new Array();
      
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
}


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.set_output_cells = function (input_cells, column_widths) {

  this.output_cells = new Array();

  for (var row_i = 0, row_l = input_cells.length; row_i < row_l; row_i = row_i + 1) {
    this.output_cells[row_i] = new Array();
    
    for (var col_i = 0, col_l = input_cells[row_i].length; col_i < col_l; col_i = col_i + 1) {


      var output_cell = ""; // Create an empty string to start with;

      if (col_i > 0 && col_i < (col_l - 1)) {

        // TODO: Stop hard-coding the separator in the second row.
        if (row_i == 1) {
          var dash_count = column_widths[col_i] + 2;
          while (dash_count > 0) {
            output_cell += '-';
            dash_count = dash_count - 1;
          }
        }
        else {
          var post_string_padding_to_apply = column_widths[col_i] - input_cells[row_i][col_i].length;
          
          output_cell += " "; // Start with a space for header and data cells.
          output_cell += input_cells[row_i][col_i];
          while(post_string_padding_to_apply > 0) {
            output_cell += " ";
            post_string_padding_to_apply = post_string_padding_to_apply - 1;
          }
          output_cell += " "; // Add the last space.
        }
      }
      this.output_cells[row_i][col_i] = output_cell; 
    }
  }
}


////////////////////////////////////////////////////////////////////////////////

MarkdownTableFormatter.prototype.set_output_table = function (output_cells) {

  this.output_table = "";

  for (var row_i = 0, row_l = output_cells.length; row_i < row_l; row_i = row_i + 1) {
    this.output_table += output_cells[row_i].join('|') + "\n";
  }
}

