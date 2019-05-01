<template>
    <div class="fo_page" ref="fo_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-loading v-show="!isInit" class="fo_loading"></van-loading>
                <ul class="fo_list" ref="fo_list">
                <li
                class="fo_item"
                v-for="(item, index) in cancelOrderList"
                :key="index"
                @click="ToDetail(index)"
                >
                    <div class="item_head">
                        <div class="img_wrapper">
                            <img src="../../common/images/head.jpg" alt="dinning_room">
                        </div>
                        <p class="order_id">订单编号：{{item.timestamp + "" + item.serial_id}}</p>
                    </div>
                    <div class="item_line"></div>
                    <div class="item_content">
                        <p class="time">下单时间：{{item.created_at}}</p>
                        <p class="location">地址：{{item.district + item.dormtype + item.building + '栋' + item.dorm}}</p>
                        <p class="finish_btn">已完成</p>
                    </div>
                </li>
            </ul>
        </van-pull-refresh>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import { RouteTo, setSessionStore, _initList } from 'js/common.js'
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
        this.params = {
            status: '已完成'
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
            this.fo_page = new BScroll(this.$refs.fo_page, {
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
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
.fo_page {
    position: absolute;
    top: 1.1rem;
    bottom: .6rem;
    width: 100%;
    overflow: hidden;
        .fo_list {
        width: 85%;
        margin: 0 auto;
        min-height: 5rem;
        .fo_item {
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
                    @include hl(.35rem);
                    font-size: .14rem;
                    margin-left: .2rem;
                }
                .time {
                    margin-top: .1rem;
                }
                .location {
                    margin-top: .1rem;
                }
                .finish_btn {
                    position: absolute;
                    bottom: .1rem;
                    right: .1rem;
                    @include hl(.32rem);
                    font-size: .13rem;
                    padding: 0 .1rem;
                    color: #999999;
                }
            }
        }
    }
}
</style>