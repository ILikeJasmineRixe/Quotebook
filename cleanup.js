// Import the file system module
const fs = require('fs');

const fileLocation = './new.txt';

// Read the file contents
fs.readFile(fileLocation, 'utf8', (error, fileContent) => {
    if (error) {
        console.error('Error reading the file:', error);
        return;
    }

    const linesArray = fileContent.split('\n');

    const filteredLines = linesArray.filter(line => line.trim() !== '');

    const updatedContent = filteredLines.join('\n');

    // Write the updated content back to the file
    fs.writeFile(fileLocation, updatedContent, 'utf8', (error) => {
        if (error) {
            console.error('Error writing to the file:', error);
            return;
        }
        console.log('Successfully removed blank lines.');
    });
});
