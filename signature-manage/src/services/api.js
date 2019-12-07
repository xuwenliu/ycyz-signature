export default {
    // user
    USER_REGISTER: 'user/register',
    USER_LOGIN: 'user/login',
    USER_GET_USER_INFO: 'user/getUserInfo',
    USER_GET_ALL_REVIEW_USER: 'user/getAllReviewUser',//待审核用户列表
    USER_GET_ALL_USER: 'user/getAllUser',  //审核通过用户列表
    USER_CHECK_USER_BY_ID: 'user/checkUserById',// 用户详情获取
    USER_CHANGEPWD: 'user/updatePassword',
    USER_GET_KILL_USER:'user/getKillUser', //用户审核被拒绝列表
    USER_CHANGE_STATUS:'user/changeStatus', //账号起停用状态
    USER_CHECK_USER_BY_USERNAME:'user/checkUserByUsername', //用户状态搜索
    USER_CHANGE_MONEY:'user/changeMoney', //余额充值
    USER_GET_DEPOSIT_RECORD: "user/getAllOrder", // 充值记录
    USER_GET_RECHANGE_WAY: "user/getRechangeWay", // 充值方式
    USER_UPDATE_CHAREG_MONEY:'user/updateChargeMoney', //单次下载收费金额

    
    // apps
    PACKAGE_GET_ALL_PACKAGE: 'package/getAllPackage',
    PACKAGE_GET_PACKAGE_BY_ID: 'package/getPackageById',
    PACKAGE_UPLOAD_PACKAGE: 'package/uploadPackage',
    PACKAGE_UPDATE_TOTAL_COUNT_BY_ID: 'package/updateTotalCountById',
    PACKAGE_RESET_TOTAL_COUNT_BY_ID: 'package/resetTotalCountById',
    PACKAGE_DELETE_BY_ID: 'package/deleteById',
    PACKAGE_GET_UPDATE_RECORD_BY_ID: "package/getUpdateDetails", // 更新记录
    PACKAGE_UPLOAD_APK: "package/uploadPackageApk", // 上传apk
    
    // account
    APPLE_GET_ALL_APPLE_ACCOUNTS: 'apple/getAllAppleAccounts',
    APPLE_INSERT_APPLE_ACCOUNT: 'apple/insertAppleAccount',
    APPLE_DELETE_BY_ID: 'apple/deleteById',
    APPLE_UPLOAD_P12: 'apple/uploadP12',
    // 设备列表
    DEVICE_GET_ALL_BY_APPLE_ID: 'device/getAllByAppleId',
    DEVICE_GET_ALL_DEVICE: "device/getAllDevice", //设备列表搜索
    DEVICE_GET_DOWNLOAD_BY_ID: "device/getPackageId", // 下载记录
    DEVICE_DELECT_DEVICE: "device/delectDevice", //清除设备







}