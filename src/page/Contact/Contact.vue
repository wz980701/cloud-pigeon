<template>
    <div class="c_page">
        <head-top goBack=" "></head-top>
        <section class="c_logo">
            <img src="../../common/images/logo.png" alt="logo">
        </section>
        <h2 class="c_name">云鸽校园</h2>
        <p class="c_text">联系邮箱：<span>Ygxyfwtd@126.com</span></p>
        <p class="c_text">微信：<span>Skr_003</span></p>
    </div>
</template>
<script>
import headTop from 'components/Header/Header.vue'

export default {
    name: 'Contact',
    components: {
        headTop
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/base.scss';
@import 'sass/mixin.scss';
.c_page {
    background-color: $background-color;
    @include wh(100%, 100%);
    text-align: center;
    .c_head {
        @include wh(100%, .5rem);
        display: flex;
        line-height: .5rem;
        background-color: $theme-color;
        color: #ffffff;
        .iconfont {
            margin-left: .1rem;
        }
    }
    .c_logo {
        @include wh(1.2rem, 1.2rem);
        @include cl;
        position: relative;
        background-color: $theme-color;
        @include borderRadius(50%);
        margin-top: .4rem;
        margin-bottom: .2rem;
        img {
            @include wh(80%, 80%);
            @include pi(10%, 10%);
        }
    }
    .c_name {
        color: #333;
        margin-bottom: .3rem;
    }
    .c_text {
        font-size: .14rem;
        box-sizing: border-box;
        width: 100%;
        @include hl(.4rem);
        background-color: #ffffff;
        @include fj;
        padding: 0 .1rem;
        border-bottom: 1px solid #f2f3f4;
    }
}
</style>