import{j as a}from"./jsx-runtime-C8_8iAox.js";import{d as C}from"./Typography-BU4bE9sX.js";import{r as l}from"./index-Dkaqzkgy.js";import{T as _}from"./TabBar-ssvqXT5D.js";const g=({tabItems:t,currentTabSelectedIndex:s,contentBackgroundColor:i="#F4F4F4",tabBarBackgroundColor:u="#FFFFFF",selectedTabBarItembackgroundColor:m="#FFFFFF",indicatorColor:c="#1F87FF",tabBarTextColor:F="#C6C6C6",tabBarSelectedTextColor:p="#1F87FF",onTabItemClick:k=()=>{},contents:S})=>{const[I,b]=l.useState(s||0),r=l.useRef(null),[v,w]=l.useState(0),R=e=>{if(r.current){e.stopPropagation();const n=r.current.offsetWidth,o=r.current.scrollLeft,T=Math.round(o/n);b(T)}},A=e=>{const n=t.findIndex(o=>o.itemId===e);b(n),f(n),k(e)},f=e=>{var n,o;if(r.current){const T=(n=r.current)==null?void 0:n.scrollLeft,E=(o=r.current)==null?void 0:o.offsetWidth;w(T+-e*E),sessionStorage.setItem("activeTabIndex",String(e))}};return l.useEffect(()=>{f(I)},[]),l.useEffect(()=>{const e=s??(t[0].itemId||0);b(e),f(e)},[s]),a.jsxs(a.Fragment,{children:[a.jsx(_,{currentDestination:t[I].itemId,items:t,onItemClick:A,backgroundColor:u,selectedItembackgroundColor:m,indicatorColor:c,textColor:F,selectedTextColor:p}),a.jsx(q,{backgroundColor:i,ref:r,onScroll:R,children:t.map((e,n)=>a.jsx(j,{transX:v,children:S(n)},e.itemId))})]})},q=C.div`
  flex: 1;
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  background-color: ${t=>t.backgroundColor};

  &::-webkit-scrollbar {
    display: none;
  }
`,j=C.div`
  min-width: 100%;
  max-width: 100%;

  scroll-snap-align: center;

  transform: translateX(${t=>t.transX}px);
  transition: transform 0.3s ease;
`;g.__docgenInfo={description:"",methods:[],displayName:"TabBarContainer",props:{tabItems:{required:!0,tsType:{name:"Array",elements:[{name:"TabBarItemProps"}],raw:"TabBarItemProps[]"},description:"탭 항목 리스트"},currentTabSelectedIndex:{required:!0,tsType:{name:"number"},description:`현재 선택된 탭의 인덱스
@example 0`},contentBackgroundColor:{required:!1,tsType:{name:"string"},description:`컨텐츠 영역의 배경 색상 (선택 사항)
@default "#F4F4F4"
@example "#FFFFFF"`,defaultValue:{value:"'#F4F4F4'",computed:!1}},tabBarBackgroundColor:{required:!1,tsType:{name:"string"},description:`탭 바의 배경 색상 (선택 사항)
@default "#FFFFFF"
@example "#F8F9FA"`,defaultValue:{value:"'#FFFFFF'",computed:!1}},selectedTabBarItembackgroundColor:{required:!1,tsType:{name:"string"},description:`선택된 탭의 배경 색상 (선택 사항)
@default "#FFFFFF"
@example "#E0E0E0"`,defaultValue:{value:"'#FFFFFF'",computed:!1}},indicatorColor:{required:!1,tsType:{name:"string"},description:`탭 인디케이터 색상 (선택 사항)
@default "#1F87FF"
@example "#FF5722"`,defaultValue:{value:"'#1F87FF'",computed:!1}},tabBarTextColor:{required:!1,tsType:{name:"string"},description:`기본 탭 텍스트 색상 (선택 사항)
@default "#C6C6C6"
@example "#212121"`,defaultValue:{value:"'#C6C6C6'",computed:!1}},tabBarSelectedTextColor:{required:!1,tsType:{name:"string"},description:`선택된 탭의 텍스트 색상 (선택 사항)
@default "#1F87FF"
@example "#000000"`,defaultValue:{value:"'#1F87FF'",computed:!1}},onTabItemClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(itemId: string) => void",signature:{arguments:[{type:{name:"string"},name:"itemId"}],return:{name:"void"}}},description:`탭 항목 클릭 시 호출되는 콜백 함수 (선택 사항)
@param itemId 클릭한 탭의 ID`,defaultValue:{value:"() => {}",computed:!1}},contents:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: number) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:`각 탭의 인덱스를 기반으로 렌더링될 컨텐츠를 반환하는 함수
@param index 현재 선택된 탭의 인덱스
@returns 해당 탭에 맞는 React 노드`}}};const{useArgs:V}=__STORYBOOK_MODULE_PREVIEW_API__,N={title:"Components/TabBar",component:g,argTypes:{contentBackgroundColor:{control:"color"},tabBarBackgroundColor:{control:"color"},selectedTabBarItembackgroundColor:{control:"color"},indicatorColor:{control:"color"},tabBarTextColor:{control:"color"},tabBarSelectedTextColor:{control:"color"},currentTabSelectedIndex:{control:"number"}},args:{contentBackgroundColor:"#F4F4F4",tabBarBackgroundColor:"#FFFFFF",selectedTabBarItembackgroundColor:"#FFFFFF",indicatorColor:"#1F87FF",tabBarTextColor:"#C6C6C6",tabBarSelectedTextColor:"#1F87FF",currentTabSelectedIndex:0},tags:["autodocs"]},x=[{itemId:"tab1",title:"Tab 1"},{itemId:"tab2",title:"Tab 2"},{itemId:"tab3",title:"Tab 3"}],d={args:{currentTabSelectedIndex:1},render:function(s){const[{currentTabSelectedIndex:i},u]=V(),m=c=>{const F=x.findIndex(p=>p.itemId===c);u({currentTabSelectedIndex:F})};return a.jsx(g,{...s,tabItems:x,currentTabSelectedIndex:i,onTabItemClick:m,contents:c=>a.jsxs(D,{children:["📌 현재 선택된 탭: ",x[c].title]})})}},D=C.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  font-size: 18px;
  color: #1f87ff;
  background-color: #e0f2ff;
  border-radius: 8px;
  font-weight: bold;
`;var B,h,y;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    currentTabSelectedIndex: 1
  },
  render: function Render(args) {
    const [{
      currentTabSelectedIndex
    }, updateArgs] = useArgs();
    const handleTabChange = (itemId: string) => {
      const newIndex = sampleTabItems.findIndex(tab => tab.itemId === itemId);
      updateArgs({
        currentTabSelectedIndex: newIndex
      });
    };
    return <TabBarContainer {...args} tabItems={sampleTabItems} currentTabSelectedIndex={currentTabSelectedIndex} onTabItemClick={handleTabChange} contents={(index: number) => <TabContent>📌 현재 선택된 탭: {sampleTabItems[index].title}</TabContent>} />;
  }
}`,...(y=(h=d.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const W=["TabBarContainerDefault"];export{d as TabBarContainerDefault,W as __namedExportsOrder,N as default};
