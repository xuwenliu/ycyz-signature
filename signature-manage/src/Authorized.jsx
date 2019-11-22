import Redirect from 'umi/redirect';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import { isNullOrUndefined } from 'util';


export default connect(({ user, loading }) => ({
  user, loading
}))((props) => {

  const { user, location, children, route } = props;
  const isGuest = (user.token === null);
// console.log(props);
// { history: { … }, location: { … }, match: { … }, staticContext: undefined, computedMatch: { … }, … }
// children: { $$typeof: Symbol(react.element), key: null, ref: null, props: { … }, type: ƒ, … }
// computedMatch: { path: "/", url: "/", isExact: true, params: { … } }
// dispatch: ƒ()
// history: { length: 47, action: "POP", location: { … }, createHref: ƒ, push: ƒ, … }
// loading: { global: false, models: { … }, effects: { … } }
// location: { pathname: "/", search: "", hash: "", query: { … }, state: undefined, … }
// match: { path: "/", url: "/", isExact: true, params: { … } }
// render: ƒ render(props)
// route: { path: "/", routes: Array(13), Routes: Array(1), _title: "signature-manage", component: ƒ, … }
// staticContext: undefined
// user: { token: "eyJhbGciOiJIUzI1NiJ9.eyJsZXZlbCI6MSwiaWQiOjEsImV4c…24ifQ.KFFk7jruqig3djYhEbDLKNBi3nrK80nDbJsw2ejxi-g", message: "remenber success", info: { … } }
// __proto__: Object
// console.log(props);
  if (!isNullOrUndefined(location.pathname) && location.pathname.startsWith('/auth/')) {
    if (isGuest) {
      return <>{children}</>
    }
    else {
      return <Redirect to="/" />
    }
  }
  if (isGuest) {
    return <Redirect to="/auth/login" />
  }
  else if (user.info === null) {
    return (
      <div
        style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100%" }}
      >
        <Spin
          delay={500}
          tip="正在加载用户信息..."
          indicator={(<Icon type="loading" style={{ fontSize: 24 }}
          />)}
        />
      </div>
    )
  }

  let currentRoute = route.routes.filter(t => t.path === location.pathname).pop()
  if (!isNullOrUndefined(currentRoute.levels) && currentRoute.levels.indexOf(user.info.level) === -1) {
    return <Redirect to="/403" />
  }

  return (
    <div>
      {children}
    </div>
  );
});