import { B as x } from "./BorderProps-BeEA2FI6.js";
import { B as C } from "./Button-7IZEOquv.js";
import "./jsx-runtime-C8_8iAox.js";
import "./index-Dkaqzkgy.js";
import "./Typography-BU4bE9sX.js";
import "./getBorderType-XRkN7lgl.js";
const S = {
    title: "Components/Button",
    component: C,
    argTypes: {
      backgroundColor: { control: "color" },
      textColor: { control: "color" },
      border: { control: "object" },
      disabled: { control: "boolean" },
    },
  },
  r = {
    args: {
      text: "Primary Button",
      backgroundColor: "#1F87FF",
      textColor: "#FFFFFF",
      disabled: !1,
    },
  },
  o = {
    args: {
      text: "Secondary Button",
      backgroundColor: "#FF4B4B",
      textColor: "#FFFFFF",
      disabled: !1,
    },
  },
  e = {
    args: {
      text: "Dismiss Button",
      backgroundColor: "#F4F4F4",
      textColor: "#A8A8A8",
      disabled: !1,
    },
  },
  t = {
    args: {
      text: "Primary Button",
      backgroundColor: "#1F87FF",
      textColor: "#FFFFFF",
      disabled: !1,
      border: {
        borderWidth: "5px",
        borderColor: "red",
        disabledBorderColor: "blue",
        borderRadius: "0px",
        borderType: x.ALL,
      },
    },
  };
var a, s, n;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((a = r.parameters) == null ? void 0 : a.docs),
    source: {
      originalSource: `{
  args: {
    text: 'Primary Button',
    backgroundColor: '#1F87FF',
    textColor: '#FFFFFF',
    disabled: false
  }
}`,
      ...((n = (s = r.parameters) == null ? void 0 : s.docs) == null
        ? void 0
        : n.source),
    },
  },
};
var d, F, l;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((d = o.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  args: {
    text: 'Secondary Button',
    backgroundColor: '#FF4B4B',
    textColor: '#FFFFFF',
    disabled: false
  }
}`,
      ...((l = (F = o.parameters) == null ? void 0 : F.docs) == null
        ? void 0
        : l.source),
    },
  },
};
var c, i, m;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((c = e.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `{
  args: {
    text: 'Dismiss Button',
    backgroundColor: '#F4F4F4',
    textColor: '#A8A8A8',
    disabled: false
  }
}`,
      ...((m = (i = e.parameters) == null ? void 0 : i.docs) == null
        ? void 0
        : m.source),
    },
  },
};
var u, b, p;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((u = t.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `{
  args: {
    text: 'Primary Button',
    backgroundColor: '#1F87FF',
    textColor: '#FFFFFF',
    disabled: false,
    border: {
      borderWidth: '5px',
      borderColor: 'red',
      disabledBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL
    }
  }
}`,
      ...((p = (b = t.parameters) == null ? void 0 : b.docs) == null
        ? void 0
        : p.source),
    },
  },
};
const P = ["Primary", "Secondary", "Dismiss", "WithBorder"];
export {
  e as Dismiss,
  r as Primary,
  o as Secondary,
  t as WithBorder,
  P as __namedExportsOrder,
  S as default,
};
