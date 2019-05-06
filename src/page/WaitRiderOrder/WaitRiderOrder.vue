<template>
    <div class="wro_page" ref="wro_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-loading v-show="!isInit" class="wro_loading"></van-loading>
            <div class="wro_district">
                <div
                class="wro_district-item"
                v-for="(item, index) in districtList"
                :key="index"
                @click="ToActive(districtList, index)"
                >
                    <div
                    :class="{ active: item.active }"
                    >{{item.text}}</div>
                </div>
            </div>
            <ul class="wro_list" ref="wro_list">
                <li
                is="orderItem"
                v-for="(item, index) in askOrderList"
                :key="index"
                :data="item"
                riderWait="未送达"
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
import { RouteTo, setSessionStore, getSessionStore, webCloseLink, _initList, hideMenu } from 'js/common.js'
import { orderList } from 'js/api.js'
import { PullRefresh, Loading, Dialog } from 'vant'

Vue.use(PullRefresh)
Vue.use(Loading)

export default {
    name: 'WaitRiderOrder',
    data () {
        return {
            isInit: false,
            isLoading: false,
            askOrderList: [],
            districtList: [
                { text: '全部', active: true, district: '' },
                { text: '西区', active: false, district: '西区' },
                { text: '北区', active: false, district: '北区' },
                { text: '南区', active: false, district: '南区' }
            ],
            params: null
        }
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
            this.wro_page = new BScroll(this.$refs.wro_page, {
                click: true
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
                const item = JSON.parse(getSessionStore('accept_order'))
                this.askOrderList.unshift(item)
            }
        },
        ToDetail (index) {
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
        ToActive (list, index) {
            this._getList(this.districtList[index].district)
            list.forEach((item) => {
                item.active = false
            })
            list[index].active = true
        },
        _getList (district) {
            if (district == "") {
                this.params = {
                    status: '已接单'
                }
            } else {
                this.params = {
                    status: '已接单',
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
.wro_page {
    position: absolute;
    top: .9rem;
    bottom: 0rem;
    width: 100%;
    overflow: hidden;
        .wro_loading {
            @include cl;
            top: .1rem;
        }
        .wro_district {
            background-color: #ffffff;
            display: flex;
            @include wh(100%, .4rem);
            line-height: .4rem;
            .wro_district-item {
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
        .wro_list {
        width: 85%;
        margin: 0 auto;
        margin-top: .2rem;
        min-height: 5rem;
    }
}
</style>
