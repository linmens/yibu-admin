<template>
  <div id="app">
    <transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'app',
	components: {
	}

}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
