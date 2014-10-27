process.env.NODE_ENV = 'test';
var server = require('../../server');
var expect = require('expect.js')
var Browser = require('zombie');
var fs = require('fs');

describe('errors', function() {
  
  var browser;

  before(function() {
    this.server = server.listen(3000);
    browser = new Browser({ site: 'http://localhost:3000' });
  });

  before(function(done) {
    fs.unlink('code/example.js');
    browser.visit('/', done);
  });

  after(function() {
    fs.writeFile('code/example.js', '// Put files in the code directory to edit them in the IDE')
  })

  it('returns error messages if no files are found', function() {
    expect(browser.text('nav.files a:first-child')).to.eql('This directory is empty')
  });


});