function MarkdownTableFormatter() {
}

MarkdownTableFormatter.prototype.get_column_widths = function() {

  this.column_widths = new Array();  
  
  for (var lines_i = 0, lines_l = this.input_lines.length; lines_i < lines_l; lines_i = lines_i + 1) {
    
    var cols = this.input_lines[lines_i].split("\|");

    // remove the first and last that are just spacers for the markdown borders
    cols.shift();
    cols.pop();
  
    // Loop through the items in each column
    for (var cols_i = 0, cols_l = cols.length; cols_i < cols_l; cols_i = cols_i + 1) {
      if (typeof this.column_widths[cols_i] === 'undefined') {
        this.column_widths[cols_i] = cols[cols_i].length;
      }
      else if (this.column_widths[cols_i] < cols[cols_i].length) {
        this.column_widths[cols_i] = cols[cols_i].length;
      }
    }
  }
};


MarkdownTableFormatter.prototype.set_input_cells = function(input_table) {
  this.input_cells = new Array();
  this.input_cells[0] = new Array('h1_c', 'h2_c');
  this.input_cells[1] = new Array('-', '-');
  this.input_cells[2] = new Array('d1_c', 'd2_c');
}

MarkdownTableFormatter.prototype.set_intput_lines = function(input_table) {
  this.input_lines = input_table.split("\n");
}

MarkdownTableFormatter.prototype.format_table = function(input_table) {
  console.log("Starting MarkdownTableFormatter.format_table()");
  this.input_table = input_table;
  this.set_intput_lines(input_table);
  this.get_column_widths();
  console.log("Finishing MarkdownTableFormatter.format_table()");
  return input_table;
};

