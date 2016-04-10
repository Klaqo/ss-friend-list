var webpack = require('webpack'),
    path = require('path');

module.exports = {
  context: __dirname + '/app',
  entry: {
    app: './app.js',
    vendor: ['angular', 'angular-recaptcha', 'angular-animate', 'angular-route']
  },
  output :{
    path: __dirname + '/public/scripts',
    filename: 'friendlist.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ]
};
