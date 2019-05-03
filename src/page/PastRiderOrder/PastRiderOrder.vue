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
                is="orderItem"
                v-for="(item, index) in askOrderList"
                :key="index"
                :data="item"
                riderPast="已送达"
                >
                </li>
            </ul>
        </van-pull-refresh>
    </div>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import orderItem from 'components/Item/Item.vue'
import { RouteTo, setSessionStore, _initList } from 'js/common.js'
import { orderList } from 'js/api.js'
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
                orderList(this.params).then((res) => {
                this.askOrderList = _initList(res)
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
            orderList(this.params).then((res) => {
                this.askOrderList = _initList(res)
            }).catch(() => {
                Dialog.alert({
                    message: '获取列表失败'
                })
            })
            this.isInit = true
        },
        RouteTo: RouteTo
    },
    components: {
        orderItem
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
        min-height: 5rem;
    }
}
</style>
