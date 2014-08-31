function MarkdownTableFormatter() {
}

MarkdownTableFormatter.prototype.get_column_widths = function() {

  this.column_widths = new Array();  
  this.input_lines = this.input_table.split("\n");

  for (var lines_i = 0, lines_l = this.input_lines.length; lines_i < lines_l; lines_i = lines_i + 1) {
    
    var cols = this.input_lines[lines_i].split("\|");

    // remove the first and last that are just spacers for the markdown borders
    cols.shift();
    cols.pop();
  
    // Loop through the items in each column
    for (var cols_i = 0, cols_l = cols.length; cols_i < cols_l; cols_i = cols_i + 1) {

      console.log("String: " + cols[cols_i] + " Length: " + cols[cols_i].length + " Was: " + this.column_widths[cols_i]);
      if (typeof this.column_widths[cols_i] === 'undefined') {
        this.column_widths[cols_i] = cols[cols_i].length;
      }

      if (this.column_widths[cols_i] < cols[cols_i].length) {
        this.column_widths[cols_i] = cols[cols_i].length;
      }
    }
  }  

};

MarkdownTableFormatter.prototype.format_table = function(input_table) {
  console.log("Starting MarkdownTableFormatter.format_table()");
  this.input_table = input_table;
  this.get_column_widths();
  console.log("Finishing MarkdownTableFormatter.format_table()");
  return input_table;
};

