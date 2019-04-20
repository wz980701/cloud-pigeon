<template>
    <div>
        <router-link class="h_head" to="/my" tag="div">
            <i class="iconfont icon-l_arrow"></i>
            <p>配送地址修改</p>
        </router-link>
        <textarea
        placeholder="say something~"
        class="content"
        rows="3"></textarea>
        <input type="button" value="提交" class="btn">
    </div>
</template>
<script>
export default {
    name: 'Help',
    methods: {
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/base.scss';
@import 'sass/mixin.scss';
.h_head {
        @include wh(100%, .5rem);
        display: flex;
        line-height: .5rem;
        background-color: $theme-color;
        color: #ffffff;
        .iconfont {
            margin-left: .1rem;
        }
        p {
            margin-left: .2rem;
        }
}
.content {
    display: block;
    @include wm(80%);
    @include border-1px(#ccc);
    margin-top: .4rem;
    @include borderRadius(.05rem);
    padding-left: .1rem;
}
.btn {
    display: block;
    @include wm(80%);
    @include hl(.35rem);
    font-size: .14rem;
    background-color: #ffffff;
    @include border-1px(#ccc);
    @include borderRadius(.05rem);
    margin-top: .2rem;
}
</style>
