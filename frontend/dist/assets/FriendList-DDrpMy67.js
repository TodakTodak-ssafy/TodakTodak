import{_ as S,u as L,a as M,s as y,r as a,o as I,f as q,c as B,b as x,d,e as _,g as o,h as V,i as D,w as p,v as N,j as P,F as T,k as $,t as j,l as E,p as Q,m as U,n as z,q as A,x as G,y as H}from"./index-DbNk5dX1.js";import{c as J}from"./chat-Svslfgh5.js";const n=c=>(Q("data-v-c34afc58"),c=c(),U(),c),K={class:"friend-list container mt-5"},O={class:"friend-header"},W=n(()=>o("div",{class:"friend"},"친구",-1)),X={class:"friend-buttons"},Y=n(()=>o("div",{class:"search"},[o("img",{src:z,alt:""})],-1)),Z=[Y],ee=n(()=>o("img",{src:A,alt:""},null,-1)),oe=[ee],se={class:"friend-search mb-3"},te={class:"list-group"},ae=["onClick"],ne={class:"friend-item"},ce=n(()=>o("img",{src:G,alt:"프로필 이미지",class:"profile-image mr-2"},null,-1)),le={class:"profile-nickname"},ie={class:"buttons"},re=["onClick"],de=n(()=>o("img",{src:H,alt:""},null,-1)),ue=[de],me={__name:"FriendList",setup(c){const u=L(),v=M();y(v);const g=a(null),l=a(!1),i=a(""),h=a([]),m=a("");I(()=>{f()});const f=()=>{console.log("친구 목록 가져오기"),q(({data:e})=>{console.log("친구 목록 리스트"),console.log(e),h.value=e},e=>{console.log(e)})},k=e=>{console.log("보내기 전 닉네임:",e.nickname),u.push({name:"FriendProfile",params:{nickname:e.nickname}}),console.log("보낸 후 닉네임:",e.nickname)},C=B(()=>h.value.filter(e=>e.nickname.toLowerCase().includes(i.value.toLowerCase()))),b=e=>{g.value=e,console.log(e);const r=a({title:e.nickname+"의 대화방",receiver:e.nickname});J(r.value,t=>{console.log(t.data);let s="채팅방 생성에 문제 발생했습니다";console.log(t.data),t.status==200?(s="채팅방 입장 완료되었습니다.",console.log(t.data),m.value=t.data.chatRoomId,console.log(m.value),alert(s),u.push({name:"chat-view",params:{roomid:m.value}})):alert(s)},t=>console.error(t))},w=()=>{u.push("/friendRequestList")},R=()=>{l.value=!l.value,l.value||(i.value="")};return(e,r)=>{const t=x("CreateRoomModal");return d(),_("div",K,[o("div",O,[W,o("div",X,[o("button",{class:"create-chat-button btn",onClick:R},Z),o("button",{class:"create-chat-button btn",onClick:w},oe),e.showModal?(d(),V(t,{key:0,onClose:e.closeCreateRoomModal,onCreate:e.createRoom},null,8,["onClose","onCreate"])):D("",!0)])]),p(o("div",se,[p(o("input",{"onUpdate:modelValue":r[0]||(r[0]=s=>i.value=s),type:"text",class:"form-control",placeholder:"친구 검색"},null,512),[[P,i.value]])],512),[[N,l.value]]),o("ul",te,[(d(!0),_(T,null,$(C.value,s=>(d(),_("li",{key:s.id,class:"list-group-item",onClick:F=>k(s)},[o("div",ne,[ce,o("span",le,j(s.nickname),1)]),o("div",ie,[o("button",{class:"btn btn-sm",onClick:E(F=>b(s),["stop"])},ue,8,re)])],8,ae))),128))])])}}},pe=S(me,[["__scopeId","data-v-c34afc58"]]);export{pe as default};
