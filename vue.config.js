module.exports = {
    baseUrl: '/', // 根路径
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录
    lintOnSave: false, // 是否开启eslint保存检测，有效值: true, false, error
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: {
            // jsonplaceholder.typicode.com
            // 配置跨域
            '/api': {
                target: 'http://www.firefly.test/api/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}