import Vue from 'vue'

export function RouteTo (route) { //跳转页面
    this.$router.push(route)
}

export function setLocalStore (key, value) { //设置localstorage
    localStorage.setItem(key, value)
}

export function getLocalStore (key) {  //读取localstorage
    return localStorage.getItem(key)
}

export function setSessionStore (key, value) { //设置sessionstorage
    sessionStorage.setItem(key, value)
}

export function getSessionStore (key) {  //读取sessionstorage
    return sessionStorage.getItem(key)
}

export function setCookie (cname, cvalue, exdays) { //设置cookie
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function getCookie (cname) { //获取cookie
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

export function isEmpty (value) { //判断数组是否为空
    return Array.isArray(value) && value.length === 0
}

export function timestampToTime(timestamp) { //转化时间戳
    var date = new Date(timestamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): date.getMonth() + 1) + '-';
    var D = pad(date.getDate()) + '  ';
    var h = pad(date.getHours()) + ':';
    var m = pad(date.getMinutes()) + ':';
    var s = pad(date.getSeconds());
    return Y + M + D + h+ m + s;
}

export function timestampToExpectedTime (timestamp) { //转化预计到达时间
    var date = new Date(timestamp * 1000);
    var om = date.getMinutes() + 30; //下单时间加上30分钟
    var oh = date.getHours();
    if (om > 60) { //如果加上30分钟后超过60分钟则减去60分钟，并且Hour加1
        om = om - 60;
        oh = oh + 1;
    }
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): date.getMonth() + 1) + '-';
    var D = pad(date.getDate()) + '  ';
    var h = pad(oh) + ':';
    var m = pad(om) + ':';
    var s = pad(date.getSeconds());
    return Y + M + D + h+ m + s;
}

export function webCloseLink(WebSocketId){
    WebSocketId.send("心跳包内容")
    // 每个15秒发送一次心跳包
    let hb = setInterval(()=>{
    WebSocketId.send("心跳包内容")
    // 检测到websocket连接断开
        if(WebSocketId.readyState == 2 || WebSocketId.readyState == 3){
            clearInterval(this.hb)
            let i = 1
            let myVar = setInterval(()=>{
                if(WebSocketId.readyState == 2 || WebSocketId.readyState == 3){
                    // 重新new一个websocket的连接
                    this.websocket = new WebSocket(WebSocketId.url);
                    WebSocketId = this.websocket;
                    if(i == 5){
                        clearInterval(myVar);
                        // location.reload();
                            return
                    }
                    i++
                    }   else if(WebSocketId.readyState == 1){ // websocket重连成功
                        this._initWebsocket();
                        clearInterval(hb)
                        clearInterval(myVar)
                    }
                },4*1000)
            }
        }, 15000)
}

export function getFormdata (data) {    //获取formdata
    let formdata = new FormData()
    const _formdata = data
    for (let key in _formdata) {
        formdata.append(key, _formdata[key])
    }
    return formdata
}

export function getSerialId (time, id) {    //获取拼接后的订单ID，用于微信
    return (100000000000000 + id) + "" + time
}

export function get (url, params = {}) {    //发起get请求
    return Vue.axios.get(url, { params })
}

export function post (url, formdata) {  //发起post请求
    return Vue.axios.post(url, formdata)
}

export function _initList (res) {   //初始化订单列表数据
    const data = res.data.data
    data.forEach((item) => {
        item.timestamp = item.created_at
        if (item.status === '未接单') {
            item.order_id = getSerialId(item.timestamp, item.serial_id)
        } else if (item.status === '已接单') {
            item.time = timestampToExpectedTime(item.created_at)
        }
        item.created_at = timestampToTime(item.created_at)
    })
    return data
}

export function hideMenu () {
    function onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu');
    }
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
}

export function pad (n) {   //如果月，日，时，分，秒小于10的话则加上前导零
    return (n < 10) ? ("0" + n) : n;
}

