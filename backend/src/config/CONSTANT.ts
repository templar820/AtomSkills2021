console.log('POSTGRES_DB', process.env.POSTGRES_DB);
console.log('POSTGRES_USER', process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_HOST', process.env.POSTGRES_HOST);

export default {
  secretWord: process.env.SECRET_KEY || 'hacktemplate',
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'host.docker.internal',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'pass',
  POSTGRES_USER: process.env.POSTGRES_USER || 'user',
  POSTGRES_DB: process.env.POSTGRES_DB || 'hacktemplate',
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5433',
};
