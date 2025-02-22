import{j as o}from"./jsx-runtime-C8_8iAox.js";import{d as p,T as x}from"./Typography-BU4bE9sX.js";import{r as g}from"./index-Dkaqzkgy.js";const i=g.forwardRef(({text:e,backgroundColor:F="#E8F3FF",textColor:u="#51A2FF"},m)=>o.jsx(f,{ref:m,backgroundColor:F,children:o.jsx(C,{variant:"caption2",textColor:u,children:e})})),f=p.div`
  width: fit-content;
  padding: 6px 21px 6px 21px;
  background-color: ${e=>e.backgroundColor};
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
`,C=p(x)`
  color: ${e=>e.textColor};
`;i.__docgenInfo={description:"",methods:[],displayName:"TextBadge",props:{text:{required:!1,tsType:{name:"string"},description:`배지에 표시될 텍스트 (선택 사항)
@example "NEW"`},backgroundColor:{required:!1,tsType:{name:"string"},description:`배지의 배경 색상 (선택 사항)
@default "#FF0000"
@example "#1F87FF"`,defaultValue:{value:"'#E8F3FF'",computed:!1}},textColor:{required:!1,tsType:{name:"string"},description:`배지의 텍스트 색상 (선택 사항)
@default "#FFFFFF"
@example "#000000"`,defaultValue:{value:"'#51A2FF'",computed:!1}}}};const b={title:"Components/TextBadge",component:i,argTypes:{backgroundColor:{control:"color"},textColor:{control:"color"}},tags:["autodocs"]},r={args:{text:"2025.01.18 화요일"}},t={args:{text:"답변을 기다리고 있어요",backgroundColor:"#FF4B4B",textColor:"#FFFFFF"}};var a,n,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    text: '2025.01.18 화요일'
  }
}`,...(s=(n=r.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var d,c,l;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    text: '답변을 기다리고 있어요',
    backgroundColor: '#FF4B4B',
    textColor: '#FFFFFF'
  }
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const k=["Default","Remind"];export{r as Default,t as Remind,k as __namedExportsOrder,b as default};
