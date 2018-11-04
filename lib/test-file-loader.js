import * as fs from './utils/find-files-in-directory';

const productionDeps = {
  findFilesInDirectory: fs.findFilesInDirectory,
  isFile: fs.isFile,
};
const defaultFilesFilter = (fileName) => fileName.indexOf('.spec') > -1;

export const loadTestFiles = (loader, path, filesFilter = defaultFilesFilter, { findFilesInDirectory, isFile } = productionDeps) => {
  const loadOneFileWithLoader = (fileName) => loader(fileName);  
  const loadFiles = (pathToTheFiles) => pathToTheFiles.forEach(loadOneFileWithLoader);
  if (isFile(path)) {
    loadFiles([path]);
  } else {
    loadFiles(findFilesInDirectory(path).filter(filesFilter));
  }
};
