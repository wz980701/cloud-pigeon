<template>
    <div class="wo_page" ref="wo_page">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-loading v-show="!isInit" class="wo_loading"></van-loading>
                <ul class="wo_list" ref="wo_list">
                <li
                class="wo_item"
                v-for="(item, index) in allOrderList"
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
                        <p class="phone" v-if="item.deliveryphone">云鸽电话： {{item.deliveryphone}}</p>
                        <p class="arrive_time">预计{{item.time}}分钟到达</p>
                    </div>
                    <input
                    type="button"
                    value="确认送达"
                    class="confirm_btn"
                    @click.stop="ToConfirmOrder(index)"
                    >
                </li>
            </ul>
        </van-pull-refresh>
    </div>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import { RouteTo, timestampToTime, timestampToExpectedTime, setSessionStore } from 'js/common.js'
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
            this.params = {
                status: '已接单'
            }
            orderList(this.params).then((res) => {
                res.data.data.forEach((item) => {
                    item.timestamp = item.created_at
                    item.time = timestampToExpectedTime(item.created_at)
                    item.created_at = timestampToTime(item.created_at)
                })
                this.allOrderList = res.data.data.reverse()
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
                res.data.data.forEach((item) => {
                    item.timestamp = item.created_at
                    item.time = timestampToExpectedTime(item.created_at)
                    item.created_at = timestampToTime(item.created_at)
                })
                this.allOrderList = res.data.data.reverse()
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
        ToDetail (index) {
            setSessionStore('order_id', this.allOrderList[index].serial_id)
            this.$router.push('/orderDetail')
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
        .wo_item {
            position: relative;
            width: 100%;
            @include borderRadius(5%);
            background-color: #ffffff;
            margin-bottom: .2rem;
            &:first-child {
                margin-top: .2rem;
            }
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
                padding-bottom: .6rem;
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
                .arrive_time {
                    font-size: .13rem;
                    color: #455a64;
                }
            }
            .confirm_btn {
                position: absolute;
                bottom: .2rem;
                right: .2rem;
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
</style>