const path = require('path');
// []webpackを使いたかったらyarn webpackでいける
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public/js')
    },
    module: {
        rules: [{
            test: /\.ts/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
