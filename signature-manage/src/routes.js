
const routes = [
    {
        name: "开始",
        icon: "home",
        path: "/",
    },
    {
        name: "账号管理",
        icon: "idcard",
        path: "/account",
        exact: true,
        level: 1,
        children: [
            {
                name: "账号列表",
                path: "/account/list",
            },
            {
                name: "添加账号",
                path: "/account/new",
                showBackBtn: true,
            },
            {
                name: "设备列表",
                path: '/account/detail',
                showBackBtn: true,
                hideInMenu: true,
            }
        ]
    },
    {
        path: "/apps",
        name: "应用管理",
        icon: "appstore",
        children: [
            {
                path: "/apps/list",
                name: "应用列表",
            },
            {
                path: "/apps/detail",
                name: "应用详情",
                hideInMenu: true,
                showBackBtn: true,

            },
            {
                path: "/apps/new",
                name: "添加应用",
                hideInMenu: true,
                showBackBtn: true,

            },
            {
                path: "/apps/android",
                name: "安卓上传",
                hideInMenu: true,
                showBackBtn: true,

            },

            {
                path: "/apps/updateRecord",
                name: "版本更新记录",
                hideInMenu: true,
                showBackBtn: true,

            },
            {
                path: "/apps/downloadInfo",
                name: "下载详情",
                hideInMenu: true,
                showBackBtn: true,

            },
            {
                path: "/apps/depositRecord",
                name: "充值记录",
                hideInMenu: true,
            },

        ]
    },
    {
        path: "/verification",
        name: "用户管理",
        icon: "team",
        level: 1,
        exact: true,
        children: [
            {
                path: "/verification",
                name: "用户管理",
                hideInMenu: true
            },
            {
                path: "/verification/deviceList",
                name: "设备列表",
                hideInMenu: true,
                showBackBtn: true,
                // back: {
                //     pathname: '/verification',
                //     state: {
                //         tab: "1"
                //     }
                // }
            }
        ]
    }
]

export default routes;