import { getDepositRecord } from '@/services/apps'
// import { isNullOrUndefined } from 'util';
// https://www.jianshu.com/p/f7401adce447 dva关于 state -》effects -》subscriptions 相关用法
export default {
    namespace: 'depositRecord',
    state: {
        list: [],
        total: 0,
        editData: {},
        loading: false
    },
    reducers: {
        deviceList(state, action) {
            console.log(action, 'action');
            return {
                ...state,
                list: action.payload,
            };
        }
    },
    effects: {
        *getAllPackages(_, { call, put}){
            const { data: res } = yield call(getDepositRecord);
            let data = res.data;
            console.log(12345, data)
            yield put({ type: 'deviceList', payload: Array.isArray(data) ? data : [] });
        },

        
        
    },
    subscriptions: {
        setup({ dispatch, history, query }) {
            // const store = window.g_app._store;
            // console.log(store.getState().apps_model.list, 'list');
			// // store.subscribe(() => {
            // //     const device_list = store.getState().apps_model.list;
                
            // //     if (!isNullOrUndefined(device_list) && device_list.length ) {
            // //         console.log(store.getState().apps_model.list, 'listssss');
            // //     }
            // // });
            // return history.listen(async ({ pathname, search, query }) => {

            //     if (pathname === "/apps/list") {// 当进入testdemo这路由，就会触发fetchUser方法

            //         dispatch({ type: 'getAllPackage' });

            //     }
            // })

		},
    }

}