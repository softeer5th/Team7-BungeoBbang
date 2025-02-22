import { j as n } from "./jsx-runtime-C8_8iAox.js";
import { r } from "./index-Dkaqzkgy.js";
import { d as s, T as y } from "./Typography-BU4bE9sX.js";
const x = ({
    itemId: e,
    title: t,
    backgroundColor: o = "#FFFFFF",
    selectedBackroundColor: d = "#FFFFFF",
    textColor: l = "#C6C6C6",
    selectedTextColor: u = "#1F87FF",
    selected: i = !1,
    onItemClick: F = () => {},
  }) =>
    n.jsx(v, {
      $backgroundColor: i ? d : o,
      onClick: () => F(e),
      children: n.jsx(h, {
        variant: "heading3",
        textColor: i ? u : l,
        children: t,
      }),
    }),
  v = s.div`
  flex: 1;
  padding: 10px 12px 12px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(e) => e.$backgroundColor};
`,
  h = s(y)`
  color: ${(e) => e.textColor};
`;
x.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "TabBarItem",
  props: {
    itemId: { required: !0, tsType: { name: "string" }, description: "" },
    title: { required: !0, tsType: { name: "string" }, description: "" },
    backgroundColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#FFFFFF'", computed: !1 },
    },
    selectedBackroundColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#FFFFFF'", computed: !1 },
    },
    textColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#C6C6C6'", computed: !1 },
    },
    selectedTextColor: {
      required: !1,
      tsType: { name: "string" },
      description: "",
      defaultValue: { value: "'#1F87FF'", computed: !1 },
    },
    selected: {
      required: !1,
      tsType: { name: "boolean" },
      description: "",
      defaultValue: { value: "false", computed: !1 },
    },
    onItemClick: {
      required: !1,
      tsType: {
        name: "signature",
        type: "function",
        raw: "(itemId: string) => void",
        signature: {
          arguments: [{ type: { name: "string" }, name: "itemId" }],
          return: { name: "void" },
        },
      },
      description: "",
      defaultValue: { value: "() => {}", computed: !1 },
    },
  },
};
const b = ({
    currentDestination: e,
    items: t,
    backgroundColor: o = "#FFFFFF",
    selectedItembackgroundColor: d = "#FFFFFF",
    indicatorColor: l = "#1F87FF",
    textColor: u = "#C6C6C6",
    selectedTextColor: i = "#1F87FF",
    onItemClick: F = () => {},
  }) => {
    var f;
    const [p, m] = r.useState(e || ((f = t[0]) == null ? void 0 : f.itemId)),
      C = t.findIndex((a) => a.itemId === p),
      [I, T] = r.useState(0),
      c = r.useRef(null);
    return (
      r.useEffect(() => {
        e && m(e);
      }, [e]),
      r.useEffect(() => {
        c.current && T(c.current.offsetWidth / t.length);
      }, [t.length]),
      n.jsxs($, {
        ref: c,
        children: [
          t.map((a) =>
            n.jsx(
              x,
              {
                itemId: a.itemId,
                title: a.title,
                backgroundColor: o,
                selectedBackroundColor: d,
                textColor: u,
                selectedTextColor: i,
                selected: a.itemId === p,
                onItemClick: (g) => {
                  m(g), F(g);
                },
              },
              a.itemId,
            ),
          ),
          n.jsx(q, {
            $indicatorColor: l,
            $indicatorWidth: I,
            $selectedIndex: C,
          }),
        ],
      })
    );
  },
  $ = s.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`,
  q = s.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 2px;
  width: ${(e) => `${e.$indicatorWidth}px`};
  background-color: ${(e) => e.$indicatorColor};
  transition: transform 0.3s ease;
  transform: ${(e) => `translateX(calc(${e.$selectedIndex} * ${e.$indicatorWidth}px))`};
`;
b.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "TabBar",
  props: {
    currentDestination: {
      required: !0,
      tsType: { name: "string" },
      description: `현재 선택된 탭의 ID
@example "home"`,
    },
    items: {
      required: !0,
      tsType: {
        name: "Array",
        elements: [{ name: "TabBarItemProps" }],
        raw: "TabBarItemProps[]",
      },
      description: "탭 항목 리스트",
    },
    backgroundColor: {
      required: !1,
      tsType: { name: "string" },
      description: `탭 바의 배경 색상 (선택 사항)
@default "#FFFFFF"
@example "#F4F4F4"`,
      defaultValue: { value: "'#FFFFFF'", computed: !1 },
    },
    selectedItembackgroundColor: {
      required: !1,
      tsType: { name: "string" },
      description: `선택된 탭의 배경 색상 (선택 사항)
@default "#FFFFFF"
@example "#E0E0E0"`,
      defaultValue: { value: "'#FFFFFF'", computed: !1 },
    },
    indicatorColor: {
      required: !1,
      tsType: { name: "string" },
      description: `탭 인디케이터 색상 (선택 사항)
@default "#1F87FF"
@example "#FF0000"`,
      defaultValue: { value: "'#1F87FF'", computed: !1 },
    },
    textColor: {
      required: !1,
      tsType: { name: "string" },
      description: `기본 탭 텍스트 색상 (선택 사항)
@default "#A8A8A8"
@example "#000000"`,
      defaultValue: { value: "'#C6C6C6'", computed: !1 },
    },
    selectedTextColor: {
      required: !1,
      tsType: { name: "string" },
      description: `선택된 탭의 텍스트 색상 (선택 사항)
@default "#1F87FF"
@example "#FFFFFF"`,
      defaultValue: { value: "'#1F87FF'", computed: !1 },
    },
    onItemClick: {
      required: !1,
      tsType: {
        name: "signature",
        type: "function",
        raw: "(itemId: string) => void",
        signature: {
          arguments: [{ type: { name: "string" }, name: "itemId" }],
          return: { name: "void" },
        },
      },
      description: `탭 항목 클릭 시 호출되는 콜백 함수 (선택 사항)
@param itemId 클릭한 탭의 ID`,
      defaultValue: { value: "() => {}", computed: !1 },
    },
  },
};
export { b as T };
