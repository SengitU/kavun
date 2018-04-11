const fs = require('fs');

const findFilesInDirectory = (path) => {
  const fileList = [];

  const directoryExplorer = (path) => {
    const files = fs.readdirSync(path);

    files.forEach((file) => {
      const currentPath = `${path}/${file}`;
      const isDirectory = fs.statSync(currentPath).isDirectory();

      if(isDirectory) {
        directoryExplorer(currentPath);
      } else {
        fileList.push(currentPath);
      }
    });
  };

  directoryExplorer(path);

  return fileList;
};

module.exports = findFilesInDirectory;