import { j as n } from "./jsx-runtime-C8_8iAox.js";
import { B as P } from "./BorderProps-BeEA2FI6.js";
import { d as c, T as F } from "./Typography-BU4bE9sX.js";
import { a as S, g as W } from "./getBorderType-XRkN7lgl.js";
import "./index-Dkaqzkgy.js";
const d = ({
    value: e,
    placeholder: r = "",
    rows: a = 1,
    onChange: l = () => {},
    onClick: o,
    placeholderColor: t = "#A8A8A8",
    textColor: y = "#262626",
    border: T = {
      ...S(),
      borderColor: "#E0E0E0",
      disabledBorderColor: "E0E0E0",
      borderRadius: "12px",
    },
    errorText: g,
    errorTextColor: V = "#FF4B4B",
    isError: f = !1,
    disabled: R = !1,
    focusable: _ = !0,
  }) => {
    const j = (q) => {
      const w = q.target.value;
      l(w);
    };
    return n.jsxs($, {
      children: [
        n.jsx(I, {
          rows: a,
          tabIndex: _ ? 0 : -1,
          variant: "body1",
          onClick: o,
          value: e,
          placeholder: r,
          onChange: j,
          placeholderColor: t,
          textColor: y,
          border: T,
          hasError: f,
          disabled: R,
          isFocusable: !o,
        }),
        f &&
          g &&
          n.jsx(D, { variant: "caption2", errorTextColor: V, children: g }),
      ],
    });
  },
  $ = c.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`,
  I = c(F).attrs({ as: "textarea" })`
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  background-color: ${(e) => (e.disabled ? "#F4F4F4" : "#FFFFFF")};
  color: ${(e) => (e.disabled ? "#C6C6C6" : e.textColor)};
  ${(e) => (e.border ? W({ ...e.border, borderColor: e.hasError ? e.border.errorBorderColor : e.disabled ? e.border.disabledBorderColor : e.border.borderColor }) : "border: none;")}
  border-radius: ${(e) => {
    var r;
    return ((r = e.border) == null ? void 0 : r.borderRadius) || "12px";
  }};
  outline: none;
  resize: none;

  &::placeholder {
    color: ${(e) => e.placeholderColor || "#A8A8A8"};
  }

  &:focus {
    caret-color: ${(e) => (e.isFocusable ? "default" : "transparent")};
  }
`,
  D = c(F)`
  color: ${(e) => e.errorTextColor};
  margin-top: 6px;
`;
d.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "TextField",
  props: {
    placeholder: { defaultValue: { value: "''", computed: !1 }, required: !1 },
    rows: { defaultValue: { value: "1", computed: !1 }, required: !1 },
    onChange: {
      defaultValue: { value: "() => {}", computed: !1 },
      required: !1,
    },
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
    errorTextColor: {
      defaultValue: { value: "'#FF4B4B'", computed: !1 },
      required: !1,
    },
    isError: { defaultValue: { value: "false", computed: !1 }, required: !1 },
    disabled: { defaultValue: { value: "false", computed: !1 }, required: !1 },
    focusable: { defaultValue: { value: "true", computed: !1 }, required: !1 },
  },
};
const { useArgs: p } = __STORYBOOK_MODULE_PREVIEW_API__,
  N = {
    title: "Components/TextField",
    component: d,
    argTypes: {
      placeholderColor: { control: "color" },
      textColor: { control: "color" },
      border: { control: "object" },
      isError: { control: "boolean" },
      disabled: { control: "boolean" },
      focusable: { control: "boolean" },
      rows: { control: "number", min: 1, max: 10, step: 1 },
    },
    tags: ["autodocs"],
  },
  s = {
    args: {
      value: "Primary Button",
      placeholder: "text message...",
      placeholderColor: "#A8A8A8",
      textColor: "#262626",
      disabled: !1,
      focusable: !0,
    },
    render: function (r) {
      const [{ value: a }, l] = p(),
        o = (t) => {
          l({ ...r, value: t });
        };
      return n.jsx(d, { ...r, value: a, onChange: o });
    },
  },
  u = {
    args: {
      value: "Primary Button",
      placeholder: "text message...",
      placeholderColor: "#A8A8A8",
      textColor: "#262626",
      disabled: !1,
    },
    render: function (r) {
      const [{ value: a }, l] = p(),
        o = (t) => {
          l({ ...r, value: t });
        };
      return n.jsx(d, {
        ...r,
        value: a,
        placeholder: "input email...",
        onChange: o,
        isError: !0,
        errorText: "invalid email",
      });
    },
  },
  i = {
    args: {
      value: "Primary Button",
      placeholder: "text message...",
      placeholderColor: "#A8A8A8",
      textColor: "#262626",
      disabled: !1,
      border: {
        borderWidth: "5px",
        borderColor: "red",
        disabledBorderColor: "blue",
        borderRadius: "0px",
        borderType: P.ALL,
      },
    },
    render: function (r) {
      const [{ value: a }, l] = p(),
        o = (t) => {
          l({ ...r, value: t });
        };
      return n.jsx(d, { ...r, value: a, onChange: o });
    },
  };
var b, h, m;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((b = s.parameters) == null ? void 0 : b.docs),
    source: {
      originalSource: `{
  args: {
    value: 'Primary Button',
    placeholder: 'text message...',
    placeholderColor: '#A8A8A8',
    textColor: '#262626',
    disabled: false,
    focusable: true
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
    return <TextField {...args} value={value} onChange={handleChange} />;
  }
}`,
      ...((m = (h = s.parameters) == null ? void 0 : h.docs) == null
        ? void 0
        : m.source),
    },
  },
};
var x, C, A;
u.parameters = {
  ...u.parameters,
  docs: {
    ...((x = u.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `{
  args: {
    value: 'Primary Button',
    placeholder: 'text message...',
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
    return <TextField {...args} value={value} placeholder="input email..." onChange={handleChange} isError={true} errorText="invalid email" />;
  }
}`,
      ...((A = (C = u.parameters) == null ? void 0 : C.docs) == null
        ? void 0
        : A.source),
    },
  },
};
var v, B, E;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((v = i.parameters) == null ? void 0 : v.docs),
    source: {
      originalSource: `{
  args: {
    value: 'Primary Button',
    placeholder: 'text message...',
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
    return <TextField {...args} // ✅ 다른 props 유지
    value={value} onChange={handleChange} // ✅ 값 변경 이벤트 적용
    />;
  }
}`,
      ...((E = (B = i.parameters) == null ? void 0 : B.docs) == null
        ? void 0
        : E.source),
    },
  },
};
const U = ["Default", "WithError", "WithBorder"];
export {
  s as Default,
  i as WithBorder,
  u as WithError,
  U as __namedExportsOrder,
  N as default,
};
