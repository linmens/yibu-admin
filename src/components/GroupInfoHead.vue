<template>
<div class="group-info-head-wrap">
	<div class="-left" >
    <i class="iconfont icon-back"></i>
  </div>
  <div class="-mid">
    <p class="group-name">江湖人的江湖({{CHAT.onlineCount}})</p>
  </div>
  <div class="-right" @click="open()" >
    <i class="iconfont icon-share"></i>
  </div>
</div>

</template>
<script>
import CHAT from '../api/client'
// import dialog from './util/dialog'
export default{
	data(){
		return {
			CHAT:CHAT,
			isShare:false
		}
	},
	ready(){

	},
	
	methods:{
		open(){
			this.isShare=true
		},
		close(){
			this.isShare=false
		},
	}
}
</script>
