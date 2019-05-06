import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = r => require.ensure([], () => r(require('../page/Index/Index.vue')), 'Index')
const RiderRegist = r => require.ensure([], () => r(require('../page/RiderRegist/RiderRegist.vue')), 'RiderRegist')
const StudentRegist = r => require.ensure([], () => r(require('../page/StudentRegist/StudentRegist.vue')), 'StudentRegist')
const Login = r => require.ensure([], () => r(require('../page/Login/Login.vue')), 'Login')
const Home = r => require.ensure([], () => r(require('../page/Home/Home.vue')), 'Home')
const Order = r => require.ensure([], () => r(require('../page/Order/Order.vue')), 'Order')
const My = r => require.ensure([], () => r(require('../page/My/My.vue')), 'My')
const Shop = r => require.ensure([], () => r(require('../page/Shop/Shop.vue')), 'Shop')
const WaitOrder = r => require.ensure([], () => r(require('../page/WaitOrder/WaitOrder.vue')), 'WaitOrder')
const AskOrder = r => require.ensure([], () => r(require('../page/AskOrder/AskOrder.vue')), 'AskOrder')
const CancelOrder = r => require.ensure([], () => r(require('../page/CancelOrder/CancelOrder.vue')), 'CancelOrder')
const FinishOrder = r => require.ensure([], () => r(require('../page/FinishOrder/FinishOrder.vue')), 'FinishOrder')
const ModifyLocation = r => require.ensure([], () => r(require('../page/ModifyLocation/ModifyLocation.vue')), 'ModifyLocation')
const RiderOrder = r => require.ensure([], () => r(require('../page/RiderOrder/RiderOrder.vue')), 'RiderOrder')
const WaitRiderOrder = r => require.ensure([], () => r(require('../page/WaitRiderOrder/WaitRiderOrder.vue')), 'WaitRiderOrder')
const PastRiderOrder = r => require.ensure([], () => r(require('../page/PastRiderOrder/PastRiderOrder.vue')), 'PastRiderOrder')
const AskRiderOrder = r => require.ensure([], () => r(require('../page/AskRiderOrder/AskRiderOrder.vue')), 'AskRiderOrder')
const OrderDetail = r => require.ensure([], () => r(require('../page/OrderDetail/OrderDetail.vue')), 'OrderDetail')
const Goods = r => require.ensure([], () => r(require('../page/Goods/Goods.vue')), 'Goods')
const Help = r => require.ensure([], () => r(require('../page/Help/Help.vue')), 'Help')
const Contact = r => require.ensure([], () => r(require('../page/Contact/Contact.vue')), 'Contact')
const Info = r => require.ensure([], () => r(require('../page/Info/Info.vue')), 'Info')

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: Index
        },
        {
            path: '/riderRegist',
            component: RiderRegist
        },
        {
            path: '/studentRegist',
            component: StudentRegist
        },
        {
            path: '/riderLogin',
            component: Login
        },
        {
            path: '/studentLogin',
            component: Login
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/order',
            component: Order,
            redirect: '/askOrder',
            children: [
                {
                    path: '/waitOrder',
                    component: WaitOrder,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/askOrder',
                    component: AskOrder,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/cancelOrder',
                    component: CancelOrder,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/finishOrder',
                    component: FinishOrder,
                    meta: {
                        keepAlive: true
                    }
                }
            ]
        },
        {
            path: '/my',
            component: My
        },
        {
            path: '/shop',
            component: Shop,
            redirect: '/goods',
            meta: {
                keepAlive: true
            },
            children: [
                {
                    path: '/goods',
                    component: Goods
                }
            ]
        },
        {
            path: '/modifyLocation',
            component: ModifyLocation
        },
        {
            path: '/riderOrder',
            component: RiderOrder,
            redirect: '/askRiderOrder',
            children: [
                {
                    path: '/waitRiderOrder',
                    component: WaitRiderOrder,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/askRiderOrder',
                    component: AskRiderOrder,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/pastRiderOrder',
                    component: PastRiderOrder,
                    meta: {
                        keepAlive: true
                    }
                }
            ]
        },
        {
            path: '/orderDetail',
            component: OrderDetail
        },
        {
            path: '/help',
            component: Help
        },
        {
            path: '/contact',
            component: Contact
        },
        {
            path: '/riderOrderDetail',
            component: OrderDetail
        },
        {
            path: '/info',
            component: Info
        }
    ]
})
