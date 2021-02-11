import path from 'path';

export default (dirname) => ({
  '@root': `${dirname}/`,
  '@services': `${dirname}/services`,
  '@utils': `${dirname}/utils`,
  '@routes': `${dirname}/routes`,
  '@mocks': path.join(dirname, '..', 'mocks'),
});
