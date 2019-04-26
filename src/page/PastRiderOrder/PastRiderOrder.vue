<template>
    <div class="pro_page" ref="pro_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-loading v-show="!isInit" class="pro_loading"></van-loading>
            <div class="pro_district">
                <div
                class="pro_district-item"
                v-for="(item, index) in districtList"
                :key="index"
                @click="ToActive(districtList, index)"
                >
                    <div
                    :class="{ active: item.active }"
                    >{{item.text}}</div>
                </div>
            </div>
            <ul class="pro_list" ref="pro_list">
                <li
                class="pro_item"
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
import { PullRefresh, Loading, Dialog } from 'vant'

Vue.use(PullRefresh)
Vue.use(Loading)

export default {
    name: 'PastRiderOrder',
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
        this._getList(this.districtList[0].district)
        this.$nextTick(() => {
            this._initScroll() //初始化scroll
        })
    },
    methods: {
        _initScroll () {
            this.pro_page = new BScroll(this.$refs.pro_page, {
                click: true
            })
        },
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.axios.get('/order/refresh', {
                    params: this.params
                }).then((res) => {
                this.askOrderList = res.data.data
                this.askOrderList.forEach((item) => {
                    item.timestamp = item.created_at
                    item.created_at = timestampToTime(item.created_at)
                })
                this.askOrderList.reverse()
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
        ToDetail (index) {
            setSessionStore('order_id', this.askOrderList[index].serial_id)
            this.$router.push('/riderOrderDetail')
        },
        _getList (district) {
            if (district == "") {
                this.params = {
                    status: '已完成'
                }
            } else {
                this.params = {
                    status: '已完成',
                    district: district
                }
            }
            this.axios.get('order/refresh', {
                params: this.params
            }).then((res) => {
                this.askOrderList = res.data.data
                this.askOrderList.forEach((item) => {
                    item.timestamp = item.created_at
                    item.created_at = timestampToTime(item.created_at)
                })
                this.askOrderList.reverse()
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
.pro_page {
    position: absolute;
    top: .9rem;
    bottom: 0rem;
    width: 100%;
    overflow: hidden;
        .pro_district {
            background-color: #ffffff;
            display: flex;
            @include wh(100%, .4rem);
            line-height: .4rem;
            .pro_district-item {
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
        .pro_list {
        width: 85%;
        margin: 0 auto;
        margin-top: .2rem;
        .pro_item {
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
            }
        }
    }
}
</style>
