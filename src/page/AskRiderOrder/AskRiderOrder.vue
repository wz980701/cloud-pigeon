<template>
    <div class="aro_page" ref="aro_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-loading v-show="!isInit" class="aro_loading"></van-loading>
            <div class="aro_district">
                <div
                class="aro_district-item"
                v-for="(item, index) in districtList"
                :key="index"
                @click="ToActive(districtList, index)"
                >
                    <div
                    :class="{ active: item.active }"
                    >{{item.text}}</div>
                </div>
            </div>
            <ul class="aro_list" ref="aro_list">
                <li
                is="orderItem"
                v-for="(item, index) in askOrderList"
                :key="index"
                :data="item"
                riderAsk="未接单"
                @ToAccept="ToAccept(index)"
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
import { RouteTo, timestampToTime, setSessionStore, getSessionStore, webCloseLink, _initList, hideMenu } from 'js/common.js'
import { orderList } from 'js/api.js'
import { RES_OK } from 'js/config.js'
import { PullRefresh, Loading, Dialog } from 'vant'

Vue.use(PullRefresh)
Vue.use(Loading)

export default {
    name: 'AskOrder',
    data () {
        return {
            isInit: false, //初始list刷新
            isLoading: false, //下拉刷新
            askOrderList: [],
            districtList: [
                { text: '全部', active: true, district: '' },
                { text: '西区', active: false, district: '西区' },
                { text: '北区', active: false, district: '北区' },
                { text: '南区', active: false, district: '南区' }
            ],
            params: null, //下拉刷新时所传参数
            websocket: null,
            scroll: 0 //初始化scroll
        }
    },
    activated() {
        this.$refs.aro_page.scrollTop = this.scroll //进入订单详情页后返回可定位到上次浏览位置
    },
    created () {
        hideMenu()
        this._initWebsocket()
        this._getList(this.districtList[0].district)
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
            })
    },
    methods: {
        _initScroll () {
            this.aro_page = new BScroll(this.$refs.aro_page, {
                click: true
            })
        },
        ToDetail (index) {
            const WrapperScrollTop = this.$refs.aro_page.scrollTop
            this.scroll = WrapperScrollTop
            setSessionStore('order_id', this.askOrderList[index].serial_id)
            this.$router.push('/riderOrderDetail')
        },
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                orderList(this.params).then((res) => {
                    this.askOrderList = _initList(res)
            }).catch(() => {
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
                if (data.message == "cancel") {
                    this.getCancel(data)
                } else if (data.message == "generate") {
                    this.getGenerate(data)
                } else if (data.message == "delivery") {
                    this.getDelivery(data)
                }
                console.log('Retrieved data from server: ' + data.message);
            };
            this.websocket.onerror = (evt) => {
                console.log('Error occured: ' + evt.data);
            };
        },
        getCancel (data) {
            for (let item of this.askOrderList) {
                if (item['serial_id'] == data.id) {
                    this.askOrderList.splice(this.askOrderList.indexOf(item), 1)
                }
            }
        },
        getDelivery (data) {
            for (let item of this.askOrderList) {
                if (item['serial_id'] == data.id) {
                    this.askOrderList.splice(this.askOrderList.indexOf(item), 1)
                }
            }
        },
        getGenerate (data) {
            data.timestamp = data.time
            data.created_at = timestampToTime(data.time)
            data.serial_id = data.id
            this.askOrderList.unshift(data)
        },
        ToAccept (index) {  //接收订单
            Dialog.confirm({
                message: '确定要接下该单吗？'
            }).then(() => {
                Dialog.alert({
                    message: '接单成功'
                })
                this._sendWebsocket(index)
                this.saveOrder(index)
                this.askOrderList.splice(index, 1)
            }).catch(() => {
                return
            })
        },
        saveOrder (index) {
            const data = JSON.stringify(this.askOrderList[index])
            setSessionStore('accept_order', data)
        },
        _sendWebsocket (index) { //接单时send websocket
            const serial_id = this.askOrderList[index].serial_id
            const phone = JSON.parse(getSessionStore('rider_info')).phone
            this.websocket.send('{"url":"/order/delivery","serial_id":'+ serial_id +',"deliveryphone": '+ phone +'}')
        },
        ToActive (list, index) { //点击导航栏时显示active位置
            this._getList(this.districtList[index].district)
            list.forEach((item) => {
                item.active = false
            })
            list[index].active = true
        },
        _getList (district) {
            if (district == "") { //如果传入district为空，则获取全部订单
                this.params = {
                    status: '未接单'
                }
            } else {
                this.params = { //如果传入district不为空，则获取当前区域订单
                    status: '未接单',
                    district: district
                }
            }
            orderList(this.params).then((res) => {
                this.askOrderList = _initList(res)
            }).catch(() => {
                Dialog.alert({
                    message: '获取列表失败'
                })
            })
            this.isInit = true
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
@import 'sass/base.scss';
.aro_page {
    position: absolute;
    top: .9rem;
    bottom: 0rem;
    width: 100%;
    overflow: hidden;
        .aro_district {
            background-color: #ffffff;
            display: flex;
            @include wh(100%, .4rem);
            line-height: .4rem;
            .aro_district-item {
                flex: 1;
                text-align: center;
                div {
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
        .aro_list {
        width: 85%;
        margin: 0 auto;
        margin-top: .2rem;
        min-height: 5rem;
    }
}
</style>
