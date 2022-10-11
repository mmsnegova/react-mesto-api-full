const SALT_OR_ROUNDS = 10;
const regex = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;
const allowedCors = [
  'https://mesto.mmsnegova.nomoredomains.icu',
  'http://mesto.mmsnegova.nomoredomains.icu',
  'http://localhost:3000',
];

module.exports = {
  SALT_OR_ROUNDS,
  regex,
  allowedCors,
};
