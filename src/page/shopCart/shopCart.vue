<template>
    <div class="">
        <div class="shopCart">
            <div class="content">
                <div class="content-left" @click="listToggle">
                    <div class="logo-wrapper">
                        <div class="badge" v-show="totalCount">
                            {{totalCount}}
                        </div>
                        <div class="logo" :class="{'active': totalPrice}">
                            <i class="iconfont icon-shopcart"></i>
                        </div>
                    </div>
                    <div class="price" :class="{'active': totalPrice}">
                        ￥{{totalPrice}}
                    </div>
                    <div class="desc">
                        另需要配送费￥{{deliveryPrice}}元
                    </div>
                </div>
                <div
                class="content-right"
                :class="{'enough': totalPrice>=minPrice}"
                @click="ToPurchase"
                >
                    {{payDesc}}
                </div>
            </div>
            <div class="ball-container">
                <transition
                name="drop"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                v-for="(ball, index) in balls"
                :key="index"
                >
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
            <transition name="transHeight">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="setEmpty()">清空</span>
                    </div>
                    <div class="list-content" ref="foodlist">
                        <ul>
                            <li
                            class="food"
                            v-for="(food, index) in selectFoods"
                            :key="index"
                            >
                                <span class="name">{{food.food}}</span>
                                <div class="price">
                                    <span>￥{{food.price * food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade-backdrop">
            <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
        </transition>
    </div>
</template>
<script>
import cartcontrol from '../cartcontrol/carcontrol'
import BScroll from 'better-scroll'
import { Dialog } from 'vant'
import { getSessionStore } from 'js/common.js'
import { generate, checkWx } from 'js/api.js'

export default {
    props: {
        selectGoods: {
            type: Array,
            default() {
                return []
            }
        },
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
            ],
            dropBalls: [],
            listShow: false
        }
    },
    created () {
        this.$root.eventHub.$on('cart.add', this.drop)
    },
    computed: {
        showBackdrop() {
            if (this.listShow && this.totalPrice) {
                return true
            }
            return false
        },
        totalPrice () {
            let total = 0
            this.selectFoods.forEach((food) => {
                if (food.count) {
                    total += food.price * food.count
                }
            })
            return total
        },
        totalCount () {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        leftAmount () {
            if (this.minPrice - this.totalPrice > 0 && this.totalPrice) {
                return true
            }
            return false
        },
        payDesc () {
            let diff = this.minPrice - this.totalPrice
            if (!this.totalPrice) {
                return `￥${this.totalPrice}起送`
            } else if (diff > 0) {
                return `还差￥${diff}元`
            } else {
                return '去结算'
            }
        },
        deliveryPrice () {
            const district = JSON.parse(getSessionStore('user_info')).district
            const deliveryRule = { "西区": 2.5, "南区": 2, "北区": 1.5 }
            if (this.totalPrice <= 13) {
                return deliveryRule[district]
            } else if (this.totalPrice > 13 && this.totalPrice <= 25) {
                return deliveryRule[district] * 2
            } else {
                return 6
            }
        }
    },
    watch: {
        selectFoods () {
            let isShow = false
            this.selectFoods.forEach((food) => {
                if (food.count === 1) {
                    isShow = true
                }
            })
            if (!isShow) {
                this.listShow = false
            }
        }
    },
    methods: {
        drop(el) {
                for (let i = 0, l = this.balls.length; i < l; i++) {
                    let ball = this.balls[i]
                    if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropBalls.push(ball)
                    return
                    }
                }
            },
            setEmpty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0
                })
                this.listShow = false
            },
            hideBackdrop() {
                this.listShow = false
            },
            _initScroll() {
                this.foodlistScroll = new BScroll(this.$refs.foodlist, {
                    click: true
                });
            },
            listToggle() {
                if (!this.selectFoods.length) {
                    return
                }
                this.listShow = !this.listShow
                if (this.listShow) {
                    this.$nextTick(() => {
                    if (!this.foodlistScroll) {
                        this._initScroll()
                    } else {
                        this.foodlistScroll.refresh()
                    }
                    })
                }
            },
            beforeEnter(el) {
                let count = this.balls.length
                while (count--) {
                    let ball = this.balls[count]
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect()
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22)
                        el.style.display = ''
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`
                        el.style.transform = `translate3d(0,${y}px,0)`
                        let inner = el.querySelector('.inner-hook')
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                        inner.style.transform = `translate3d(${x}px,0,0)`
                    }
                }
            },
            enter(el) {
                el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)'
                    el.style.transform = 'translate3d(0,0,0)'
                    let inner = el.querySelector('.inner-hook')
                    inner.style.webkitTransform = 'translate3d(0,0,0)'
                    inner.style.transform = 'translate3d(0,0,0)'
                })
            },
            afterEnter(el) {
                let ball = this.dropBalls.shift()
                if (ball) {
                    ball.show = false
                    el.style.display = 'none'
                }
            },
            ToPurchase () {
                const len = this.selectGoods.length
                if (len > 1) {
                    Dialog.alert({
                        message: '不能跨档口点菜噢'
                    })
                } else {
                    console.log(this.selectGoods[0])
                    if (this.totalPrice < this.minPrice) {
                        return
                    } else {
                        Dialog.confirm({
                            title: '订单金额',
                            message: `你总共需要支付${this.totalPrice + this.deliveryPrice}元,确认下单吗？`
                        }).then(() => {
                            let countlist = []
                            let idlist= []
                            this.selectFoods.forEach((food) => {
                                if (food.count) {
                                    countlist.push(food.count)
                                    idlist.push(food.id)
                                }
                            })
                            const info = JSON.parse(getSessionStore('user_info'))
                            const stall_id = this.selectGoods[0]
                            const formdata = new FormData()
                            formdata.append('foodlist', JSON.stringify(idlist))
                            formdata.append('numberlist', JSON.stringify(countlist))
                            formdata.append('money', this.totalPrice)
                            // formdata.append('money', 0.01)
                            formdata.append('district', info.district)
                            formdata.append('dormtype', info.dormtype)
                            formdata.append('building', info.building)
                            formdata.append('dorm', info.dorm)
                            formdata.append('userphone', info.phone)
                            formdata.append('fee', this.deliveryPrice)
                            formdata.append('stall_id', stall_id)
                            // formdata.append('fee', 0)
                            generate(formdata).then((res) => {
                                const code = res.data.code
                                if (code === 0) {
                                    const data = res.data.data
                                    this.callpay (data.jsApiParameters, data.out_trade_no)
                                }
                            }).catch(() => {
                                Dialog.alert({
                                    message: '下单失败'
                                })
                            })
                        }).catch(() => {
                            return
                        })
                    }
                }
            },
            jsApiCall (params, id)
            {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    params,
                    () => {
                        const param = {
                            out_trade_no: id
                        }
                        checkWx(param).then((res) => {
                            const code = res.data.code
                            if (code === 0) {
                                Dialog.alert({
                                    message: '下单成功'
                                })
                                this.$router.push('/order')
                            }
                        }).catch(() => {
                            return
                        })
                    }
                );
            },
            callpay (params, id)
            {
                if (typeof WeixinJSBridge === "undefined") {
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(params, id), false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', this.jsApiCall(params, id));
                        document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall(params, id));
                    }
                }else{
                    this.jsApiCall(params, id);
                }
            }
    },
    components: {
        cartcontrol
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
.shopCart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .48rem;
    z-index: 50;
    .content {
        display: flex;
        background: #141d27;
        .content-left {
            flex: 1;
            height: .48rem;
            .logo-wrapper {
                display: inline-block;
                vertical-align: top;
                position: relative;
                @include hl(.56rem);
                @include borderRadius(50%);
                width: .56rem;
                top: -.1rem;
                background: #141d27;
                margin: 0 .12rem;
                padding: .06rem;
                box-sizing: border-box;
                text-align: center;
                .badge {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: rgb(240, 20, 20);
                    color: #ffffff;
                    @include wh(.24rem, .16rem);
                    line-height: .16rem;
                    font-size: .09rem;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
                    font-weight: 700;
                    border-radius: .16rem;
                    text-align: center;
                }
                .logo {
                    @include wh(100%, 100%);
                    background: #2b343c;
                    @include borderRadius(50%);
                    color: #80858a;
                    line-height: .44rem;
                    font-weight: 700;
                    .iconfont {
                        font-size: .24rem;
                    }
                    &.active {
                        background: rgb(0, 160, 220);
                        color: #ffffff;
                    }
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                font-size: .16rem;
                margin-top: .12rem;
                padding-right: .12rem;
                box-sizing: border-box;
                color: rgba(255, 255, 255, 0.4);
                font-weight: 700;
                line-height: .24rem;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                &.active {
                    color: #ffffff;
                }
            }
            .desc {
                position: relative;
                display: inline-block;
                vertical-align: top;
                margin: .12rem 0 0 .12rem;
                font-size: .1rem;
                color: rgba(255, 255, 255, 0.4);
                font-weight: 700;
                line-height: .24rem;
            }
        }
        .content-right {
            flex: 0 0 1.05rem;
            font-size: .12rem;
            font-weight: 700;
            background: #2b343c;
            color: rgba(255, 255, 255, 0.4);
            line-height: .48rem;
            text-align: center;
            &.enough {
                background: #00b43c;
                color: white
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            left: .32rem;
            bottom: .22rem;
            z-index: 200;
            &.drop-enter, &.drop-enter-active {
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
                .inner {
                    @include hl(.16rem);
                    @include borderRadius(50%);
                    background: rgb(0, 160, 220);
                    transition: all 0.4s linear;
                }
            }
        }
    }
    .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: #ffffff;
        transform: translate3d(0, -100%, 0);
        z-index: -1;
        &.transHeight-enter-active, &.transHeight-leave-active {
            transition: all 0.5s;
        }
        &.transHeight-enter, &.transHeight-leave-active {
            transform: translate3d(0, 0, 0);
        }
        .list-header {
            @include hl(.4rem);
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .title {
                display: inline-block;
                font-size: .14rem;
                font-weight: 200;
                color: rgb(7, 17, 27);
                padding-left: .18rem;
            }
            .empty {
                position: absolute;
                right: .08rem;
                font-size: .12rem;
                color: rgb(0, 160, 220);
                padding: 0 .1rem;
            }
        }
        .list-content {
            max-height: 2.17rem;
            overflow: hidden;
            .food {
                position: relative;
                display: flex;
                height: .48rem;
                margin: 0 .18rem;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .name {
                    flex: 1;
                    font-size: .14rem;
                    color: rgb(7, 17, 27);
                    line-height: .48rem;
                    font-weight: 700;
                }
                .price {
                    font-size: .14rem;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                    padding: 0 .12rem 0 .18rem;
                    line-height: .48rem;
                }
                .cartcontrol-wrapper {
                    font-size: .14rem;
                    margin-top: .06rem;
                }
            }
        }
    }
}
.backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
    z-index: 40;
    &.fade-backdrop-enter-active, &.fade-backdrop-leave-active {
        transition: opacity .5s;
    }
    &.fade-backdrop-enter, &.fade-backdrop-leave-active {
        opacity: 0;
    }
}
</style>
<style scoped>
@import 'http://at.alicdn.com/t/font_1126811_q8yl418aul.css';
</style>
