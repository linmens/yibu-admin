import Home from './page/home.vue'
import Jixiao from './page/jixiao.vue'
import Goods from './page/goods.vue'
import Page4 from './page/nav2/Page4.vue'
import Page5 from './page/nav2/Page5.vue'
import Login from './page/login.vue'
import Main from './page/Main.vue'
import Yinxiao from './page/yingxiao/execl.vue'
import Gongju from './page/all/gongju.vue'
import Skus from './page/goods/skus.vue'

let routes = [

    {
        path: '/',
        component: Home,
        name: '客服管理',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        iconCls: 'person-stalker', //图标样式class
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
        iconCls: 'ios-box-outline', //图标样式class
        children: [{
            path: '/goods',
            component: Goods,
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            name: '商品信息维护'
        },
        {
            path: '/sku',
            component: Skus,
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            name: 'sku信息维护'
        }
      ]
    },
    {
        path: '/',
        component: Home,
        name: '营销中心',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的<Icon type=""></Icon>
            requireAuth: true,
        },
        iconCls: 'ios-pricetags-outline', //图标样式class
        children: [{
            path: '/yingxiao',
            component: Yinxiao,
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            name: '导出数据'
        }]
    },
    {
        path: '/',
        component: Home,
        name: '所有工具',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        iconCls: 'android-arrow-back', //图标样式class
        children: [{
            path: '/all',
            component: Gongju,
            meta: {
                // 添加该字段，表示进入这个路由是需要登录的
                requireAuth: true,
            },
            name: '录入数据'
        }]
    },
    {
        path: '/login',
        component: Login,
          hidden: true
    },

]
export default routes;
