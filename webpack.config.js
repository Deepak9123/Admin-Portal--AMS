var WebpackObfuscator = require('webpack-obfuscator');
module.exports = {
 module: {
    plugins: [
        new WebpackObfuscator ({
           debugProtection: true
        }, ['vendor.js'])
       ]
    
  }}