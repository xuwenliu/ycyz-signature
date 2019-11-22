// import { getDepositRecord } from '@/services/apps'
// import { isNullOrUndefined } from 'util';
// https://www.jianshu.com/p/f7401adce447 dva关于 state -》effects -》subscriptions 相关用法
export default {
    namespace: 'verificationIndex',
    state: {
        tab: '0'
    },
    reducers: {
        changeTab(state, action) {
            return {
                ...state,
                tab: action.payload,
            };
        }
    },
    effects: {
        *changeTabs({payload:{tab}}, { call, put }) {
            // console.log(tab,'payload')
            yield put({ type: 'changeTab', payload: tab });
        },

    },
    

}