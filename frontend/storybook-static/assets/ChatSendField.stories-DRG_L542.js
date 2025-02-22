import{j as e}from"./jsx-runtime-C8_8iAox.js";import{r as o}from"./index-Dkaqzkgy.js";import{T as q,d as a}from"./Typography-BU4bE9sX.js";import{S as me}from"./arrow-left-RKZ4lgrs.js";import{a as fe}from"./getBorderType-XRkN7lgl.js";import"./BorderProps-BeEA2FI6.js";const he=t=>o.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"current",stroke:"current",xmlns:"http://www.w3.org/2000/svg",...t},o.createElement("path",{d:"M7.1999 6.11993V7.31993C7.6267 7.31993 8.02138 7.09324 8.23644 6.72457L7.1999 6.11993ZM8.8799 3.23993V2.03993C8.4531 2.03993 8.05842 2.26662 7.84337 2.63528L8.8799 3.23993ZM15.1199 3.23993L16.1564 2.63528C15.9414 2.26662 15.5467 2.03993 15.1199 2.03993V3.23993ZM16.7999 6.11993L15.7634 6.72457C15.9784 7.09324 16.3731 7.31993 16.7999 7.31993V6.11993ZM3.5999 18.3599V8.51993H1.1999V18.3599H3.5999ZM4.7999 7.31993H7.1999V4.91993H4.7999V7.31993ZM8.23644 6.72457L9.91644 3.84457L7.84337 2.63528L6.16337 5.51528L8.23644 6.72457ZM8.8799 4.43993H15.1199V2.03993H8.8799V4.43993ZM14.0834 3.84457L15.7634 6.72457L17.8364 5.51528L16.1564 2.63528L14.0834 3.84457ZM16.7999 7.31993H19.1999V4.91993H16.7999V7.31993ZM20.3999 8.51993V18.3599H22.7999V8.51993H20.3999ZM20.3999 18.3599C20.3999 19.0227 19.8626 19.5599 19.1999 19.5599V21.9599C21.1881 21.9599 22.7999 20.3482 22.7999 18.3599H20.3999ZM19.1999 7.31993C19.8626 7.31993 20.3999 7.85719 20.3999 8.51993H22.7999C22.7999 6.5317 21.1881 4.91993 19.1999 4.91993V7.31993ZM3.5999 8.51993C3.5999 7.85719 4.13716 7.31993 4.7999 7.31993V4.91993C2.81168 4.91993 1.1999 6.5317 1.1999 8.51993H3.5999ZM4.7999 19.5599C4.13716 19.5599 3.5999 19.0227 3.5999 18.3599H1.1999C1.1999 20.3482 2.81168 21.9599 4.7999 21.9599V19.5599ZM14.3999 12.8399C14.3999 14.1654 13.3254 15.2399 11.9999 15.2399V17.6399C14.6509 17.6399 16.7999 15.4909 16.7999 12.8399H14.3999ZM11.9999 15.2399C10.6744 15.2399 9.5999 14.1654 9.5999 12.8399H7.1999C7.1999 15.4909 9.34893 17.6399 11.9999 17.6399V15.2399ZM9.5999 12.8399C9.5999 11.5144 10.6744 10.4399 11.9999 10.4399V8.03993C9.34893 8.03993 7.1999 10.189 7.1999 12.8399H9.5999ZM11.9999 10.4399C13.3254 10.4399 14.3999 11.5144 14.3999 12.8399H16.7999C16.7999 10.189 14.6509 8.03993 11.9999 8.03993V10.4399ZM19.1999 19.5599H4.7999V21.9599H19.1999V19.5599Z"})),xe=t=>o.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"current",stroke:"none",xmlns:"http://www.w3.org/2000/svg",...t},o.createElement("path",{d:"M11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19L11 19ZM12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289L4.92893 10.6569C4.53841 11.0474 4.53841 11.6805 4.92893 12.0711C5.31946 12.4616 5.95262 12.4616 6.34315 12.0711L12 6.41421L17.6569 12.0711C18.0474 12.4616 18.6805 12.4616 19.0711 12.0711C19.4616 11.6805 19.4616 11.0474 19.0711 10.6569L12.7071 4.29289ZM13 19L13 5L11 5L11 19L13 19Z"})),Fe=t=>o.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},o.createElement("path",{stroke:"current",d:"M16 8L8 16M16 16L8 8",strokeWidth:2,strokeLinecap:"round"})),N=({onClose:t,currentIndex:r,totalImages:l,onChangeImage:i,imageList:m})=>{console.log(r),console.log(l);const[p,u]=o.useState(-r*window.innerWidth),[x,C]=o.useState(!1),f=o.useRef(null),b=o.useRef(null);o.useEffect(()=>{u(-r*window.innerWidth)},[r]);const T=s=>{u(d=>d+(s-d)*.1),b.current=requestAnimationFrame(()=>T(s))},V=s=>{C(!0),f.current="touches"in s?s.touches[0].clientX:s.clientX,cancelAnimationFrame(b.current)},v=s=>{if(!x)return;const d="touches"in s?s.touches[0].clientX:s.clientX;u(-r*window.innerWidth+(d-(f.current||0)))},y=()=>{C(!1);const s=Math.round(-p/window.innerWidth),d=Math.max(0,Math.min(l-1,s));i==null||i(d),T(-d*window.innerWidth)};return e.jsxs(Ce,{children:[e.jsxs(be,{children:[e.jsx(ve,{onClick:t,children:e.jsx(me,{width:"24px",height:"24px",stroke:"#FFFFFF",fill:"#FFFFFF"})}),e.jsx(ye,{children:e.jsxs(q,{variant:"heading3",style:{color:"#FFFFFF"},children:[r+1,"/",l]})})]}),e.jsx(we,{onTouchStart:V,onTouchMove:v,onTouchEnd:y,onMouseDown:V,onMouseMove:v,onMouseUp:y,children:e.jsx(Ee,{style:{transform:`translateX(${p}px)`,transition:x?"none":"transform 0.3s ease-out"},children:m.map((s,d)=>e.jsx(Te,{children:e.jsx(Ve,{src:s,alt:`Preview ${d+1}`,loading:"eager"})},d))})})]})},Ce=a.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  z-index: 20000;
  touch-action: pan-y pinch-zoom;
  overflow: hidden;
