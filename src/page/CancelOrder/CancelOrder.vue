<template>
    <div class="co_page" ref="co_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-loading v-show="!isInit" class="ao_loading"></van-loading>
                <ul class="co_list" ref="co_list">
                <li
                class="co_item"
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
                        <p class="cancel_btn">已取消</p>
                    </div>
                </li>
            </ul>
        </van-pull-refresh>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import { RouteTo, timestampToTime, setSessionStore } from 'js/common.js'
import { PullRefresh, Loading } from 'vant'

Vue.use(PullRefresh)
Vue.use(Loading)

export default {
    name: 'CancelOrder',
    data () {
        return {
            isInit: false,
            isLoading: false,
            cancelOrderList: []
        }
    },
    created () {
            this.axios.get('/order/refresh', {
                params: {
                    status: '已取消'
                }
            }).then((res) => {
                this.cancelOrderList = res.data.data.reverse()
                this.cancelOrderList.forEach((item) => {
                    item.timestamp = item.created_at
                    item.created_at = timestampToTime(item.created_at)
                })
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
                this.axios.get('/order/refresh', {
                    params: {
                        status: '已取消'
                    }
                }).then((res) => {
                res.data.data.forEach((item) => {
                    item.timestamp = item.created_at
                    item.created_at = timestampToTime(item.created_at)
                })
                this.cancelOrderList = res.data.data.reverse()
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
.co_page {
    position: absolute;
    top: 1.1rem;
    bottom: .6rem;
    width: 100%;
    overflow: hidden;
        .co_list {
        width: 85%;
        margin: 0 auto;
        .co_item {
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
                .cancel_btn {
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