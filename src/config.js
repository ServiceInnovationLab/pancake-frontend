const dev = {
  API_ORIGIN: 'https://pancakenz-staging.herokuapp.com'//http://localhost:3001'
};

const staging = {
  API_ORIGIN: 'https://pancakenz-staging.herokuapp.com'
};

const config = window.location.origin === 'https://serviceinnovationlab.github.io'
  ? staging
  : dev;

export default config;
