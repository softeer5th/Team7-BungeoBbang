import { j as s } from "./jsx-runtime-C8_8iAox.js";
import { d as c, T as W } from "./Typography-BU4bE9sX.js";
import "./index-Dkaqzkgy.js";
const S = ({
    boxSize: e,
    iconWidth: b,
    textVariant: l,
    type: a,
    showText: y = !1,
    onClick: T = () => {},
    selectedBorderColor: C = "#1F87FF",
    textColor: w = "#525252",
    selected: I = !1,
  }) =>
    s.jsxs(z, {
      size: e,
      onClick: () => T(),
      selected: I,
      selectedBorderColor: C,
      backgroundColor: a.iconBackground,
      children: [
        s.jsx(F, { iconWidth: b, src: a.iconSrc }),
        y && l && s.jsx(v, { variant: l, textColor: w, children: a.label }),
      ],
    }),
  z = c.div`
  width: ${(e) => e.size}px;
  aspect-ratio: 1/1;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(e) => e.backgroundColor};
  border: ${(e) => (e.selected ? `3px solid ${e.selectedBorderColor}` : "none")};
  border-radius: 50%;
`,
  F = c.img`
  width: ${(e) => e.iconWidth}px;
  aspect-ratio: 1/1;
`,
  v = c(W)`
  color: ${(e) => e.textColor};
  white-space: nowrap;
  margin-top: 4px;
`;
S.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "CategoryIcon",
  props: {
    showText: { defaultValue: { value: "false", computed: !1 }, required: !1 },
    onClick: {
      defaultValue: { value: "() => {}", computed: !1 },
      required: !1,
    },
    selectedBorderColor: {
      defaultValue: { value: "'#1F87FF'", computed: !1 },
      required: !1,
    },
    textColor: {
      defaultValue: { value: "'#525252'", computed: !1 },
      required: !1,
    },
    selected: { defaultValue: { value: "false", computed: !1 }, required: !1 },
  },
};
const $ = {
    title: "Components/CategoryIcon",
    component: S,
    argTypes: {
      boxSize: { control: "number" },
      iconWidth: { control: "number" },
      textVariant: { control: "text" },
      showText: { control: "boolean" },
      selected: { control: "boolean" },
    },
  },
  n = {
    label: "시설・환경",
    iconSrc: "/assets/icons/chair.svg",
    iconBackground: "#FFE8D2",
    type: "FACILITIES",
  },
  o = {
    args: { boxSize: 48, iconWidth: 24, type: n, showText: !0, selected: !1 },
  },
  t = {
    args: { boxSize: 48, iconWidth: 24, type: n, showText: !1, selected: !0 },
  },
  r = {
    args: {
      boxSize: 70,
      iconWidth: 24,
      type: n,
      showText: !0,
      textVariant: "caption2",
      selected: !1,
    },
  };
var i, d, u;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((i = o.parameters) == null ? void 0 : i.docs),
    source: {
      originalSource: `{
  args: {
    boxSize: 48,
    iconWidth: 24,
    type: categorySample,
    showText: true,
    selected: false
  }
}`,
      ...((u = (d = o.parameters) == null ? void 0 : d.docs) == null
        ? void 0
        : u.source),
    },
  },
};
var p, m, x;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((p = t.parameters) == null ? void 0 : p.docs),
    source: {
      originalSource: `{
  args: {
    boxSize: 48,
    iconWidth: 24,
    type: categorySample,
    showText: false,
    selected: true
  }
}`,
      ...((x = (m = t.parameters) == null ? void 0 : m.docs) == null
        ? void 0
        : x.source),
    },
  },
};
var f, g, h;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((f = r.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  args: {
    boxSize: 70,
    iconWidth: 24,
    type: categorySample,
    showText: true,
    textVariant: 'caption2',
    selected: false
  }
}`,
      ...((h = (g = r.parameters) == null ? void 0 : g.docs) == null
        ? void 0
        : h.source),
    },
  },
};
const q = ["Default", "Selected", "WithText"];
export {
  o as Default,
  t as Selected,
  r as WithText,
  q as __namedExportsOrder,
  $ as default,
};
