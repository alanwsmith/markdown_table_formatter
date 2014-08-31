function MarkdownTableFormatter() {
}

// Initialize instance variables
MarkdownTableFormatter.prototype.column_widths = new Array();


MarkdownTableFormatter.prototype.get_column_widths = function() {
  this.column_widths[0] = 2;
  this.column_widths[1] = 2;
  this.column_widths[2] = 2;
};

MarkdownTableFormatter.prototype.format_table = function(input_table) {
  this.get_column_widths();
  return input_table;
};

