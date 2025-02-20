import { j as t } from "./jsx-runtime-C8_8iAox.js";
import { d as r, T as c } from "./Typography-BU4bE9sX.js";
import { r as B } from "./index-Dkaqzkgy.js";
const F = B.forwardRef(
    (
      {
        chatId: e,
        receiverName: p,
        receiverIconSrc: l,
        receiverIconBackgroundColor: y = "#FFEFB3",
        message: b,
        timeText: j,
        images: d,
        nameTextColor: k = "#393939",
        backgroundColor: w = "#F4F4F4",
        textColor: q = "#393939",
        timeTextColor: I = "#C6C6C6",
        onImageClick: i,
      },
      R,
    ) =>
      t.jsxs(E, {
        id: `id${e}`,
        ref: R,
        children: [
          t.jsxs(N, {
            children: [
              p &&
                t.jsx(S, { variant: "body2", nameTextColor: k, children: p }),
              l &&
                t.jsx(V, {
                  backgroundColor: y,
                  children: t.jsx("img", {
                    width: "17px",
                    height: "17px",
                    src: l,
                  }),
                }),
            ],
          }),
          d &&
            t.jsx(W, {
              children: d.map((a, $) =>
                t.jsx(
                  _,
                  { src: a, onClick: () => (i == null ? void 0 : i(a)) },
                  `${a}${$}`,
                ),
              ),
            }),
          t.jsxs(M, {
            children: [
              t.jsx(U, {
                backgroundColor: w,
                children: t.jsx(z, {
                  variant: "body1",
                  textColor: q,
                  children: b,
                }),
              }),
              t.jsx(D, { variant: "caption3", timeTextColor: I, children: j }),
            ],
          }),
        ],
      }),
  ),
  E = r.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 16px;
`,
  N = r.div``,
  S = r(c)`
  color: ${(e) => e.nameTextColor};
`,
  V = r.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(e) => e.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`,
  W = r.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-right: 16px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`,
  _ = r.img`
  width: 164px;
  height: 230px;
  border-radius: 16px;
  object-fit: cover;
`,
  M = r.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 4px;
  margin-top: 4px;
`,
  D = r(c)`
  color: ${(e) => e.timeTextColor};
`,
  U = r.div`
  max-width: 73%;
  background-color: ${(e) => e.backgroundColor};
  border-radius: 16px;
  padding: 12px 16px 12px 16px;
  box-sizing: border-box;
`,
  z = r(c)`
  text-align: start;
  white-space: pre-line;
  overflow-wrap: break-word;
  color: ${(e) => e.textColor};
`;
F.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "ReceiverChat",
  props: {
    chatId: { required: !0, tsType: { name: "string" }, description: "" },
    receiverName: { required: !1, tsType: { name: "string" }, description: "" },
    receiverIconSrc: {
      required: !1,
      tsType: { name: "string" },
      description: "",
    },
    receiverIconBackgroundColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#FFEFB3'", computed: !1 },
    },
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
    nameTextColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#393939'", computed: !1 },
    },
    backgroundColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#F4F4F4'", computed: !1 },
    },
    textColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#393939'", computed: !1 },
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
const H = {
    title: "Components/Chat/Receive",
    component: F,
    argTypes: {
      backgroundColor: { control: "color" },
      textColor: { control: "color" },
      timeTextColor: { control: "color" },
    },
    args: { chatId: "" },
  },
  o = {
    args: {
      receiverName: "00대학교 총학생회",
      message: `안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림`,
      timeText: "오후 01:20",
      backgroundColor: "#F4F4F4",
      textColor: "#393939",
      timeTextColor: "#C6C6C6",
    },
  },
  s = {
    args: {
      receiverName: "00대학교 총학생회",
      message: `안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림`,
      timeText: "오후 01:20",
      images: [
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
      ],
      backgroundColor: "#F4F4F4",
      textColor: "#393939",
      timeTextColor: "#C6C6C6",
    },
  },
  n = {
    args: {
      receiverIconBackgroundColor: "#FFE0F7",
      receiverIconSrc: "/public/assets/imgs/face1.png",
      message: `안녕하세요, 총학생회입니다.
  
  소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
  현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
  빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.
  
  감사합니다.
  총학생회 드림`,
      timeText: "오후 01:20",
      images: [
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
      ],
      backgroundColor: "#F4F4F4",
      textColor: "#393939",
      timeTextColor: "#C6C6C6",
    },
  };
var m, u, g;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((m = o.parameters) == null ? void 0 : m.docs),
    source: {
      originalSource: `{
  args: {
    receiverName: '00대학교 총학생회',
    message: \`안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림\`,
    timeText: '오후 01:20',
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6'
  }
}`,
      ...((g = (u = o.parameters) == null ? void 0 : u.docs) == null
        ? void 0
        : g.source),
    },
  },
};
var x, C, h;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((x = s.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `{
  args: {
    receiverName: '00대학교 총학생회',
    message: \`안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림\`,
    timeText: '오후 01:20',
    images: ['https://picsum.photos/300/200', 'https://picsum.photos/300/200', 'https://picsum.photos/300/200'],
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6'
  }
}`,
      ...((h = (C = s.parameters) == null ? void 0 : C.docs) == null
        ? void 0
        : h.source),
    },
  },
};
var f, v, T;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((f = n.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  args: {
    receiverIconBackgroundColor: '#FFE0F7',
    receiverIconSrc: '/public/assets/imgs/face1.png',
    message: \`안녕하세요, 총학생회입니다.
  
  소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
  현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
  빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.
  
  감사합니다.
  총학생회 드림\`,
    timeText: '오후 01:20',
    images: ['https://picsum.photos/300/200', 'https://picsum.photos/300/200', 'https://picsum.photos/300/200'],
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6'
  }
}`,
      ...((T = (v = n.parameters) == null ? void 0 : v.docs) == null
        ? void 0
        : T.source),
    },
  },
};
const J = ["ReceiverDefault", "ReceiverWithImage", "ReceiverWithIcon"];
export {
  o as ReceiverDefault,
  n as ReceiverWithIcon,
  s as ReceiverWithImage,
  J as __namedExportsOrder,
  H as default,
};
