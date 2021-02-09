process.env = {
  ...process.env,
  API_BASE_URL: '/',
  MONGO_DB_MOCK: 'true',
};

jest.setTimeout(10000);
