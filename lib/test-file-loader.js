export const loadTestFiles = (loader, fileNames) => {
  const loadOneFileWithLoader = (fileName) => loader(fileName);  
  const loadFiles = () => fileNames.forEach(loadOneFileWithLoader);
  loadFiles();
};