`,be=a.div`
  height: 50px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: black;
`,ve=a.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`,ye=a.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: white;
`,we=a.div`
  width: 100%;
  height: calc(100% - 56px);
  overflow: hidden;
  position: relative;
  touch-action: pan-x;
`,Ee=a.div`
  display: flex;
  height: 100%;
  will-change: transform;
`,Te=a.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`,Ve=a.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;N.__docgenInfo={description:"",methods:[],displayName:"ImagePreview",props:{onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},currentIndex:{required:!0,tsType:{name:"number"},description:""},totalImages:{required:!0,tsType:{name:"number"},description:""},onChangeImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(newIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"newIndex"}],return:{name:"void"}}},description:""},imageList:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""}}};const M=o.forwardRef(({placeholder:t="메시지를 입력하세요...",disabledPlaceHolder:r="텍스트를 입력할 수 없습니다.",maxLength:l=500,initialText:i="",backgroundColor:m="#FFFFFF",textFieldBackgroundColor:p="#FFFFFF",textFieldDisabledBackgroundColor:u="#F4F4F4",sendButtonBackgroundColor:x="#1F87FF",sendButtonDisabledBackgroundColor:C="#E0E0E0",sendButtonIconColor:f="#FFFFFF",sendButtonDisabledIconColor:b="#F4F4F4",imageButtonBackgroundColor:T="#E0E0E0",imageButtonDisabledBackgroundColor:V="#E0E0E0",imageButtonIconColor:v="#8D8D8D",imageButtonDisabledIconColor:y="#F4F4F4",placeholderColor:s="#1F87FF",disabledPlaceholderColor:d="#C6C6C6",textColor:G="#262626",disabledTextColor:J="#C6C6C6",textFieldBorder:Q={...fe(),borderWidth:"1px",borderColor:"#E0E0E0",disabledBorderColor:"#E0E0E0",borderRadius:"20px"},onChange:ee=()=>{},onSendMessage:te=()=>{},images:g=[],onImageDelete:ne=()=>{},onImageUpload:ae=()=>{},maxLengthOfImages:re=5,imageDisabled:oe=!1,textDisabled:c=!1,sendDisabled:w=!1,isRemindMode:se=!1,isReminded:le=!1},ie)=>{const[F,k]=o.useState(i),[H,L]=o.useState(null),E=o.useRef(null);let S=174;g&&(S=85);const de=n=>{let h=n;n.length>=l&&(h=n.slice(0,l)),k(h),ee(h)},R=()=>{if(E.current){E.current.style.height="auto";let n=E.current.scrollHeight;n>=S&&(n=S),E.current.style.height=n+"px"}},Z=()=>{w||(F.trim()||c)&&(te(F,g),k(""))},ue=n=>{L(n)},ce=n=>{n.target.files&&n.target.files.length>0&&(ae(n.target.files),n.target.value="")},D=g.length>=re||oe;o.useEffect(()=>{k(i)},[i]),o.useEffect(()=>{R()},[F,R]);const pe=n=>{if(n.key==="Enter"){if(n.nativeEvent.isComposing||n.shiftKey)return;n.preventDefault(),Z()}},ge=n=>{n.key==="Enter"&&!n.shiftKey&&window.innerWidth>768&&k("")};return e.jsxs(e.Fragment,{children:[e.jsxs(ke,{ref:ie,bcakgroundColor:m,children:[e.jsxs(De,{backgroundColor:D?V:T,children:[e.jsx(he,{width:"20px",height:"20px",fill:D?y:v,stroke:D?y:v}),e.jsx(Ie,{type:"file",accept:"image/*",multiple:!0,onChange:ce,disabled:D})]}),e.jsxs(Be,{children:[e.jsxs(je,{variant:"caption2",children:[c?0:F.length,"/",l]}),e.jsxs(qe,{backgroundColor:c?u:p,border:Q,children:[g&&g.length>0&&!c&&e.jsx(Me,{children:g.map((n,h)=>e.jsxs(Le,{children:[e.jsx(Se,{onClick:()=>ne(h),children:e.jsx(Fe,{width:"16px",height:"16px",stroke:"white"})}),e.jsx(He,{src:n,onClick:()=>{L(h)}})]},h))}),e.jsxs(Re,{children:[e.jsx(Ze,{rows:1,ref:E,variant:"body3",value:c?"":F,textColor:c?J:G,placeholder:c?r:t,placeholderColor:c?d:s,onChange:n=>{de(n.target.value)},disabled:c,onKeyDown:pe,onKeyUp:ge}),e.jsx(Ae,{})]}),e.jsx(We,{onClick:Z,backgroundColor:w?C:x,disabled:w||F.length===0,children:se?e.jsx(_e,{isReminded:le,children:e.jsx(q,{variant:"body4",children:"Re"})}):e.jsx(xe,{width:"24px",height:"24px",fill:w?b:f,stroke:w?b:f})})]})]})]}),H!==null&&e.jsx(N,{onClose:()=>L(null),currentIndex:H,totalImages:g.length,onChangeImage:ue,imageList:g})]})}),ke=a.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 8px 16px 8px 16px;
  background-color: ${t=>t.bcakgroundColor};
  gap: 8px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 15px);
