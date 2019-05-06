<template>
    <div class="od_page">
        <head-top goBack="订单详情" class="od_head"></head-top>
            <section class="od_food">
                <p class="head">
                    四饭 {{order_info.stallname}}
                </p>
                <div class="line"></div>
                <div class="food">
                    <ul class="list">
                        <li
                        class="item"
                        v-for="(item, index) in order_info.foodlist"
                        :key="index"
                        >
                            <div class="img_wrapper">
                                <img
                                width="57"
                                height="57"
                                src="../../common/images/fourth.jpg"
                                alt="food">
                            </div>
                            <div class="content">
                                <div class="l_content">
                                    <p class="name">
                                        {{item.food}}
                                    </p>
                                    <p class="count">
                                        x{{order_info.numberlist[index]}}
                                    </p>
                                </div>
                                <p class="price">
                                    ￥{{item.price}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="line"></div>
                <div class="fee">
                    <p class="label">配送费</p>
                    <p class="number">￥{{order_info.fee}}</p>
                </div>
                <div class="line"></div>
                <div class="total_price">
                    合计 <i>￥{{order_info.money}}</i>
                </div>
            </section>
            <section class="od_delivery" v-if="order_info.deliveryphone">
                <p class="head">
                    配送信息
                </p>
                <div class="line"></div>
                <div class="rider">
                    <p class="label">
                        配送云鸽电话
                    </p>
                    <p class="name">
                        {{order_info.deliveryphone}}
                    </p>
                </div>
                <div class="location">
                    <p class="label">
                        配送地址
                    </p>
                    <div class="info">
                        <p class="info">
                        {{order_info.username}} {{order_info.userphone}}
                        </p>
                        <p class="direct">
                            {{order_info.district + order_info.dormtype + order_info.building + '栋' + order_info.dorm}}
                        </p>
                    </div>
                </div>
            </section>
            <section class="od_order">
                <p class="head">
                    订单信息
                </p>
                <div class="line"></div>
                <div class="id">
                    <p class="label">
                        订单号码
                    </p>
                    <p class="number">
                        {{order_info.timestamp + "" + order_info.serial_id}}
                    </p>
                </div>
                <div class="time">
                    <p class="label">
                        下单时间
                    </p>
                    <p class="number">
                        {{order_info.created_at}}
                    </p>
                </div>
            </section>
        </div>
</template>
<script>
import { getSessionStore, timestampToTime } from 'js/common.js'
import { orderDetail } from 'js/api.js'
import { Dialog } from 'vant'
import headTop from 'components/Header/Header.vue'

export default {
    name: 'OrderDetail',
    data () {
        return {
            order_info: {}
        }
    },
    created () {
        const params = {
            serial_id: getSessionStore('order_id')
        }
        orderDetail(params).then((res) => {
            res.data.data.timestamp = res.data.data.created_at
            res.data.data.created_at = timestampToTime(res.data.data.created_at)
            res.data.data.numberlist = JSON.parse(res.data.data.numberlist) //将json数组转化为js数组
            this.order_info = res.data.data
        }).catch(() => {
            Dialog.alert({
                message: '获取订单详情失败'
            })
        })
    },
    components: {
        headTop
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/base.scss';
@import 'sass/mixin.scss';
.od_page {
    background-color: $background-color;
    padding-top: .7rem;
    padding-bottom: .2rem;
    min-height: 100%;
    .od_head {
        position: fixed;
        top: 0;
        z-index: 1;
    }
        .od_food {
            @include wm(80%);
            background-color: #ffffff;
            @include borderRadius(.1rem);
            padding: .2rem;
            .head {
                font-weight: bold;
                margin-bottom: .1rem;
            }
            .food {
                .list {
                    .item {
                        position: relative;
                        display: flex;
                        margin: 0 .18rem;
                        padding: .18rem 0;
                        .imgWrapper {
                            flex: 0 0 .57rem;
                        }
                        .content {
                            margin-left: .2rem;
                            font-size: .15rem;
                            display: flex;
                            .l_content {
                                width: 70%;
                            }
                            .count {
                                margin-top: .1rem;
                                font-size: .14rem;
                                color: #333;
                            }
                        }
                    }
                }
            }
            .fee {
                @include fj;
                @include hl(.5rem);
                font-size: .14rem;
            }
            .total_price {
                @include hl(.4rem);
                font-size: .14rem;
                i {
                    font-size: .15rem;
                    color: rgb(240, 20, 20);
                }
            }
        }
        .od_delivery {
            @include wm(80%);
            background-color: #ffffff;
            margin-top: .2rem;
            @include borderRadius(.1rem);
            padding: .2rem;
            .head {
                font-weight: bold;
                margin-bottom: .1rem;
            }
            .rider {
                @include fj;
                @include hl(.5rem);
                font-size: .14rem;
            }
            .location {
                @include fj;
                font-size: .14rem;
                .info {
                    p {
                        margin-bottom: .1rem;
                        text-align: right;
                    }
                }
            }
        }
        .od_order {
            @include wm(80%);
            background-color: #ffffff;
            margin-top: .2rem;
            @include borderRadius(.1rem);
            padding: .2rem;
            .head {
                font-weight: bold;
                margin-bottom: .1rem;
            }
            .id, .time {
                @include fj;
                @include hl(.4rem);
                font-size: .14rem;
            }
        }
        .line {
            height: 1px;
            @include wm(100%);
            background-color: $background-color;
        }
}
</style>
