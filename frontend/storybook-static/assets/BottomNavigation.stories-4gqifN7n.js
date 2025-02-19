import{B as W}from"./BorderProps-BeEA2FI6.js";import{j as p}from"./jsx-runtime-C8_8iAox.js";import{d as h,T as V}from"./Typography-BU4bE9sX.js";import{r as u,R as F}from"./index-Dkaqzkgy.js";const A=({width:e,height:t})=>p.jsx("div",{style:{width:e,height:t,backgroundColor:"#f0f0f0",borderRadius:"50%"}});A.__docgenInfo={description:"",methods:[],displayName:"IconLoadingBox"};const q=e=>u.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},u.createElement("path",{fill:"none",stroke:"current",d:"M20.2338 15.6356C20.7253 14.5238 20.9983 13.2938 20.9983 12C20.9983 7.02944 16.9692 3 11.9991 3C7.02906 3 3 7.02944 3 12C3 16.9706 7.02906 21 11.9991 21C13.5993 21 15.1019 20.5823 16.4039 19.85L21 20.9991L20.2338 15.6356Z",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})),M=e=>u.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},u.createElement("path",{fill:"none",stroke:"current",d:"M3 9.41605C3 9.04665 3.18802 8.7001 3.50457 8.48603L11.3046 3.21117C11.7209 2.92961 12.2791 2.92961 12.6954 3.21117L20.4954 8.48603C20.812 8.70011 21 9.04665 21 9.41605V19.2882C21 20.2336 20.1941 21 19.2 21H4.8C3.80589 21 3 20.2336 3 19.2882V9.41605Z",strokeWidth:2})),L=e=>u.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},u.createElement("path",{fill:"none",stroke:"current",d:"M2.3999 20.5124C2.3999 16.7369 5.55419 13.6762 11.9999 13.6762C18.4456 13.6762 21.5999 16.7369 21.5999 20.5124C21.5999 21.1131 21.1617 21.6 20.6211 21.6H3.37873C2.83814 21.6 2.3999 21.1131 2.3999 20.5124Z",strokeWidth:2}),u.createElement("path",{fill:"none",stroke:"current",d:"M15.5999 5.99999C15.5999 7.98822 13.9881 9.59999 11.9999 9.59999C10.0117 9.59999 8.3999 7.98822 8.3999 5.99999C8.3999 4.01177 10.0117 2.39999 11.9999 2.39999C13.9881 2.39999 15.5999 4.01177 15.5999 5.99999Z",strokeWidth:2})),H=e=>u.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},u.createElement("path",{fill:"none",stroke:"current",d:"M14.9435 21.088V3.91199C14.9435 3.3597 14.4958 2.91199 13.9435 2.91199H9.88528C9.333 2.91199 8.88528 3.3597 8.88528 3.91199V21.088M14.9435 21.088L14.9419 10.7681C14.9418 10.2158 15.3896 9.76799 15.9419 9.76799H20C20.5523 9.76799 21 10.2157 21 10.768V20.088C21 20.6403 20.5523 21.088 20 21.088H14.9435ZM14.9435 21.088H8.88528M8.88528 21.088V16.088C8.88528 15.5357 8.43757 15.088 7.88528 15.088H4C3.44771 15.088 3 15.5357 3 16.088V20.088C3 20.6403 3.44771 21.088 4 21.088H8.88528Z",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})),P={"/src/assets/icons/message.svg":q,"/src/assets/icons/home.svg":M,"/src/assets/icons/profile.svg":L,"/src/assets/icons/statistics.svg":H},j=({itemId:e,iconSrc:t,title:s,foregroundColor:n="#C6C6C6",selectedForegroundColor:c="#1F87FF",alarmColor:d="#FF4B4B",onItemClick:l=()=>{},selected:a=!1,hasAlarm:r=!1})=>{const o=t?P[t]:null;return p.jsx(D,{selected:a,selectedBackgroundColor:c,onClick:()=>l(e),children:p.jsxs(R,{children:[r&&p.jsx(_,{color:d}),o&&p.jsx(F.Suspense,{fallback:p.jsx(A,{width:"24px",height:"24px"}),children:p.jsx(o,{width:"24px",height:"24px",style:{marginTop:"4px"},stroke:a?c:n,fill:a?c:n})}),s&&p.jsx($,{variant:"caption3",textColor:a?c:n,children:s})]})})},D=h.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: 'transparent';
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  padding-top: 4px;

  &:active {
    background-color: #f4f4f4;
  }
