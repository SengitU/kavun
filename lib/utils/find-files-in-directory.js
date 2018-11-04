const fs = require('fs');
const { join: joinPaths } = require('path');

const isDirectory = (path) => fs.existsSync(path) && fs.statSync(path).isDirectory();

const findFilesInDirectory = (path) => {
  const fileList = [];
  const walkPath = (path) => fs.readdirSync(path).forEach(file => collectFiles(path, file));
  const collectFiles = (path, file) => {
    const currentPath = joinPaths(path, file);
    if(isDirectory(currentPath)) {
      walkPath(currentPath);
    } else {
      fileList.push(currentPath);
    }
  };
  if (isDirectory(path)) {
    walkPath(path);
  }
  return fileList;  
};

module.exports = findFilesInDirectory;