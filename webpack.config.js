const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },

    mode: 'development',
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, 'dist'),
                publicPath: '/',
                watch: true
            },
            {
                directory: path.resolve(__dirname, 'public'), // добавляем public как статическую папку
                publicPath: '/',
                watch: true
            }
        ],
        compress: true,
        port: 8080,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules'
            },
            {
                oneOf: [
                    {
                        test: /\.svg$/,
                        resourceQuery: /inline/,
                        use: [
                            {
                                loader: 'svg-inline-loader',
                                options: {
                                    removeTags: true,
                                    removingTagAttrs: ['id', 'data-name'],
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                        type: 'asset/resource'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/employees/employee-admin/employee-admin.html',
            inject: 'body',
            filename: 'employee-admin.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/employees/employee-academic/employee-academic.html',
            inject: 'body',
            filename: 'employee-academic.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/js',
                    to: 'js',
                    noErrorOnMissing: true,
                    globOptions: {
                        ignore: ['**/.DS_Store', '**/Thumbs.db']
                    }
                },
                {
                    from: 'public',
                    to: '',
                    filter: (resourcePath) => {
                        // Исключаем папки, которые уже обрабатываются отдельно
                        return !resourcePath.includes('/js/');
                    },
                    noErrorOnMissing: true
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ]
};