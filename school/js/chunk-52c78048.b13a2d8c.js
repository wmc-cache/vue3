(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52c78048"],{"0f7d":function(e,t,n){"use strict";n("1310")},1310:function(e,t,n){},"73cf":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),r={style:{width:"500px",margin:"auto"}},o=Object(a["createTextVNode"])("注册");function u(e,t,n,u,c,s){var l=Object(a["resolveComponent"])("a-input"),i=Object(a["resolveComponent"])("a-button");return Object(a["openBlock"])(),Object(a["createBlock"])("div",null,[Object(a["createVNode"])("div",r,[Object(a["createVNode"])(l,{style:{"margin-top":"80px"},placeholder:"用户名",value:c.username,"onUpdate:value":t[1]||(t[1]=function(e){return c.username=e})},null,8,["value"]),Object(a["createVNode"])(l,{style:{"margin-top":"80px"},placeholder:"密码",value:c.password,"onUpdate:value":t[2]||(t[2]=function(e){return c.password=e})},null,8,["value"]),Object(a["createVNode"])(i,{onClick:s.register,style:{"margin-top":"80px"}},{default:Object(a["withCtx"])((function(){return[o]})),_:1},8,["onClick"])])])}n("96cf");var c=n("1da1"),s=n("bc3a"),l=n.n(s),i={data:function(){return{username:null,password:null}},methods:{register:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.post("emulation/register",{username:e.username,password:e.password});case 2:n=t.sent,200==n.status&&(e.username="",e.password="",console.log(n.data),"用户已存在"==n.data.data&&alert("用户已存在"),"注册成功"==n.data.data&&alert("注册成功"));case 4:case"end":return t.stop()}}),t)})))()}}};n("0f7d");i.render=u;t["default"]=i}}]);
//# sourceMappingURL=chunk-52c78048.b13a2d8c.js.map