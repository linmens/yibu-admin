import Home from './page/home.vue'
import Jixiao from './page/jixiao.vue'
import Goods from './page/goods.vue'
import Page4 from './page/nav2/Page4.vue'
import Page5 from './page/nav2/Page5.vue'
import Login from './page/login.vue'
import Main from './page/Main.vue'
let routes = [

    {
        path: '/',
        component: Home,
        name: '客服管理',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        iconCls: 'el-icon-message', //图标样式class
        children: [{
                path: '/jixiao',
                component: Jixiao,
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                name: '客服绩效'
            },
            {
                path: '/main',
                component: Main,
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                name: '主页',
                hidden: true
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        iconCls: 'el-icon-message', //图标样式class
        children: [{
            path: '/goods',
            component: Goods,
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            name: '商品信息维护'
        }]
    },
    {
        path: '/login',
        component: Login
    },

]
export default routes;