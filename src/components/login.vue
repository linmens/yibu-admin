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
        <input type="text"v-model="weichat" placeholder="方便私聊（选填）">
      </div>
      <div class="-login">
        <span class="-btn" @click="login()">登录</span>
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
import {randomColor,genUid} from '../util/index'
export default {
  data () {
    return {
      name:'',
      color:'',
      weichat:''
    }
  },
  ready(){

  },
  methods:{
    send(msg){
      CHAT.submit(msg)
      this.msg=''
      console.log(CHAT)
    },
    login(){
      if (!this.name.trim()) {
        alert("昵称不能为空！")
        return
      }
      this.name=this.name.slice(0,10)
      if (localStorage) {
        localStorage.setItem('name',this.name)
        localStorage.setItem('color',randomColor())
        localStorage.setItem('weichat',this.weichat)
        localStorage.setItem('userid',genUid())
      }
      CHAT.init(this.name)
      this.$router.go('/goods')
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
