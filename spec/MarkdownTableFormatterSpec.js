describe("MarkdownTableFormatter", function() {
  var mtf;

  beforeEach(function() {
    mtf = new MarkdownTableFormatter();
  });

  it("should prove jasmine is working", function() {
    expect(mtf.is_this_thing_on).toEqual("check 1, 2");
  });

});