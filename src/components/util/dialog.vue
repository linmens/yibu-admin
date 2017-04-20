<template>
<div class="dialog-mask" transition="enter" @click="close">
	<div class="dialg-wrap">
		<slot></slot>
	</div>
</div>
</template>
<script>
export default{
	data(){
		return {

		}
	},
	ready(){
	},
	components: {
  },
  props:{
  	'fastClose':{
  		type:Boolean,
  		default:false
  	}
  },
  methods:{
  	close(){
  		if (this.fastClose) {
  			this.$router.go(-1)
  		}
  	},
  }
}
</script>
