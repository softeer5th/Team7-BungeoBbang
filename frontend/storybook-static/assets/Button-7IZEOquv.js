import{j as d}from"./jsx-runtime-C8_8iAox.js";import{d as a,T as s}from"./Typography-BU4bE9sX.js";import{g as u}from"./getBorderType-XRkN7lgl.js";const n=({text:e,onClick:r=()=>{},backgroundColor:l="#1F87FF",textColor:t="#FFFFFF",border:i,disabled:o=!1})=>d.jsx(b,{onClick:r,backgroundColor:l,border:i,disabled:!!o,children:d.jsx(f,{disabled:!!o,variant:"heading4",textColor:t,children:e})}),b=a.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  background-color: ${e=>e.disabled?"#E0E0E0":e.backgroundColor||"#1F87FF"};

  ${e=>e.border?u({...e.border,borderColor:e.disabled?e.border.disabledBorderColor:e.border.borderColor}):"border: none;"}

  border-radius: ${e=>{var r;return((r=e.border)==null?void 0:r.borderRadius)||"12px"}};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
`,f=a(s)`
  color: ${e=>e.disabled?"#A8A8A8":e.textColor};
`;n.__docgenInfo={description:"",methods:[],displayName:"Button",props:{onClick:{defaultValue:{value:"() => {}",computed:!1},required:!1},backgroundColor:{defaultValue:{value:"'#1F87FF'",computed:!1},required:!1},textColor:{defaultValue:{value:"'#FFFFFF'",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};export{n as B};
