<template>
    <div class="cartcontrol">
        <transition name="fadeRotate">
            <div
            @click="decreaseCart()"
            class="cart-decrease"
            v-show="food.count > 0"
            >
            <span class="iconfont icon-decrease inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">
            {{food.count}}
        </div>
        <div class="cart-add" @click="addCart($event)">
            <i class="iconfont icon-add"></i>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
    name: 'cartcontrol',
    props: {
        food: Object
    },
    methods: {
        addCart (event) {
            if (!event._constructed) { //如果不存在这个属性，则为原生点击事件，不执行下面的函数
                return
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 0)
            }
            this.food.count++
            this.$root.eventHub.$emit('cart.add', event.target)
        },
        decreaseCart () {
            if (this.food.count === 0) {
                return
            }
            this.food.count--
        }
    }
}
</script>
<style lang="scss" scoped>
.cartcontrol {
    display: flex;
    align-items: center;
    .cart-decrease {
        display: inline-block;
        padding: .06rem;
        transition: all .4s linear;
        .inner {
            display: inline-block;
            line-height: .24rem;
            font-size: .24rem;
            color: rgb(0, 160, 220);
            transition: all .4s linear;
        }
        &.fadeRotate-enter-active, &.fadeRotate-leave-active {
            transform: translate3d(0, 0, 0);
            .inner {
                display: inline-block;
                transform: rotate(0);
            }
        }
        &.fadeRotate-enter, &.fadeRotate-leave-active {
            opacity: 0;
            transform: translate3d(.24rem, 0 , 0);
            .inner {
                transform: rotate(180deg);
            }
        }
    }
    .cart-count {
        display: inline-block;
        vertical-align: top;
        font-size: .12rem;
        color: rgb(147, 153, 159);
        line-height: .24rem;
        text-align: center;
        padding: .06rem 0;
    }
    .cart-add {
        display: inline-block;
        vertical-align: top;
        font-size: .24rem;
        color: rgb(0, 160, 220);
        line-height: .24rem;
        padding: .06rem;
        .iconfont {
            font-size: .22rem;
        }
    }
}
</style>
<style scoped>
@import 'http://at.alicdn.com/t/font_1126811_y8o5nbga5cj.css';
</style>