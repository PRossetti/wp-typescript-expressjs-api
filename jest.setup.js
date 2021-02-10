process.env = {
  ...process.env,
  API_BASE_PATH: '/',
  MONGO_DB_MOCK: 'true',
};

jest.setTimeout(10000);
