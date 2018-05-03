const dev = {
  API_ORIGIN: 'http://localhost:3001',
  OPENFISCA_ORIGIN: 'https://openfisca-aotearoa.herokuapp.com/calculate'
};

const staging = {
  API_ORIGIN: 'https://pancakenz-staging.herokuapp.com',
  OPENFISCA_ORIGIN: 'https://openfisca-aotearoa.herokuapp.com/calculate'
};

const config = window.location.origin === 'https://serviceinnovationlab.github.io'
  ? staging
  : dev;

export default config;
