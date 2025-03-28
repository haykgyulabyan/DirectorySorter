import fs from 'fs' ;
import path from 'path' ;

const directory = process.argv[2] || '.';

try {
  const files = fs.readdirSync(directory);
  const publicFiles = [];
  const hiddenFiles = [];

  files.forEach(file => {
    const filePath = path.join(directory, file);
    try {
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        if (file.startsWith('.')) {
          hiddenFiles.push(file);
        } else {
          publicFiles.push(file);
        }
      }
    } catch (statErr) {
      console.error(`Error checking file ${file}: ${statErr.message}`);
    }
  });

  console.log(`Public Files: ${publicFiles.join(', ')}`);
  console.log(`Hidden Files: ${hiddenFiles.join(', ')}`);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`Directory "${directory}" does not exist.`);
  } else if (err.code === 'ENOTDIR') {
    console.error(`"${directory}" is not a directory.`);
  } else {
    console.error(`Error reading directory: ${err.message}`);
  }
}
