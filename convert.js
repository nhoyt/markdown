const fs = require('fs'),
      path = require('path'),
      showdown = require('showdown'),
      args = process.argv.slice(2);

// Set the input file extension
const inputExt = '.md';

// Set the output directory (create if it doesn't exist)
const outputDir = './html';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Set the showdown options
const options = {
  'noHeaderId': true
};

// Instantiate the showdown converter
const converter = new showdown.Converter(options);

// Define the converter function
function md2html (markdown) {
  let htmlFile = outputDir + '/' + path.basename(markdown, inputExt) + '.html';
  fs.readFile(markdown, 'utf8', function (err, data) {
    if (err) return console.log(err);
    let html = converter.makeHtml(data);

    fs.writeFile(htmlFile, html + '\n', function (err) {
      if (err) return console.log(err);
      console.log('Processed ' + markdown + ' -> wrote ' + htmlFile);
    });
  });
}

// Convert each markdown file in the current directory
var files = fs.readdirSync('./').filter(filespec => filespec.endsWith(inputExt));
files.forEach(file => { md2html(file) });
