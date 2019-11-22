import { getAllPackage } from '@/services/apps'

export default {
    namespace: 'appslist',
    state: {
        list: []
    },
    reducers: {
        aPackage(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        }
    },
    effects: {
        *getAllPackage(_, { call, put }) {
            const { data: { data } } = yield call(getAllPackage);
            yield put({ type: 'aPackage', payload: data });
        },

    },
    // subscriptions: {
    //     // 订阅监听，比如我们监听路由，进入页面就如何，可以在这写
    //     setup({ dispatch, history, query }) {

    //         return history.listen(async ({ pathname, search, query }) => {

    //             if (pathname === "/apps/list") {// 当进入testdemo这路由，就会触发fetchUser方法

    //                 dispatch({ type: "getAllPackage" })

    //             }

    //         })

    //     }
    // }
}