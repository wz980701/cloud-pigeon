(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["FinishOrder"],{2355:function(t,i,e){},"3ecf":function(t,i,e){"use strict";var a=e("cca7"),s=e.n(a);s.a},"7b13":function(t,i,e){"use strict";var a=e("2355"),s=e.n(a);s.a},"9e6f":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"item",on:{click:t.ToDetail}},[e("div",{staticClass:"item_head"},[t._m(0),e("p",{staticClass:"order_id"},[t._v("订单编号："+t._s(t.data.timestamp+""+t.data.serial_id))]),t.ask||t.wait||t.riderAsk||t.riderPast||t.riderWait?e("p",{staticClass:"order_status"},[t._v(t._s(t.data.status))]):t._e()]),e("div",{staticClass:"item_line"}),e("div",{staticClass:"item_content"},[e("p",{staticClass:"time"},[t._v("下单时间："+t._s(t.data.created_at))]),e("p",{staticClass:"location"},[t._v("地址："+t._s(t.data.district+t.data.dormtype+t.data.building+"栋"+t.data.dorm))]),t.wait||t.finish?e("p",{staticClass:"phone"},[t._v("云鸽电话： "+t._s(t.data.deliveryphone))]):t._e(),t.riderAsk||t.riderPast||t.riderWait?e("p",{staticClass:"phone"},[t._v("用户电话： "+t._s(t.data.userphone))]):t._e(),t.wait?e("p",{staticClass:"arrive_time"},[t._v("预计"+t._s(t.data.time)+"分钟到达")]):t._e(),t.finish?e("p",{staticClass:"finish_text"},[t._v("已完成")]):t._e(),t.cancel?e("p",{staticClass:"cancel_text"},[t._v("已取消")]):t._e(),t.ask?e("input",{ref:"cancel_btn",staticClass:"cancel_btn",attrs:{type:"button",value:"取消订单"},on:{click:function(i){return i.stopPropagation(),t.ToCancel(i)}}}):t._e(),t.riderAsk?e("input",{ref:"accept_btn",staticClass:"accept_btn",attrs:{type:"button",value:"接单"},on:{click:function(i){return i.stopPropagation(),t.ToAccept(i)}}}):t._e()]),t.wait?e("input",{staticClass:"confirm_btn",attrs:{type:"button",value:"确认送达"},on:{click:function(i){return i.stopPropagation(),t.ToConfirmOrder(i)}}}):t._e()])])},s=[function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"img_wrapper"},[a("img",{attrs:{src:e("d7db"),alt:"dinning_room"}})])}],n=e("f20c"),r={name:"Item",props:["data","wait","ask","finish","cancel","riderAsk","riderPast","riderWait"],methods:{ToConfirmOrder:function(){this.$emit("ToConfirmOrder")},ToDetail:function(){Object(n["m"])("order_id",this.data.serial_id),this.$router.push("/orderDetail")},ToCancel:function(){this.$emit("ToCancel")},ToAccept:function(){this.$emit("ToAccept")}}},c=r,o=(e("3ecf"),e("2877")),l=Object(o["a"])(c,a,s,!1,null,"289acd49",null);i["a"]=l.exports},abc7:function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{ref:"fo_page",staticClass:"fo_page"},[e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(i){t.isLoading=i},expression:"isLoading"}},[e("van-loading",{directives:[{name:"show",rawName:"v-show",value:!t.isInit,expression:"!isInit"}],staticClass:"fo_loading"}),e("ul",{ref:"fo_list",staticClass:"fo_list"},t._l(t.cancelOrderList,function(t,i){return e("orderItem",{key:i,tag:"li",attrs:{data:t,finish:"已完成"}})}),1)],1)],1)},s=[],n=e("1fba"),r=e("2b0e"),c=e("9e6f"),o=e("f20c"),l=e("8c7f"),d=e("b970");r["a"].use(d["c"]),r["a"].use(d["b"]);var u={name:"CancelOrder",data:function(){return{isInit:!1,isLoading:!1,cancelOrderList:[],params:null}},created:function(){var t=this;Object(o["h"])(),this.params={status:"已完成"},Object(l["j"])(this.params).then(function(i){t.cancelOrderList=Object(o["b"])(i),t.isInit=!0}),this.$nextTick(function(){t._initScroll()})},methods:{_initScroll:function(){this.fo_page=new n["a"](this.$refs.fo_page,{click:!0})},onRefresh:function(){var t=this;setTimeout(function(){t.$toast("刷新成功"),t.isLoading=!1,Object(l["j"])(t.params).then(function(i){t.cancelOrderList=Object(o["b"])(i)}).catch(function(t){alert(t)}),t.$nextTick(function(){t._initScroll()})},500)},ToDetail:function(t){Object(o["m"])("order_id",this.cancelOrderList[t].serial_id),this.$router.push("/orderDetail")},RouteTo:o["a"]},components:{orderItem:c["a"]}},f=u,_=(e("7b13"),e("2877")),p=Object(_["a"])(f,a,s,!1,null,"30816bee",null);i["default"]=p.exports},cca7:function(t,i,e){},d7db:function(t,i,e){t.exports=e.p+"img/head.ff86e3ae.jpg"}}]);
//# sourceMappingURL=FinishOrder.1f7c169b.js.map