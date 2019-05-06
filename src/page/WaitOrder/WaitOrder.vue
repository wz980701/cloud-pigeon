<template>
    <div class="wo_page" ref="wo_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-loading v-show="!isInit" class="wo_loading"></van-loading>
                <ul class="wo_list" ref="wo_list">
                    <li
                    is="order-item"
                    v-for="(item, index) in allOrderList"
                    :data="item"
                    wait="已接单"
                    :key="index"
                    @ToConfirmOrder="ToConfirmOrder(index)"
                    >
                    </li>
            </ul>
        </van-pull-refresh>
    </div>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import orderItem from 'components/Item/Item.vue'
import { RouteTo, setSessionStore, _initList, hideMenu } from 'js/common.js'
import { orderList, confirm } from 'js/api.js'
import { PullRefresh, Loading, Dialog } from 'vant'

Vue.use(PullRefresh)
Vue.use(Loading)

export default {
    name: 'WaitOrder',
    data () {
        return {
            isInit: false,
            isLoading: false,
            allOrderList: [],
            params: null
        }
    },
    created () {
            hideMenu()
            this.params = {
                status: '已接单'
            }
            orderList(this.params).then((res) => {
                this.allOrderList = _initList(res)
                this.isInit = true
            }).catch(() => {
                Dialog.alert({
                    message: '获取列表错误'
                })
            })
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
            })
    },
    methods: {
        _initScroll () {
            this.wo_page = new BScroll(this.$refs.wo_page, {
                click: true
            })
        },
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                orderList(this.params).then((res) => {
                this.allOrderList = _initList(res)
                setSessionStore('all_list', JSON.stringify(this.allOrderList))
                this.isInit = true
            }).catch((err) => {
                alert(err)
            })
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
            })
            }, 500)
        },
        ToConfirmOrder(index) {
            Dialog.confirm({
                message: '确认已送达吗？'
            }).then(() => {
                const params = {
                    serial_id: this.allOrderList[index].serial_id
                }
                confirm(params).then(() => {
                    Dialog.alert({
                        message: '确认成功'
                    })
                    this.allOrderList.splice(index, 1)
                }).catch(() => {
                    Dialog.alert({
                        message: '确认失败'
                    })
                })
            }).catch(() => {
                return
            })
        },
        RouteTo: RouteTo
    },
    components: {
        orderItem
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
.wo_page {
    position: absolute;
    top: 1.1rem;
    bottom: .6rem;
    width: 100%;
    overflow: hidden;
        .wo_list {
        width: 85%;
        margin: 0 auto;
        min-height: 5rem;
    }
}
</style>