<template>
    <div class="o_page">
        <head-top center="我的订单"></head-top>
        <div class="o_tab">
            <div
            class="o_tab-item"
            v-for="(item, index) in tabList"
            :key="index"
            @click="ToActive(index)"
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
        <footer-bottom :currentIndex="1" @changeActive="ToActive(0)"></footer-bottom>
    </div>
</template>
<script>
import footerBottom from 'components/Footer/Footer.vue'
import headTop from 'components/Header/Header.vue'

export default {
    name: 'Order',
    data () {
        return {
            orderList: [],
            tabList: [
                { path: '/askOrder', text: '未接单', active: true },
                { path: '/waitOrder', text: '已接单', active: false },
                { path: '/cancelOrder', text: '已取消', active: false },
                { path: '/finishOrder', text: '已完成', active: false }
            ]
        }
    },
    methods: {
        ToActive (index) {
            this.tabList.forEach((item) => {
                item.active = false
            })
            this.tabList[index].active = true
        }
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
.o_page {
    background-color: $background-color;
    height: 100%;
    // .o_head {
    //     @include wh(100%, .5rem);
    //     line-height: .5rem;
    //     text-align: center;
    //     color: $font-color;
    //     background-color: $theme-color;
    // }
    .o_tab {
        background-color: #ffffff;
        display: flex;
        @include wh(100%, .4rem);
        line-height: .4rem;
        .o_tab-item {
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
