module.exports = {
  publicPath: '/fingerprint/',
  devServer: {
        proxy: 'http://localhost:8080/#/',
    },
  // publicPath: '../211209/'
}
