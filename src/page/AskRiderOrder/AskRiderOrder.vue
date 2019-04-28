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
                class="aro_item"
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
                        <p class="location">地址：{{item.district + item.dormtype + item.building + '栋' + item.dorm}}</p>
                        <p class="phone">用户电话： {{item.userphone}}</p>
                        <input
                        type="button"
                        class="cancel_btn"
                        value="接单"
                        ref="cancel_btn"
                        @click.stop="ToAccept(index)"
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
import { RouteTo, timestampToTime, setSessionStore } from 'js/common.js'
import { orderList } from 'js/api.js'
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
        this._initWebsocket()
        this._getList(this.districtList[0].district)
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
            })
    },
    // destroyed () {
    //     this.websocket.close()
    // },
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
                this.askOrderList = res.data.data
                this.askOrderList.forEach((item) => {
                    item.timestamp = item.created_at
                    item.created_at = timestampToTime(item.created_at)
                })
                this.askOrderList.reverse()
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
                this.webCloseLink(this.websocket)
            };
            this.websocket.onclose = () => {
                console.log("Disconnected");
            };
            this.websocket.onmessage = (evt) => { //若有webpack推送数据，则增加数据
                const data = JSON.parse(evt.data)
                if (data.message == "cancel") {
                    for (let item of this.askOrderList) {
                        if (item['serial_id'] == data.id) {
                            this.askOrderList.splice(this.askOrderList.indexOf(item), 1)
                        }
                    }
                } else if (data.message == "generate") {
                    data.timestamp = data.time
                    data.created_at = timestampToTime(data.time)
                    data.serial_id = data.id
                    this.askOrderList.unshift(data)
                }
                console.log('Retrieved data from server: ' + data.message);
            };
            this.websocket.onerror = (evt) => {
                console.log('Error occured: ' + evt.data);
            };
        },
        webCloseLink(WebSocketId){
            WebSocketId.send("心跳包内容")
            // 每个15秒发送一次心跳包
            let hb = setInterval(()=>{
            WebSocketId.send("心跳包内容")
            // 检测到websocket连接断开
                if(WebSocketId.readyState == 2 || WebSocketId.readyState == 3){
                    clearInterval(this.hb)
                    let i = 1
                    let myVar = setInterval(()=>{
                        if(WebSocketId.readyState == 2 || WebSocketId.readyState == 3){
                            // 重新new一个websocket的连接
                            this.websocket = new WebSocket(WebSocketId.url);
                            WebSocketId = this.websocket;
                            if(i == 5){
                                clearInterval(myVar);
                                // location.reload();
                                    return
                            }
                            i++
                            }   else if(WebSocketId.readyState == 1){ // websocket重连成功
                                this._initWebsocket();
                                clearInterval(hb)
                                clearInterval(myVar)
                            }
                        },4*1000)
                    }
                }, 15000)
        },
        ToAccept (index) {  //接收订单
            Dialog.confirm({
                message: '确定要接下该单吗？'
            }).then(() => {
                Dialog.alert({
                    message: '接单成功'
                })
                this._sendWebsocket(index)
                this.askOrderList.splice(index, 1)
            }).catch(() => {
                return
            })
        },
        _sendWebsocket (index) { //接单时send websocket
            this.websocket.send('{"url":"/order/delivery","serial_id":'+ this.askOrderList[index].serial_id +',"deliveryphone":"15014348414"}')
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
                this.askOrderList = res.data.data
                this.askOrderList.forEach((item) => {
                    item.timestamp = item.created_at
                    item.created_at = timestampToTime(item.created_at)
                })
                this.askOrderList.reverse() //反转订单
            }).catch(() => {
                Dialog.alert({
                    message: '获取列表失败'
                })
            })
            this.isInit = true
        },
        RouteTo: RouteTo
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
        .aro_item {
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
                padding-bottom: .1rem;
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
