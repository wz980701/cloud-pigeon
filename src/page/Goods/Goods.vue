<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li
                v-for="(item, index) in goods"
                :key="index"
                data-stallId="item.stall_id"
                @click="menuClick(index, $event)"
                :class="index == menuIndex ? 'menu-item-selected' : 'menu-item'"
                >
                <span class="text">
                    {{item.stall_name}}
                </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
            <ul>
                <li
                v-for="(item, index) in goods"
                class="food-list food-list-hook"
                :key="index">
                    <h1>{{item.stall_name}}</h1>
                    <ul>
                        <li
                        v-for="(food, index) in item.foods"
                        data-id="food.id"
                        class="food-item"
                        :key="index"
                        >
                            <div class="icon">
                                <img
                                src="../../common/images/fourth.jpg"
                                alt="food_icon"
                                width="57"
                                height="57">
                            </div>
                            <div class="content">
                                <h2>{{food.food}}</h2>
                                <div class="price">
                                    <span class="newPrice">
                                        <span class="unit">￥</span>
                                        {{food.price}}
                                    </span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopCart
        :minPrice="minPrice"
        :selectFoods="selectFoods"
        ></shopCart>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import shopCart from '../shopCart/shopCart'
import cartcontrol from '../cartcontrol/carcontrol'
import { Dialog } from 'vant'
import { getSessionStore, setSessionStore } from 'js/common.js'

export default {
    name: 'Goods',
    data () {
        return {
            goods: [],
            listHeight: [],
            foodsScrollY: 0,
            selectedFood: '',
            minPrice: 3,
            menuIndex: 0
        }
    },
    created () {
        if (!JSON.parse(getSessionStore('good_list'))) {
            this.axios.get('/recipe/all').then((res) => {
            this.goods = [...res.data.data]
            setSessionStore('good_list', JSON.stringify(this.goods))
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
                this._calculateHeight() //初始化列表高度列表
            })
        }).catch(() => {
            Dialog.alert({
                message: '获取列表失败'
            })
        })
        } else {
            this.goods = [...JSON.parse(getSessionStore('good_list'))]
            this.$nextTick(() => {
                this._initScroll() //初始化scroll
                this._calculateHeight() //初始化列表高度列表
            })
        }
    },
    computed: {
        selectFoods () {
            let foods = []
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                if (food.count) {
                    foods.push(food)
                }
                })
            })
            return foods
        }
    },
    methods: {
        _initScroll () {
            this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
                click: true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            })
            this.foodsScroll.on('scroll', (pos) => { //监控滚动事件
                this.foodsScrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculateHeight () {
            let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
            let height = 0
            this.listHeight.push(height)
            for (let i = 0, l = foodList.length; i < l; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        menuClick (index, event) {
            if (!event._constructed) {
                return
            }
            this.menuIndex = index
            this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
        }
    },
    components: {
        shopCart,
        cartcontrol
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/mixin.scss';
@import 'sass/base.scss';
.goods {
    display: flex;
    position: absolute;
    top: 1.54rem;
    bottom: .46rem;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 .8rem;
        width: .8rem;
        background-color: $background-color;
        font-size: .14rem;
        // margin-top: .02rem;
        .menu-item-selected {
            background-color: #ffffff;
            font-weight: 700;
            margin-top: -.01rem;
        }
        .menu-item, .menu-item-selected {
            position: relative;
            display: table;
            height: .5rem;
            line-height: .5rem;
            width: .56rem;
            padding: 0 .12rem;
            &:last-child:after {
                content: none;
            }
        }
        .menu-item:after {
            position: absolute;
            content: '';
            left: .12rem;
            width: .56rem;
            bottom: 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .text {
                display: table-cell;
                vertical-align: middle;
                font-size: .12rem;
                font-weight: 200;
                white-space: normal;
                line-height: .14rem;
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        margin-top: .02rem;
        .food-list {
            h1 {
                @include hl(.26rem);
                padding-left: .12rem;
                font-size: .12rem;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
                border-left: 2px solid #d9dde1;
            }
            .food-item {
                position: relative;
                display: flex;
                margin: 0 .18rem;
                padding: .18rem 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .icon {
                    flex: 0 0 .57rem;
                }
                &:last-child {
                    border-bottom: none;
                }
                .content {
                    flex: 1;
                    padding-left: .1rem;
                    h2 {
                        margin: .02rem 0 .08rem 0;
                        font-size: .14rem;
                        @include hl(.2rem);
                        font-weight: 700;
                        color: rgb(7, 17, 27);
                    }
                    .price {
                        font-size: .1rem;
                        font-weight: 700;
                        line-height: .24rem;
                        margin-top: .3rem;
                        .newPrice {
                            font-size: .14rem;
                            color: rgb(240, 20, 20);
                            .unit {
                                font-size: .1rem;
                                font-weight: normal;
                            }
                        }
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: .12rem;
                        z-index: 20;
                    }
                }
            }
        }
    }
}
</style>
