<template>
    <div class="ao_page" ref="ao_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-loading v-show="!isInit" class="ao_loading"></van-loading>
                <ul class="ao_list" ref="ao_list">
                <li
                is="orderItem"
                v-for="(item, index) in askOrderList"
                :key="index"
                :data="item"
                ask="未接单"
                @ToCancel="ToCancel(index)"
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
import { RouteTo, webCloseLink, _initList, hideMenu } from 'js/common.js'
import { orderList, cancel } from 'js/api.js'
import { PullRefresh, Loading, Dialog } from 'vant'

Vue.use(PullRefresh)
Vue.use(Loading)

export default {
    name: 'AskOrder',
    data () {
        return {
            isInit: false, //初次获取List刷新
            isLoading: false, //下拉刷新
            askOrderList: [],
            websocket: null,
            params: null
        }
    },
    created () {
            hideMenu()
            this._initWebsocket()
            this.params = {
                status: '未接单'
            }
            orderList(this.params).then((res) => {
                this.askOrderList = _initList(res)
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
        _initScroll () { //初始化滚动高度
            this.ao_page = new BScroll(this.$refs.ao_page, {
                click: true
            })
        },
        onRefresh () { //刷新
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                orderList(this.params).then((res) => {
                this.askOrderList = _initList(res)
            }).catch((err) => {
                alert(err)
            })
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
            })
            }, 500)
        },
        _initWebsocket () { //初始化webpack
            const wsServer = 'ws://101.132.181.245:9501';
            this.websocket = new WebSocket(wsServer);
            this.websocket.onopen = () => {
                webCloseLink(this.websocket)
            };
            this.websocket.onclose = () => {
                console.log("Disconnected");
            };
            this.websocket.onmessage = (evt) => { //若有webpack推送数据，则增加数据
                const data = JSON.parse(evt.data)
                this.getDelivery(data)
                console.log('Retrieved data from server: ' + data.message);
            };
            this.websocket.onerror = (evt) => {
                console.log('Error occured: ' + evt.data);
            };
        },
        ToCancel (index) { //取消订单
            Dialog.confirm({
                message: '确认要取消订单吗？'
            }).then(() => {
                const params = {
                    serial_id: this.askOrderList[index].serial_id
                }
                cancel(params).then(() => {
                    this.askOrderList.splice(index, 1)
                    Dialog.alert({
                        message: '取消订单成功'
                    })
                }).catch(() => {
                    Dialog.alert({
                        message: '取消订单失败'
                    })
                })
            }).catch(() => {
                return
            })
        },
        getDelivery (data) {
            if (data.message == "delivery") {
                for (let item of this.askOrderList) {
                    if (item['serial_id'] == data.id) {
                        this.askOrderList.splice(this.askOrderList.indexOf(item), 1)
                    }
                }
            }
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
.ao_page {
    position: absolute;
    top: 1.1rem;
    bottom: .6rem;
    width: 100%;
    overflow: hidden;
        .ao_list {
        width: 85%;
        margin: 0 auto;
        min-height: 5rem;
    }
}
</style>