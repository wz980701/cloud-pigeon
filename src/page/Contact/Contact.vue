<template>
    <div class="c_page">
        <router-link class="c_head" to="/my" tag="div">
            <i class="iconfont icon-l_arrow"></i>
        </router-link>
        <section class="c_logo">
            <img src="../../common/images/logo.png" alt="logo">
        </section>
        <h2 class="c_name">云鸽校园</h2>
        <p class="c_email">联系邮箱：<span>Ygxyfwtd@126.com</span></p>
    </div>
</template>
<script>
export default {
    name: 'Contact'
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
    }
    .c_email {
        margin-top: .3rem;
        font-size: .14rem;
        box-sizing: border-box;
        width: 100%;
        @include hl(.4rem);
        background-color: #ffffff;
        @include fj;
        padding: 0 .1rem;
    }
}
</style>