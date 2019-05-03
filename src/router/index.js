import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('../page/Index/Index.vue')
const RiderRegist = () => import('../page/RiderRegist/RiderRegist.vue')
const StudentRegist = () => import('../page/StudentRegist/StudentRegist.vue')
const Login = () => import('../page/Login/Login.vue')
const Home = () => import('../page/Home/Home.vue')
const Order = () => import('../page/Order/Order.vue')
const My = () => import('../page/My/My.vue')
const Shop = () => import('../page/Shop/Shop.vue')
const WaitOrder = () => import('../page/WaitOrder/WaitOrder.vue')
const AskOrder = () => import('../page/AskOrder/AskOrder.vue')
const CancelOrder = () => import('../page/CancelOrder/CancelOrder.vue')
const FinishOrder = () => import('../page/FinishOrder/FinishOrder.vue')
const ModifyLocation = () => import('../page/ModifyLocation/ModifyLocation.vue')
const RiderOrder = () => import('../page/RiderOrder/RiderOrder.vue')
const WaitRiderOrder = () => import('../page/WaitRiderOrder/WaitRiderOrder.vue')
const PastRiderOrder = () => import('../page/PastRiderOrder/PastRiderOrder.vue')
const AskRiderOrder = () => import('../page/AskRiderOrder/AskRiderOrder.vue')
const OrderDetail = () => import('../page/OrderDetail/OrderDetail.vue')
const Goods = () => import('../page/Goods/Goods.vue')
const Help = () => import('../page/Help/Help.vue')
const Contact = () => import('../page/Contact/Contact.vue')

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
        }
    ]
})
