// convert.js - convert markdown files to HTML using showdown library

const fs = require('fs'),
      path = require('path'),
      showdown = require('showdown'),
      args = process.argv.slice(2);

// If no args provided, display help and exit
if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
  let syntax = 'node convert.js [--all || files-with-md-extension]'
  console.log(`Syntax: ${syntax}`);
  process.exit();
}

// Set the input file extension
const inputExt = '.md';

// Set the output directory (create if necessary)
const outputDir = './html';
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Set the showdown options
const options = {
  'noHeaderId': true,
  'openLinksInNewWindow': true
};

// Instantiate the showdown converter
const converter = new showdown.Converter(options);

// Define the converter function: Given the name of a markdown file
// as input, convert its contents to HTML and write the output file
// to the output directory.
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

// Convert files by calling md2html
if (args[0] === '-a' || args[0] === '--all') {
  // Convert all markdown files in the current directory
  let files = fs.readdirSync('./').filter(filespec => filespec.endsWith(inputExt));
  files.forEach(file => { md2html(file) });
}
else {
  // Convert markdown files specified as command-line arguments
  args.forEach(arg => {
    if (arg.endsWith('.md') && fs.existsSync(arg)) md2html(arg);
  });
}
