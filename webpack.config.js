const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        'employee-admin': './src/pages/employees/employee-admin/employee-admin.js',
        'employee-academic': './src/pages/employees/employee-academic/employee-academic.js',
        'student': './src/pages/student/student.js',
        'science': './src/pages/science/science.js',
        'industrial': './src/pages/industrial/industrial.js',
        'compliance': './src/pages/compliance/compliance.js',
        'development-courses': './src/pages/development-courses/development-courses.js',
        'media-activity': './src/pages/media-activity/media-activity.js',
        'admissinon-campgain': './src/pages/admissinon-campgain/admissinon-campgain.js',
        'screen-saver': './src/pages/screen-saver/screen-saver.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
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
                directory: path.resolve(__dirname, 'public'),
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
            inject: 'body',
            chunks: ['main'] // Указываем, какие чанки подключать
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/employees/employee-admin/employee-admin.html',
            inject: 'body',
            filename: 'employee-admin.html',
            chunks: ['employee-admin'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/employees/employee-academic/employee-academic.html',
            inject: 'body',
            filename: 'employee-academic.html',
            chunks: ['employee-academic'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/student/student.html',
            inject: 'body',
            filename: 'student.html',
            chunks: ['student'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/science/science.html',
            inject: 'body',
            filename: 'science.html',
            chunks: ['science'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/industrial/industrial.html',
            inject: 'body',
            filename: 'industrial.html',
            chunks: ['industrial'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/compliance/compliance.html',
            inject: 'body',
            filename: 'compliance.html',
            chunks: ['compliance'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/development-courses/development-courses.html',
            inject: 'body',
            filename: 'development-courses.html',
            chunks: ['development-courses'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/media-activity/media-activity.html',
            inject: 'body',
            filename: 'media-activity.html',
            chunks: ['media-activity'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/admissinon-campgain/admissinon-campgain.html',
            inject: 'body',
            filename: 'admissinon-campgain.html',
            chunks: ['admissinon-campgain'] // Только CSS для этой страницы
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/screen-saver/screen-saver.html',
            inject: 'body',
            filename: 'screen-saver.html',
            chunks: ['screen-saver'] // Только CSS для этой страницы
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
        new MiniCssExtractPlugin({
            filename: '[name].css' // Генерирует отдельные CSS файлы
        }),
    ]
};