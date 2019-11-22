module.exports = {
  productionSourceMap: false,
  devServer: {
    "proxy": {
      "/api": {
        "target": "http://10.18.4.35:8082",
        "changeOrigin": true,
      }
    },
  }
}