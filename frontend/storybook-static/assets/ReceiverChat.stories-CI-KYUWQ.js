import{j as e}from"./jsx-runtime-C8_8iAox.js";import{d as r,T as l}from"./Typography-BU4bE9sX.js";import{r as B}from"./index-Dkaqzkgy.js";import{m as p}from"./proxy-DSREAjDx.js";const N=r(p.div)`
  flex-shrink: 0; // 이미지가 축소되지 않도록 설정
`,b=B.forwardRef(({chatId:t,receiverName:m,receiverIconSrc:d,receiverIconBackgroundColor:j="#FFEFB3",message:k,timeText:w,images:u,nameTextColor:R="#393939",backgroundColor:I="#F4F4F4",textColor:q="#393939",timeTextColor:$="#C6C6C6",onImageClick:i},E)=>e.jsxs(U,{id:`id${t}`,ref:E,children:[e.jsx(p.div,{initial:{opacity:0,scale:.4},animate:{opacity:1,scale:1},transition:{duration:.5,ease:[.45,0,.21,1],delay:.05},children:e.jsxs(S,{children:[m&&e.jsx(V,{variant:"body2",nameTextColor:R,children:m}),d&&e.jsx(W,{backgroundColor:j,children:e.jsx("img",{width:"17px",height:"17px",src:d})})]})}),u&&e.jsx(_,{children:u.map((o,c)=>e.jsx(N,{initial:{opacity:0,scale:.4},animate:{opacity:1,scale:1},transition:{duration:.5,ease:[.45,0,.21,1],delay:.2*c},children:e.jsx(D,{src:o,onClick:()=>i==null?void 0:i(o)},`${o}${c}`)},`${o}${c}`))}),e.jsx(p.div,{initial:{opacity:0,y:-100},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.45,0,.21,1],delay:.05},children:e.jsxs(L,{children:[e.jsx(A,{backgroundColor:I,children:e.jsx(z,{variant:"body1",textColor:q,children:k})}),e.jsx(M,{variant:"caption3",timeTextColor:$,children:w})]})})]})),U=r.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 16px;
`,S=r.div``,V=r(l)`
  color: ${t=>t.nameTextColor};
`,W=r.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${t=>t.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`,_=r.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-right: 16px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`,D=r.img`
  width: 164px;
  height: 230px;
  border-radius: 16px;
  object-fit: cover;
