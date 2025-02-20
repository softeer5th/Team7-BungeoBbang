import { j as t } from "./jsx-runtime-C8_8iAox.js";
import { d as r, T as u } from "./Typography-BU4bE9sX.js";
import { r as v } from "./index-Dkaqzkgy.js";
const g = v.forwardRef(
    (
      {
        chatId: e,
        message: F,
        images: n,
        timeText: C,
        backgroundColor: h = "#1F87FF",
        textColor: f = "#FFFFFF",
        timeTextColor: T = "#C6C6C6",
        onImageClick: a,
      },
      y,
    ) =>
      t.jsxs(w, {
        id: `id${e}`,
        ref: y,
        children: [
          n &&
            n.length > 0 &&
            t.jsx(j, {
              children: [...n]
                .reverse()
                .map((i, b) =>
                  t.jsx(
                    S,
                    { src: i, onClick: () => (a == null ? void 0 : a(i)) },
                    `${i}${b}`,
                  ),
                ),
            }),
          t.jsxs(k, {
            children: [
              t.jsx(q, { variant: "caption3", timeTextColor: T, children: C }),
              t.jsx($, {
                backgroundColor: h,
                children: t.jsx(I, {
                  variant: "body1",
                  textColor: f,
                  children: F,
                }),
              }),
            ],
          }),
        ],
      }),
  ),
  w = r.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 4px;
  padding-right: 16px;
`,
  j = r.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-left: 16px;
  overflow-x: auto;
  direction: rtl;

  &::-webkit-scrollbar {
    display: none;
  }
`,
  S = r.img`
  width: 164px;
  height: 230px;
  border-radius: 16px;
  object-fit: cover;
`,
  k = r.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 4px;
  margin-top: 4px;
`,
  q = r(u)`
  color: ${(e) => e.timeTextColor};
`,
  $ = r.div`
  max-width: 73%;
  background-color: ${(e) => e.backgroundColor};
  border-radius: 16px;
  padding: 12px 16px 12px 16px;
  box-sizing: border-box;
`,
  I = r(u)`
  text-align: start;
  white-space: pre-line;
  overflow-wrap: break-word;
  color: ${(e) => e.textColor};
`;
g.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "SenderChat",
  props: {
    chatId: { required: !0, tsType: { name: "string" }, description: "" },
    message: { required: !0, tsType: { name: "string" }, description: "" },
    images: {
      required: !1,
      tsType: {
        name: "Array",
        elements: [{ name: "string" }],
        raw: "string[]",
      },
      description: "",
    },
    timeText: { required: !0, tsType: { name: "string" }, description: "" },
    backgroundColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#1F87FF'", computed: !1 },
    },
    textColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#FFFFFF'", computed: !1 },
    },
    timeTextColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#C6C6C6'", computed: !1 },
    },
    onImageClick: {
      required: !1,
      tsType: {
        name: "signature",
        type: "function",
        raw: "(imageUrl: string) => void",
        signature: {
          arguments: [{ type: { name: "string" }, name: "imageUrl" }],
          return: { name: "void" },
        },
      },
      description: "",
    },
  },
};
const V = {
    title: "Components/Chat/Send",
    component: g,
    argTypes: {
      backgroundColor: { control: "color" },
      textColor: { control: "color" },
      timeTextColor: { control: "color" },
    },
    args: { chatId: "" },
  },
  o = {
    args: {
      message:
        "안녕하세요. 최근 학교에서 흡연실을 옮겼는데, 해당 위치가 학생들이 다니는 길이라 냄새가 심합니다. 위치 변경해주세요.",
      timeText: "오후 01:20",
      backgroundColor: "#1F87FF",
      textColor: "#FFFFFF",
      timeTextColor: "#C6C6C6",
    },
  },
  s = {
    args: {
      message:
        "안녕하세요. 최근 학교에서 흡연실을 옮겼는데, 해당 위치가 학생들이 다니는 길이라 냄새가 심합니다. 위치 변경해주세요.",
      images: [
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
      ],
      timeText: "오후 01:20",
      backgroundColor: "#1F87FF",
      textColor: "#FFFFFF",
      timeTextColor: "#C6C6C6",
    },
  };
var d, p, l;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((d = o.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  args: {
    message: '안녕하세요. 최근 학교에서 흡연실을 옮겼는데, 해당 위치가 학생들이 다니는 길이라 냄새가 심합니다. 위치 변경해주세요.',
    timeText: '오후 01:20',
    backgroundColor: '#1F87FF',
    textColor: '#FFFFFF',
    timeTextColor: '#C6C6C6'
  }
}`,
      ...((l = (p = o.parameters) == null ? void 0 : p.docs) == null
        ? void 0
        : l.source),
    },
  },
};
var c, m, x;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((c = s.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `{
  args: {
    message: '안녕하세요. 최근 학교에서 흡연실을 옮겼는데, 해당 위치가 학생들이 다니는 길이라 냄새가 심합니다. 위치 변경해주세요.',
    images: ['https://picsum.photos/300/200', 'https://picsum.photos/300/200', 'https://picsum.photos/300/200'],
    timeText: '오후 01:20',
    backgroundColor: '#1F87FF',
    textColor: '#FFFFFF',
    timeTextColor: '#C6C6C6'
  }
}`,
      ...((x = (m = s.parameters) == null ? void 0 : m.docs) == null
        ? void 0
        : x.source),
    },
  },
};
const D = ["SenderDefault", "SenderWithImage"];
export {
  o as SenderDefault,
  s as SenderWithImage,
  D as __namedExportsOrder,
  V as default,
};
