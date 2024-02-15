import{C as $,_ as M,a as z,D as P,u as j,r as k,E as O,o as G,G as K,d as C,e as S,g as f,F as N,k as V,w as q,j as J,H as Q,I as W,t as U}from"./index-DbNk5dX1.js";import{a as Y}from"./chat-Svslfgh5.js";const w={LF:`
`,NULL:"\0"};class y{constructor(e){const{command:t,headers:s,body:n,binaryBody:i,escapeHeaderValues:r,skipContentLengthHeader:c}=e;this.command=t,this.headers=Object.assign({},s||{}),i?(this._binaryBody=i,this.isBinaryBody=!0):(this._body=n||"",this.isBinaryBody=!1),this.escapeHeaderValues=r||!1,this.skipContentLengthHeader=c||!1}get body(){return!this._body&&this.isBinaryBody&&(this._body=new TextDecoder().decode(this._binaryBody)),this._body||""}get binaryBody(){return!this._binaryBody&&!this.isBinaryBody&&(this._binaryBody=new TextEncoder().encode(this._body)),this._binaryBody}static fromRawFrame(e,t){const s={},n=i=>i.replace(/^\s+|\s+$/g,"");for(const i of e.headers.reverse()){i.indexOf(":");const r=n(i[0]);let c=n(i[1]);t&&e.command!=="CONNECT"&&e.command!=="CONNECTED"&&(c=y.hdrValueUnEscape(c)),s[r]=c}return new y({command:e.command,headers:s,binaryBody:e.binaryBody,escapeHeaderValues:t})}toString(){return this.serializeCmdAndHeaders()}serialize(){const e=this.serializeCmdAndHeaders();return this.isBinaryBody?y.toUnit8Array(e,this._binaryBody).buffer:e+this._body+w.NULL}serializeCmdAndHeaders(){const e=[this.command];this.skipContentLengthHeader&&delete this.headers["content-length"];for(const t of Object.keys(this.headers||{})){const s=this.headers[t];this.escapeHeaderValues&&this.command!=="CONNECT"&&this.command!=="CONNECTED"?e.push(`${t}:${y.hdrValueEscape(`${s}`)}`):e.push(`${t}:${s}`)}return(this.isBinaryBody||!this.isBodyEmpty()&&!this.skipContentLengthHeader)&&e.push(`content-length:${this.bodyLength()}`),e.join(w.LF)+w.LF+w.LF}isBodyEmpty(){return this.bodyLength()===0}bodyLength(){const e=this.binaryBody;return e?e.length:0}static sizeOfUTF8(e){return e?new TextEncoder().encode(e).length:0}static toUnit8Array(e,t){const s=new TextEncoder().encode(e),n=new Uint8Array([0]),i=new Uint8Array(s.length+t.length+n.length);return i.set(s),i.set(t,s.length),i.set(n,s.length+t.length),i}static marshall(e){return new y(e).serialize()}static hdrValueEscape(e){return e.replace(/\\/g,"\\\\").replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/:/g,"\\c")}static hdrValueUnEscape(e){return e.replace(/\\r/g,"\r").replace(/\\n/g,`
`).replace(/\\c/g,":").replace(/\\\\/g,"\\")}}const A=0,T=10,H=13,X=58;class Z{constructor(e,t){this.onFrame=e,this.onIncomingPing=t,this._encoder=new TextEncoder,this._decoder=new TextDecoder,this._token=[],this._initState()}parseChunk(e,t=!1){let s;if(typeof e=="string"?s=this._encoder.encode(e):s=new Uint8Array(e),t&&s[s.length-1]!==0){const n=new Uint8Array(s.length+1);n.set(s,0),n[s.length]=0,s=n}for(let n=0;n<s.length;n++){const i=s[n];this._onByte(i)}}_collectFrame(e){if(e!==A&&e!==H){if(e===T){this.onIncomingPing();return}this._onByte=this._collectCommand,this._reinjectByte(e)}}_collectCommand(e){if(e!==H){if(e===T){this._results.command=this._consumeTokenAsUTF8(),this._onByte=this._collectHeaders;return}this._consumeByte(e)}}_collectHeaders(e){if(e!==H){if(e===T){this._setupCollectBody();return}this._onByte=this._collectHeaderKey,this._reinjectByte(e)}}_reinjectByte(e){this._onByte(e)}_collectHeaderKey(e){if(e===X){this._headerKey=this._consumeTokenAsUTF8(),this._onByte=this._collectHeaderValue;return}this._consumeByte(e)}_collectHeaderValue(e){if(e!==H){if(e===T){this._results.headers.push([this._headerKey,this._consumeTokenAsUTF8()]),this._headerKey=void 0,this._onByte=this._collectHeaders;return}this._consumeByte(e)}}_setupCollectBody(){const e=this._results.headers.filter(t=>t[0]==="content-length")[0];e?(this._bodyBytesRemaining=parseInt(e[1],10),this._onByte=this._collectBodyFixedSize):this._onByte=this._collectBodyNullTerminated}_collectBodyNullTerminated(e){if(e===A){this._retrievedBody();return}this._consumeByte(e)}_collectBodyFixedSize(e){if(this._bodyBytesRemaining--===0){this._retrievedBody();return}this._consumeByte(e)}_retrievedBody(){this._results.binaryBody=this._consumeTokenAsRaw();try{this.onFrame(this._results)}catch(e){console.log("Ignoring an exception thrown by a frame handler. Original exception: ",e)}this._initState()}_consumeByte(e){this._token.push(e)}_consumeTokenAsUTF8(){return this._decoder.decode(this._consumeTokenAsRaw())}_consumeTokenAsRaw(){const e=new Uint8Array(this._token);return this._token=[],e}_initState(){this._results={command:void 0,headers:[],binaryBody:void 0},this._token=[],this._headerKey=void 0,this._onByte=this._collectFrame}}var p;(function(o){o[o.CONNECTING=0]="CONNECTING",o[o.OPEN=1]="OPEN",o[o.CLOSING=2]="CLOSING",o[o.CLOSED=3]="CLOSED"})(p=p||(p={}));var g;(function(o){o[o.ACTIVE=0]="ACTIVE",o[o.DEACTIVATING=1]="DEACTIVATING",o[o.INACTIVE=2]="INACTIVE"})(g=g||(g={}));class h{constructor(e){this.versions=e}supportedVersions(){return this.versions.join(",")}protocolVersions(){return this.versions.map(e=>`v${e.replace(".","")}.stomp`)}}h.V1_0="1.0";h.V1_1="1.1";h.V1_2="1.2";h.default=new h([h.V1_2,h.V1_1,h.V1_0]);function ee(o,e){o.terminate=function(){const t=()=>{};this.onerror=t,this.onmessage=t,this.onopen=t;const s=new Date,n=Math.random().toString().substring(2,8),i=this.onclose;this.onclose=r=>{const c=new Date().getTime()-s.getTime();e(`Discarded socket (#${n})  closed after ${c}ms, with code/reason: ${r.code}/${r.reason}`)},this.close(),i==null||i.call(o,{code:4001,reason:`Quick discarding socket (#${n}) without waiting for the shutdown sequence.`,wasClean:!1})}}class te{constructor(e,t,s){this._client=e,this._webSocket=t,this._connected=!1,this._serverFrameHandlers={CONNECTED:n=>{this.debug(`connected to server ${n.headers.server}`),this._connected=!0,this._connectedVersion=n.headers.version,this._connectedVersion===h.V1_2&&(this._escapeHeaderValues=!0),this._setupHeartbeat(n.headers),this.onConnect(n)},MESSAGE:n=>{const i=n.headers.subscription,r=this._subscriptions[i]||this.onUnhandledMessage,c=n,d=this,l=this._connectedVersion===h.V1_2?c.headers.ack:c.headers["message-id"];c.ack=(m={})=>d.ack(l,i,m),c.nack=(m={})=>d.nack(l,i,m),r(c)},RECEIPT:n=>{const i=this._receiptWatchers[n.headers["receipt-id"]];i?(i(n),delete this._receiptWatchers[n.headers["receipt-id"]]):this.onUnhandledReceipt(n)},ERROR:n=>{this.onStompError(n)}},this._counter=0,this._subscriptions={},this._receiptWatchers={},this._partialData="",this._escapeHeaderValues=!1,this._lastServerActivityTS=Date.now(),this.debug=s.debug,this.stompVersions=s.stompVersions,this.connectHeaders=s.connectHeaders,this.disconnectHeaders=s.disconnectHeaders,this.heartbeatIncoming=s.heartbeatIncoming,this.heartbeatOutgoing=s.heartbeatOutgoing,this.splitLargeFrames=s.splitLargeFrames,this.maxWebSocketChunkSize=s.maxWebSocketChunkSize,this.forceBinaryWSFrames=s.forceBinaryWSFrames,this.logRawCommunication=s.logRawCommunication,this.appendMissingNULLonIncoming=s.appendMissingNULLonIncoming,this.discardWebsocketOnCommFailure=s.discardWebsocketOnCommFailure,this.onConnect=s.onConnect,this.onDisconnect=s.onDisconnect,this.onStompError=s.onStompError,this.onWebSocketClose=s.onWebSocketClose,this.onWebSocketError=s.onWebSocketError,this.onUnhandledMessage=s.onUnhandledMessage,this.onUnhandledReceipt=s.onUnhandledReceipt,this.onUnhandledFrame=s.onUnhandledFrame}get connectedVersion(){return this._connectedVersion}get connected(){return this._connected}start(){const e=new Z(t=>{const s=y.fromRawFrame(t,this._escapeHeaderValues);this.logRawCommunication||this.debug(`<<< ${s}`),(this._serverFrameHandlers[s.command]||this.onUnhandledFrame)(s)},()=>{this.debug("<<< PONG")});this._webSocket.onmessage=t=>{if(this.debug("Received data"),this._lastServerActivityTS=Date.now(),this.logRawCommunication){const s=t.data instanceof ArrayBuffer?new TextDecoder().decode(t.data):t.data;this.debug(`<<< ${s}`)}e.parseChunk(t.data,this.appendMissingNULLonIncoming)},this._webSocket.onclose=t=>{this.debug(`Connection closed to ${this._webSocket.url}`),this._cleanUp(),this.onWebSocketClose(t)},this._webSocket.onerror=t=>{this.onWebSocketError(t)},this._webSocket.onopen=()=>{const t=Object.assign({},this.connectHeaders);this.debug("Web Socket Opened..."),t["accept-version"]=this.stompVersions.supportedVersions(),t["heart-beat"]=[this.heartbeatOutgoing,this.heartbeatIncoming].join(","),this._transmit({command:"CONNECT",headers:t})}}_setupHeartbeat(e){if(e.version!==h.V1_1&&e.version!==h.V1_2||!e["heart-beat"])return;const[t,s]=e["heart-beat"].split(",").map(n=>parseInt(n,10));if(this.heartbeatOutgoing!==0&&s!==0){const n=Math.max(this.heartbeatOutgoing,s);this.debug(`send PING every ${n}ms`),this._pinger=setInterval(()=>{this._webSocket.readyState===p.OPEN&&(this._webSocket.send(w.LF),this.debug(">>> PING"))},n)}if(this.heartbeatIncoming!==0&&t!==0){const n=Math.max(this.heartbeatIncoming,t);this.debug(`check PONG every ${n}ms`),this._ponger=setInterval(()=>{const i=Date.now()-this._lastServerActivityTS;i>n*2&&(this.debug(`did not receive server activity for the last ${i}ms`),this._closeOrDiscardWebsocket())},n)}}_closeOrDiscardWebsocket(){this.discardWebsocketOnCommFailure?(this.debug("Discarding websocket, the underlying socket may linger for a while"),this.discardWebsocket()):(this.debug("Issuing close on the websocket"),this._closeWebsocket())}forceDisconnect(){this._webSocket&&(this._webSocket.readyState===p.CONNECTING||this._webSocket.readyState===p.OPEN)&&this._closeOrDiscardWebsocket()}_closeWebsocket(){this._webSocket.onmessage=()=>{},this._webSocket.close()}discardWebsocket(){typeof this._webSocket.terminate!="function"&&ee(this._webSocket,e=>this.debug(e)),this._webSocket.terminate()}_transmit(e){const{command:t,headers:s,body:n,binaryBody:i,skipContentLengthHeader:r}=e,c=new y({command:t,headers:s,body:n,binaryBody:i,escapeHeaderValues:this._escapeHeaderValues,skipContentLengthHeader:r});let d=c.serialize();if(this.logRawCommunication?this.debug(`>>> ${d}`):this.debug(`>>> ${c}`),this.forceBinaryWSFrames&&typeof d=="string"&&(d=new TextEncoder().encode(d)),typeof d!="string"||!this.splitLargeFrames)this._webSocket.send(d);else{let l=d;for(;l.length>0;){const m=l.substring(0,this.maxWebSocketChunkSize);l=l.substring(this.maxWebSocketChunkSize),this._webSocket.send(m),this.debug(`chunk sent = ${m.length}, remaining = ${l.length}`)}}}dispose(){if(this.connected)try{const e=Object.assign({},this.disconnectHeaders);e.receipt||(e.receipt=`close-${this._counter++}`),this.watchForReceipt(e.receipt,t=>{this._closeWebsocket(),this._cleanUp(),this.onDisconnect(t)}),this._transmit({command:"DISCONNECT",headers:e})}catch(e){this.debug(`Ignoring error during disconnect ${e}`)}else(this._webSocket.readyState===p.CONNECTING||this._webSocket.readyState===p.OPEN)&&this._closeWebsocket()}_cleanUp(){this._connected=!1,this._pinger&&(clearInterval(this._pinger),this._pinger=void 0),this._ponger&&(clearInterval(this._ponger),this._ponger=void 0)}publish(e){const{destination:t,headers:s,body:n,binaryBody:i,skipContentLengthHeader:r}=e,c=Object.assign({destination:t},s);this._transmit({command:"SEND",headers:c,body:n,binaryBody:i,skipContentLengthHeader:r})}watchForReceipt(e,t){this._receiptWatchers[e]=t}subscribe(e,t,s={}){s=Object.assign({},s),s.id||(s.id=`sub-${this._counter++}`),s.destination=e,this._subscriptions[s.id]=t,this._transmit({command:"SUBSCRIBE",headers:s});const n=this;return{id:s.id,unsubscribe(i){return n.unsubscribe(s.id,i)}}}unsubscribe(e,t={}){t=Object.assign({},t),delete this._subscriptions[e],t.id=e,this._transmit({command:"UNSUBSCRIBE",headers:t})}begin(e){const t=e||`tx-${this._counter++}`;this._transmit({command:"BEGIN",headers:{transaction:t}});const s=this;return{id:t,commit(){s.commit(t)},abort(){s.abort(t)}}}commit(e){this._transmit({command:"COMMIT",headers:{transaction:e}})}abort(e){this._transmit({command:"ABORT",headers:{transaction:e}})}ack(e,t,s={}){s=Object.assign({},s),this._connectedVersion===h.V1_2?s.id=e:s["message-id"]=e,s.subscription=t,this._transmit({command:"ACK",headers:s})}nack(e,t,s={}){return s=Object.assign({},s),this._connectedVersion===h.V1_2?s.id=e:s["message-id"]=e,s.subscription=t,this._transmit({command:"NACK",headers:s})}}class se{constructor(e={}){this.stompVersions=h.default,this.connectionTimeout=0,this.reconnectDelay=5e3,this.heartbeatIncoming=1e4,this.heartbeatOutgoing=1e4,this.splitLargeFrames=!1,this.maxWebSocketChunkSize=8*1024,this.forceBinaryWSFrames=!1,this.appendMissingNULLonIncoming=!1,this.discardWebsocketOnCommFailure=!1,this.state=g.INACTIVE;const t=()=>{};this.debug=t,this.beforeConnect=t,this.onConnect=t,this.onDisconnect=t,this.onUnhandledMessage=t,this.onUnhandledReceipt=t,this.onUnhandledFrame=t,this.onStompError=t,this.onWebSocketClose=t,this.onWebSocketError=t,this.logRawCommunication=!1,this.onChangeState=t,this.connectHeaders={},this._disconnectHeaders={},this.configure(e)}get webSocket(){var e;return(e=this._stompHandler)==null?void 0:e._webSocket}get disconnectHeaders(){return this._disconnectHeaders}set disconnectHeaders(e){this._disconnectHeaders=e,this._stompHandler&&(this._stompHandler.disconnectHeaders=this._disconnectHeaders)}get connected(){return!!this._stompHandler&&this._stompHandler.connected}get connectedVersion(){return this._stompHandler?this._stompHandler.connectedVersion:void 0}get active(){return this.state===g.ACTIVE}_changeState(e){this.state=e,this.onChangeState(e)}configure(e){Object.assign(this,e)}activate(){const e=()=>{if(this.active){this.debug("Already ACTIVE, ignoring request to activate");return}this._changeState(g.ACTIVE),this._connect()};this.state===g.DEACTIVATING?(this.debug("Waiting for deactivation to finish before activating"),this.deactivate().then(()=>{e()})):e()}async _connect(){if(await this.beforeConnect(),this._stompHandler){this.debug("There is already a stompHandler, skipping the call to connect");return}if(!this.active){this.debug("Client has been marked inactive, will not attempt to connect");return}this.connectionTimeout>0&&(this._connectionWatcher&&clearTimeout(this._connectionWatcher),this._connectionWatcher=setTimeout(()=>{this.connected||(this.debug(`Connection not established in ${this.connectionTimeout}ms, closing socket`),this.forceDisconnect())},this.connectionTimeout)),this.debug("Opening Web Socket...");const e=this._createWebSocket();this._stompHandler=new te(this,e,{debug:this.debug,stompVersions:this.stompVersions,connectHeaders:this.connectHeaders,disconnectHeaders:this._disconnectHeaders,heartbeatIncoming:this.heartbeatIncoming,heartbeatOutgoing:this.heartbeatOutgoing,splitLargeFrames:this.splitLargeFrames,maxWebSocketChunkSize:this.maxWebSocketChunkSize,forceBinaryWSFrames:this.forceBinaryWSFrames,logRawCommunication:this.logRawCommunication,appendMissingNULLonIncoming:this.appendMissingNULLonIncoming,discardWebsocketOnCommFailure:this.discardWebsocketOnCommFailure,onConnect:t=>{if(this._connectionWatcher&&(clearTimeout(this._connectionWatcher),this._connectionWatcher=void 0),!this.active){this.debug("STOMP got connected while deactivate was issued, will disconnect now"),this._disposeStompHandler();return}this.onConnect(t)},onDisconnect:t=>{this.onDisconnect(t)},onStompError:t=>{this.onStompError(t)},onWebSocketClose:t=>{this._stompHandler=void 0,this.state===g.DEACTIVATING&&this._changeState(g.INACTIVE),this.onWebSocketClose(t),this.active&&this._schedule_reconnect()},onWebSocketError:t=>{this.onWebSocketError(t)},onUnhandledMessage:t=>{this.onUnhandledMessage(t)},onUnhandledReceipt:t=>{this.onUnhandledReceipt(t)},onUnhandledFrame:t=>{this.onUnhandledFrame(t)}}),this._stompHandler.start()}_createWebSocket(){let e;if(this.webSocketFactory)e=this.webSocketFactory();else if(this.brokerURL)e=new WebSocket(this.brokerURL,this.stompVersions.protocolVersions());else throw new Error("Either brokerURL or webSocketFactory must be provided");return e.binaryType="arraybuffer",e}_schedule_reconnect(){this.reconnectDelay>0&&(this.debug(`STOMP: scheduling reconnection in ${this.reconnectDelay}ms`),this._reconnector=setTimeout(()=>{this._connect()},this.reconnectDelay))}async deactivate(e={}){var i;const t=e.force||!1,s=this.active;let n;if(this.state===g.INACTIVE)return this.debug("Already INACTIVE, nothing more to do"),Promise.resolve();if(this._changeState(g.DEACTIVATING),this._reconnector&&(clearTimeout(this._reconnector),this._reconnector=void 0),this._stompHandler&&this.webSocket.readyState!==p.CLOSED){const r=this._stompHandler.onWebSocketClose;n=new Promise((c,d)=>{this._stompHandler.onWebSocketClose=l=>{r(l),c()}})}else return this._changeState(g.INACTIVE),Promise.resolve();return t?(i=this._stompHandler)==null||i.discardWebsocket():s&&this._disposeStompHandler(),n}forceDisconnect(){this._stompHandler&&this._stompHandler.forceDisconnect()}_disposeStompHandler(){this._stompHandler&&this._stompHandler.dispose()}publish(e){this._checkConnection(),this._stompHandler.publish(e)}_checkConnection(){if(!this.connected)throw new TypeError("There is no underlying STOMP connection")}watchForReceipt(e,t){this._checkConnection(),this._stompHandler.watchForReceipt(e,t)}subscribe(e,t,s={}){return this._checkConnection(),this._stompHandler.subscribe(e,t,s)}unsubscribe(e,t={}){this._checkConnection(),this._stompHandler.unsubscribe(e,t)}begin(e){return this._checkConnection(),this._stompHandler.begin(e)}commit(e){this._checkConnection(),this._stompHandler.commit(e)}abort(e){this._checkConnection(),this._stompHandler.abort(e)}ack(e,t,s={}){this._checkConnection(),this._stompHandler.ack(e,t,s)}nack(e,t,s={}){this._checkConnection(),this._stompHandler.nack(e,t,s)}}class ne{constructor(e){this.client=e}get outgoing(){return this.client.heartbeatOutgoing}set outgoing(e){this.client.heartbeatOutgoing=e}get incoming(){return this.client.heartbeatIncoming}set incoming(e){this.client.heartbeatIncoming=e}}class L extends se{constructor(e){super(),this.maxWebSocketFrameSize=16*1024,this._heartbeatInfo=new ne(this),this.reconnect_delay=0,this.webSocketFactory=e,this.debug=(...t)=>{console.log(...t)}}_parseConnect(...e){let t,s,n,i={};if(e.length<2)throw new Error("Connect requires at least 2 arguments");if(typeof e[1]=="function")[i,s,n,t]=e;else switch(e.length){case 6:[i.login,i.passcode,s,n,t,i.host]=e;break;default:[i.login,i.passcode,s,n,t]=e}return[i,s,n,t]}connect(...e){const t=this._parseConnect(...e);t[0]&&(this.connectHeaders=t[0]),t[1]&&(this.onConnect=t[1]),t[2]&&(this.onStompError=t[2]),t[3]&&(this.onWebSocketClose=t[3]),super.activate()}disconnect(e,t={}){e&&(this.onDisconnect=e),this.disconnectHeaders=t,super.deactivate()}send(e,t={},s=""){t=Object.assign({},t);const n=t["content-length"]===!1;n&&delete t["content-length"],this.publish({destination:e,headers:t,body:s,skipContentLengthHeader:n})}set reconnect_delay(e){this.reconnectDelay=e}get ws(){return this.webSocket}get version(){return this.connectedVersion}get onreceive(){return this.onUnhandledMessage}set onreceive(e){this.onUnhandledMessage=e}get onreceipt(){return this.onUnhandledReceipt}set onreceipt(e){this.onUnhandledReceipt=e}get heartbeat(){return this._heartbeatInfo}set heartbeat(e){this.heartbeatIncoming=e.incoming,this.heartbeatOutgoing=e.outgoing}}class I{static client(e,t){t==null&&(t=h.default.protocolVersions());const s=()=>{const n=I.WebSocketClass||WebSocket;return new n(e,t)};return new L(s)}static over(e){let t;return typeof e=="function"?t=e:(console.warn("Stomp.over did not receive a factory, auto reconnect will not work. Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over"),t=()=>e),new L(t)}}I.WebSocketClass=null;const F=$(),ie="/notifications";async function oe(o,e,t,s){F.defaults.headers.Authorization="Bearer "+localStorage.getItem("accessToken");try{const n={id:o,type:e,title:t,body:s},i=await F.post(ie,n);console.log("알림 전송 성공:",i.data)}catch(n){console.error("알림 전송 실패:",n)}}const ce={class:"chat-container"},re={class:"chat-messages",ref:"chatContainer",id:"chatContainer"},ae={class:"message"},he={class:"message"},de={class:"chat-input"},le={__name:"ChatDetail",setup(o){const e=z(),{getUserInfo:t}=e,s=P();j();const n=k([]),i=s.params.roomid,r=localStorage.getItem("accessToken"),c=k(null),d=k(null),l=k([]),m=k(null);O(null);let v=O(null);G(async()=>{let u=localStorage.getItem("accessToken");const a=await t(u);console.log(a),m.value=a,d.value=a.nickname,console.log(d.value),console.log(i),D(),x(),B()}),K(()=>{B()});const D=()=>{Y(i,({data:a})=>{console.log("roomid :",i),console.log("data : ",a),l.value=a,console.log("저장된 대화 : ",l.value)},a=>{console.error(a)})},B=()=>{const u=document.getElementById("chatContainer");u.scrollTop=u.scrollHeight},E=async u=>{c.value!==""&&(R(),c.value="",B()),await oe(1,0,"알림 제목","알림 내용")},R=()=>{console.log("Send message:"+c.value),console.log(i),console.log(m.value),console.log("로그인한 유저 닉네임"+m.value.nickname);const u={chatRoomId:i,sender:m.value.nickname,message:c.value,messageType:"TALK"};console.log(u),console.log(JSON.stringify(u)),v.send("/pub/chat/message",{Authorization:`Bearer ${r}`},JSON.stringify(u))},x=()=>{const u="wss://i10c210.p.ssafy.io/ws-stomp";v=I.client(u),console.log(`소켓 연결을 시도합니다. 서버 주소: ${u}`),v.connect({Authorization:"Bearer "+r},a=>{console.log("소켓 연결 성공",a),v.subscribe("/sub/chat/room/"+i,_=>{console.log("구독으로 받은 메시지 입니다.",_.body);const b=JSON.parse(_.body);console.log("수신 메시지: ",b),n.value.push({chatRoomId:b.chatRoomId,message:b.message,sender:b.sender,messageType:b.messageType})})},a=>{console.log("소켓 연결 실패",a)})};return(u,a)=>(C(),S("div",null,[f("div",ce,[f("div",re,[(C(!0),S(N,null,V(l.value,(_,b)=>(C(),S("div",{key:b,class:W(_.sender===m.value.nickname?"my-chat":"their-chat")},[f("div",ae,U(_.message),1)],2))),128)),(C(!0),S(N,null,V(n.value,(_,b)=>(C(),S("div",{key:b,class:W(_.sender===m.value.nickname?"my-chat":"their-chat")},[f("div",he,U(_.message),1)],2))),128))],512),f("div",de,[q(f("textarea",{style:{resize:"none"},"onUpdate:modelValue":a[0]||(a[0]=_=>c.value=_),placeholder:"메시지 입력",onKeydown:Q(E,["enter"])},null,544),[[J,c.value]]),f("button",{class:"input-button",onClick:E},"전송")])])]))}},_e=M(le,[["__scopeId","data-v-eeb2aea3"]]);export{_e as default};
