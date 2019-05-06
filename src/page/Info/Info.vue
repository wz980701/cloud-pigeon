<template>
    <div class="i_page">
        <head-top goBack="个人信息"></head-top>
        <ul class="i_list">
            <li class="i_head">
                <p>头像</p>
                <div class="img_wrapper">
                    <img src="../../common/images/head.jpg" alt="head">
                </div>
            </li>
            <li class="i_name">
                <p>昵称</p>
                <p class="content">{{name}}</p>
            </li>
            <li class="i_phone">
                <p>手机号码</p>
                <p class="content">{{phone}}</p>
            </li>
            <li class="i_district">
                <p>地址</p>
                <p class="content">{{district}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import headTop from 'components/Header/Header.vue'
import { getSessionStore, hideMenu } from 'js/common.js'

export default {
    name: 'Info',
    data () {
        return {
            name: '',
            phone: '',
            district: ''
        }
    },
    created () {
        hideMenu()
    },
    mounted () {
        this._getInfo()
    },
    methods: {
        _getInfo () {
            const data = JSON.parse(getSessionStore('user_info'))
            this.name = data.name
            this.phone = data.phone
            this.district = `${data.district}${data.dormtype}${data.building}栋${data.dorm}`
        }
    },
    components: {
        headTop
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
.i_page {
    background-color: $background-color;
    @include wh(100%, 100%);
    .i_list {
        background-color: #ffffff;
        li {
            border-bottom: 1px solid #f2f3f4;
            @include fj;
            padding: 0 .2rem;
            @include hl(.45rem);
            .content {
                font-size: .14rem;
                color: #797D7F;
            }
        }
        .i_head {
            @include hl(.7rem);
            .img_wrapper {
                margin-top: .1rem;
                @include wh(.5rem, .5rem);
                overflow: hidden;
                @include borderRadius(.1rem);
                position: relative;
                img {
                    @include wh(100%, 100%);
                    left: 0;
                    top: 0;
                    position: absolute;
                }
            }
        }
    }
}
</style>