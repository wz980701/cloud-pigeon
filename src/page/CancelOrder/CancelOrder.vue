<template>
    <div class="co_page" ref="co_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-loading v-show="!isInit" class="ao_loading"></van-loading>
                <ul class="co_list" ref="co_list">
                <li
                is="orderItem"
                v-for="(item, index) in cancelOrderList"
                :key="index"
                :data="item"
                cancel="已取消"
                >
                </li>
            </ul>
        </van-pull-refresh>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import orderItem from 'components/Item/Item.vue'
import { RouteTo, setSessionStore, _initList, hideMenu } from 'js/common.js'
import { orderList } from 'js/api.js'
import { PullRefresh, Loading } from 'vant'

Vue.use(PullRefresh)
Vue.use(Loading)

export default {
    name: 'CancelOrder',
    data () {
        return {
            isInit: false,
            isLoading: false,
            cancelOrderList: [],
            params: null
        }
    },
    created () {
            hideMenu()
            this.params = {
                status: '已取消'
            }
            orderList(this.params).then((res) => {
                this.cancelOrderList = _initList(res)
                this.isInit = true
            })
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
            })
    },
    methods: {
        _initScroll () {
            this.co_page = new BScroll(this.$refs.co_page, {
                click: true
            })
        },
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                orderList(this.params).then((res) => {
                this.cancelOrderList = _initList(res)
            }).catch((err) => {
                alert(err)
            })
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
            })
            }, 500)
        },
        ToDetail (index) {
            setSessionStore('order_id', this.cancelOrderList[index].serial_id)
            this.$router.push('/orderDetail')
        },
        RouteTo: RouteTo
    },
    components: {
        orderItem
    }
}
</script>
<style lang="scss" scoped>
.co_page {
    position: absolute;
    top: 1.1rem;
    bottom: .6rem;
    width: 100%;
    overflow: hidden;
        .co_list {
        width: 85%;
        margin: 0 auto;
        min-height: 5rem;
    }
}
</style>