<template>
<div class="group-info-body-wrap">
	<div class="-bar"></div>
	<div class="-members" >
		<div class="-member" v-for="userObj in CHAT.onlineUsers" @click="showWeiChat(userObj)">
			<span class="-header" :style="{'background-color':userObj.color}">
				{{userObj.username.slice(-1)}}
			</span>
			<span class="-name">
				{{userObj.username.slice(0,4)}}
			</span>
		</div>
		<!-- 占位 -->
		<div class="-member" v-for="i in 9">
		</div>
	</div>
	<div class="-bar"></div>
	<div class="-self">
		<div class="-title">
			我在本群的信息
		</div>
		<div class="-info">
			<span class="-header" :style="{'background-color':color}"></span>
			<span class="-name">{{name}}</span>
			<span class="-modify" @click="show()">修改</span>
		</div>
		<div class="-notice">
			<span>
				点击头像可获取成员微信号。关注公众号<a href="http://mp.weixin.qq.com/s?__biz=MzAwMjAzNDU1NQ==&mid=401448725&idx=1&sn=2247d58a5c75e237b0d5f9f14ff42e56#rd">redream</a>回复“聊天”进入。@<a href="https://github.com/secreter/websocket_chat">github</a>
			</span>
		</div>
	</div>
	<div class="-bar"></div>
	<div class="-del" @click="del()">删除并退出</div>
	<div class="-bar"></div>
	<div class="-bar"></div>
</div>
<!-- <dialog v-if="isShow" :fast-close="false">
	<div class="modify-box">
		<div class="-header" @click="changeColor()">
			<span class="-img" :style="{'background-color':color}"></span>
			<span class="-notice">点击更换颜色</span>
		</div>
		<div class="-name">
			<label>群昵称：</label>
			<input type="text" v-model="name" placeholder="10字以内">
		</div>
		<div class="-weichat">
			<label>微信号：</label>
			<input type="text"v-model="weichat" placeholder="方便私聊（选填）">
		</div>
		<div class="-save">
			<span class="-btn" @click="save()">保存</span>
		</div>
	</div>
</dialog> -->
<!-- <dialog v-else-if="isShowF">
	<div class="f-info">
		<div class="-name">
			<label>群昵称：</label>
			<input disabled="true" type="text" v-model="fname" placeholder="">
		</div>
		<div class="-weichat">
			<label>微信号：</label>
			<input disabled="true" type="text"v-model="fweichat" placeholder="不告诉你，群里自己要">
		</div>
		<div class="-save">
			<span class="-btn" @click="closeF()">关闭</span>
		</div>
	</div>
</dialog> -->

</template>
<script>
import CHAT from '../api/client'
// import dialog from './util/dialog'
import {randomColor} from '../util/index'
export default{
	data(){
		return {
			CHAT:CHAT,
			color: localStorage.getItem('color')||"#666",
			name: 'redream',
			weichat:'redream',
			isShow:false,
			fname: 'redream',
			fweichat:'redream',
			isShowF:false,

		}
	},
	ready(){
		console.log(CHAT.onlineUsers,99)
		if(!localStorage){
			alert('不支持本地保存')
			return
		}
		if(localStorage.getItem('name'))
			this.name=localStorage.getItem('name')
		if(localStorage.getItem('color'))
			this.color=localStorage.getItem('color')
		if(localStorage.getItem('weichat'))
			this.weichat=localStorage.getItem('weichat')
	},

	methods:{
		changeColor(){
			this.color=randomColor()
			localStorage.setItem('color',this.color)
		},
		save(){
			this.name=this.name.slice(0,10)
			if (localStorage) {
				localStorage.setItem('name',this.name)
				localStorage.setItem('color',this.color)
				localStorage.setItem('weichat',this.weichat)
			}
			this.isShow=false
			this.CHAT.changeInfo()
		},
		show(){
			this.isShow=true
		},
		del(){
			if (localStorage) {
				localStorage.removeItem('name')
				localStorage.removeItem('userid')
				localStorage.removeItem('color')
				localStorage.removeItem('weichat')
			}
			this.CHAT.logout()
			this.$router.go('/login')
		},
		showWeiChat(userObj){
			console.log(userObj)
			this.fname=userObj.username
			this.fweichat=userObj.weichat
			this.isShowF=true
		},
		closeF(){
			this.isShowF=false
		}
	}
}
</script>
