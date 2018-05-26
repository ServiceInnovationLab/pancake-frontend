const dev = {
  API_ORIGIN: 'http://127.0.0.1:4000',
  OPENFISCA_ORIGIN: 'https://openfisca.ratesrebates.services.govt.nz/calculate'
};

const staging = {
  API_ORIGIN: 'https://staging.ratesrebates.services.govt.nz',
  OPENFISCA_ORIGIN: 'https://openfisca.ratesrebates.services.govt.nz/calculate'
};

const production = {
  API_ORIGIN: 'https://ratesrebates.services.govt.nz',
  OPENFISCA_ORIGIN: 'https://openfisca.ratesrebates.services.govt.nz/calculate'
};

const config = production;

export default config;
