const fs = require('fs');

const filePath = process.argv[2];

function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading file ${filePath}: ${err}`);
        return;
      }
      resolve(data);
    });
  });
}

function modifyText(text) {
  return new Promise((resolve, reject) => {
    // TODO: Convert text to uppercase and reverse it
    try {
      // Convert text to uppercase and reverse it
      const modifiedText = text.toUpperCase().split('').reverse().join('');
      resolve(modifiedText);
    } catch (error) {
      reject(`Error modifying text: ${error}`);
    }
  });
}

if (!filePath) {
  console.error("Please provide a valid file path.");
  process.exit(1);
}

// Validate if the file path exists and is a file
if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
  console.error("Invalid file path provided. Please check the file path.");
  process.exit(1);
}

readFileAsync(filePath)
  .then((data) => modifyText(data))
  .then((modifiedText) => {
    console.log(modifiedText);
  })
  .catch((error) => {
    console.error(error);
  });
