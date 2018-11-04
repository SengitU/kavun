const _findFilesInDirectory = require('./utils/find-files-in-directory');

const productionDeps = {
  findFilesInDirectory: _findFilesInDirectory,
};
const defaultFilesFilter = fileName => fileName.indexOf('.spec') > -1;

const loadPotentialTestFiles = (loader, path, filesFilter = defaultFilesFilter, {findFilesInDirectory} = productionDeps) => {
  const loadOneFileWithLoader = (fileName) => loader(fileName);  
  const loadFiles = (pathToTheFiles) => pathToTheFiles.forEach(loadOneFileWithLoader);
  const files = findFilesInDirectory(path);
  const specFiles = files.filter(filesFilter);
  loadFiles(specFiles);
};

module.exports = { loadPotentialTestFiles };