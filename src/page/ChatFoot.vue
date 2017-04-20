<template>
  <div class="foot-wrapper">
    <input class="chat-input" type="text" name="" @keyup.enter="send(msg)" v-model="msg">
    <span class="chat-sub" :class="{'primary':!!msg}"  @click="send(msg)">发送</span>
  </div>
</template>

<script>
import CHAT from '../api/client'
export default {
  data () {
    return {
      msg:''
    }
  },
  ready(){
    CHAT.init()
     console.log(CHAT,'ww')
  },
  methods:{
    send(msg){
      CHAT.submit(msg)
      this.msg=''
      console.log(CHAT)
    }
  }
}
</script>
