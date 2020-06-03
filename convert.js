const fs    = require('fs'),
  showdown  = require('showdown'),
  args      = process.argv.slice(2);

if (args.length === 0) {
  return console.log('<<< Syntax: node convert [markdown-filename-without-extension] >>>');
}

const converter = new showdown.Converter( { 'noHeaderId': true } ),
  markdown      = args[0] + '.md',
  htmlFile      = args[0] + '.html';

fs.readFile(markdown, 'utf8', function (err, data) {
  if (err) return console.log(err);
  let html = converter.makeHtml(data);

  fs.writeFile(htmlFile, html, function (err) {
    if (err) return console.log(err);
    console.log('Processed ' + markdown + ' -> wrote ' + htmlFile + '!');
  });
});