`,L=r.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 4px;
  margin-top: 4px;
`,M=r(l)`
  color: ${t=>t.timeTextColor};
`,A=r.div`
  max-width: 73%;
  background-color: ${t=>t.backgroundColor};
  border-radius: 16px;
  padding: 12px 16px 12px 16px;
  box-sizing: border-box;
`,z=r(l)`
  text-align: start;
  white-space: pre-line;
  overflow-wrap: break-word;
  color: ${t=>t.textColor};
`;b.__docgenInfo={description:"",methods:[],displayName:"ReceiverChat",props:{chatId:{required:!0,tsType:{name:"string"},description:`채팅 메시지의 고유 ID
@example "chat_12345"`},receiverName:{required:!1,tsType:{name:"string"},description:`메시지를 보낸 사람의 이름 (선택 사항)
@example "총학생회"`},receiverIconSrc:{required:!1,tsType:{name:"string"},description:`수신자의 아이콘 이미지 URL (선택 사항)
@example "https://example.com/icon.png"`},receiverIconBackgroundColor:{required:!1,tsType:{name:"string"},description:`수신자의 아이콘 배경 색상 (선택 사항)
@example "#FFE0F7"`,defaultValue:{value:"'#FFEFB3'",computed:!1}},message:{required:!0,tsType:{name:"string"},description:`채팅 메시지의 내용
@example "안녕하세요, 소중한 의견을 보내주셔서 감사합니다."`},images:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`첨부된 이미지 URL 배열 (선택 사항)
@example ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]`},timeText:{required:!0,tsType:{name:"string"},description:`메시지의 전송 시간 텍스트
@example "오후 01:20"`},nameTextColor:{required:!1,tsType:{name:"string"},description:`수신자 이름의 텍스트 색상 (선택 사항)
@example "#1F87FF"`,defaultValue:{value:"'#393939'",computed:!1}},backgroundColor:{required:!1,tsType:{name:"string"},description:`채팅 메시지의 배경 색상 (선택 사항)
@example "#F4F4F4"`,defaultValue:{value:"'#F4F4F4'",computed:!1}},textColor:{required:!1,tsType:{name:"string"},description:`채팅 메시지의 텍스트 색상 (선택 사항)
@example "#393939"`,defaultValue:{value:"'#393939'",computed:!1}},timeTextColor:{required:!1,tsType:{name:"string"},description:`메시지 시간 텍스트의 색상 (선택 사항)
@example "#C6C6C6"`,defaultValue:{value:"'#C6C6C6'",computed:!1}},onImageClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(imageUrl: string) => void",signature:{arguments:[{type:{name:"string"},name:"imageUrl"}],return:{name:"void"}}},description:`이미지 클릭 시 호출되는 콜백 함수 (선택 사항)
@param imageUrl 클릭한 이미지의 URL`}}};const K={title:"Components/Chat/Receive",component:b,argTypes:{backgroundColor:{control:"color"},textColor:{control:"color"},timeTextColor:{control:"color"}},args:{chatId:""},tags:["autodocs"]},a={args:{receiverName:"00대학교 총학생회",message:`안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림`,timeText:"오후 01:20",backgroundColor:"#F4F4F4",textColor:"#393939",timeTextColor:"#C6C6C6"}},s={args:{receiverName:"00대학교 총학생회",message:`안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림`,timeText:"오후 01:20",images:["https://picsum.photos/300/200","https://picsum.photos/300/200","https://picsum.photos/300/200"],backgroundColor:"#F4F4F4",textColor:"#393939",timeTextColor:"#C6C6C6"}},n={args:{receiverIconBackgroundColor:"#FFE0F7",receiverIconSrc:"/public/assets/imgs/face1.png",message:`안녕하세요, 총학생회입니다.
  
  소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
  현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
  빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.
  
  감사합니다.
  총학생회 드림`,timeText:"오후 01:20",images:["https://picsum.photos/300/200","https://picsum.photos/300/200","https://picsum.photos/300/200"],backgroundColor:"#F4F4F4",textColor:"#393939",timeTextColor:"#C6C6C6"}};var x,g,C;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    receiverName: '00대학교 총학생회',
    message: \`안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림\`,
    timeText: '오후 01:20',
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6'
  }
}`,...(C=(g=a.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var h,f,F;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    receiverName: '00대학교 총학생회',
    message: \`안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림\`,
    timeText: '오후 01:20',
    images: ['https://picsum.photos/300/200', 'https://picsum.photos/300/200', 'https://picsum.photos/300/200'],
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6'
  }
}`,...(F=(f=s.parameters)==null?void 0:f.docs)==null?void 0:F.source}}};var v,y,T;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    receiverIconBackgroundColor: '#FFE0F7',
    receiverIconSrc: '/public/assets/imgs/face1.png',
    message: \`안녕하세요, 총학생회입니다.
  
  소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
  현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
  빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.
  
  감사합니다.
  총학생회 드림\`,
    timeText: '오후 01:20',
    images: ['https://picsum.photos/300/200', 'https://picsum.photos/300/200', 'https://picsum.photos/300/200'],
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6'
  }
}`,...(T=(y=n.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const P=["ReceiverDefault","ReceiverWithImage","ReceiverWithIcon"];export{a as ReceiverDefault,n as ReceiverWithIcon,s as ReceiverWithImage,P as __namedExportsOrder,K as default};
