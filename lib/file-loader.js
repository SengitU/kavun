const _findFilesInDirectory = require('./utils/find-files-in-directory');

const productionDeps = {
  findFilesInDirectory: _findFilesInDirectory,
  filesFilter: fileName => fileName.indexOf('.spec') > -1,
};

const loadPotentialTestFiles = (loader, path, {findFilesInDirectory, filesFilter} = productionDeps) => {
  const loadOneFileWithLoader = (fileName) => loader(fileName);  
  const loadFiles = (pathToTheFiles) => pathToTheFiles.forEach(loadOneFileWithLoader);
  const files = findFilesInDirectory(path);
  const specFiles = files.filter(filesFilter);
  loadFiles(specFiles);
};

module.exports = { loadPotentialTestFiles };