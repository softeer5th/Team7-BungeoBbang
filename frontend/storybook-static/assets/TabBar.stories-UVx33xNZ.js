import { j as d } from "./jsx-runtime-C8_8iAox.js";
import { T as a } from "./TabBar-ssvqXT5D.js";
import "./index-Dkaqzkgy.js";
import "./Typography-BU4bE9sX.js";
const { useArgs: F } = __STORYBOOK_MODULE_PREVIEW_API__,
  b = {
    title: "Components/TabBar",
    component: a,
    argTypes: {
      backgroundColor: { control: "color" },
      selectedItembackgroundColor: { control: "color" },
      indicatorColor: { control: "color" },
      textColor: { control: "color" },
      selectedTextColor: { control: "color" },
    },
    tags: ["autodocs"],
  },
  o = {
    args: {
      currentDestination: "opinion",
      items: [
        { itemId: "opinion", title: "말해요" },
        { itemId: "agenda", title: "답해요" },
      ],
      backgroundColor: "#FFFFFF",
      selectedItembackgroundColor: "#FFFFFF",
      indicatorColor: "#1F87FF",
      textColor: "#C6C6C6",
      selectedTextColor: "#1F87FF",
    },
    render: function (n) {
      const [{ value: s }, c] = F(),
        l = (i) => {
          c({ ...n, currentDestination: i });
        };
      return d.jsx(a, { ...n, currentDestination: s, onItemClick: l });
    },
  };
var e, t, r;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((e = o.parameters) == null ? void 0 : e.docs),
    source: {
      originalSource: `{
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
}`,
      ...((r = (t = o.parameters) == null ? void 0 : t.docs) == null
        ? void 0
        : r.source),
    },
  },
};
const x = ["TabBarDefault"];
export { o as TabBarDefault, x as __namedExportsOrder, b as default };
