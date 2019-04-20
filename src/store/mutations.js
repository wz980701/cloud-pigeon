import { setSessionStore } from 'js/common.js'

export default {
    record_orderId (state, orderId) { //存储订单ID
        state.order_id = orderId;
        setSessionStore('order_id', orderId) //session文件类型ID
    }
}