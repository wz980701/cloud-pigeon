<template>
    <div class="m_page">
        <header class="m_head">
            我的云鸽
        </header>
        <section class="m_info">
            <div class="img_wrapper">
                <img src="../../common/images/head.jpg" alt="user_head">
            </div>
            <div class="content">
                <p class="userName">{{userName}}</p>
                <router-link
                to="/userInfo"
                tag="div"
                class="userInfo"
                >
                个人信息
                <i class="iconfont icon-r_arrow"></i>
                </router-link>
            </div>
        </section>
        <ul class="m_list">
            <li
            class="m_item"
            v-for="(item, index) in myList"
            :key="index"
            @click="ToSetting(index)"
            >
                <i :class="item.class"></i>
                {{item.text}}
            </li>
        </ul>
        <footer-bottom :currentIndex="2"></footer-bottom>
    </div>
</template>
<script>
import footerBottom from 'components/Footer/Footer.vue'
import { Dialog } from 'vant'
import { getSessionStore } from 'js/common.js'

export default {
    name: 'My',
    data () {
        return {
            myList: [
                { class: 'iconfont icon-location', text: '配送地修改' },
                { class: 'iconfont icon-help', text: '帮助与反馈' },
                { class: 'iconfont icon-service', text: '客服中心' },
                { class: 'iconfont icon-shop', text: '商家入驻' },
                { class: 'iconfont icon-cooperation', text: '我要合作' },
                { class: 'iconfont icon-user', text: '云鸽招募' },
                { class: 'iconfont icon-about', text: '关于我们' },
                { class: 'iconfont icon-about', text: '退出登录' }
            ],
            userName: ''
        }
    },
    mounted () {
        this.userName = JSON.parse(getSessionStore('user_info')).name
    },
    components: {
        footerBottom
    },
    methods: {
        ToSetting(index) {
            if (index == 0) {
                this.$router.push('/modifyLocation')
            } else if (index == 7) {
                Dialog.confirm({
                    message: '确认退出登录吗？'
                }).then(() => {
                    this.axios.get('/logout').catch(() => {
                        Dialog.alert({
                            message: '退出登录失败'
                        })
                    })
                    this.$router.push('/studentLogin')
                }).catch(() => {
                    return
                })
            } else if (index == 1) {
                this.$router.push('/help')
            } else {
                this.$router.push('/contact')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/base.scss';
@import 'sass/mixin.scss';
.m_page {
    background-color: $background-color;
    height: 100%;
    .m_head {
        @include wh(100%, .5rem);
        line-height: .5rem;
        text-align: center;
        color: $font-color;
        background-color: $theme-color;
    }
    .m_info {
        width: 100%;
        height: 1rem;
        background-color: #ffffff;
        margin-bottom: .2rem;
        display: flex;
        position: relative;
        .img_wrapper {
            width: .6rem;
            height: .6rem;
            margin-left: .2rem;
            @include ct;
            position: relative;
            @include borderRadius(50%);
            overflow: hidden;
            img {
                @include wh(100%, 100%);
                @include pi(0, 0);
            }
        }
        .content {
            margin-left: .2rem;
            .userName {
                font-size: .18rem;
                margin-top: .2rem;
            }
            .userInfo {
                font-size: .14rem;
                margin-top: .1rem;
                color: #455a64;
            }
        }
    }
    .m_list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .m_item {
            box-sizing: border-box;
            width: 50%;
            text-align: center;
            background-color: #ffffff;
            border-bottom: 1px solid #f2f3f4;
            font-size: .14rem;
            @include hl(.4rem);
            .iconfont {
                margin-right: .1rem;
            }
            &:nth-child(even) {
                border-right: 1px solid #f2f3f4;
            }
            &:first-child, &:last-child {
                width: 100%;
                margin: {
                    top: .1rem;
                    bottom: .1rem;
                }
                text-align: left;
                padding-left: .4rem;
            }
        }
    }
}
</style>
<style scoped>
@import 'http://at.alicdn.com/t/font_1126811_7gmlbed24xd.css';
</style>