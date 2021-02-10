import populateDatabase from './populateDatabase';

(async () => {
  await populateDatabase(false);
  process.exit(0);
})();
