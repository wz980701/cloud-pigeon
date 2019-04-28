import { get, post } from './common'

export function login (formdata) {  //登录
    return post('/login', formdata)
}

export function regist (formdata) { //注册
    return post('/register', formdata)
}

export function orderList (params) {    //订单列表
    return get('/order/refresh', params)
}

export function changeAddress (params) {    //改变配送地址
    return get('/user/changeAddress', params)
}

export function orderDetail (params) {  //订单详情
    return get('/order/detail', params)
}

export function logout () {   //登出
    return get('/logout')
}

export function generate (formdata) { //生成订单
    return post('/order/generate_wx', formdata)
}

export function confirm (params) {    //确认订单
    return get('/order/confirm', params)
}

export function cancel (params) {   //取消订单
    return get('/order/cancel_wx', params)
}

export function foodList () { //获取所有食物
    return get('/recipe/all')
}

export function checkWx (params) {  //检测微信支付接口
    return get('/wx/check', params)
}