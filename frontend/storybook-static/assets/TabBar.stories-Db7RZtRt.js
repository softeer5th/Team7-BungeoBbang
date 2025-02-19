import{j as n}from"./jsx-runtime-C8_8iAox.js";import{r as l}from"./index-Dkaqzkgy.js";import{d as u,T as $}from"./Typography-BU4bE9sX.js";const b=({itemId:e,title:t,backgroundColor:o="#FFFFFF",selectedBackroundColor:a="#FFFFFF",textColor:s="#C6C6C6",selectedTextColor:i="#1F87FF",selected:d=!1,onItemClick:F=()=>{}})=>n.jsx(q,{$backgroundColor:d?a:o,onClick:()=>F(e),children:n.jsx(B,{variant:"heading3",textColor:d?i:s,children:t})}),q=u.div`
  flex: 1;
  padding: 10px 12px 12px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${e=>e.$backgroundColor};
`,B=u($)`
  color: ${e=>e.textColor};
`;b.__docgenInfo={description:"",methods:[],displayName:"TabBarItem",props:{itemId:{required:!0,tsType:{name:"string"},description:""},title:{required:!0,tsType:{name:"string"},description:""},backgroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#FFFFFF'",computed:!1}},selectedBackroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#FFFFFF'",computed:!1}},textColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#C6C6C6'",computed:!1}},selectedTextColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#1F87FF'",computed:!1}},selected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemId: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemId"}],return:{name:"void"}}},description:"",defaultValue:{value:"() => {}",computed:!1}}}};const m=({currentDestination:e,items:t,backgroundColor:o="#FFFFFF",selectedItembackgroundColor:a="#FFFFFF",indicatorColor:s="#1F87FF",textColor:i="#C6C6C6",selectedTextColor:d="#1F87FF",onItemClick:F=()=>{}})=>{var C;const[f,g]=l.useState(e||((C=t[0])==null?void 0:C.itemId)),h=t.findIndex(r=>r.itemId===f),[v,k]=l.useState(0),p=l.useRef(null);return l.useEffect(()=>{e&&g(e)},[e]),l.useEffect(()=>{p.current&&k(p.current.offsetWidth/t.length)},[t.length]),n.jsxs(V,{ref:p,children:[t.map(r=>n.jsx(b,{itemId:r.itemId,title:r.title,backgroundColor:o,selectedBackroundColor:a,textColor:i,selectedTextColor:d,selected:r.itemId===f,onItemClick:x=>{g(x),F(x)}},r.itemId)),n.jsx(_,{$indicatorColor:s,$indicatorWidth:v,$selectedIndex:h})]})},V=u.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`,_=u.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 2px;
  width: ${e=>`${e.$indicatorWidth}px`};
  background-color: ${e=>e.$indicatorColor};
  transition: transform 0.3s ease;
  transform: ${e=>`translateX(calc(${e.$selectedIndex} * ${e.$indicatorWidth}px))`};
`;m.__docgenInfo={description:"",methods:[],displayName:"TabBar",props:{currentDestination:{required:!0,tsType:{name:"string"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"TabBarItemProps"}],raw:"TabBarItemProps[]"},description:""},backgroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#FFFFFF'",computed:!1}},selectedItembackgroundColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#FFFFFF'",computed:!1}},indicatorColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#1F87FF'",computed:!1}},textColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#C6C6C6'",computed:!1}},selectedTextColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'#1F87FF'",computed:!1}},onItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemId: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemId"}],return:{name:"void"}}},description:"",defaultValue:{value:"() => {}",computed:!1}}}};const{useArgs:j}=__STORYBOOK_MODULE_PREVIEW_API__,D={title:"Components/TabBar",component:m,argTypes:{backgroundColor:{control:"color"},selectedItembackgroundColor:{control:"color"},indicatorColor:{control:"color"},textColor:{control:"color"},selectedTextColor:{control:"color"}}},c={args:{currentDestination:"opinion",items:[{itemId:"opinion",title:"말해요"},{itemId:"agenda",title:"답해요"}],backgroundColor:"#FFFFFF",selectedItembackgroundColor:"#FFFFFF",indicatorColor:"#1F87FF",textColor:"#C6C6C6",selectedTextColor:"#1F87FF"},render:function(t){const[{value:o},a]=j(),s=i=>{a({...t,currentDestination:i})};return n.jsx(m,{...t,currentDestination:o,onItemClick:s})}};var I,T,y;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    currentDestination: 'opinion',
    items: [{
      itemId: 'opinion',
      title: '말해요'
    }, {
      itemId: 'agenda',
      title: '답해요'
    }],
    backgroundColor: '#FFFFFF',
    selectedItembackgroundColor: '#FFFFFF',
    indicatorColor: '#1F87FF',
    textColor: '#C6C6C6',
    selectedTextColor: '#1F87FF'
  },
  render: function Render(args) {
    const [{
      value
    }, updateArgs] = useArgs();
    const handleChange = (newValue: string) => {
      updateArgs({
        ...args,
        currentDestination: newValue
      });
    };
    return <TabBar {...args} currentDestination={value} onItemClick={handleChange} />;
  }
}`,...(y=(T=c.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};const R=["Default"];export{c as Default,R as __namedExportsOrder,D as default};
