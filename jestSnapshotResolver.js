// eslint-disable-next-line no-undef
module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath + snapshotExtension,

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.slice(0, -snapshotExtension.length),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: "some/__tests__/example.test.js"
};
