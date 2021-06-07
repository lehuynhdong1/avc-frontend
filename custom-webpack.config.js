const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        apiUrl: JSON.stringify(process.env.API_URL),
        production: !!process.env.PRODUCTION
      }
    })
  ]
};
