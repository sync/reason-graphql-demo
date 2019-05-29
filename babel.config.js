module.exports = api => {
  api.cache(true);

  return {
    presets: ['next/babel'],
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  };
};
