import { j as i } from "./jsx-runtime-C8_8iAox.js";
import { r as F } from "./index-Dkaqzkgy.js";
import { B as T } from "./BorderProps-BeEA2FI6.js";
import { d as C, T as v } from "./Typography-BU4bE9sX.js";
import { a as y, g as q } from "./getBorderType-XRkN7lgl.js";
const b = ({
    itemId: e,
    text: t,
    textColor: r = "#A8A8A8",
    selectedTextColor: d = "#1F87FF",
    backgroundColor: l = "#F4F4F4",
    selectedBackgroundColor: o = "#E8F3FF",
    border: p = {
      ...y(),
      borderWidth: "1px",
      borderColor: "#C6C6C6",
      selectedBorderColor: "#1F87FF",
      borderRadius: "100px",
    },
    onChipClick: m = () => {},
    selected: a = !1,
  }) =>
    i.jsx(V, {
      backgroundColor: a ? o : l,
      border: p,
      selected: a,
      onClick: () => m(e),
      children: i.jsx(O, {
        variant: "caption1",
        textColor: a ? d : r,
        children: t,
      }),
    }),
  V = C.div`
  padding: 8px 12px;
  box-sizing: border-box;
  background-color: ${(e) => e.backgroundColor};
  ${(e) => (e.border ? q({ ...e.border, borderColor: e.selected ? e.border.selectedBorderColor : e.border.borderColor }) : "border: none;")}
  border-radius: ${(e) => {
    var t;
    return ((t = e.border) == null ? void 0 : t.borderRadius) || "100px";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  flex-shrink: 0;
`,
  O = C(v)`
  color: ${(e) => e.textColor};
`;
b.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "ChipListItem",
  props: {
    textColor: {
      defaultValue: { value: "'#A8A8A8'", computed: !1 },
      required: !1,
    },
    selectedTextColor: {
      defaultValue: { value: "'#1F87FF'", computed: !1 },
      required: !1,
    },
    backgroundColor: {
      defaultValue: { value: "'#F4F4F4'", computed: !1 },
      required: !1,
    },
    selectedBackgroundColor: {
      defaultValue: { value: "'#E8F3FF'", computed: !1 },
      required: !1,
    },
    border: {
      defaultValue: {
        value: `{
  ...getDefaultBorderStyle(),
  borderWidth: '1px',
  borderColor: '#C6C6C6',
  selectedBorderColor: '#1F87FF',
  borderRadius: '100px',
}`,
        computed: !1,
      },
      required: !1,
    },
    onChipClick: {
      defaultValue: { value: "() => {}", computed: !1 },
      required: !1,
    },
    selected: { defaultValue: { value: "false", computed: !1 }, required: !1 },
  },
};
const u = ({
    startItem: e,
    backgroundColor: t = "#FFFFFF",
    itemBackgroundColor: r = "#F4F4F4",
    itemSelectedBackgroundColor: d = "#E8F3FF",
    itemTextColor: l = "#A8A8A8",
    itemSelectedTextColor: o = "#1F87FF",
    itemBorder: p,
    onChipClick: m = () => {},
    items: a,
    sidePadding: S = "0px",
  }) => {
    const [B, A] = F.useState(e);
    return i.jsx(L, {
      backgroundColor: t,
      sidePadding: S,
      children: a.map((n) =>
        i.jsx(
          b,
          {
            itemId: n.itemId,
            text: n.text,
            backgroundColor: r,
            selectedBackgroundColor: d,
            textColor: l,
            selectedTextColor: o,
            border: p,
            onChipClick: () => {
              A(n.itemId), m(n.itemId);
            },
            selected: n.itemId === B,
          },
          n.itemId,
        ),
      ),
    });
  },
  L = C.div`
  background-color: ${(e) => e.backgroundColor};
  padding: 0px ${(e) => e.sidePadding} 0px ${(e) => e.sidePadding};
  overflow: scroll;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
u.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "ChipList",
  props: {
    backgroundColor: {
      defaultValue: { value: "'#FFFFFF'", computed: !1 },
      required: !1,
    },
    itemBackgroundColor: {
      defaultValue: { value: "'#F4F4F4'", computed: !1 },
      required: !1,
    },
    itemSelectedBackgroundColor: {
      defaultValue: { value: "'#E8F3FF'", computed: !1 },
      required: !1,
    },
    itemTextColor: {
      defaultValue: { value: "'#A8A8A8'", computed: !1 },
      required: !1,
    },
    itemSelectedTextColor: {
      defaultValue: { value: "'#1F87FF'", computed: !1 },
      required: !1,
    },
    onChipClick: {
      defaultValue: { value: "() => {}", computed: !1 },
      required: !1,
    },
    sidePadding: {
      defaultValue: { value: "'0px'", computed: !1 },
      required: !1,
    },
  },
};
const w = {
    title: "Components/ChipList",
    component: u,
    argTypes: {
      startItem: { control: "text" },
      backgroundColor: { control: "color" },
      itemBackgroundColor: { control: "color" },
      itemSelectedBackgroundColor: { control: "color" },
      itemTextColor: { control: "color" },
      itemSelectedTextColor: { control: "color" },
      sidePadding: { control: "text" },
    },
    tags: ["autodocs"],
  },
  c = {
    args: {
      startItem: "chip1",
      backgroundColor: "#FFFFFF",
      itemBackgroundColor: "#F4F4F4",
      itemSelectedBackgroundColor: "#E8F3FF",
      itemTextColor: "#A8A8A8",
      itemSelectedTextColor: "#1F87FF",
      sidePadding: "16px",
      items: [
        { itemId: "chip1", text: "Option 1" },
        { itemId: "chip2", text: "Option 2" },
        { itemId: "chip3", text: "Option 3" },
      ],
    },
    render: function (t) {
      const [r, d] = F.useState(t.startItem || ""),
        l = (o) => {
          d(o), t.onChipClick(o);
        };
      return i.jsx(u, { ...t, startItem: r, onChipClick: l });
    },
  },
  s = {
    args: {
      startItem: "chip1",
      backgroundColor: "#FFFFFF",
      itemBackgroundColor: "#F4F4F4",
      itemSelectedBackgroundColor: "#E8F3FF",
      itemTextColor: "#A8A8A8",
      itemSelectedTextColor: "#1F87FF",
      sidePadding: "16px",
      items: [
        { itemId: "chip1", text: "Option 1" },
        { itemId: "chip2", text: "Option 2" },
        { itemId: "chip3", text: "Option 3" },
      ],
      itemBorder: {
        borderWidth: "5px",
        borderColor: "red",
        selectedBorderColor: "blue",
        borderRadius: "0px",
        borderType: T.ALL,
      },
    },
    render: function (t) {
      const [r, d] = F.useState(t.startItem || ""),
        l = (o) => {
          d(o), t.onChipClick(o);
        };
      return i.jsx(u, { ...t, startItem: r, onChipClick: l });
    },
  };
var x, f, h;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((x = c.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `{
  args: {
    startItem: 'chip1',
    backgroundColor: '#FFFFFF',
    itemBackgroundColor: '#F4F4F4',
    itemSelectedBackgroundColor: '#E8F3FF',
    itemTextColor: '#A8A8A8',
    itemSelectedTextColor: '#1F87FF',
    sidePadding: '16px',
    items: [{
      itemId: 'chip1',
      text: 'Option 1'
    }, {
      itemId: 'chip2',
      text: 'Option 2'
    }, {
      itemId: 'chip3',
      text: 'Option 3'
    }]
  },
  render: function Render(args) {
    const [selectedItem, setSelectedItem] = useState(args.startItem || '');
    const handleChipClick = (chipId: string) => {
      setSelectedItem(chipId);
      args.onChipClick(chipId); // ✅ Storybook UI에서 클릭 이벤트 확인 가능
    };
    return <ChipList {...args} startItem={selectedItem} onChipClick={handleChipClick} // ✅ 클릭 이벤트 반영
    />;
  }
}`,
      ...((h = (f = c.parameters) == null ? void 0 : f.docs) == null
        ? void 0
        : h.source),
    },
  },
};
var g, I, k;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((g = s.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  args: {
    startItem: 'chip1',
    backgroundColor: '#FFFFFF',
    itemBackgroundColor: '#F4F4F4',
    itemSelectedBackgroundColor: '#E8F3FF',
    itemTextColor: '#A8A8A8',
    itemSelectedTextColor: '#1F87FF',
    sidePadding: '16px',
    items: [{
      itemId: 'chip1',
      text: 'Option 1'
    }, {
      itemId: 'chip2',
      text: 'Option 2'
    }, {
      itemId: 'chip3',
      text: 'Option 3'
    }],
    itemBorder: {
      borderWidth: '5px',
      borderColor: 'red',
      selectedBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL
    }
  },
  render: function Render(args) {
    const [selectedItem, setSelectedItem] = useState(args.startItem || '');
    const handleChipClick = (chipId: string) => {
      setSelectedItem(chipId);
      args.onChipClick(chipId); // ✅ Storybook UI에서 클릭 이벤트 확인 가능
    };
    return <ChipList {...args} startItem={selectedItem} onChipClick={handleChipClick} // ✅ 클릭 이벤트 반영
    />;
  }
}`,
      ...((k = (I = s.parameters) == null ? void 0 : I.docs) == null
        ? void 0
        : k.source),
    },
  },
};
const W = ["Default", "WithBorder"];
export {
  c as Default,
  s as WithBorder,
  W as __namedExportsOrder,
  w as default,
};
