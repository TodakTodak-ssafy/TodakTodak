import{_ as S,u as L,a as M,s as y,r as n,o as I,f as q,c as B,b as x,d as i,e as m,g as e,h as V,i as D,w as p,v as N,j as P,F as T,k as U,t as $,l as j,p as E,m as Q,n as z,q as A,x as G,y as H}from"./index-DgxLkkPO.js";import{c as J}from"./chat-DEN4v2w8.js";const d=l=>(E("data-v-5fbec2e0"),l=l(),Q(),l),K={class:"friend-list container mt-5"},O={class:"friend-header"},W=d(()=>e("div",{class:"friend"},"친구",-1)),X={class:"friend-buttons"},Y=d(()=>e("div",{class:"search"},[e("img",{src:z,alt:""})],-1)),Z=[Y],ee=d(()=>e("img",{src:A,alt:""},null,-1)),se=[ee],oe={class:"friend-search mb-3"},te={class:"list-group"},ae=["onClick"],ne={class:"friend-item"},le=["src"],ce={class:"buttons"},re=["onClick"],ie=d(()=>e("img",{src:G,alt:""},null,-1)),de=[ie],ue={__name:"FriendList",setup(l){const u=L(),v=M();y(v);const f=n(null),c=n(!1),r=n(""),h=n([]),_=n("");I(()=>{g()});const g=()=>{console.log("친구 목록 가져오기"),q(({data:s})=>{console.log("친구 목록 리스트"),console.log(s),h.value=s},s=>{console.log(s)})},C=s=>{const t={path:"/friend-profile",component:H,props:{friend:s}};u.push(t)},b=B(()=>h.value.filter(s=>s.name.toLowerCase().includes(r.value.toLowerCase()))),k=s=>{f.value=s;const t={title:s.nickname+"의 대화방",receiver:s.nickname};J(t,a=>{let o="채팅방 생성에 문제 발생했습니다";a.status==200?(o="채팅방 입장 완료되었습니다.",_.value=a.data.chatRoomId,console.log(_.value),alert(o),u.push({name:"chat-view",params:{roomid:_.value}})):alert(o)},a=>console.error(a))},w=()=>{u.push("/friendRequestList")},R=()=>{c.value=!c.value,c.value||(r.value="")};return(s,t)=>{const a=x("CreateRoomModal");return i(),m("div",K,[e("div",O,[W,e("div",X,[e("button",{class:"create-chat-button btn",onClick:R},Z),e("button",{class:"create-chat-button btn",onClick:w},se),s.showModal?(i(),V(a,{key:0,onClose:s.closeCreateRoomModal,onCreate:s.createRoom},null,8,["onClose","onCreate"])):D("",!0)])]),p(e("div",oe,[p(e("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>r.value=o),type:"text",class:"form-control",placeholder:"친구 검색"},null,512),[[P,r.value]])],512),[[N,c.value]]),e("ul",te,[(i(!0),m(T,null,U(b.value,o=>(i(),m("li",{key:o.id,class:"list-group-item",onClick:F=>C(o)},[e("div",ne,[e("img",{src:o.profileUrl,alt:"프로필 이미지",class:"profile-image mr-2"},null,8,le),e("span",null,$(o.nickname),1)]),e("div",ce,[e("button",{class:"btn btn-sm",onClick:j(F=>k(o),["stop"])},de,8,re)])],8,ae))),128))])])}}},he=S(ue,[["__scopeId","data-v-5fbec2e0"]]);export{he as default};
