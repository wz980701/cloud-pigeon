<template>
    <div>
        <head-top goBack="帮助与反馈"></head-top>
        <textarea
        placeholder="say something~"
        class="content"
        rows="3"></textarea>
        <input type="button" value="提交" class="btn">
    </div>
</template>
<script>
import headTop from 'components/Header/Header.vue'

export default {
    name: 'Help',
    methods: {
    },
    components: {
        headTop
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
