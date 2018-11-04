const _findFilesInDirectory = require('./utils/find-files-in-directory');

const productionDeps = {
  findFilesInDirectory: _findFilesInDirectory
};

const fileLoader = (loader, {findFilesInDirectory} = productionDeps) => {
  const loadOneFileWithLoader = (fileName) => loader(fileName);  
  const loadFiles = (pathToTheFiles) => pathToTheFiles.forEach(loadOneFileWithLoader);
  const load = (path) => {
    const files = findFilesInDirectory(path);
    const specFiles = files.filter(file => file.indexOf('.spec') > -1);
    loadFiles(specFiles);
  };
  return {
    load
  };
};

module.exports = fileLoader;