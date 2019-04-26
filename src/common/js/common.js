
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

export function isEmpty (value) { //判断数组是否为空
    return Array.isArray(value) && value.length === 0
}

export function timestampToTime(timestamp) { //转化时间戳
    var date = new Date(timestamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): date.getMonth() + 1) + '-';
    var D = date.getDate() + '  ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
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
    var D = date.getDate() + '  ';
    var h = oh + ':';
    var m = om + ':';
    var s = date.getSeconds();
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

export function getSerialId (time, id) {
    return (100000000000000 + id) + "" + time
}

