import{j as g}from"./jsx-runtime-C8_8iAox.js";import{B as W}from"./BorderProps-BeEA2FI6.js";import{d as I,T as V}from"./Typography-BU4bE9sX.js";import{r as m,R as C}from"./index-Dkaqzkgy.js";const j=({width:e,height:t})=>g.jsx("div",{style:{width:e,height:t,backgroundColor:"#f0f0f0",borderRadius:"50%"}});j.__docgenInfo={description:"",methods:[],displayName:"IconLoadingBox"};const q=e=>m.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},m.createElement("path",{fill:"none",stroke:"current",d:"M20.2338 15.6356C20.7253 14.5238 20.9983 13.2938 20.9983 12C20.9983 7.02944 16.9692 3 11.9991 3C7.02906 3 3 7.02944 3 12C3 16.9706 7.02906 21 11.9991 21C13.5993 21 15.1019 20.5823 16.4039 19.85L21 20.9991L20.2338 15.6356Z",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})),M=e=>m.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},m.createElement("path",{fill:"none",stroke:"current",d:"M3 9.41605C3 9.04665 3.18802 8.7001 3.50457 8.48603L11.3046 3.21117C11.7209 2.92961 12.2791 2.92961 12.6954 3.21117L20.4954 8.48603C20.812 8.70011 21 9.04665 21 9.41605V19.2882C21 20.2336 20.1941 21 19.2 21H4.8C3.80589 21 3 20.2336 3 19.2882V9.41605Z",strokeWidth:2})),D=e=>m.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},m.createElement("path",{fill:"none",stroke:"current",d:"M2.3999 20.5124C2.3999 16.7369 5.55419 13.6762 11.9999 13.6762C18.4456 13.6762 21.5999 16.7369 21.5999 20.5124C21.5999 21.1131 21.1617 21.6 20.6211 21.6H3.37873C2.83814 21.6 2.3999 21.1131 2.3999 20.5124Z",strokeWidth:2}),m.createElement("path",{fill:"none",stroke:"current",d:"M15.5999 5.99999C15.5999 7.98822 13.9881 9.59999 11.9999 9.59999C10.0117 9.59999 8.3999 7.98822 8.3999 5.99999C8.3999 4.01177 10.0117 2.39999 11.9999 2.39999C13.9881 2.39999 15.5999 4.01177 15.5999 5.99999Z",strokeWidth:2})),L=e=>m.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},m.createElement("path",{fill:"none",stroke:"current",d:"M14.9435 21.088V3.91199C14.9435 3.3597 14.4958 2.91199 13.9435 2.91199H9.88528C9.333 2.91199 8.88528 3.3597 8.88528 3.91199V21.088M14.9435 21.088L14.9419 10.7681C14.9418 10.2158 15.3896 9.76799 15.9419 9.76799H20C20.5523 9.76799 21 10.2157 21 10.768V20.088C21 20.6403 20.5523 21.088 20 21.088H14.9435ZM14.9435 21.088H8.88528M8.88528 21.088V16.088C8.88528 15.5357 8.43757 15.088 7.88528 15.088H4C3.44771 15.088 3 15.5357 3 16.088V20.088C3 20.6403 3.44771 21.088 4 21.088H8.88528Z",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})),H={"/src/assets/icons/message.svg":q,"/src/assets/icons/home.svg":M,"/src/assets/icons/profile.svg":D,"/src/assets/icons/statistics.svg":L},O=({itemId:e,iconSrc:t,title:s,foregroundColor:n="#C6C6C6",selectedForegroundColor:i="#1F87FF",alarmColor:l="#FF4B4B",onItemClick:d=()=>{},selected:a=!1,hasAlarm:r=!1})=>{const o=t?H[t]:null;return g.jsx(P,{selected:a,selectedBackgroundColor:i,onClick:()=>d(e),children:g.jsxs(R,{children:[r&&g.jsx(_,{color:l}),o&&g.jsx(C.Suspense,{fallback:g.jsx(j,{width:"24px",height:"24px"}),children:g.jsx(o,{width:"24px",height:"24px",style:{marginTop:"4px"},stroke:a?i:n,fill:a?i:n})}),s&&g.jsx($,{variant:"caption3",textColor:a?i:n,children:s})]})})},P=I.div`
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
`,R=I.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`,_=I.div`
  width: 6px;
  height: 6px;
  background-color: ${e=>e.color};
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
`,$=I(V)`
  margin: 0;
  margin-top: 4px;
  color: ${e=>e.textColor};
  text-align: center;
