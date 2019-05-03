<template>
    <div>
        <div class="item" @click="ToDetail">
            <div class="item_head">
                <div class="img_wrapper">
                    <img src="../../images/head.jpg" alt="dinning_room">
                </div>
                <p class="order_id">订单编号：{{data.timestamp + "" + data.serial_id}}</p>
                <p class="order_status" v-if="ask || wait || riderAsk || riderPast || riderWait">{{data.status}}</p>
            </div>
            <div class="item_line"></div>
            <div class="item_content">
                <p class="time">下单时间：{{data.created_at}}</p>
                <p class="location">地址：{{data.district + data.dormtype + data.building + '栋' + data.dorm}}</p>
                <p class="phone" v-if="wait || finish">云鸽电话： {{data.deliveryphone}}</p>
                <p class="phone" v-if="riderAsk || riderPast || riderWait">用户电话： {{data.userphone}}</p>
                <p class="arrive_time" v-if="wait">预计{{data.time}}分钟到达</p>
                <p class="finish_text" v-if="finish">已完成</p>
                <p class="cancel_text" v-if="cancel">已取消</p>
                <input
                    v-if="ask"
                    type="button"
                    class="cancel_btn"
                    value="取消订单"
                    ref="cancel_btn"
                    @click.stop="ToCancel"
                >
                <input
                    v-if="riderAsk"
                    type="button"
                    class="accept_btn"
                    value="接单"
                    ref="accept_btn"
                    @click.stop="ToAccept"
                >
            </div>
            <input
            v-if="wait"
            type="button"
            value="确认送达"
            class="confirm_btn"
            @click.stop="ToConfirmOrder"
            >
        </div>
    </div>
</template>
<script>
import { setSessionStore } from 'js/common.js'

export default {
    name: 'Item',
    props: ['data', 'wait', 'ask', 'finish', 'cancel', 'riderAsk', 'riderPast', 'riderWait'],
    methods: {
        ToConfirmOrder () {
            this.$emit('ToConfirmOrder')
        },
        ToDetail () {
            setSessionStore('order_id', this.data.serial_id)
            this.$router.push('/orderDetail')
        },
        ToCancel () {
            this.$emit('ToCancel')
        },
        ToAccept () {
            this.$emit('ToAccept')
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
.item {
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
        .accept_btn {
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
        .cancel_text {
            position: absolute;
            bottom: .1rem;
            right: .1rem;
            @include hl(.32rem);
            font-size: .13rem;
            padding: 0 .1rem;
            color: #999999;
        }
        .finish_text {
            position: absolute;
            bottom: .1rem;
            right: .1rem;
            @include hl(.32rem);
            font-size: .13rem;
            padding: 0 .1rem;
            color: #999999;
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
</style>