`,De=a.div`
  padding: 10px;
  background-color: ${t=>t.backgroundColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`,Ie=a.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`,Be=a.div`
  width: calc(100% - 40px - 6px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 6px;
`,je=a(q)`
  color: #a8a8a8;
`,qe=a.div`
  width: 100%;
  max-height: 174px;
  padding: 6px 4px 6px 12px;
  box-sizing: border-box;
  background-color: ${t=>t.backgroundColor};
  border: ${t=>{var r,l;return`${((r=t.border)==null?void 0:r.borderWidth)||"1px"} solid ${((l=t.border)==null?void 0:l.borderColor)||"#E0E0E0"}`}};
  border-radius: ${t=>{var r;return((r=t.border)==null?void 0:r.borderRadius)||"12px"}};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`,Me=a.div`
  width: 100%;
  flex-wrap: no-wrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  gap: 4px;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`,Le=a.div`
  min-width: 64px;
  max-width: 64px;
  min-height: 66px;
  max-height: 66px;
  position: relative;
  width: fit-content;
`,Se=a.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c3c3c;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  top: -2px;
  right: -2px;
`,He=a.img`
  min-width: 60px;
  max-width: 60px;
  min-height: 60px;
  max-height: 60px;
  border-radius: 16px;
  margin-top: 6px;
`,Re=a.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  resize: none;
`,Ze=a(q).attrs({as:"textarea"})`
  flex: 1;
  margin-right: 7px;
  color: ${t=>t.textColor};
  outline: none;
  border: none;
  background-color: transparent;
  resize: none;

  &::placeholder {
    color: ${t=>t.placeholderColor};
  }
`,Ae=a.div`
  width: 30px;
  height: 30px;
`,We=a.div`
  width: 30px;
  height: 30px;
  background-color: ${t=>t.disabled?"#e0e0e0":t.backgroundColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 4px;
  bottom: 6px;
  transition: background-color 0.3s cubic-bezier(0.65, 0, 0.35, 1);
`,_e=a.div`
  width: 30px;
  height: 30px;
  background-color: ${t=>t.isReminded?"rgba(224, 224, 224, 1)":"#1f87ff"};
  color: ${t=>t.isReminded?"rgba(244, 244, 244, 1)":"#ffffff"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;M.__docgenInfo={description:"",methods:[],displayName:"ChatSendField",props:{placeholder:{required:!1,tsType:{name:"string"},description:`입력 필드의 기본 플레이스홀더 텍스트
@default "메시지를 입력하세요..."`,defaultValue:{value:"'메시지를 입력하세요...'",computed:!1}},disabledPlaceHolder:{required:!1,tsType:{name:"string"},description:`입력이 비활성화된 경우 표시될 플레이스홀더 텍스트
@default "텍스트를 입력할 수 없습니다."`,defaultValue:{value:"'텍스트를 입력할 수 없습니다.'",computed:!1}},maxLength:{required:!1,tsType:{name:"number"},description:`입력 가능한 최대 문자 길이
@default 500`,defaultValue:{value:"500",computed:!1}},initialText:{required:!1,tsType:{name:"string"},description:"초기 입력값",defaultValue:{value:"''",computed:!1}},backgroundColor:{required:!1,tsType:{name:"string"},description:`전체 배경색
@example "#FFFFFF"`,defaultValue:{value:"'#FFFFFF'",computed:!1}},textFieldBackgroundColor:{required:!1,tsType:{name:"string"},description:`입력 필드의 배경색
@example "#FFFFFF"`,defaultValue:{value:"'#FFFFFF'",computed:!1}},textFieldDisabledBackgroundColor:{required:!1,tsType:{name:"string"},description:`입력 필드가 비활성화되었을 때의 배경색
@example "#F4F4F4"`,defaultValue:{value:"'#F4F4F4'",computed:!1}},sendButtonBackgroundColor:{required:!1,tsType:{name:"string"},description:`전송 버튼의 배경색
@example "#1F87FF"`,defaultValue:{value:"'#1F87FF'",computed:!1}},sendButtonDisabledBackgroundColor:{required:!1,tsType:{name:"string"},description:`비활성화된 전송 버튼의 배경색
@example "#E0E0E0"`,defaultValue:{value:"'#E0E0E0'",computed:!1}},sendButtonIconColor:{required:!1,tsType:{name:"string"},description:`전송 버튼 아이콘 색상
@example "#FFFFFF"`,defaultValue:{value:"'#FFFFFF'",computed:!1}},sendButtonDisabledIconColor:{required:!1,tsType:{name:"string"},description:`비활성화된 전송 버튼 아이콘 색상
@example "#F4F4F4"`,defaultValue:{value:"'#F4F4F4'",computed:!1}},imageButtonBackgroundColor:{required:!1,tsType:{name:"string"},description:`이미지 업로드 버튼의 배경색
@example "#E0E0E0"`,defaultValue:{value:"'#E0E0E0'",computed:!1}},imageButtonDisabledBackgroundColor:{required:!1,tsType:{name:"string"},description:`비활성화된 이미지 업로드 버튼의 배경색
@example "#E0E0E0"`,defaultValue:{value:"'#E0E0E0'",computed:!1}},imageButtonIconColor:{required:!1,tsType:{name:"string"},description:`이미지 업로드 버튼 아이콘 색상
@example "#8D8D8D"`,defaultValue:{value:"'#8D8D8D'",computed:!1}},imageButtonDisabledIconColor:{required:!1,tsType:{name:"string"},description:`비활성화된 이미지 업로드 버튼 아이콘 색상
@example "#F4F4F4"`,defaultValue:{value:"'#F4F4F4'",computed:!1}},placeholderColor:{required:!1,tsType:{name:"string"},description:`플레이스홀더 텍스트 색상
@example "#1F87FF"`,defaultValue:{value:"'#1F87FF'",computed:!1}},disabledPlaceholderColor:{required:!1,tsType:{name:"string"},description:`비활성화된 플레이스홀더 텍스트 색상
@example "#C6C6C6"`,defaultValue:{value:"'#C6C6C6'",computed:!1}},textColor:{required:!1,tsType:{name:"string"},description:`입력된 텍스트 색상
@example "#262626"`,defaultValue:{value:"'#262626'",computed:!1}},disabledTextColor:{required:!1,tsType:{name:"string"},description:`비활성화된 상태의 입력 텍스트 색상
@example "#C6C6C6"`,defaultValue:{value:"'#C6C6C6'",computed:!1}},textFieldBorder:{required:!1,tsType:{name:"BorderProps"},description:"입력 필드의 테두리 스타일 (BorderProps 사용)",defaultValue:{value:`{
  ...getDefaultBorderStyle(),
  borderWidth: '1px',
  borderColor: '#E0E0E0',
  disabledBorderColor: '#E0E0E0',
  borderRadius: '20px',
}`,computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(newValue: string) => void",signature:{arguments:[{type:{name:"string"},name:"newValue"}],return:{name:"void"}}},description:`입력값이 변경될 때 호출되는 콜백 함수
@param newValue 변경된 텍스트 값`,defaultValue:{value:"() => {}",computed:!1}},onSendMessage:{required:!1,tsType:{name:"signature",type:"function",raw:"(message: string, images: string[]) => void",signature:{arguments:[{type:{name:"string"},name:"message"},{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"images"}],return:{name:"void"}}},description:`메시지 전송 시 호출되는 콜백 함수
@param message 전송된 메시지 텍스트
@param images 첨부된 이미지 목록`,defaultValue:{value:"() => {}",computed:!1}},images:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"첨부된 이미지 리스트",defaultValue:{value:"[]",computed:!1}},onImageDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(imageId: number) => void",signature:{arguments:[{type:{name:"number"},name:"imageId"}],return:{name:"void"}}},description:`이미지 삭제 시 호출되는 콜백 함수
@param imageId 삭제할 이미지의 ID (인덱스)`,defaultValue:{value:"() => {}",computed:!1}},onImageUpload:{required:!1,tsType:{name:"signature",type:"function",raw:"(files: FileList) => void",signature:{arguments:[{type:{name:"FileList"},name:"files"}],return:{name:"void"}}},description:`이미지 업로드 시 호출되는 콜백 함수
@param files 업로드된 파일 리스트`,defaultValue:{value:"() => {}",computed:!1}},maxLengthOfImages:{required:!1,tsType:{name:"number"},description:`첨부할 수 있는 최대 이미지 개수
@default 5`,defaultValue:{value:"5",computed:!1}},imageDisabled:{required:!1,tsType:{name:"boolean"},description:`이미지 업로드 비활성화 여부
@default false`,defaultValue:{value:"false",computed:!1}},textDisabled:{required:!1,tsType:{name:"boolean"},description:`텍스트 입력 비활성화 여부
@default false`,defaultValue:{value:"false",computed:!1}},sendDisabled:{required:!1,tsType:{name:"boolean"},description:`전송 버튼 비활성화 여부
@default false`,defaultValue:{value:"false",computed:!1}},isRemindMode:{required:!1,tsType:{name:"boolean"},description:`리마인드 모드 활성화 여부
@default false`,defaultValue:{value:"false",computed:!1}},isReminded:{required:!1,tsType:{name:"boolean"},description:`이미 리마인드된 상태인지 여부
@default false`,defaultValue:{value:"false",computed:!1}}}};const{useArgs:Y}=__STORYBOOK_MODULE_PREVIEW_API__,Xe={title:"Components/Chat/ChatSendField",component:M,argTypes:{backgroundColor:{control:"color"},textFieldBackgroundColor:{control:"color"},textColor:{control:"color"},placeholderColor:{control:"color"},sendButtonBackgroundColor:{control:"color"},imageButtonBackgroundColor:{control:"color"},sendDisabled:{control:"boolean"},imageDisabled:{control:"boolean"},maxLengthOfImages:{control:"number"}},args:{placeholder:"메시지를 입력하세요...",disabledPlaceHolder:"텍스트를 입력할 수 없습니다.",maxLength:500,backgroundColor:"#FFFFFF",textFieldBackgroundColor:"#FFFFFF",textFieldDisabledBackgroundColor:"#F4F4F4",sendButtonBackgroundColor:"#1F87FF",sendButtonDisabledBackgroundColor:"#E0E0E0",sendButtonIconColor:"#FFFFFF",sendButtonDisabledIconColor:"#F4F4F4",imageButtonBackgroundColor:"#E0E0E0",imageButtonDisabledBackgroundColor:"#E0E0E0",imageButtonIconColor:"#8D8D8D",imageButtonDisabledIconColor:"#F4F4F4",placeholderColor:"#1F87FF",disabledPlaceholderColor:"#C6C6C6",textColor:"#262626",disabledTextColor:"#C6C6C6"},tags:["autodocs"]},A=["https://picsum.photos/300/200","https://picsum.photos/300/200","https://picsum.photos/300/200"],I={args:{sendDisabled:!1,imageDisabled:!1},render:function(r){const[{value:l},i]=Y(),m=p=>{i({...r,value:p})};return e.jsx(M,{...r,initialText:l,onChange:m})}},B={args:{placeholder:"메시지를 입력하세요...",sendDisabled:!1,imageDisabled:!1,images:A},render:function(r){const[{value:l},i]=Y(),m=u=>{i({...r,value:u})},p=u=>{const x=A.filter((C,f)=>f!==u);i({...r,images:x})};return e.jsx(M,{...r,initialText:l,onChange:m,onImageDelete:p})}},j={args:{placeholder:"텍스트를 입력할 수 없습니다.",textDisabled:!0,sendDisabled:!0,imageDisabled:!0}};var W,_,$;I.parameters={...I.parameters,docs:{...(W=I.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    sendDisabled: false,
    imageDisabled: false
  },
  render: function Render(args) {
    const [{
      value
    }, updateArgs] = useArgs();
    const handleTextChange = (newValue: string) => {
      updateArgs({
        ...args,
        value: newValue
      });
    };
    return <ChatSendField {...args} initialText={value} onChange={handleTextChange} />;
  }
}`,...($=(_=I.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var P,z,O;B.parameters={...B.parameters,docs:{...(P=B.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    placeholder: '메시지를 입력하세요...',
    sendDisabled: false,
    imageDisabled: false,
    images: images
  },
  render: function Render(args) {
    const [{
      value
    }, updateArgs] = useArgs();
    const handleTextChange = (newValue: string) => {
      updateArgs({
        ...args,
        value: newValue
      });
    };
    const handleImageDelete = (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      updateArgs({
        ...args,
        images: newImages
      });
    };
    return <ChatSendField {...args} initialText={value} onChange={handleTextChange} onImageDelete={handleImageDelete} />;
  }
}`,...(O=(z=B.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};var U,K,X;j.parameters={...j.parameters,docs:{...(U=j.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    placeholder: '텍스트를 입력할 수 없습니다.',
    textDisabled: true,
    sendDisabled: true,
    imageDisabled: true
  }
}`,...(X=(K=j.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};const Ne=["ChatDefault","WithImages","AllDisabled"];export{j as AllDisabled,I as ChatDefault,B as WithImages,Ne as __namedExportsOrder,Xe as default};
