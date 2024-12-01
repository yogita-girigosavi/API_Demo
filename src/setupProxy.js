const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://199.192.26.248:8000',
            changeOrigin: true,
            pathRewrite: { '^/api': 'http://localhost:3000' }, 
        })
    );
};
