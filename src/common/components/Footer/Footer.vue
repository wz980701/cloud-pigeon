<template>
    <footer class="f_page">
        <div
        v-for="(item, index) in arr"
        :key="index"
        class="f_item home"
        @click="ToActive(index), LinkTo(item.path)"
        :class="{ active: currentIndex === index }"
        >
            <i :class="item.icon_class"></i>
            <p>{{item.text}}</p>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'footerBottom',
    data () {
        return {
            arr: [
                { icon_class: 'iconfont icon-home', text: '首页', path: '/home'},
                { icon_class: 'iconfont icon-order', text: '订单', path: '/order' },
                { icon_class: 'iconfont icon-my', text: '我的', path: '/my' }
            ]
        }
    },
    props: [
        'currentIndex'
    ],
    methods: {
        ToActive (index) {
            this.currentIndex = index
            if (index !== 1) {  //如果订单页跳转到其他页面，则移除订单页标签的active状态
                this.$emit('changeActive')
            }
        },
        LinkTo (path) {
            this.$router.push(path)
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'sass/base.scss';
.f_page {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: .6rem;
    background-color: #ffffff;
    .f_item {
        margin-top: .1rem;
        width: 33.333%;
        text-align: center;
        color: #535353;
        .iconfont {
            font-size: .2rem;
        }
    }
    .active {
        color: $theme-color;
    }
}
</style>
<style scoped>
@import 'http://at.alicdn.com/t/font_1126811_b8trfqed92m.css';
</style>
