import { j as e } from "./jsx-runtime-C8_8iAox.js";
import { d as t, T as u } from "./Typography-BU4bE9sX.js";
import { r as v } from "./index-Dkaqzkgy.js";
import { m as F } from "./proxy-DSREAjDx.js";
const w = t(F.div)`
  flex-shrink: 0; // 이미지가 축소되지 않도록 설정
`,
  C = v.forwardRef(
    (
      {
        chatId: r,
        message: h,
        images: s,
        timeText: f,
        backgroundColor: y = "#1F87FF",
        textColor: T = "#FFFFFF",
        timeTextColor: b = "#C6C6C6",
        onImageClick: i,
      },
      j,
    ) =>
      e.jsxs(S, {
        id: `id${r}`,
        ref: j,
        children: [
          s &&
            s.length > 0 &&
            e.jsx(k, {
              children: [...s]
                .reverse()
                .map((o, p) =>
                  e.jsx(
                    w,
                    {
                      initial: { opacity: 0, scale: 0.4 },
                      animate: { opacity: 1, scale: 1 },
                      transition: {
                        duration: 0.5,
                        ease: [0.45, 0, 0.21, 1],
                        delay: 0.2 * p,
                      },
                      children: e.jsx(
                        q,
                        { src: o, onClick: () => (i == null ? void 0 : i(o)) },
                        `${o}${p}`,
                      ),
                    },
                    `${o}${p}`,
                  ),
                ),
            }),
          e.jsx(F.div, {
            initial: { opacity: 0, y: -100 },
            animate: { opacity: 1, y: 0 },
            transition: {
              duration: 0.4,
              ease: [0.45, 0, 0.21, 1],
              delay: 0.05,
            },
            children: e.jsxs($, {
              children: [
                e.jsx(I, {
                  variant: "caption3",
                  timeTextColor: b,
                  children: f,
                }),
                e.jsx(U, {
                  backgroundColor: y,
                  children: e.jsx(_, {
                    variant: "body1",
                    textColor: T,
                    children: h,
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
  ),
  S = t.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 4px;
  padding-right: 16px;
`,
  k = t.div`
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
  q = t.img`
  width: 164px;
  height: 230px;
  border-radius: 16px;
  object-fit: cover;
`,
  $ = t.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 4px;
  margin-top: 4px;
`,
  I = t(u)`
  color: ${(r) => r.timeTextColor};
`,
  U = t.div`
  max-width: 73%;
  background-color: ${(r) => r.backgroundColor};
  border-radius: 16px;
  padding: 12px 16px 12px 16px;
  box-sizing: border-box;
`,
  _ = t(u)`
  text-align: start;
  white-space: pre-line;
  overflow-wrap: break-word;
  color: ${(r) => r.textColor};
`;
C.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "SenderChat",
  props: {
    chatId: {
      required: !0,
      tsType: { name: "string" },
      description: `채팅 메시지의 고유 ID
@example "chat_12345"`,
    },
    message: {
      required: !0,
      tsType: { name: "string" },
      description: `전송된 채팅 메시지 내용
@example "네, 알겠습니다!"`,
    },
    images: {
      required: !1,
      tsType: {
        name: "Array",
        elements: [{ name: "string" }],
        raw: "string[]",
      },
      description: `첨부된 이미지 URL 배열 (선택 사항)
@example ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]`,
    },
    timeText: {
      required: !0,
      tsType: { name: "string" },
      description: `메시지의 전송 시간 텍스트
@example "오후 02:45"`,
    },
    backgroundColor: {
      required: !1,
      tsType: { name: "string" },
      description: `채팅 메시지의 배경 색상 (선택 사항)
@example "#1F87FF"`,
      defaultValue: { value: "'#1F87FF'", computed: !1 },
    },
    textColor: {
      required: !1,
      tsType: { name: "string" },
      description: `채팅 메시지의 텍스트 색상 (선택 사항)
@example "#FFFFFF"`,
      defaultValue: { value: "'#FFFFFF'", computed: !1 },
    },
    timeTextColor: {
      required: !1,
      tsType: { name: "string" },
      description: `메시지 시간 텍스트의 색상 (선택 사항)
@example "#C6C6C6"`,
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
      description: `이미지 클릭 시 호출되는 콜백 함수 (선택 사항)
@param imageUrl 클릭한 이미지의 URL`,
    },
  },
};
const V = {
    title: "Components/Chat/Send",
    component: C,
    argTypes: {
      backgroundColor: { control: "color" },
      textColor: { control: "color" },
      timeTextColor: { control: "color" },
    },
    args: { chatId: "" },
    tags: ["autodocs"],
  },
  a = {
    args: {
      message:
        "안녕하세요. 최근 학교에서 흡연실을 옮겼는데, 해당 위치가 학생들이 다니는 길이라 냄새가 심합니다. 위치 변경해주세요.",
      timeText: "오후 01:20",
      backgroundColor: "#1F87FF",
      textColor: "#FFFFFF",
      timeTextColor: "#C6C6C6",
    },
  },
  n = {
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
var d, l, m;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((d = a.parameters) == null ? void 0 : d.docs),
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
      ...((m = (l = a.parameters) == null ? void 0 : l.docs) == null
        ? void 0
        : m.source),
    },
  },
};
var c, x, g;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((c = n.parameters) == null ? void 0 : c.docs),
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
      ...((g = (x = n.parameters) == null ? void 0 : x.docs) == null
        ? void 0
        : g.source),
    },
  },
};
const W = ["SenderDefault", "SenderWithImage"];
export {
  a as SenderDefault,
  n as SenderWithImage,
  W as __namedExportsOrder,
  V as default,
};