`,R=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`,_=h.div`
  width: 6px;
  height: 6px;
  background-color: ${e=>e.color};
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
`,$=h(V)`
  margin: 0;
  margin-top: 4px;
  color: ${e=>e.textColor};
  text-align: center;
`;j.__docgenInfo={description:"",methods:[],displayName:"BottomNavigationItem",props:{itemId:{required:!0,tsType:{name:"string"},description:""},iconSrc:{required:!0,tsType:{name:"string"},description:""},title:{required:!1,tsType:{name:"string"},description:""},foregroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#C6C6C6'",computed:!1}},selectedForegroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#1F87FF'",computed:!1}},alarmColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#FF4B4B'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemId: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemId"}],return:{name:"void"}}},description:"",defaultValue:{value:"() => {}",computed:!1}},hasAlarm:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const S=e=>{let t;const s=new Set,n=(o,i)=>{const m=typeof o=="function"?o(t):o;if(!Object.is(m,t)){const f=t;t=i??(typeof m!="object"||m===null)?m:Object.assign({},t,m),s.forEach(b=>b(t,f))}},c=()=>t,a={setState:n,getState:c,getInitialState:()=>r,subscribe:o=>(s.add(o),()=>s.delete(o))},r=t=e(n,c,a);return a},G=e=>e?S(e):S,Z=e=>e;function J(e,t=Z){const s=F.useSyncExternalStore(e.subscribe,()=>t(e.getState()),()=>t(e.getInitialState()));return F.useDebugValue(s),s}const k=e=>{const t=G(e),s=n=>J(t,n);return Object.assign(s,t),s},U=e=>e?k(e):k,K=U((e,t)=>({socket:null,hasNewMessage:!1,activeSubscriptions:{},connect:s=>{const n=t().socket,c=t().heartbeatInterval;n&&n.close(),c&&(clearInterval(c),e({heartbeatInterval:null}));const d=localStorage.getItem("access_token");if(!d)throw new Error("Access token is missing");const l=s?"/admins":"/students",a=new URL(`${l}`,"https://api.onu-univ.site".replace("http","ws")),r=new WebSocket(a.toString(),[d]),o=()=>{const i=t().heartbeatInterval;i&&(clearInterval(i),e({heartbeatInterval:null}));const m=setInterval(()=>{t().socket===r&&r.readyState===WebSocket.OPEN?(r.send(JSON.stringify({event:"PING"})),console.log("창공을 가르는 소리 PING!")):clearInterval(m)},2e4);e({heartbeatInterval:m})};r.onopen=()=>{console.log("WebSocket connected successfully"),e({socket:r}),o();const i=t().activeSubscriptions;Object.entries(i).forEach(([m,f])=>{const[b,v]=m.split(":");f.callback&&t().subscribe(b,parseInt(v),f.callback)})},r.onerror=i=>{console.error("WebSocket error:",i)},r.onclose=()=>{console.log("WebSocket connection closed"),e({socket:null});const i=t().heartbeatInterval;i!=null&&(clearInterval(i),e({heartbeatInterval:null})),setTimeout(()=>{t().socket||t().connect(s)},5e3)}},disconnect:()=>{const s=t().socket,n=t().heartbeatInterval;n&&(clearInterval(n),e({heartbeatInterval:null})),s&&(s.close(),e({socket:null}))},clearNewMessage:()=>{e({hasNewMessage:!1})},subscribe:(s,n,c)=>{const d=t().socket,l=`${s}:${n}`;if(e(a=>{const r={activeSubscriptions:{...a.activeSubscriptions,[l]:{callback:c}}};return console.log("구독 추가:",l),console.log("현재 구독 목록:",Object.keys(r.activeSubscriptions)),r}),d){const a=r=>{try{if(r.data==="PONG"){console.log("PONG");return}const o=JSON.parse(r.data);console.log("Received message:",o),(o.roomType===s&&(s==="OPINION"&&o.opinionId===n||s==="AGENDA"&&o.agendaId===n)||n===-1)&&c(o)}catch(o){console.error("Error parsing WebSocket message:",o)}};return d.addEventListener("message",a),()=>{d.removeEventListener("message",a),e(r=>{const{[l]:o,...i}=r.activeSubscriptions;return{activeSubscriptions:i}})}}return()=>{e(a=>{const{[l]:r,...o}=a.activeSubscriptions;return console.log("구독 해제:",l),console.log("현재 구독 목록:",Object.keys(o)),{activeSubscriptions:o}})}},sendMessage:async(s,n,c,d,l)=>{const a=t().socket,r=localStorage.getItem("member_id");if(!a||a.readyState!==WebSocket.OPEN){console.error("WebSocket is not connected");return}const o={roomType:s,event:"CHAT",...s==="OPINION"?{opinionId:n}:{agendaId:n},message:c,images:d,...l?{adminId:Number(r)}:{memberId:Number(r)}};console.log("Sending message:",o),a.send(JSON.stringify(o))}})),O=u.forwardRef(({startDestination:e,destinations:t,backgroundColor:s="#FFFFFF",foregroundColor:n="#C6C6C6",selectedForegroundColor:c="#1F87FF",alarmColor:d="#FF4B4B",border:l,setAlarm:a=!1,onItemClick:r=()=>{}},o)=>{const[i,m]=u.useState(e),[f,b]=u.useState(!1),{subscribe:v}=K();return u.useEffect(()=>{const g=v("OPINION",-1,()=>{i!=="my"&&b(!0)}),E=v("AGENDA",-1,()=>{i!=="my"&&b(!0)});return console.log("subscribe"),()=>{g(),E(),console.log("unsubscribe")}},[i,v]),p.jsx(z,{ref:o,backgroundColor:s,border:l,children:t.map(g=>p.jsx(j,{...g,foregroundColor:n,selectedForegroundColor:c,alarmColor:d,onItemClick:()=>{m(g.itemId),r(g.itemId),g.itemId==="my"&&b(!1)},hasAlarm:(a||f)&&g.itemId==="my",selected:g.itemId===i},g.itemId))})}),z=h.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>e.backgroundColor};
  border: ${e=>e.border?`${e.border.borderWidth||"1px"} solid ${e.border.borderColor||"#161616"}`:"none"};
  border-radius: ${e=>{var t;return((t=e.border)==null?void 0:t.borderRadius)||"0px"}};
  padding-bottom: env(safe-area-inset-bottom);
`;O.__docgenInfo={description:"",methods:[],displayName:"BottomNavigation",props:{startDestination:{required:!0,tsType:{name:"string"},description:""},destinations:{required:!0,tsType:{name:"Array",elements:[{name:"BottomNavigationItemProps"}],raw:"BottomNavigationItemProps[]"},description:""},backgroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#FFFFFF'",computed:!1}},foregroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#C6C6C6'",computed:!1}},selectedForegroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#1F87FF'",computed:!1}},alarmColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#FF4B4B'",computed:!1}},border:{required:!1,tsType:{name:"BorderProps"},description:""},setAlarm:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemId: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemId"}],return:{name:"void"}}},description:"",defaultValue:{value:"() => {}",computed:!1}}}};const te={title:"Components/BottomNavigation",component:O,argTypes:{startDestination:{control:"radio",options:["message","home","my"]},backgroundColor:{control:"color"},foregroundColor:{control:"color"},selectedForegroundColor:{control:"color"},alarmColor:{control:"color"},setAlarm:{control:"boolean"},onItemClick:{action:"clicked"},border:{control:"object"}}},I={args:{startDestination:"home",destinations:[{itemId:"message",title:"답해요",iconSrc:"/src/assets/icons/message.svg"},{itemId:"home",title:"말해요",iconSrc:"/src/assets/icons/home.svg"},{itemId:"my",title:"내 질문",iconSrc:"/src/assets/icons/profile.svg"}],backgroundColor:"#FFFFFF",foregroundColor:"#A8A8A8",selectedForegroundColor:"#1F87FF",alarmColor:"#FF0000",setAlarm:!1}},C={args:{startDestination:"home",destinations:[{itemId:"message",title:"답해요",iconSrc:"/src/assets/icons/message.svg"},{itemId:"home",title:"말해요",iconSrc:"/src/assets/icons/home.svg"},{itemId:"my",title:"내 질문",iconSrc:"/src/assets/icons/profile.svg"}],backgroundColor:"#FFFFFF",foregroundColor:"#A8A8A8",selectedForegroundColor:"#1F87FF",alarmColor:"#FF0000",border:{borderWidth:"2px",borderColor:"red",selectedBorderColor:"blue",borderType:W.BOTTOM,borderRadius:"40px"},setAlarm:!1}};var y,x,w;I.parameters={...I.parameters,docs:{...(y=I.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    startDestination: 'home',
    destinations: [{
      itemId: 'message',
      title: '답해요',
      iconSrc: '/src/assets/icons/message.svg'
    }, {
      itemId: 'home',
      title: '말해요',
      iconSrc: '/src/assets/icons/home.svg'
    }, {
      itemId: 'my',
      title: '내 질문',
      iconSrc: '/src/assets/icons/profile.svg'
    }],
    backgroundColor: '#FFFFFF',
    foregroundColor: '#A8A8A8',
    selectedForegroundColor: '#1F87FF',
    alarmColor: '#FF0000',
    setAlarm: false
  }
}`,...(w=(x=I.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var N,B,T;C.parameters={...C.parameters,docs:{...(N=C.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    startDestination: 'home',
    destinations: [{
      itemId: 'message',
      title: '답해요',
      iconSrc: '/src/assets/icons/message.svg'
    }, {
      itemId: 'home',
      title: '말해요',
      iconSrc: '/src/assets/icons/home.svg'
    }, {
      itemId: 'my',
      title: '내 질문',
      iconSrc: '/src/assets/icons/profile.svg'
    }],
    backgroundColor: '#FFFFFF',
    foregroundColor: '#A8A8A8',
    selectedForegroundColor: '#1F87FF',
    alarmColor: '#FF0000',
    border: {
      borderWidth: '2px',
      borderColor: 'red',
      selectedBorderColor: 'blue',
      borderType: BorderType.BOTTOM,
      borderRadius: '40px'
    },
    setAlarm: false
  }
}`,...(T=(B=C.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};const oe=["Default","WithBorder"];export{I as Default,C as WithBorder,oe as __namedExportsOrder,te as default};
