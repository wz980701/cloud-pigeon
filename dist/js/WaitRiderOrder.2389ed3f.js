(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["WaitRiderOrder"],{"3ecf":function(t,i,e){"use strict";var s=e("cca7"),a=e.n(s);a.a},"495c":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{ref:"wro_page",staticClass:"wro_page"},[e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(i){t.isLoading=i},expression:"isLoading"}},[e("van-loading",{directives:[{name:"show",rawName:"v-show",value:!t.isInit,expression:"!isInit"}],staticClass:"wro_loading"}),e("div",{staticClass:"wro_district"},t._l(t.districtList,function(i,s){return e("div",{key:s,staticClass:"wro_district-item",on:{click:function(i){return t.ToActive(t.districtList,s)}}},[e("div",{class:{active:i.active}},[t._v(t._s(i.text))])])}),0),e("ul",{ref:"wro_list",staticClass:"wro_list"},t._l(t.askOrderList,function(t,i){return e("orderItem",{key:i,tag:"li",attrs:{data:t,riderWait:"未送达"}})}),1)],1)],1)},a=[],r=(e("ac6a"),e("2b0e")),c=e("1fba"),n=e("9e6f"),o=e("f20c"),d=e("8c7f"),l=e("b970");r["a"].use(l["c"]),r["a"].use(l["b"]);var u={name:"WaitRiderOrder",data:function(){return{isInit:!1,isLoading:!1,askOrderList:[],districtList:[{text:"全部",active:!0,district:""},{text:"西区",active:!1,district:"西区"},{text:"北区",active:!1,district:"北区"},{text:"南区",active:!1,district:"南区"}],params:null}},created:function(){var t=this;Object(o["h"])(),this._initWebsocket(),this._getList(this.districtList[0].district),this.$nextTick(function(){t._initScroll()})},methods:{_initScroll:function(){this.wro_page=new c["a"](this.$refs.wro_page,{click:!0})},_initWebsocket:function(){var t=this,i="ws://101.132.181.245:9501";this.websocket=new WebSocket(i),this.websocket.onopen=function(){Object(o["o"])(t.websocket)},this.websocket.onclose=function(){console.log("Disconnected")},this.websocket.onmessage=function(i){var e=JSON.parse(i.data);t.getDelivery(e),console.log("Retrieved data from server: "+e.message)},this.websocket.onerror=function(t){console.log("Error occured: "+t.data)}},getDelivery:function(t){if("delivery"==t.message){var i=JSON.parse(Object(o["g"])("accept_order"));this.askOrderList.unshift(i)}},ToDetail:function(t){Object(o["m"])("order_id",this.askOrderList[t].serial_id),this.$router.push("/riderOrderDetail")},onRefresh:function(){var t=this;setTimeout(function(){t.$toast("刷新成功"),t.isLoading=!1,Object(d["j"])(t.params).then(function(i){t.askOrderList=Object(o["b"])(i)}).catch(function(){}),t.$nextTick(function(){t._initScroll()})},500)},ToActive:function(t,i){this._getList(this.districtList[i].district),t.forEach(function(t){t.active=!1}),t[i].active=!0},_getList:function(t){var i=this;this.params=""==t?{status:"已接单"}:{status:"已接单",district:t},Object(d["j"])(this.params).then(function(t){i.askOrderList=Object(o["b"])(t)}).catch(function(){l["a"].alert({message:"获取列表失败"})}),this.isInit=!0},RouteTo:o["a"]},components:{orderItem:n["a"]}},f=u,_=(e("914b"),e("2877")),p=Object(_["a"])(f,s,a,!1,null,"1807ead7",null);i["default"]=p.exports},"914b":function(t,i,e){"use strict";var s=e("b4c5"),a=e.n(s);a.a},"9e6f":function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"item",on:{click:t.ToDetail}},[e("div",{staticClass:"item_head"},[t._m(0),e("p",{staticClass:"order_id"},[t._v("订单编号："+t._s(t.data.timestamp+""+t.data.serial_id))]),t.ask||t.wait||t.riderAsk||t.riderPast||t.riderWait?e("p",{staticClass:"order_status"},[t._v(t._s(t.data.status))]):t._e()]),e("div",{staticClass:"item_line"}),e("div",{staticClass:"item_content"},[e("p",{staticClass:"time"},[t._v("下单时间："+t._s(t.data.created_at))]),e("p",{staticClass:"location"},[t._v("地址："+t._s(t.data.district+t.data.dormtype+t.data.building+"栋"+t.data.dorm))]),t.wait||t.finish?e("p",{staticClass:"phone"},[t._v("云鸽电话： "+t._s(t.data.deliveryphone))]):t._e(),t.riderAsk||t.riderPast||t.riderWait?e("p",{staticClass:"phone"},[t._v("用户电话： "+t._s(t.data.userphone))]):t._e(),t.wait?e("p",{staticClass:"arrive_time"},[t._v("预计"+t._s(t.data.time)+"分钟到达")]):t._e(),t.finish?e("p",{staticClass:"finish_text"},[t._v("已完成")]):t._e(),t.cancel?e("p",{staticClass:"cancel_text"},[t._v("已取消")]):t._e(),t.ask?e("input",{ref:"cancel_btn",staticClass:"cancel_btn",attrs:{type:"button",value:"取消订单"},on:{click:function(i){return i.stopPropagation(),t.ToCancel(i)}}}):t._e(),t.riderAsk?e("input",{ref:"accept_btn",staticClass:"accept_btn",attrs:{type:"button",value:"接单"},on:{click:function(i){return i.stopPropagation(),t.ToAccept(i)}}}):t._e()]),t.wait?e("input",{staticClass:"confirm_btn",attrs:{type:"button",value:"确认送达"},on:{click:function(i){return i.stopPropagation(),t.ToConfirmOrder(i)}}}):t._e()])])},a=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"img_wrapper"},[s("img",{attrs:{src:e("d7db"),alt:"dinning_room"}})])}],r=e("f20c"),c={name:"Item",props:["data","wait","ask","finish","cancel","riderAsk","riderPast","riderWait"],methods:{ToConfirmOrder:function(){this.$emit("ToConfirmOrder")},ToDetail:function(){Object(r["m"])("order_id",this.data.serial_id),this.$router.push("/orderDetail")},ToCancel:function(){this.$emit("ToCancel")},ToAccept:function(){this.$emit("ToAccept")}}},n=c,o=(e("3ecf"),e("2877")),d=Object(o["a"])(n,s,a,!1,null,"289acd49",null);i["a"]=d.exports},b4c5:function(t,i,e){},cca7:function(t,i,e){},d7db:function(t,i,e){t.exports=e.p+"img/head.ff86e3ae.jpg"}}]);
//# sourceMappingURL=WaitRiderOrder.2389ed3f.js.map