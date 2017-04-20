<template>
  <div class="head-wrapper">
    <div class="-left">
      <a href="http://mp.weixin.qq.com/s?__biz=MzAwMjAzNDU1NQ==&mid=401448725&idx=1&sn=2247d58a5c75e237b0d5f9f14ff42e56#rd">
        <i class="iconfont icon-keaide"></i>
      </a>
      <a href="http://www.redream.cn/main/treehole.php">
        <i class="iconfont icon-tree"></i>
      </a>
    </div>
    <div class="-mid">
      <p class="group-name">江湖人的江湖({{CHAT.onlineCount}})</p>
    </div>
    <div class="-right"  >
      <i class="iconfont icon-group"></i>
    </div>

  </div>
</template>

<script>
import Login from './login'
import CHAT from '../api/client'
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: '',
      CHAT:CHAT,

    }
  },
  ready(){
    console.log(11,CHAT.onlineCount)
  },
  components: {
    Login
  },
}
</script>
