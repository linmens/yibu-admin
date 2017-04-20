<template>
<div class="login-wrapper" transition="loginslide">
    <div class="header">

    </div>
    <div class="body">
        <div class="-title">
            江湖人的江湖
        </div>
        <div class="-name">
            <label>群昵称：</label>
            <input type="text" v-model="name" placeholder="10字以内">
        </div>
        <div class="-weichat">
            <label>微信号：</label>
            <input type="text" v-model="weichat" placeholder="方便私聊（选填）">
        </div>
        <div class="-login">
            <span class="-btn" @click="isLogin">登录</span>
        </div>
    </div>
    <div class="foot">
        <span>@<a href="http://www.redream.cn">redream</a>,你说，远方有什么？</span>
        <span>(没钱验证微信号，在浏览器打开可消除微信安全提示)</span>

    </div>
</div>
</template>

<script>
import CHAT from '../api/client'
import {
    randomColor,
    genUid
} from '../util/index'
export default {
    data() {
        return {
            name: '',
            color: '',
            weichat: ''
        }
    },
    ready() {

    },
    methods: {
        send(msg) {
            CHAT.submit(msg)
            this.msg = ''
            console.log(CHAT)
        },

        isLogin: function() {
            if (!this.name.trim()) {
                alert("昵称不能为空！")
                return
            }

            // var uid = ('userid', genUid())
            // var user = {username:this.name,userid:uid}
            // this.$store.commit('isLogin',user);
            // this.$socket.emit('login',user);
            this.name = this.name.slice(0, 10)
            // if (localStorage) {
            //     //  localStorage.setItem('name',this.name)
            //     //  localStorage.setItem('color',randomColor())
            //     //  localStorage.setItem('weichat',this.weichat)
            //     //  localStorage.setItem('userid',genUid())
            //
            // }
            this.$cookie.set('username', this.name);
            this.$cookie.set('color', randomColor());
            this.$cookie.set('weichat', this.weichat);
            this.$cookie.set('userid', genUid());

            // console.log(localStorage);

            //  console.log(this.$cookie);
            CHAT.init(this.name)
            // this.userid = localStorage.getItem('userid');
            // this.username = localStorage.getItem('name');
            this.$router.push('/goods')

            // store.commit('SOCKET_CONNECT')

            // this.name = this.name.slice(0, 10)

            // CHAT.init(this.name)
        },
        hasLogin:function(){
          CHAT.init()
        }
    },
      mounted() {
        if(this.$cookie.get('username')!=null){
          console.log(this.$cookie.get('username'));
          CHAT.init()
        }
      }
}
</script>
