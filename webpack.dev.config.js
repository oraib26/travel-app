import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';


dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/html/views/index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.GEONAMES_USERNAME': JSON.stringify(process.env.GEONAMES_USERNAME),
          'process.env.WEATHERBIT_API_KEY': JSON.stringify(process.env.WEATHERBIT_API_KEY),
          'process.env.PIXABAY_API_KEY': JSON.stringify(process.env.PIXABAY_API_KEY)
      })
    ]
};