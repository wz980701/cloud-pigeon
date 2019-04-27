<template>
    <header class="head">
        <slot name="exit"></slot>
        <section class="head_center" v-if="center">
            {{center}}
        </section>
        <section class="head_goBack" @click="$router.go(-1)" v-if="goBack">
            <i class="iconfont icon-l_arrow"></i>
            <p>{{goBack}}</p>
        </section>
        <section class="head_home" v-if="home">
            <div class="h_img">
                <img src="../../images/head.jpg" alt="head">
            </div>
            <div class="h_location">
                <p>{{home}}</p>
            </div>
        </section>
    </header>
</template>
<script>
export default {
    name: 'Header',
    props: ['home', 'goBack', 'center']
}
</script>
<style lang="scss" scoped>
@import 'sass/base.scss';
@import 'sass/mixin.scss';
@import 'sass/common.scss';

.head {
    @include wh(100%, $head-height);
    line-height: $head-height;
    color: $font-color;
    background-color: $theme-color;
    .head_center {
        text-align: center;
    }
    .head_goBack {
        display: flex;
        .iconfont {
            margin-left: .1rem;
        }
        p {
            margin-left: .2rem;
        }
    }
    .head_home {
        display: flex;
        .h_img {
            width: .35rem;
            height: .35rem;
            margin: {
                top: .075rem;
                left: .1rem;
                right: .1rem;
            }
            position: relative;
            overflow: hidden;
            @include borderRadius(50%);
            img {
                @include wh(100%, 100%);
                @include pi(0, 0);
            }
        }
    }
}
</style>
