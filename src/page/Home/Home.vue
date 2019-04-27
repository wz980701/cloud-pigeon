<template>
    <div class="h_page">
        <head-top :home="area"></head-top>
        <van-swipe :autoplay="3000" class="h_swiper">
            <van-swipe-item>
                <img src="../../common/images/swiper_1.jpg">
            </van-swipe-item>
            <van-swipe-item>
                <img src="../../common/images/swiper_2.jpg">
            </van-swipe-item>
        </van-swipe>
        <section class="h_content">
            <router-link to="/shop" class="h_fourth" tag="div">
                <div class="img_wrapper">
                    <img src="../../common/images/food.svg" alt="food">
                </div>
                <p>第四食堂</p>
            </router-link>
        </section>
        <footer-bottom :currentIndex="0"></footer-bottom>
    </div>
</template>
<script>
import footerBottom from 'components/Footer/Footer.vue'
import headTop from 'components/Header/Header.vue'
import { getSessionStore } from 'js/common.js'

export default {
    name: 'Home',
    data () {
        return {
            area: '未选定'
        }
    },
    mounted () {
        this.area = JSON.parse(getSessionStore('user_info')).district //获取用户所在区域
    },
    components: {
        footerBottom,
        headTop
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
.h_page {
    background-color: $background-color;
    height: 100%;
    .h_swiper {
        height: 2rem;
        .van-swipe-item {
            position: relative;
            width: 100%;
            height: 100%;
            img {
                @include pi(0, 0);
                @include wh(100%, 100%);
            }
        }
    }
    .h_content {
        .h_fourth {
            margin-top: .2rem;
            margin-left: .2rem;
            width: 25%;
            text-align: center;
            .img_wrapper {
                @include wh(.5rem, .5rem);
                overflow: hidden;
                @include borderRadius(50%);
                @include cl;
                background-color:chocolate;
                position: relative;
                img {
                    @include wh(75%, 75%);
                    @include cl;
                    margin-top: .05rem;
                }
            }
            p {
                margin-top: .05rem;
                color: $black-color;
            }
        }
    }
}
</style>