`;O.__docgenInfo={description:"",methods:[],displayName:"BottomNavigationItem",props:{itemId:{required:!0,tsType:{name:"string"},description:""},iconSrc:{required:!0,tsType:{name:"string"},description:""},title:{required:!1,tsType:{name:"string"},description:""},foregroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#C6C6C6'",computed:!1}},selectedForegroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#1F87FF'",computed:!1}},alarmColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#FF4B4B'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemId: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemId"}],return:{name:"void"}}},description:"",defaultValue:{value:"() => {}",computed:!1}},hasAlarm:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const k=e=>{let t;const s=new Set,n=(o,c)=>{const u=typeof o=="function"?o(t):o;if(!Object.is(u,t)){const f=t;t=c??(typeof u!="object"||u===null)?u:Object.assign({},t,u),s.forEach(v=>v(t,f))}},i=()=>t,a={setState:n,getState:i,getInitialState:()=>r,subscribe:o=>(s.add(o),()=>s.delete(o))},r=t=e(n,i,a);return a},G=e=>e?k(e):k,Z=e=>e;function J(e,t=Z){const s=C.useSyncExternalStore(e.subscribe,()=>t(e.getState()),()=>t(e.getInitialState()));return C.useDebugValue(s),s}const y=e=>{const t=G(e),s=n=>J(t,n);return Object.assign(s,t),s},U=e=>e?y(e):y,K=U((e,t)=>({socket:null,hasNewMessage:!1,activeSubscriptions:{},connect:s=>{const n=t().socket,i=t().heartbeatInterval;n&&n.close(),i&&(clearInterval(i),e({heartbeatInterval:null}));const l=localStorage.getItem("access_token");if(!l)throw new Error("Access token is missing");const d=s?"/admins":"/students",a=new URL(`${d}`,"http://api.onu-univ.site:8080".replace("http","ws")),r=new WebSocket(a.toString(),[l]),o=()=>{const c=t().heartbeatInterval;c&&(clearInterval(c),e({heartbeatInterval:null}));const u=setInterval(()=>{t().socket===r&&r.readyState===WebSocket.OPEN?(r.send(JSON.stringify({event:"PING"})),console.log("창공을 가르는 소리 PING!")):clearInterval(u)},2e4);e({heartbeatInterval:u})};r.onopen=()=>{console.log("WebSocket connected successfully"),e({socket:r}),o();const c=t().activeSubscriptions;Object.entries(c).forEach(([u,f])=>{const[v,b]=u.split(":");f.callback&&t().subscribe(v,parseInt(b),f.callback)})},r.onerror=c=>{console.error("WebSocket error:",c)},r.onclose=()=>{console.log("WebSocket connection closed"),e({socket:null});const c=t().heartbeatInterval;c!=null&&(clearInterval(c),e({heartbeatInterval:null})),setTimeout(()=>{t().socket||t().connect(s)},5e3)}},disconnect:()=>{const s=t().socket,n=t().heartbeatInterval;n&&(clearInterval(n),e({heartbeatInterval:null})),s&&(s.close(),e({socket:null}))},clearNewMessage:()=>{e({hasNewMessage:!1})},subscribe:(s,n,i)=>{const l=t().socket,d=`${s}:${n}`;if(e(a=>{const r={activeSubscriptions:{...a.activeSubscriptions,[d]:{callback:i}}};return console.log("구독 추가:",d),console.log("현재 구독 목록:",Object.keys(r.activeSubscriptions)),r}),l){const a=r=>{try{if(r.data==="PONG"){console.log("PONG");return}const o=JSON.parse(r.data);if(console.log("Received message:",o),o.code===7){i(o);return}(o.roomType===s&&(s==="OPINION"&&o.opinionId===n||s==="AGENDA"&&o.agendaId===n)||n===-1)&&i(o)}catch(o){console.error("Error parsing WebSocket message:",o)}};return l.addEventListener("message",a),()=>{l.removeEventListener("message",a),e(r=>{const{[d]:o,...c}=r.activeSubscriptions;return{activeSubscriptions:c}})}}return()=>{e(a=>{const{[d]:r,...o}=a.activeSubscriptions;return console.log("구독 해제:",d),console.log("현재 구독 목록:",Object.keys(o)),{activeSubscriptions:o}})}},sendMessage:async(s,n,i,l,d)=>{const a=t().socket,r=localStorage.getItem("member_id");if(!a||a.readyState!==WebSocket.OPEN){console.error("WebSocket is not connected");return}const o={roomType:s,event:"CHAT",...s==="OPINION"?{opinionId:n}:{agendaId:n},message:i,images:l,...d?{adminId:Number(r)}:{memberId:Number(r)}};console.log("Sending message:",o),a.send(JSON.stringify(o))}})),S=m.forwardRef(({startDestination:e,destinations:t,backgroundColor:s="#FFFFFF",foregroundColor:n="#C6C6C6",selectedForegroundColor:i="#1F87FF",alarmColor:l="#FF4B4B",border:d,setAlarm:a=!1,onItemClick:r=()=>{}},o)=>{const[c,u]=m.useState(e),[f,v]=m.useState(!1),{subscribe:b}=K();return m.useEffect(()=>{const p=b("OPINION",-1,()=>{c!=="my"&&v(!0)}),E=b("AGENDA",-1,()=>{c!=="my"&&v(!0)});return console.log("subscribe"),()=>{p(),E(),console.log("unsubscribe")}},[c,b]),g.jsx(z,{ref:o,backgroundColor:s,border:d,children:t.map(p=>g.jsx(O,{...p,foregroundColor:n,selectedForegroundColor:i,alarmColor:l,onItemClick:()=>{u(p.itemId),r(p.itemId),p.itemId==="my"&&e==="my"&&v(!1)},hasAlarm:(a||f)&&p.itemId==="my",selected:p.itemId===c},p.itemId))})}),z=I.div`
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
`;S.__docgenInfo={description:"",methods:[],displayName:"BottomNavigation",props:{startDestination:{required:!0,tsType:{name:"string"},description:"네비게이션 바의 시작 지점 (초기 선택된 탭)"},destinations:{required:!0,tsType:{name:"Array",elements:[{name:"BottomNavigationItemProps"}],raw:"BottomNavigationItemProps[]"},description:"네비게이션 아이템 목록\n- `itemId`: 아이템의 고유 ID\n- `title`: 아이템의 이름\n- `iconSrc`: 아이콘 이미지 경로"},backgroundColor:{required:!1,tsType:{name:"string"},description:`네비게이션 배경 색상
@default "#FFFFFF"`,defaultValue:{value:"'#FFFFFF'",computed:!1}},foregroundColor:{required:!1,tsType:{name:"string"},description:`선택되지 않은 아이콘 색상
@default "#A8A8A8"`,defaultValue:{value:"'#C6C6C6'",computed:!1}},selectedForegroundColor:{required:!1,tsType:{name:"string"},description:`선택된 아이콘 색상
@default "#1F87FF"`,defaultValue:{value:"'#1F87FF'",computed:!1}},alarmColor:{required:!1,tsType:{name:"string"},description:`알림 점의 색상
@default "#FF0000"`,defaultValue:{value:"'#FF4B4B'",computed:!1}},border:{required:!1,tsType:{name:"BorderProps"},description:"네비게이션 테두리"},setAlarm:{required:!1,tsType:{name:"boolean"},description:`알람 표시 여부
@default false`,defaultValue:{value:"false",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemId: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemId"}],return:{name:"void"}}},description:"네비게이션 아이템 클릭 시 호출되는 콜백 함수\n@param itemId 클릭된 아이템의 `itemId`",defaultValue:{value:"() => {}",computed:!1}}}};const te={title:"Components/BottomNavigation",component:S,argTypes:{startDestination:{control:"radio",options:["message","home","my"]},backgroundColor:{control:"color"},foregroundColor:{control:"color"},selectedForegroundColor:{control:"color"},alarmColor:{control:"color"},setAlarm:{control:"boolean"},onItemClick:{action:"clicked"},border:{control:"object"}},tags:["autodocs"]},F={args:{startDestination:"home",destinations:[{itemId:"message",title:"답해요",iconSrc:"/src/assets/icons/message.svg"},{itemId:"home",title:"말해요",iconSrc:"/src/assets/icons/home.svg"},{itemId:"my",title:"내 질문",iconSrc:"/src/assets/icons/profile.svg"}],backgroundColor:"#FFFFFF",foregroundColor:"#A8A8A8",selectedForegroundColor:"#1F87FF",alarmColor:"#FF0000",setAlarm:!1},render:function(t){const[s,n]=m.useState(t.startDestination||""),i=l=>{n(l)};return g.jsx(S,{...t,startDestination:s,onItemClick:i})}},h={args:{startDestination:"home",destinations:[{itemId:"message",title:"답해요",iconSrc:"/src/assets/icons/message.svg"},{itemId:"home",title:"말해요",iconSrc:"/src/assets/icons/home.svg"},{itemId:"my",title:"내 질문",iconSrc:"/src/assets/icons/profile.svg"}],backgroundColor:"#FFFFFF",foregroundColor:"#A8A8A8",selectedForegroundColor:"#1F87FF",alarmColor:"#FF0000",border:{borderWidth:"2px",borderColor:"red",selectedBorderColor:"blue",borderType:W.BOTTOM,borderRadius:"40px"},setAlarm:!1}};var x,w,N;F.parameters={...F.parameters,docs:{...(x=F.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
  },
  render: function Render(args) {
    const [selectedItem, setSelectedItem] = useState(args.startDestination || '');
    const handleItemClick = (itemId: string) => {
      setSelectedItem(itemId);
    };
    return <BottomNavigation {...args} startDestination={selectedItem} onItemClick={handleItemClick} />;
  }
}`,...(N=(w=F.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var B,T,A;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(A=(T=h.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};const oe=["Default","WithBorder"];export{F as Default,h as WithBorder,oe as __namedExportsOrder,te as default};
