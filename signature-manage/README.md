
### 1,路由和文件夹之间的关系
```js
let list = [
      {
        name: "开始",
        icon: "home",
        path: "/",  //=> pages/index.jsx
      },
      {
        name: "账号管理",
        icon: "idcard",
        path: "/account",
        exact: true,
        level: 1,
        children: [
          {
            name: "账号管理",
            path: "/account", //=> pages/account/index.jsx
            hideInMenu: true
          },
          {
            name: "添加账号",
            path: "/account/new", //=> pages/account/new.jsx
            hideInMenu: true
          },
        ]

```
### 2,@connect 是 将 model 和 component 串联起来的 修饰器（数据传输）
```js
    @connect(({ user }) => ({
        user // 这里的user即为 models/user.js中的state的值
    }), (dispatch) => ({
        logout() {
            dispatch({ type: 'user/logout' }) //执行 namespace(user)下的logout方法
        }
    }))
- 子级使用 通过 `this.props.user/this.props.logout()`使用即可
```
### 3,models中 dva关于 state -》effects -》subscriptions 相关用法
- https://stackblitz.com/edit/dva-example-count (dva-example-count)
- https://www.cnblogs.com/CyLee/p/9308604.html (https://www.cnblogs.com/CyLee/p/9308604.html)
- https://github.com/dvajs/dva-knowledgemap/blob/master/README.md
- https://www.jianshu.com/p/f7401adce447 (models中 dva)
- https://github.com/sorrycc/blog/issues/62 (umi + dva，完成用户管理的 CURD 应用)
- https://umijs.org/zh/guide/with-dva.html#faq (umijs with dva)
- https://ant.design/components/modal-cn/ (ant.design)
```

```
### 4,使用 Effect Hook
- https://zh-hans.reactjs.org/docs/hooks-effect.html
```
```


