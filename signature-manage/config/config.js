// ref: https://umijs.org/config/
export default {
  "proxy": {
    "/api": {
      "target": "http://10.18.4.35:8082",
      "changeOrigin": true,
    }
  },
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'signature-manage',
        dll: false,
        locale: {
          enable: false,
          default: 'zh-CN',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
    [
      'umi-plugin-eslint', // eslint-loader options:
      {
        ignore: true,
        // 启用 .eslintignore
        useEslintrc: true, // 启用 .eslintrc
      },
    ],
  ],
  define: {},
};

