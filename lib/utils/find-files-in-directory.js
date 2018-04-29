const fs = require('fs');

const isDirectory = (path) => fs.statSync(path).isDirectory();

const findFilesInDirectory = (path) => {
  const fileList = [];

  const directoryExplorer = (path) => {
    const files = fs.readdirSync(path);

    files.forEach((file) => {
      const currentPath = `${path}/${file}`;
      
      if(isDirectory(currentPath)) {
        directoryExplorer(currentPath);
      } else {
        fileList.push(currentPath);
      }
    });
  };

  if (isDirectory(path)) {
    directoryExplorer(path);
    return fileList;  
  } else {
    return [path];
  }
};

module.exports = findFilesInDirectory;