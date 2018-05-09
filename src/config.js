const dev = {
  // API_ORIGIN: 'http://localhost:3001',
  API_ORIGIN: 'https://pancakenz-staging.herokuapp.com',
  OPENFISCA_ORIGIN: 'https://openfisca-aotearoa.herokuapp.com/calculate'
};

const staging = {
  API_ORIGIN: 'https://pancakenz-staging.herokuapp.com',
  OPENFISCA_ORIGIN: 'https://openfisca-aotearoa.herokuapp.com/calculate'
};

const production = {
  API_ORIGIN: 'https://pancakenz-staging.herokuapp.com',
  OPENFISCA_ORIGIN: 'https://openfisca-aotearoa.herokuapp.com/calculate'
};

const config = window.location.origin === 'https://serviceinnovationlab.github.io'
  ? production
  : dev;

export default config;
