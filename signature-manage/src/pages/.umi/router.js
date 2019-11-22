import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__index" */ '../../layouts/index.jsx'),
        })
      : require('../../layouts/index.jsx').default,
    routes: [
      {
        path: '/403',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__403" */ '../403.jsx'),
            })
          : require('../403.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/404',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404.jsx'),
            })
          : require('../404.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/account/detail',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__account__detail" */ '../account/detail.jsx'),
            })
          : require('../account/detail.jsx').default,
        levels: [1],
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/account/edit',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__account__edit" */ '../account/edit.jsx'),
            })
          : require('../account/edit.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/account/list',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__account__list" */ '../account/list.jsx'),
            })
          : require('../account/list.jsx').default,
        levels: [1],
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/account/new',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__account__new" */ '../account/new.jsx'),
            })
          : require('../account/new.jsx').default,
        levels: [1],
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/apps/android',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__apps__models__depositRecord.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/apps/models/depositRecord.js').then(
                  m => {
                    return { namespace: 'depositRecord', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__apps__android" */ '../apps/android.jsx'),
            })
          : require('../apps/android.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/apps/depositRecord',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__apps__models__depositRecord.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/apps/models/depositRecord.js').then(
                  m => {
                    return { namespace: 'depositRecord', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__apps__depositRecord" */ '../apps/depositRecord.jsx'),
            })
          : require('../apps/depositRecord.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/apps/detail',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__apps__models__depositRecord.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/apps/models/depositRecord.js').then(
                  m => {
                    return { namespace: 'depositRecord', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__apps__detail" */ '../apps/detail.jsx'),
            })
          : require('../apps/detail.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/apps/downloadInfo',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__apps__models__depositRecord.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/apps/models/depositRecord.js').then(
                  m => {
                    return { namespace: 'depositRecord', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__apps__downloadInfo" */ '../apps/downloadInfo.jsx'),
            })
          : require('../apps/downloadInfo.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/apps/list',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__apps__list__model.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/apps/list/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__apps__models__depositRecord.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/apps/models/depositRecord.js').then(
                  m => {
                    return { namespace: 'depositRecord', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__apps__list__index" */ '../apps/list/index.jsx'),
            })
          : require('../apps/list/index.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/apps/new',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__apps__models__depositRecord.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/apps/models/depositRecord.js').then(
                  m => {
                    return { namespace: 'depositRecord', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__apps__new" */ '../apps/new.jsx'),
            })
          : require('../apps/new.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/apps/updateRecord',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__apps__models__depositRecord.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/apps/models/depositRecord.js').then(
                  m => {
                    return { namespace: 'depositRecord', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__apps__updateRecord" */ '../apps/updateRecord.jsx'),
            })
          : require('../apps/updateRecord.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__index" */ '../index.jsx'),
            })
          : require('../index.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/verification/deviceList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__verification__models__index.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/verification/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__verification__deviceList" */ '../verification/deviceList.jsx'),
            })
          : require('../verification/deviceList.jsx').default,
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/verification',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__verification__models__index.js' */ '/Users/js114/Desktop/Company/signature-skin/signature-manage/src/pages/verification/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__verification__index" */ '../verification/index.jsx'),
            })
          : require('../verification/index.jsx').default,
        levels: [1],
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        path: '/auth',
        exact: false,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__auth___layout" */ '../auth/_layout.jsx'),
            })
          : require('../auth/_layout.jsx').default,
        routes: [
          {
            path: '/auth/login',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__auth___layout" */ '../auth/login.jsx'),
                })
              : require('../auth/login.jsx').default,
            title: '登录',
            Routes: [require('./TitleWrapper.jsx').default],
            _title: '登录',
            _title_default: 'signature-manage',
          },
          {
            path: '/auth/register',
            exact: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__auth___layout" */ '../auth/register.jsx'),
                })
              : require('../auth/register.jsx').default,
            title: '注册',
            Routes: [require('./TitleWrapper.jsx').default],
            _title: '注册',
            _title_default: 'signature-manage',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/js114/Desktop/Company/signature-skin/signature-manage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: false },
              ),
            _title: 'signature-manage',
            _title_default: 'signature-manage',
          },
        ],
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/js114/Desktop/Company/signature-skin/signature-manage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
        _title: 'signature-manage',
        _title_default: 'signature-manage',
      },
    ],
    Routes: [require('../../Authorized.jsx').default],
    _title: 'signature-manage',
    _title_default: 'signature-manage',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/js114/Desktop/Company/signature-skin/signature-manage/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
    _title: 'signature-manage',
    _title_default: 'signature-manage',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
