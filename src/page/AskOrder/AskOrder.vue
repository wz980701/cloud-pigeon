<template>
    <div class="ao_page" ref="ao_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-loading v-show="!isInit" class="ao_loading"></van-loading>
                <ul class="ao_list" ref="ao_list">
                <li
                class="ao_item"
                v-for="(item, index) in askOrderList"
                :key="index"
                @click="ToDetail(index)"
                >
                    <div class="item_head">
                        <div class="img_wrapper">
                            <img src="../../common/images/head.jpg" alt="dinning_room">
                        </div>
                        <p class="order_id">订单编号：{{item.timestamp + "" + item.serial_id}}</p>
                        <p class="order_status">{{item.status}}</p>
                    </div>
                    <div class="item_line"></div>
                    <div class="item_content">
                        <p class="time">下单时间：{{item.created_at}}</p>
                        <p class="location">地址：{{item.district + item.dormtype + item.building+ '栋' + item.dorm}}</p>
                        <input
                        type="button"
                        class="cancel_btn"
                        value="取消订单"
                        ref="cancel_btn"
                        @click.stop="ToCancel(index)"
                        >
                    </div>
                </li>
            </ul>
        </van-pull-refresh>
    </div>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import { RouteTo, timestampToTime, setSessionStore, getSerialId, webCloseLink } from 'js/common.js'
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
            this._initWebsocket()
            this.params = {
                status: '未接单'
            }
            orderList(this.params).then((res) => {
                const data = res.data.data
                data.forEach((item) => {
                    item.timestamp = item.created_at
                    item.order_id = getSerialId(item.timestamp, item.serial_id)
                    item.created_at = timestampToTime(item.created_at)
                })
                this.askOrderList = res.data.data
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
    // destroyed() {
    //   this.websocket.close() //离开路由之后断开websocket连接
    // },
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
                res.data.data.forEach((item) => {
                    item.timestamp = item.created_at
                    item.order_id = getSerialId(item.timestamp, item.serial_id)
                    item.created_at = timestampToTime(item.created_at)
                })
                this.askOrderList = res.data.data
            }).catch((err) => {
                alert(err)
            })
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
            })
            }, 500)
        },
        ToDetail (index) { //订单详情
            setSessionStore('order_id', this.askOrderList[index].serial_id)
            this.$router.push('/orderDetail')
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
        .ao_item {
            width: 100%;
            @include borderRadius(5%);
            background-color: #ffffff;
            margin-bottom: .2rem;
            .item_head {
                @include hl(.5rem);
                position: relative;
                display: flex;
                .img_wrapper {
                    width: .3rem;
                    height: .3rem;
                    margin-left: .1rem;
                    @include ct;
                    position: relative;
                    @include borderRadius(50%);
                    overflow: hidden;
                    img {
                        @include wh(100%, 100%);
                        @include pi(0, 0);
                    }
                }
                .order_id {
                    font-size: .13rem;
                    margin-left: .1rem;
                    width: 1.5rem;
                    @include tw;
                }
                .order_status {
                    font-size: .13rem;
                    color: #455a64;
                    margin-left: .5rem;
                }
            }
            .item_line {
                width: 80%;
                height: 1px;
                margin: 0 auto;
                background-color: #f2f3f4;
            }
            .item_content {
                position: relative;
                padding-bottom: .5rem;
                p {
                    @include hl(.32rem);
                    font-size: .14rem;
                    margin-left: .2rem;
                }
                .time {
                    margin-top: .1rem;
                }
                .location {
                    margin-top: .1rem;
                }
                .cancel_btn {
                    position: absolute;
                    bottom: .1rem;
                    right: .1rem;
                    @include hl(.32rem);
                    font-size: .13rem;
                    @include borderRadius(.05rem);
                    padding: 0 .1rem;
                    @include border-1px(#ccc);
                    background-color: #ffffff;
                }
            }
        }
    }
}
</style>