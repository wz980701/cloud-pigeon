<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
			<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
  </div>
</template>

<script>
export default {
	name: 'app',
	created () {
		const height = document.documentElement.clientHeight
		window.onload = () => {
			document.getElementById('app').style.height = `${height}px`
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'sass/mixin.scss';
#app {
	@include wh(100%, 100%)
}
.router-fade-enter-active, .router-fade-leave-active {
	transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
	opacity: 0;
}
</style>
