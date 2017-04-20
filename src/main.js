import babelpolyfill from 'babel-polyfill'

import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueClipboards from 'vue-clipboards'
import VueRouter from 'vue-router'
import routes from './routes'
import VueResource from 'vue-resource';
import iView from 'iview';
import 'iview/dist/styles/iview.css'; // 使用 CSS
// import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client'
import VueCookie from 'vue-cookie'
var VueEditable= require('../plugins/vue-editable.js');
Vue.use(VueEditable);
import store from './vuex/mystore'
// import VueWebsocket from "vue-websocket";
// Vue.use(VueSocketio, 'http://localhost:3000', store);
// Vue.use(VueSocketio, 'websocket.a10store.com:3000');
// Vue.use(VueWebsocket, "ws://yibu.a10store.com:3000");
const router = new VueRouter({
    routes
})

Vue.use(VueRouter)
Vue.use(VueCookie);
Vue.use(iView)
Vue.use(VueClipboards)
Vue.use(VueResource);
// 全局导航钩子
router.beforeEach((to, from, next) => {
    // var js = io.connect('ws://localhost:3000')

    if (to.meta.requireAuth) {
        console.log(isEmptyObject(VueCookie.get('username')));
        if (!isEmptyObject(VueCookie.get('username'))) {
            next();
        } else {
            console.log(window.location.href);
            // if(window.location.href!='http://localhost:8081/#/'){
            //   	next({
            //   		path: '/login',
            //               query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            //           })
            // }
            // window.location.href= 'http://yibu.a10store.com'
            next();
        }
    } else {
        next();
    }
})


function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}


new Vue({
    //el: '#app',
    //template: '<App/>',
    // sockets:{
    //    connect: function(){
    //      console.log('socket connected')
    //    },
    //    login: function(val){
    //      console.log(val);
    //      store.commit('isLogin',val);
    //
    //    },
    //    logout:function (log) {
    //      console.log(log);
    //    }
    //  },
    router,
    store,
    mounted() {},
    //components: { App }
    render: h => h(App)
}).$mount('#app')
