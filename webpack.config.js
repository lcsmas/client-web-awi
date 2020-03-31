const path = require('path');

module.exports = {
    resolve: {
        alias: {
            api: path.resolve(__dirname, 'src/api'),
            redux: path.resolve(__dirname, 'redux/slices')
        }
    }
}