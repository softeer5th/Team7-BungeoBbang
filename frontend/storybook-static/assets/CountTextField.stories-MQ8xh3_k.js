import { j as d } from "./jsx-runtime-C8_8iAox.js";
import { B } from "./BorderProps-BeEA2FI6.js";
import { d as c, T as m } from "./Typography-BU4bE9sX.js";
import { a as F, g as R } from "./getBorderType-XRkN7lgl.js";
import "./index-Dkaqzkgy.js";
const i = ({
    value: e,
    maxLength: r,
    placeholder: o,
    rows: a = 1,
    onChange: l,
    placeholderColor: n = "#A8A8A8",
    textColor: v = "#262626",
    border: E = {
      ...F(),
      borderColor: "#E0E0E0",
      disabledBorderColor: "E0E0E0",
      borderRadius: "12px",
    },
    disabled: p = !1,
  }) => {
    const T = (y) => {
      let t = y.target.value;
      t.length >= r && (t = t.slice(0, r)), l(t);
    };
    return d.jsxs(V, {
      children: [
        d.jsx(_, {
          rows: a,
          variant: "body1",
          value: p ? "" : e,
          placeholder: o,
          onChange: T,
          placeholderColor: n,
          textColor: v,
          border: E,
          disabled: p,
        }),
        d.jsxs(j, { variant: "caption2", children: [e.length, "/", r] }),
      ],
    });
  },
  V = c.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`,
  _ = c(m).attrs({ as: "textarea" })`
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  background-color: ${(e) => (e.disabled ? "#E0E0E0" : "#FFFFFF")};
  color: ${(e) => (e.disabled ? "#C6C6C6" : e.textColor)};
  ${(e) => (e.border ? R({ ...e.border, borderColor: e.disabled ? e.border.disabledBorderColor : e.border.borderColor }) : "border: none;")}

  border-radius: ${(e) => {
    var r;
    return ((r = e.border) == null ? void 0 : r.borderRadius) || "12px";
  }};
  outline: none;
  resize: none;

  &::placeholder {
    color: ${(e) => e.placeholderColor};
  }
`,
  j = c(m)`
  color: #a8a8a8;
  margin-top: 6px;
`;
i.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "CountTextField",
  props: {
    rows: { defaultValue: { value: "1", computed: !1 }, required: !1 },
    placeholderColor: {
      defaultValue: { value: "'#A8A8A8'", computed: !1 },
      required: !1,
    },
    textColor: {
      defaultValue: { value: "'#262626'", computed: !1 },
      required: !1,
    },
    border: {
      defaultValue: {
        value: `{
  ...getDefaultBorderStyle(),
  borderColor: '#E0E0E0',
  disabledBorderColor: 'E0E0E0',
  borderRadius: '12px',
}`,
        computed: !1,
      },
      required: !1,
    },
    disabled: { defaultValue: { value: "false", computed: !1 }, required: !1 },
  },
};
const { useArgs: A } = __STORYBOOK_MODULE_PREVIEW_API__,
  D = {
    title: "Components/CountTextField",
    component: i,
    argTypes: {
      placeholderColor: { control: "color" },
      textColor: { control: "color" },
      border: { control: "object" },
      disabled: { control: "boolean" },
      rows: { control: "number", min: 1, max: 10, step: 1 },
    },
    args: {
      value: "",
      maxLength: 20,
      placeholderColor: "#A8A8A8",
      textColor: "#262626",
      disabled: !1,
    },
    tags: ["autodocs"],
  },
  s = {
    args: {
      value: "Hello World!",
      placeholder: "text message...",
      maxLength: 20,
      placeholderColor: "#A8A8A8",
      textColor: "#262626",
      disabled: !1,
    },
    render: function (r) {
      const [{ value: o }, a] = A(),
        l = (n) => {
          a({ ...r, value: n });
        };
      return d.jsx(i, { ...r, value: o, onChange: l });
    },
  },
  u = {
    args: {
      value: "Hello World!",
      placeholder: "text message...",
      maxLength: 20,
      placeholderColor: "#A8A8A8",
      textColor: "#262626",
      disabled: !1,
      border: {
        borderWidth: "5px",
        borderColor: "red",
        disabledBorderColor: "blue",
        borderRadius: "0px",
        borderType: B.ALL,
      },
    },
    render: function (r) {
      const [{ value: o }, a] = A(),
        l = (n) => {
          a({ ...r, value: n });
        };
      return d.jsx(i, { ...r, value: o, onChange: l });
    },
  };
var g, C, b;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((g = s.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  args: {
    value: 'Hello World!',
    placeholder: 'text message...',
    maxLength: 20,
    placeholderColor: '#A8A8A8',
    textColor: '#262626',
    disabled: false
  },
  render: function Render(args) {
    const [{
      value
    }, updateArgs] = useArgs();
    const handleChange = (newValue: string) => {
      updateArgs({
        ...args,
        value: newValue
      });
    };
    return <CountTextField {...args} value={value} onChange={handleChange} />;
  }
}`,
      ...((b = (C = s.parameters) == null ? void 0 : C.docs) == null
        ? void 0
        : b.source),
    },
  },
};
var x, h, f;
u.parameters = {
  ...u.parameters,
  docs: {
    ...((x = u.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `{
  args: {
    value: 'Hello World!',
    placeholder: 'text message...',
    maxLength: 20,
    placeholderColor: '#A8A8A8',
    textColor: '#262626',
    disabled: false,
    border: {
      borderWidth: '5px',
      borderColor: 'red',
      disabledBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL
    }
  },
  render: function Render(args) {
    const [{
      value
    }, updateArgs] = useArgs();
    const handleChange = (newValue: string) => {
      updateArgs({
        ...args,
        value: newValue
      });
    };
    return <CountTextField {...args} value={value} onChange={handleChange} />;
  }
}`,
      ...((f = (h = u.parameters) == null ? void 0 : h.docs) == null
        ? void 0
        : f.source),
    },
  },
};
const I = ["Default", "WithBorder"];
export {
  s as Default,
  u as WithBorder,
  I as __namedExportsOrder,
  D as default,
};
