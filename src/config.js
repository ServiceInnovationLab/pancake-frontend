const dev = {
  API_ORIGIN: 'http://localhost:3001'
};

const staging = {
  API_ORIGIN: 'https://pancakenz-staging.herokuapp.com',
};

const config = process.env.REACT_APP_STAGE === 'staging'
  ? staging
  : dev;

export default config;
