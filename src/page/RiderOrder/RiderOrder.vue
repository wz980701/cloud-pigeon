<template>
    <div class="ro_page">
        <header class="ro_head">
            我的订单
            <i class="iconfont icon-quit" @click="ToExit"></i>
        </header>
        <div class="ro_tab">
            <div
            class="ro_tab-item"
            v-for="(item, index) in tabList"
            :key="index"
            @click="ToActive(tabList, index)"
            >
                <router-link
                :to="item.path"
                :class="{ active: item.active }"
                >{{item.text}}</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import { Dialog } from 'vant'

export default {
    name: 'Order',
    data () {
        return {
            params: null,
            tabList: [
                { path: '/askRiderOrder', text: '未接单', active: true },
                { path: '/waitRiderOrder', text: '未送达', active: false },
                { path: '/pastRiderOrder', text: '已送达', active: false }
            ]
        }
    },
    methods: {
        ToActive (list, index) {
            list.forEach((item) => {
                item.active = false
            })
            list[index].active = true
        },
        ToExit () {
            Dialog.confirm({
                message: '确认退出登录吗？'
            }).then(() => {
                this.axios.get('/logout').catch(() => {
                    Dialog.alert({
                        message: '退出登录失败'
                    })
                })
                this.$router.push('/riderLogin')
            }).catch(() => {
                return
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
.ro_page {
    background-color: $background-color;
    height: 100%;
    .ro_head {
        @include wh(100%, .5rem);
        line-height: .5rem;
        text-align: center;
        color: $font-color;
        background-color: $theme-color;
        position: relative;
        .iconfont {
            font-size: .2rem;
            color: #ffffff;
            position: absolute;
            @include ct;
            right: .2rem;
        }
    }
    .ro_tab {
        background-color: #ffffff;
        display: flex;
        @include wh(100%, .4rem);
        line-height: .4rem;
        .ro_tab-item {
            flex: 1;
            text-align: center;
            a {
                display: block;
                font-size: .14rem;
                color: rgb(77, 85, 93);
                &.active {
                    font-size: .14rem;
                    color: $theme-color;
                }
            }
        }
    }
}
</style>
<style scoped>
@import 'http://at.alicdn.com/t/font_1126811_vgqeo7rnu88.css';
</style>
