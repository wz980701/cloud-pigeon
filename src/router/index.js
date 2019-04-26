import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../page/Index/Index.vue'
import RiderRegist from '../page/RiderRegist/RiderRegist.vue'
import StudentRegist from '../page/StudentRegist/StudentRegist.vue'
import Login from '../page/Login/Login.vue'
import Home from '../page/Home/Home.vue'
import Order from '../page/Order/Order.vue'
import My from '../page/My/My.vue'
import Shop from '../page/Shop/Shop.vue'
import WaitOrder from '../page/WaitOrder/WaitOrder.vue'
import AskOrder from '../page/AskOrder/AskOrder.vue'
import CancelOrder from '../page/CancelOrder/CancelOrder.vue'
import FinishOrder from '../page/FinishOrder/FinishOrder.vue'
import ModifyLocation from '../page/ModifyLocation/ModifyLocation.vue'
import RiderOrder from '../page/RiderOrder/RiderOrder.vue'
import WaitRiderOrder from '../page/WaitRiderOrder/WaitRiderOrder.vue'
import PastRiderOrder from '../page/PastRiderOrder/PastRiderOrder.vue'
import AskRiderOrder from '../page/AskRiderOrder/AskRiderOrder.vue'
import OrderDetail from '../page/OrderDetail/OrderDetail.vue'
import Goods from '../page/Goods/Goods.vue'
import Help from '../page/Help/Help.vue'
import Contact from '../page/Contact/Contact.vue'
import RiderOrderDetail from '../page/RiderOrderDetail/RiderOrderDetail.vue'
import Pay from '../page/Pay/Pay.vue'

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
                    component: WaitOrder
                },
                {
                    path: '/askOrder',
                    component: AskOrder
                },
                {
                    path: '/cancelOrder',
                    component: CancelOrder
                },
                {
                    path: '/finishOrder',
                    component: FinishOrder
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
            children: [
                {
                    path: '/goods',
                    component: Goods,
                    meta: {
                        keepAlive: true
                    }
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
            component: RiderOrderDetail
        },
        {
            path: '/pay',
            component: Pay
        }
    ]
})
