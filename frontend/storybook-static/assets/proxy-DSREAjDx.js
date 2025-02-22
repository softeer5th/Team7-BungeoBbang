import { j as ce } from "./jsx-runtime-C8_8iAox.js";
import { r as S } from "./index-Dkaqzkgy.js";
const As = S.createContext({});
function Qi(t) {
  const e = S.useRef(null);
  return e.current === null && (e.current = t()), e.current;
}
const Ce = S.createContext(null),
  bs = S.createContext({
    transformPagePoint: (t) => t,
    isStatic: !1,
    reducedMotion: "never",
  });
function to(t = !0) {
  const e = S.useContext(Ce);
  if (e === null) return [!0, null];
  const { isPresent: n, onExitComplete: s, register: i } = e,
    r = S.useId();
  S.useEffect(() => {
    t && i(r);
  }, [t]);
  const o = S.useCallback(() => t && s && s(r), [r, s, t]);
  return !n && s ? [!1, o] : [!0];
}
const De = typeof window < "u",
  eo = De ? S.useLayoutEffect : S.useEffect,
  I = (t) => t;
let ws = I;
function Me(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const ct = (t, e, n) => {
    const s = e - t;
    return s === 0 ? 1 : (n - t) / s;
  },
  $ = (t) => t * 1e3,
  z = (t) => t / 1e3,
  no = { useManualTiming: !1 };
function so(t) {
  let e = new Set(),
    n = new Set(),
    s = !1,
    i = !1;
  const r = new WeakSet();
  let o = { delta: 0, timestamp: 0, isProcessing: !1 };
  function a(u) {
    r.has(u) && (l.schedule(u), t()), u(o);
  }
  const l = {
    schedule: (u, c = !1, h = !1) => {
      const d = h && s ? e : n;
      return c && r.add(u), d.has(u) || d.add(u), u;
    },
    cancel: (u) => {
      n.delete(u), r.delete(u);
    },
    process: (u) => {
      if (((o = u), s)) {
        i = !0;
        return;
      }
      (s = !0),
        ([e, n] = [n, e]),
        e.forEach(a),
        e.clear(),
        (s = !1),
        i && ((i = !1), l.process(u));
    },
  };
  return l;
}
const Ft = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
  ],
  io = 40;
function Vs(t, e) {
  let n = !1,
    s = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    r = () => (n = !0),
    o = Ft.reduce((g, v) => ((g[v] = so(r)), g), {}),
    {
      read: a,
      resolveKeyframes: l,
      update: u,
      preRender: c,
      render: h,
      postRender: f,
    } = o,
    d = () => {
      const g = performance.now();
      (n = !1),
        (i.delta = s ? 1e3 / 60 : Math.max(Math.min(g - i.timestamp, io), 1)),
        (i.timestamp = g),
        (i.isProcessing = !0),
        a.process(i),
        l.process(i),
        u.process(i),
        c.process(i),
        h.process(i),
        f.process(i),
        (i.isProcessing = !1),
        n && e && ((s = !1), t(d));
    },
    m = () => {
      (n = !0), (s = !0), i.isProcessing || t(d);
    };
  return {
    schedule: Ft.reduce((g, v) => {
      const x = o[v];
      return (g[v] = (b, P = !1, w = !1) => (n || m(), x.schedule(b, P, w))), g;
    }, {}),
    cancel: (g) => {
      for (let v = 0; v < Ft.length; v++) o[Ft[v]].cancel(g);
    },
    state: i,
    steps: o,
  };
}
const {
    schedule: V,
    cancel: Y,
    state: E,
    steps: Jt,
  } = Vs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : I, !0),
  Cs = S.createContext({ strict: !1 }),
  un = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  ht = {};
for (const t in un) ht[t] = { isEnabled: (e) => un[t].some((n) => !!e[n]) };
function oo(t) {
  for (const e in t) ht[e] = { ...ht[e], ...t[e] };
}
const ro = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function Nt(t) {
  return (
    t.startsWith("while") ||
    (t.startsWith("drag") && t !== "draggable") ||
    t.startsWith("layout") ||
    t.startsWith("onTap") ||
    t.startsWith("onPan") ||
    t.startsWith("onLayout") ||
    ro.has(t)
  );
}
let Ds = (t) => !Nt(t);
function ao(t) {
  t && (Ds = (e) => (e.startsWith("on") ? !Nt(e) : t(e)));
}
try {
  ao(require("@emotion/is-prop-valid").default);
} catch {}
function lo(t, e, n) {
  const s = {};
  for (const i in t)
    (i === "values" && typeof t.values == "object") ||
      ((Ds(i) ||
        (n === !0 && Nt(i)) ||
        (!e && !Nt(i)) ||
        (t.draggable && i.startsWith("onDrag"))) &&
        (s[i] = t[i]));
  return s;
}
function uo(t) {
  if (typeof Proxy > "u") return t;
  const e = new Map(),
    n = (...s) => t(...s);
  return new Proxy(n, {
    get: (s, i) =>
      i === "create" ? t : (e.has(i) || e.set(i, t(i)), e.get(i)),
  });
}
const $t = S.createContext({});
function zt(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function At(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Re = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  Ee = ["initial", ...Re];
function Ht(t) {
  return zt(t.animate) || Ee.some((e) => At(t[e]));
}
function Ms(t) {
  return !!(Ht(t) || t.variants);
}
function co(t, e) {
  if (Ht(t)) {
    const { initial: n, animate: s } = t;
    return {
      initial: n === !1 || At(n) ? n : void 0,
      animate: At(s) ? s : void 0,
    };
  }
  return t.inherit !== !1 ? e : {};
}
function ho(t) {
  const { initial: e, animate: n } = co(t, S.useContext($t));
  return S.useMemo(() => ({ initial: e, animate: n }), [cn(e), cn(n)]);
}
function cn(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const fo = Symbol.for("motionComponentSymbol");
function ot(t) {
  return (
    t &&
    typeof t == "object" &&
    Object.prototype.hasOwnProperty.call(t, "current")
  );
}
function mo(t, e, n) {
  return S.useCallback(
    (s) => {
      s && t.onMount && t.onMount(s),
        e && (s ? e.mount(s) : e.unmount()),
        n && (typeof n == "function" ? n(s) : ot(n) && (n.current = s));
    },
    [e],
  );
}
const Le = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  po = "framerAppearId",
  Rs = "data-" + Le(po),
  { schedule: Fe } = Vs(queueMicrotask, !1),
  Es = S.createContext({});
function go(t, e, n, s, i) {
  var r, o;
  const { visualElement: a } = S.useContext($t),
    l = S.useContext(Cs),
    u = S.useContext(Ce),
    c = S.useContext(bs).reducedMotion,
    h = S.useRef(null);
  (s = s || l.renderer),
    !h.current &&
      s &&
      (h.current = s(t, {
        visualState: e,
        parent: a,
        props: n,
        presenceContext: u,
        blockInitialAnimation: u ? u.initial === !1 : !1,
        reducedMotionConfig: c,
      }));
  const f = h.current,
    d = S.useContext(Es);
  f &&
    !f.projection &&
    i &&
    (f.type === "html" || f.type === "svg") &&
    yo(h.current, n, i, d);
  const m = S.useRef(!1);
  S.useInsertionEffect(() => {
    f && m.current && f.update(n, u);
  });
  const p = n[Rs],
    y = S.useRef(
      !!p &&
        !(
          !((r = window.MotionHandoffIsComplete) === null || r === void 0) &&
          r.call(window, p)
        ) &&
        ((o = window.MotionHasOptimisedAnimation) === null || o === void 0
          ? void 0
          : o.call(window, p)),
    );
  return (
    eo(() => {
      f &&
        ((m.current = !0),
        (window.MotionIsMounted = !0),
        f.updateFeatures(),
        Fe.render(f.render),
        y.current && f.animationState && f.animationState.animateChanges());
    }),
    S.useEffect(() => {
      f &&
        (!y.current && f.animationState && f.animationState.animateChanges(),
        y.current &&
          (queueMicrotask(() => {
            var g;
            (g = window.MotionHandoffMarkAsComplete) === null ||
              g === void 0 ||
              g.call(window, p);
          }),
          (y.current = !1)));
    }),
    f
  );
}
function yo(t, e, n, s) {
  const {
    layoutId: i,
    layout: r,
    drag: o,
    dragConstraints: a,
    layoutScroll: l,
    layoutRoot: u,
  } = e;
  (t.projection = new n(
    t.latestValues,
    e["data-framer-portal-id"] ? void 0 : Ls(t.parent),
  )),
    t.projection.setOptions({
      layoutId: i,
      layout: r,
      alwaysMeasureLayout: !!o || (a && ot(a)),
      visualElement: t,
      animationType: typeof r == "string" ? r : "both",
      initialPromotionConfig: s,
      layoutScroll: l,
      layoutRoot: u,
    });
}
function Ls(t) {
  if (t) return t.options.allowProjection !== !1 ? t.projection : Ls(t.parent);
}
function vo({
  preloadedFeatures: t,
  createVisualElement: e,
  useRender: n,
  useVisualState: s,
  Component: i,
}) {
  var r, o;
  t && oo(t);
  function a(u, c) {
    let h;
    const f = { ...S.useContext(bs), ...u, layoutId: xo(u) },
      { isStatic: d } = f,
      m = ho(u),
      p = s(u, d);
    if (!d && De) {
      To();
      const y = Po(f);
      (h = y.MeasureLayout),
        (m.visualElement = go(i, p, f, e, y.ProjectionNode));
    }
    return ce.jsxs($t.Provider, {
      value: m,
      children: [
        h && m.visualElement
          ? ce.jsx(h, { visualElement: m.visualElement, ...f })
          : null,
        n(i, u, mo(p, m.visualElement, c), p, d, m.visualElement),
      ],
    });
  }
  a.displayName = `motion.${typeof i == "string" ? i : `create(${(o = (r = i.displayName) !== null && r !== void 0 ? r : i.name) !== null && o !== void 0 ? o : ""})`}`;
  const l = S.forwardRef(a);
  return (l[fo] = i), l;
}
function xo({ layoutId: t }) {
  const e = S.useContext(As).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function To(t, e) {
  S.useContext(Cs).strict;
}
function Po(t) {
  const { drag: e, layout: n } = ht;
  if (!e && !n) return {};
  const s = { ...e, ...n };
  return {
    MeasureLayout:
      (e != null && e.isEnabled(t)) || (n != null && n.isEnabled(t))
        ? s.MeasureLayout
        : void 0,
    ProjectionNode: s.ProjectionNode,
  };
}
const Fs = (t) => (e) => typeof e == "string" && e.startsWith(t),
  Be = Fs("--"),
  So = Fs("var(--"),
  ke = (t) => (So(t) ? Ao.test(t.split("/*")[0].trim()) : !1),
  Ao =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  bt = {};
function bo(t) {
  for (const e in t) (bt[e] = t[e]), Be(e) && (bt[e].isCSSVariable = !0);
}
const dt = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  st = new Set(dt);
function Bs(t, { layout: e, layoutId: n }) {
  return (
    st.has(t) ||
    t.startsWith("origin") ||
    ((e || n !== void 0) && (!!bt[t] || t === "opacity"))
  );
}
const F = (t) => !!(t && t.getVelocity),
  ks = (t, e) => (e && typeof t == "number" ? e.transform(t) : t),
  H = (t, e, n) => (n > e ? e : n < t ? t : n),
  mt = {
    test: (t) => typeof t == "number",
    parse: parseFloat,
    transform: (t) => t,
  },
  wt = { ...mt, transform: (t) => H(0, 1, t) },
  Bt = { ...mt, default: 1 },
  Mt = (t) => ({
    test: (e) =>
      typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: (e) => `${e}${t}`,
  }),
  X = Mt("deg"),
  K = Mt("%"),
  T = Mt("px"),
  wo = Mt("vh"),
  Vo = Mt("vw"),
  hn = {
    ...K,
    parse: (t) => K.parse(t) / 100,
    transform: (t) => K.transform(t * 100),
  },
  Co = {
    borderWidth: T,
    borderTopWidth: T,
    borderRightWidth: T,
    borderBottomWidth: T,
    borderLeftWidth: T,
    borderRadius: T,
    radius: T,
    borderTopLeftRadius: T,
    borderTopRightRadius: T,
    borderBottomRightRadius: T,
    borderBottomLeftRadius: T,
    width: T,
    maxWidth: T,
    height: T,
    maxHeight: T,
    top: T,
    right: T,
    bottom: T,
    left: T,
    padding: T,
    paddingTop: T,
    paddingRight: T,
    paddingBottom: T,
    paddingLeft: T,
    margin: T,
    marginTop: T,
    marginRight: T,
    marginBottom: T,
    marginLeft: T,
    backgroundPositionX: T,
    backgroundPositionY: T,
  },
  Do = {
    rotate: X,
    rotateX: X,
    rotateY: X,
    rotateZ: X,
    scale: Bt,
    scaleX: Bt,
    scaleY: Bt,
    scaleZ: Bt,
    skew: X,
    skewX: X,
    skewY: X,
    distance: T,
    translateX: T,
    translateY: T,
    translateZ: T,
    x: T,
    y: T,
    z: T,
    perspective: T,
    transformPerspective: T,
    opacity: wt,
    originX: hn,
    originY: hn,
    originZ: T,
  },
  fn = { ...mt, transform: Math.round },
  je = {
    ...Co,
    ...Do,
    zIndex: fn,
    size: T,
    fillOpacity: wt,
    strokeOpacity: wt,
    numOctaves: fn,
  },
  Mo = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  Ro = dt.length;
function Eo(t, e, n) {
  let s = "",
    i = !0;
  for (let r = 0; r < Ro; r++) {
    const o = dt[r],
      a = t[o];
    if (a === void 0) continue;
    let l = !0;
    if (
      (typeof a == "number"
        ? (l = a === (o.startsWith("scale") ? 1 : 0))
        : (l = parseFloat(a) === 0),
      !l || n)
    ) {
      const u = ks(a, je[o]);
      if (!l) {
        i = !1;
        const c = Mo[o] || o;
        s += `${c}(${u}) `;
      }
      n && (e[o] = u);
    }
  }
  return (s = s.trim()), n ? (s = n(e, i ? "" : s)) : i && (s = "none"), s;
}
function Ie(t, e, n) {
  const { style: s, vars: i, transformOrigin: r } = t;
  let o = !1,
    a = !1;
  for (const l in e) {
    const u = e[l];
    if (st.has(l)) {
      o = !0;
      continue;
    } else if (Be(l)) {
      i[l] = u;
      continue;
    } else {
      const c = ks(u, je[l]);
      l.startsWith("origin") ? ((a = !0), (r[l] = c)) : (s[l] = c);
    }
  }
  if (
    (e.transform ||
      (o || n
        ? (s.transform = Eo(e, t.transform, n))
        : s.transform && (s.transform = "none")),
    a)
  ) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = r;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Oe = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function js(t, e, n) {
  for (const s in e) !F(e[s]) && !Bs(s, n) && (t[s] = e[s]);
}
function Lo({ transformTemplate: t }, e) {
  return S.useMemo(() => {
    const n = Oe();
    return Ie(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function Fo(t, e) {
  const n = t.style || {},
    s = {};
  return js(s, n, t), Object.assign(s, Lo(t, e)), s;
}
function Bo(t, e) {
  const n = {},
    s = Fo(t, e);
  return (
    t.drag &&
      t.dragListener !== !1 &&
      ((n.draggable = !1),
      (s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none"),
      (s.touchAction =
        t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`)),
    t.tabIndex === void 0 &&
      (t.onTap || t.onTapStart || t.whileTap) &&
      (n.tabIndex = 0),
    (n.style = s),
    n
  );
}
const ko = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Ne(t) {
  return typeof t != "string" || t.includes("-")
    ? !1
    : !!(ko.indexOf(t) > -1 || /[A-Z]/u.test(t));
}
const jo = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  Io = { offset: "strokeDashoffset", array: "strokeDasharray" };
function Oo(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const r = i ? jo : Io;
  t[r.offset] = T.transform(-s);
  const o = T.transform(e),
    a = T.transform(n);
  t[r.array] = `${o} ${a}`;
}
function dn(t, e, n) {
  return typeof t == "string" ? t : T.transform(e + n * t);
}
function No(t, e, n) {
  const s = dn(e, t.x, t.width),
    i = dn(n, t.y, t.height);
  return `${s} ${i}`;
}
function Ue(
  t,
  {
    attrX: e,
    attrY: n,
    attrScale: s,
    originX: i,
    originY: r,
    pathLength: o,
    pathSpacing: a = 1,
    pathOffset: l = 0,
    ...u
  },
  c,
  h,
) {
  if ((Ie(t, u, h), c)) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  (t.attrs = t.style), (t.style = {});
  const { attrs: f, style: d, dimensions: m } = t;
  f.transform && (m && (d.transform = f.transform), delete f.transform),
    m &&
      (i !== void 0 || r !== void 0 || d.transform) &&
      (d.transformOrigin = No(
        m,
        i !== void 0 ? i : 0.5,
        r !== void 0 ? r : 0.5,
      )),
    e !== void 0 && (f.x = e),
    n !== void 0 && (f.y = n),
    s !== void 0 && (f.scale = s),
    o !== void 0 && Oo(f, o, a, l, !1);
}
const Is = () => ({ ...Oe(), attrs: {} }),
  _e = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Uo(t, e, n, s) {
  const i = S.useMemo(() => {
    const r = Is();
    return (
      Ue(r, e, _e(s), t.transformTemplate),
      { ...r.attrs, style: { ...r.style } }
    );
  }, [e]);
  if (t.style) {
    const r = {};
    js(r, t.style, t), (i.style = { ...r, ...i.style });
  }
  return i;
}
function _o(t = !1) {
  return (n, s, i, { latestValues: r }, o) => {
    const l = (Ne(n) ? Uo : Bo)(s, r, o, n),
      u = lo(s, typeof n == "string", t),
      c = n !== S.Fragment ? { ...u, ...l, ref: i } : {},
      { children: h } = s,
      f = S.useMemo(() => (F(h) ? h.get() : h), [h]);
    return S.createElement(n, { ...c, children: f });
  };
}
function mn(t) {
  const e = [{}, {}];
  return (
    t == null ||
      t.values.forEach((n, s) => {
        (e[0][s] = n.get()), (e[1][s] = n.getVelocity());
      }),
    e
  );
}
function Ke(t, e, n, s) {
  if (typeof e == "function") {
    const [i, r] = mn(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  if (
    (typeof e == "string" && (e = t.variants && t.variants[e]),
    typeof e == "function")
  ) {
    const [i, r] = mn(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  return e;
}
const he = (t) => Array.isArray(t),
  Ko = (t) => !!(t && typeof t == "object" && t.mix && t.toValue),
  Wo = (t) => (he(t) ? t[t.length - 1] || 0 : t);
function jt(t) {
  const e = F(t) ? t.get() : t;
  return Ko(e) ? e.toValue() : e;
}
function Go(
  { scrapeMotionValuesFromProps: t, createRenderState: e, onUpdate: n },
  s,
  i,
  r,
) {
  const o = { latestValues: $o(s, i, r, t), renderState: e() };
  return (
    n &&
      ((o.onMount = (a) => n({ props: s, current: a, ...o })),
      (o.onUpdate = (a) => n(a))),
    o
  );
}
const Os = (t) => (e, n) => {
  const s = S.useContext($t),
    i = S.useContext(Ce),
    r = () => Go(t, e, s, i);
  return n ? r() : Qi(r);
};
function $o(t, e, n, s) {
  const i = {},
    r = s(t, {});
  for (const f in r) i[f] = jt(r[f]);
  let { initial: o, animate: a } = t;
  const l = Ht(t),
    u = Ms(t);
  e &&
    u &&
    !l &&
    t.inherit !== !1 &&
    (o === void 0 && (o = e.initial), a === void 0 && (a = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || o === !1;
  const h = c ? a : o;
  if (h && typeof h != "boolean" && !zt(h)) {
    const f = Array.isArray(h) ? h : [h];
    for (let d = 0; d < f.length; d++) {
      const m = Ke(t, f[d]);
      if (m) {
        const { transitionEnd: p, transition: y, ...g } = m;
        for (const v in g) {
          let x = g[v];
          if (Array.isArray(x)) {
            const b = c ? x.length - 1 : 0;
            x = x[b];
          }
          x !== null && (i[v] = x);
        }
        for (const v in p) i[v] = p[v];
      }
    }
  }
  return i;
}
function We(t, e, n) {
  var s;
  const { style: i } = t,
    r = {};
  for (const o in i)
    (F(i[o]) ||
      (e.style && F(e.style[o])) ||
      Bs(o, t) ||
      ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0
        ? void 0
        : s.liveStyle) !== void 0) &&
      (r[o] = i[o]);
  return r;
}
const zo = {
  useVisualState: Os({
    scrapeMotionValuesFromProps: We,
    createRenderState: Oe,
  }),
};
function Ns(t, e) {
  try {
    e.dimensions =
      typeof t.getBBox == "function" ? t.getBBox() : t.getBoundingClientRect();
  } catch {
    e.dimensions = { x: 0, y: 0, width: 0, height: 0 };
  }
}
function Us(t, { style: e, vars: n }, s, i) {
  Object.assign(t.style, e, i && i.getProjectionStyles(s));
  for (const r in n) t.style.setProperty(r, n[r]);
}
const _s = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function Ks(t, e, n, s) {
  Us(t, e, void 0, s);
  for (const i in e.attrs) t.setAttribute(_s.has(i) ? i : Le(i), e.attrs[i]);
}
function Ws(t, e, n) {
  const s = We(t, e, n);
  for (const i in t)
    if (F(t[i]) || F(e[i])) {
      const r =
        dt.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i;
      s[r] = t[i];
    }
  return s;
}
const pn = ["x", "y", "width", "height", "cx", "cy", "r"],
  Ho = {
    useVisualState: Os({
      scrapeMotionValuesFromProps: Ws,
      createRenderState: Is,
      onUpdate: ({
        props: t,
        prevProps: e,
        current: n,
        renderState: s,
        latestValues: i,
      }) => {
        if (!n) return;
        let r = !!t.drag;
        if (!r) {
          for (const a in i)
            if (st.has(a)) {
              r = !0;
              break;
            }
        }
        if (!r) return;
        let o = !e;
        if (e)
          for (let a = 0; a < pn.length; a++) {
            const l = pn[a];
            t[l] !== e[l] && (o = !0);
          }
        o &&
          V.read(() => {
            Ns(n, s),
              V.render(() => {
                Ue(s, i, _e(n.tagName), t.transformTemplate), Ks(n, s);
              });
          });
      },
    }),
  };
function Xo(t, e) {
  return function (s, { forwardMotionProps: i } = { forwardMotionProps: !1 }) {
    const o = {
      ...(Ne(s) ? Ho : zo),
      preloadedFeatures: t,
      useRender: _o(i),
      createVisualElement: e,
      Component: s,
    };
    return vo(o);
  };
}
function Xt(t, e, n) {
  const s = t.getProps();
  return Ke(s, e, n !== void 0 ? n : s.custom, t);
}
const Yo = Me(() => window.ScrollTimeline !== void 0);
class qo {
  constructor(e) {
    (this.stop = () => this.runAll("stop")),
      (this.animations = e.filter(Boolean));
  }
  get finished() {
    return Promise.all(
      this.animations.map((e) => ("finished" in e ? e.finished : e)),
    );
  }
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, n) {
    for (let s = 0; s < this.animations.length; s++) this.animations[s][e] = n;
  }
  attachTimeline(e, n) {
    const s = this.animations.map((i) => {
      if (Yo() && i.attachTimeline) return i.attachTimeline(e);
      if (typeof n == "function") return n(i);
    });
    return () => {
      s.forEach((i, r) => {
        i && i(), this.animations[r].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let e = 0;
    for (let n = 0; n < this.animations.length; n++)
      e = Math.max(e, this.animations[n].duration);
    return e;
  }
  runAll(e) {
    this.animations.forEach((n) => n[e]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class Zo extends qo {
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n);
  }
}
function Ge(t, e) {
  return t ? t[e] || t.default || t : void 0;
}
const fe = 2e4;
function Gs(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < fe; ) (e += n), (s = t.next(e));
  return e >= fe ? 1 / 0 : e;
}
function $e(t) {
  return typeof t == "function";
}
function gn(t, e) {
  (t.timeline = e), (t.onfinish = null);
}
const ze = (t) => Array.isArray(t) && typeof t[0] == "number",
  Jo = { linearEasing: void 0 };
function Qo(t, e) {
  const n = Me(t);
  return () => {
    var s;
    return (s = Jo[e]) !== null && s !== void 0 ? s : n();
  };
}
const Ut = Qo(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  $s = (t, e, n = 10) => {
    let s = "";
    const i = Math.max(Math.round(e / n), 2);
    for (let r = 0; r < i; r++) s += t(ct(0, i - 1, r)) + ", ";
    return `linear(${s.substring(0, s.length - 2)})`;
  };
function zs(t) {
  return !!(
    (typeof t == "function" && Ut()) ||
    !t ||
    (typeof t == "string" && (t in de || Ut())) ||
    ze(t) ||
    (Array.isArray(t) && t.every(zs))
  );
}
const gt = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`,
  de = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: gt([0, 0.65, 0.55, 1]),
    circOut: gt([0.55, 0, 1, 0.45]),
    backIn: gt([0.31, 0.01, 0.66, -0.59]),
    backOut: gt([0.33, 1.53, 0.69, 0.99]),
  };
function Hs(t, e) {
  if (t)
    return typeof t == "function" && Ut()
      ? $s(t, e)
      : ze(t)
        ? gt(t)
        : Array.isArray(t)
          ? t.map((n) => Hs(n, e) || de.easeOut)
          : de[t];
}
const _ = { x: !1, y: !1 };
function Xs() {
  return _.x || _.y;
}
function tr(t, e, n) {
  var s;
  if (t instanceof Element) return [t];
  if (typeof t == "string") {
    let i = document;
    const r = (s = void 0) !== null && s !== void 0 ? s : i.querySelectorAll(t);
    return r ? Array.from(r) : [];
  }
  return Array.from(t);
}
function Ys(t, e) {
  const n = tr(t),
    s = new AbortController(),
    i = { passive: !0, ...e, signal: s.signal };
  return [n, i, () => s.abort()];
}
function yn(t) {
  return !(t.pointerType === "touch" || Xs());
}
function er(t, e, n = {}) {
  const [s, i, r] = Ys(t, n),
    o = (a) => {
      if (!yn(a)) return;
      const { target: l } = a,
        u = e(l, a);
      if (typeof u != "function" || !l) return;
      const c = (h) => {
        yn(h) && (u(h), l.removeEventListener("pointerleave", c));
      };
      l.addEventListener("pointerleave", c, i);
    };
  return (
    s.forEach((a) => {
      a.addEventListener("pointerenter", o, i);
    }),
    r
  );
}
const qs = (t, e) => (e ? (t === e ? !0 : qs(t, e.parentElement)) : !1),
  He = (t) =>
    t.pointerType === "mouse"
      ? typeof t.button != "number" || t.button <= 0
      : t.isPrimary !== !1,
  nr = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function sr(t) {
  return nr.has(t.tagName) || t.tabIndex !== -1;
}
const yt = new WeakSet();
function vn(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Qt(t, e) {
  t.dispatchEvent(
    new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }),
  );
}
const ir = (t, e) => {
  const n = t.currentTarget;
  if (!n) return;
  const s = vn(() => {
    if (yt.has(n)) return;
    Qt(n, "down");
    const i = vn(() => {
        Qt(n, "up");
      }),
      r = () => Qt(n, "cancel");
    n.addEventListener("keyup", i, e), n.addEventListener("blur", r, e);
  });
  n.addEventListener("keydown", s, e),
    n.addEventListener("blur", () => n.removeEventListener("keydown", s), e);
};
function xn(t) {
  return He(t) && !Xs();
}
function or(t, e, n = {}) {
  const [s, i, r] = Ys(t, n),
    o = (a) => {
      const l = a.currentTarget;
      if (!xn(a) || yt.has(l)) return;
      yt.add(l);
      const u = e(l, a),
        c = (d, m) => {
          window.removeEventListener("pointerup", h),
            window.removeEventListener("pointercancel", f),
            !(!xn(d) || !yt.has(l)) &&
              (yt.delete(l), typeof u == "function" && u(d, { success: m }));
        },
        h = (d) => {
          c(d, n.useGlobalTarget || qs(l, d.target));
        },
        f = (d) => {
          c(d, !1);
        };
      window.addEventListener("pointerup", h, i),
        window.addEventListener("pointercancel", f, i);
    };
  return (
    s.forEach((a) => {
      !sr(a) && a.getAttribute("tabindex") === null && (a.tabIndex = 0),
        (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, i),
        a.addEventListener("focus", (u) => ir(u, i), i);
    }),
    r
  );
}
function rr(t) {
  return t === "x" || t === "y"
    ? _[t]
      ? null
      : ((_[t] = !0),
        () => {
          _[t] = !1;
        })
    : _.x || _.y
      ? null
      : ((_.x = _.y = !0),
        () => {
          _.x = _.y = !1;
        });
}
const Zs = new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...dt,
]);
let It;
function ar() {
  It = void 0;
}
const W = {
  now: () => (
    It === void 0 &&
      W.set(
        E.isProcessing || no.useManualTiming ? E.timestamp : performance.now(),
      ),
    It
  ),
  set: (t) => {
    (It = t), queueMicrotask(ar);
  },
};
function Xe(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Ye(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
class qe {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Xe(this.subscriptions, e), () => Ye(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](e, n, s);
      else
        for (let r = 0; r < i; r++) {
          const o = this.subscriptions[r];
          o && o(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function Js(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Tn = 30,
  lr = (t) => !isNaN(parseFloat(t));
class ur {
  constructor(e, n = {}) {
    (this.version = "12.1.0"),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (s, i = !0) => {
        const r = W.now();
        this.updatedAt !== r && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(s),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          i &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current);
      }),
      (this.hasAnimated = !1),
      this.setCurrent(e),
      (this.owner = n.owner);
  }
  setCurrent(e) {
    (this.current = e),
      (this.updatedAt = W.now()),
      this.canTrackVelocity === null &&
        e !== void 0 &&
        (this.canTrackVelocity = lr(this.current));
  }
  setPrevFrameValue(e = this.current) {
    (this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new qe());
    const s = this.events[e].add(n);
    return e === "change"
      ? () => {
          s(),
            V.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : s;
  }
  clearListeners() {
    for (const e in this.events) this.events[e].clear();
  }
  attach(e, n) {
    (this.passiveEffect = e), (this.stopPassiveEffect = n);
  }
  set(e, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(e, n)
      : this.passiveEffect(e, this.updateAndNotify);
  }
  setWithVelocity(e, n, s) {
    this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = e),
      (this.prevUpdatedAt = this.updatedAt - s);
  }
  jump(e, n = !0) {
    this.updateAndNotify(e),
      (this.prev = e),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const e = W.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      e - this.updatedAt > Tn
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Tn);
    return Js(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(e) {
    return (
      this.stop(),
      new Promise((n) => {
        (this.hasAnimated = !0),
          (this.animation = e(n)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Vt(t, e) {
  return new ur(t, e);
}
function cr(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Vt(n));
}
function hr(t, e) {
  const n = Xt(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = Wo(r[o]);
    cr(t, o, a);
  }
}
function fr(t) {
  return !!(F(t) && t.add);
}
function me(t, e) {
  const n = t.getValue("willChange");
  if (fr(n)) return n.add(e);
}
function Qs(t) {
  return t.props[Rs];
}
const ti = (t, e, n) =>
    (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t,
  dr = 1e-7,
  mr = 12;
function pr(t, e, n, s, i) {
  let r,
    o,
    a = 0;
  do (o = e + (n - e) / 2), (r = ti(o, s, i) - t), r > 0 ? (n = o) : (e = o);
  while (Math.abs(r) > dr && ++a < mr);
  return o;
}
function Rt(t, e, n, s) {
  if (t === e && n === s) return I;
  const i = (r) => pr(r, 0, 1, t, n);
  return (r) => (r === 0 || r === 1 ? r : ti(i(r), e, s));
}
const ei = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
  ni = (t) => (e) => 1 - t(1 - e),
  si = Rt(0.33, 1.53, 0.69, 0.99),
  Ze = ni(si),
  ii = ei(Ze),
  oi = (t) =>
    (t *= 2) < 1 ? 0.5 * Ze(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
  Je = (t) => 1 - Math.sin(Math.acos(t)),
  ri = ni(Je),
  ai = ei(Je),
  li = (t) => /^0[^.\s]+$/u.test(t);
function gr(t) {
  return typeof t == "number"
    ? t === 0
    : t !== null
      ? t === "none" || t === "0" || li(t)
      : !0;
}
const xt = (t) => Math.round(t * 1e5) / 1e5,
  Qe = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function yr(t) {
  return t == null;
}
const vr =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  tn = (t, e) => (n) =>
    !!(
      (typeof n == "string" && vr.test(n) && n.startsWith(t)) ||
      (e && !yr(n) && Object.prototype.hasOwnProperty.call(n, e))
    ),
  ui = (t, e, n) => (s) => {
    if (typeof s != "string") return s;
    const [i, r, o, a] = s.match(Qe);
    return {
      [t]: parseFloat(i),
      [e]: parseFloat(r),
      [n]: parseFloat(o),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    };
  },
  xr = (t) => H(0, 255, t),
  te = { ...mt, transform: (t) => Math.round(xr(t)) },
  et = {
    test: tn("rgb", "red"),
    parse: ui("red", "green", "blue"),
    transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) =>
      "rgba(" +
      te.transform(t) +
      ", " +
      te.transform(e) +
      ", " +
      te.transform(n) +
      ", " +
      xt(wt.transform(s)) +
      ")",
  };
function Tr(t) {
  let e = "",
    n = "",
    s = "",
    i = "";
  return (
    t.length > 5
      ? ((e = t.substring(1, 3)),
        (n = t.substring(3, 5)),
        (s = t.substring(5, 7)),
        (i = t.substring(7, 9)))
      : ((e = t.substring(1, 2)),
        (n = t.substring(2, 3)),
        (s = t.substring(3, 4)),
        (i = t.substring(4, 5)),
        (e += e),
        (n += n),
        (s += s),
        (i += i)),
    {
      red: parseInt(e, 16),
      green: parseInt(n, 16),
      blue: parseInt(s, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const pe = { test: tn("#"), parse: Tr, transform: et.transform },
  rt = {
    test: tn("hsl", "hue"),
    parse: ui("hue", "saturation", "lightness"),
    transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) =>
      "hsla(" +
      Math.round(t) +
      ", " +
      K.transform(xt(e)) +
      ", " +
      K.transform(xt(n)) +
      ", " +
      xt(wt.transform(s)) +
      ")",
  },
  L = {
    test: (t) => et.test(t) || pe.test(t) || rt.test(t),
    parse: (t) =>
      et.test(t) ? et.parse(t) : rt.test(t) ? rt.parse(t) : pe.parse(t),
    transform: (t) =>
      typeof t == "string"
        ? t
        : t.hasOwnProperty("red")
          ? et.transform(t)
          : rt.transform(t),
  },
  Pr =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Sr(t) {
  var e, n;
  return (
    isNaN(t) &&
    typeof t == "string" &&
    (((e = t.match(Qe)) === null || e === void 0 ? void 0 : e.length) || 0) +
      (((n = t.match(Pr)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const ci = "number",
  hi = "color",
  Ar = "var",
  br = "var(",
  Pn = "${}",
  wr =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ct(t) {
  const e = t.toString(),
    n = [],
    s = { color: [], number: [], var: [] },
    i = [];
  let r = 0;
  const a = e
    .replace(
      wr,
      (l) => (
        L.test(l)
          ? (s.color.push(r), i.push(hi), n.push(L.parse(l)))
          : l.startsWith(br)
            ? (s.var.push(r), i.push(Ar), n.push(l))
            : (s.number.push(r), i.push(ci), n.push(parseFloat(l))),
        ++r,
        Pn
      ),
    )
    .split(Pn);
  return { values: n, split: a, indexes: s, types: i };
}
function fi(t) {
  return Ct(t).values;
}
function di(t) {
  const { split: e, types: n } = Ct(t),
    s = e.length;
  return (i) => {
    let r = "";
    for (let o = 0; o < s; o++)
      if (((r += e[o]), i[o] !== void 0)) {
        const a = n[o];
        a === ci
          ? (r += xt(i[o]))
          : a === hi
            ? (r += L.transform(i[o]))
            : (r += i[o]);
      }
    return r;
  };
}
const Vr = (t) => (typeof t == "number" ? 0 : t);
function Cr(t) {
  const e = fi(t);
  return di(t)(e.map(Vr));
}
const q = { test: Sr, parse: fi, createTransformer: di, getAnimatableNone: Cr },
  Dr = new Set(["brightness", "contrast", "saturate", "opacity"]);
function Mr(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow") return t;
  const [s] = n.match(Qe) || [];
  if (!s) return t;
  const i = n.replace(s, "");
  let r = Dr.has(e) ? 1 : 0;
  return s !== n && (r *= 100), e + "(" + r + i + ")";
}
const Rr = /\b([a-z-]*)\(.*?\)/gu,
  ge = {
    ...q,
    getAnimatableNone: (t) => {
      const e = t.match(Rr);
      return e ? e.map(Mr).join(" ") : t;
    },
  },
  Er = {
    ...je,
    color: L,
    backgroundColor: L,
    outlineColor: L,
    fill: L,
    stroke: L,
    borderColor: L,
    borderTopColor: L,
    borderRightColor: L,
    borderBottomColor: L,
    borderLeftColor: L,
    filter: ge,
    WebkitFilter: ge,
  },
  en = (t) => Er[t];
function mi(t, e) {
  let n = en(t);
  return (
    n !== ge && (n = q), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
  );
}
const Lr = new Set(["auto", "none", "0"]);
function Fr(t, e, n) {
  let s = 0,
    i;
  for (; s < t.length && !i; ) {
    const r = t[s];
    typeof r == "string" && !Lr.has(r) && Ct(r).values.length && (i = t[s]),
      s++;
  }
  if (i && n) for (const r of e) t[r] = mi(n, i);
}
const Sn = (t) => t === mt || t === T,
  An = (t, e) => parseFloat(t.split(", ")[e]),
  bn =
    (t, e) =>
    (n, { transform: s }) => {
      if (s === "none" || !s) return 0;
      const i = s.match(/^matrix3d\((.+)\)$/u);
      if (i) return An(i[1], e);
      {
        const r = s.match(/^matrix\((.+)\)$/u);
        return r ? An(r[1], t) : 0;
      }
    },
  Br = new Set(["x", "y", "z"]),
  kr = dt.filter((t) => !Br.has(t));
function jr(t) {
  const e = [];
  return (
    kr.forEach((n) => {
      const s = t.getValue(n);
      s !== void 0 &&
        (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
    }),
    e
  );
}
const ft = {
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  x: bn(4, 13),
  y: bn(5, 14),
};
ft.translateX = ft.x;
ft.translateY = ft.y;
const nt = new Set();
let ye = !1,
  ve = !1;
function pi() {
  if (ve) {
    const t = Array.from(nt).filter((s) => s.needsMeasurement),
      e = new Set(t.map((s) => s.element)),
      n = new Map();
    e.forEach((s) => {
      const i = jr(s);
      i.length && (n.set(s, i), s.render());
    }),
      t.forEach((s) => s.measureInitialState()),
      e.forEach((s) => {
        s.render();
        const i = n.get(s);
        i &&
          i.forEach(([r, o]) => {
            var a;
            (a = s.getValue(r)) === null || a === void 0 || a.set(o);
          });
      }),
      t.forEach((s) => s.measureEndState()),
      t.forEach((s) => {
        s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
      });
  }
  (ve = !1), (ye = !1), nt.forEach((t) => t.complete()), nt.clear();
}
function gi() {
  nt.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (ve = !0);
  });
}
function Ir() {
  gi(), pi();
}
class nn {
  constructor(e, n, s, i, r, o = !1) {
    (this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...e]),
      (this.onComplete = n),
      (this.name = s),
      (this.motionValue = i),
      (this.element = r),
      (this.isAsync = o);
  }
  scheduleResolve() {
    (this.isScheduled = !0),
      this.isAsync
        ? (nt.add(this), ye || ((ye = !0), V.read(gi), V.resolveKeyframes(pi)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: e,
      name: n,
      element: s,
      motionValue: i,
    } = this;
    for (let r = 0; r < e.length; r++)
      if (e[r] === null)
        if (r === 0) {
          const o = i == null ? void 0 : i.get(),
            a = e[e.length - 1];
          if (o !== void 0) e[0] = o;
          else if (s && n) {
            const l = s.readValue(n, a);
            l != null && (e[0] = l);
          }
          e[0] === void 0 && (e[0] = a), i && o === void 0 && i.set(e[0]);
        } else e[r] = e[r - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    (this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      nt.delete(this);
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), nt.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const yi = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
  Or = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Nr(t) {
  const e = Or.exec(t);
  if (!e) return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
function vi(t, e, n = 1) {
  const [s, i] = Nr(t);
  if (!s) return;
  const r = window.getComputedStyle(e).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return yi(o) ? parseFloat(o) : o;
  }
  return ke(i) ? vi(i, e, n + 1) : i;
}
const xi = (t) => (e) => e.test(t),
  Ur = { test: (t) => t === "auto", parse: (t) => t },
  Ti = [mt, T, K, X, Vo, wo, Ur],
  wn = (t) => Ti.find(xi(t));
class Pi extends nn {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let u = e[l];
      if (typeof u == "string" && ((u = u.trim()), ke(u))) {
        const c = vi(u, n.current);
        c !== void 0 && (e[l] = c),
          l === e.length - 1 && (this.finalKeyframe = u);
      }
    }
    if ((this.resolveNoneKeyframes(), !Zs.has(s) || e.length !== 2)) return;
    const [i, r] = e,
      o = wn(i),
      a = wn(r);
    if (o !== a)
      if (Sn(o) && Sn(a))
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          typeof u == "string" && (e[l] = parseFloat(u));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this,
      s = [];
    for (let i = 0; i < e.length; i++) gr(e[i]) && s.push(i);
    s.length && Fr(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current) return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = ft[s](
        e.measureViewportBox(),
        window.getComputedStyle(e.current),
      )),
      (n[0] = this.measuredOrigin);
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    var e;
    const { element: n, name: s, unresolvedKeyframes: i } = this;
    if (!n || !n.current) return;
    const r = n.getValue(s);
    r && r.jump(this.measuredOrigin, !1);
    const o = i.length - 1,
      a = i[o];
    (i[o] = ft[s](n.measureViewportBox(), window.getComputedStyle(n.current))),
      a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a),
      !((e = this.removedTransforms) === null || e === void 0) &&
        e.length &&
        this.removedTransforms.forEach(([l, u]) => {
          n.getValue(l).set(u);
        }),
      this.resolveNoneKeyframes();
  }
}
const Vn = (t, e) =>
  e === "zIndex"
    ? !1
    : !!(
        typeof t == "number" ||
        Array.isArray(t) ||
        (typeof t == "string" &&
          (q.test(t) || t === "0") &&
          !t.startsWith("url("))
      );
function _r(t) {
  const e = t[0];
  if (t.length === 1) return !0;
  for (let n = 0; n < t.length; n++) if (t[n] !== e) return !0;
}
function Kr(t, e, n, s) {
  const i = t[0];
  if (i === null) return !1;
  if (e === "display" || e === "visibility") return !0;
  const r = t[t.length - 1],
    o = Vn(i, e),
    a = Vn(r, e);
  return !o || !a ? !1 : _r(t) || ((n === "spring" || $e(n)) && s);
}
const Wr = (t) => t !== null;
function Yt(t, { repeat: e, repeatType: n = "loop" }, s) {
  const i = t.filter(Wr),
    r = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return !r || s === void 0 ? i[r] : s;
}
const Gr = 40;
class Si {
  constructor({
    autoplay: e = !0,
    delay: n = 0,
    type: s = "keyframes",
    repeat: i = 0,
    repeatDelay: r = 0,
    repeatType: o = "loop",
    ...a
  }) {
    (this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = W.now()),
      (this.options = {
        autoplay: e,
        delay: n,
        type: s,
        repeat: i,
        repeatDelay: r,
        repeatType: o,
        ...a,
      }),
      this.updateFinishedPromise();
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > Gr
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt;
  }
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && Ir(), this._resolved;
  }
  onKeyframesResolved(e, n) {
    (this.resolvedAt = W.now()), (this.hasAttemptedResolve = !0);
    const {
      name: s,
      type: i,
      velocity: r,
      delay: o,
      onComplete: a,
      onUpdate: l,
      isGenerator: u,
    } = this.options;
    if (!u && !Kr(e, s, i, r))
      if (o) this.options.duration = 0;
      else {
        l && l(Yt(e, this.options, n)), a && a(), this.resolveFinishedPromise();
        return;
      }
    const c = this.initPlayback(e, n);
    c !== !1 &&
      ((this._resolved = { keyframes: e, finalKeyframe: n, ...c }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(e, n) {
    return this.currentFinishedPromise.then(e, n);
  }
  flatten() {
    (this.options.type = "keyframes"), (this.options.ease = "linear");
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((e) => {
      this.resolveFinishedPromise = e;
    });
  }
}
const C = (t, e, n) => t + (e - t) * n;
function ee(t, e, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? t + (e - t) * 6 * n
      : n < 1 / 2
        ? e
        : n < 2 / 3
          ? t + (e - t) * (2 / 3 - n) * 6
          : t
  );
}
function $r({ hue: t, saturation: e, lightness: n, alpha: s }) {
  (t /= 360), (e /= 100), (n /= 100);
  let i = 0,
    r = 0,
    o = 0;
  if (!e) i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e,
      l = 2 * n - a;
    (i = ee(l, a, t + 1 / 3)), (r = ee(l, a, t)), (o = ee(l, a, t - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s,
  };
}
function _t(t, e) {
  return (n) => (n > 0 ? e : t);
}
const ne = (t, e, n) => {
    const s = t * t,
      i = n * (e * e - s) + s;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  zr = [pe, et, rt],
  Hr = (t) => zr.find((e) => e.test(t));
function Cn(t) {
  const e = Hr(t);
  if (!e) return !1;
  let n = e.parse(t);
  return e === rt && (n = $r(n)), n;
}
const Dn = (t, e) => {
    const n = Cn(t),
      s = Cn(e);
    if (!n || !s) return _t(t, e);
    const i = { ...n };
    return (r) => (
      (i.red = ne(n.red, s.red, r)),
      (i.green = ne(n.green, s.green, r)),
      (i.blue = ne(n.blue, s.blue, r)),
      (i.alpha = C(n.alpha, s.alpha, r)),
      et.transform(i)
    );
  },
  Xr = (t, e) => (n) => e(t(n)),
  Et = (...t) => t.reduce(Xr),
  xe = new Set(["none", "hidden"]);
function Yr(t, e) {
  return xe.has(t) ? (n) => (n <= 0 ? t : e) : (n) => (n >= 1 ? e : t);
}
function qr(t, e) {
  return (n) => C(t, e, n);
}
function sn(t) {
  return typeof t == "number"
    ? qr
    : typeof t == "string"
      ? ke(t)
        ? _t
        : L.test(t)
          ? Dn
          : Qr
      : Array.isArray(t)
        ? Ai
        : typeof t == "object"
          ? L.test(t)
            ? Dn
            : Zr
          : _t;
}
function Ai(t, e) {
  const n = [...t],
    s = n.length,
    i = t.map((r, o) => sn(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < s; o++) n[o] = i[o](r);
    return n;
  };
}
function Zr(t, e) {
  const n = { ...t, ...e },
    s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = sn(t[i])(t[i], e[i]));
  return (i) => {
    for (const r in s) n[r] = s[r](i);
    return n;
  };
}
function Jr(t, e) {
  var n;
  const s = [],
    i = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const o = e.types[r],
      a = t.indexes[o][i[o]],
      l = (n = t.values[a]) !== null && n !== void 0 ? n : 0;
    (s[r] = l), i[o]++;
  }
  return s;
}
const Qr = (t, e) => {
  const n = q.createTransformer(e),
    s = Ct(t),
    i = Ct(e);
  return s.indexes.var.length === i.indexes.var.length &&
    s.indexes.color.length === i.indexes.color.length &&
    s.indexes.number.length >= i.indexes.number.length
    ? (xe.has(t) && !i.values.length) || (xe.has(e) && !s.values.length)
      ? Yr(t, e)
      : Et(Ai(Jr(s, i), i.values), n)
    : _t(t, e);
};
function bi(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number"
    ? C(t, e, n)
    : sn(t)(t, e);
}
const ta = 5;
function wi(t, e, n) {
  const s = Math.max(e - ta, 0);
  return Js(n - t(s), e - s);
}
const D = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  Mn = 0.001;
function ea({
  duration: t = D.duration,
  bounce: e = D.bounce,
  velocity: n = D.velocity,
  mass: s = D.mass,
}) {
  let i,
    r,
    o = 1 - e;
  (o = H(D.minDamping, D.maxDamping, o)),
    (t = H(D.minDuration, D.maxDuration, z(t))),
    o < 1
      ? ((i = (u) => {
          const c = u * o,
            h = c * t,
            f = c - n,
            d = Te(u, o),
            m = Math.exp(-h);
          return Mn - (f / d) * m;
        }),
        (r = (u) => {
          const h = u * o * t,
            f = h * n + n,
            d = Math.pow(o, 2) * Math.pow(u, 2) * t,
            m = Math.exp(-h),
            p = Te(Math.pow(u, 2), o);
          return ((-i(u) + Mn > 0 ? -1 : 1) * ((f - d) * m)) / p;
        }))
      : ((i = (u) => {
          const c = Math.exp(-u * t),
            h = (u - n) * t + 1;
          return -0.001 + c * h;
        }),
        (r = (u) => {
          const c = Math.exp(-u * t),
            h = (n - u) * (t * t);
          return c * h;
        }));
  const a = 5 / t,
    l = sa(i, r, a);
  if (((t = $(t)), isNaN(l)))
    return { stiffness: D.stiffness, damping: D.damping, duration: t };
  {
    const u = Math.pow(l, 2) * s;
    return { stiffness: u, damping: o * 2 * Math.sqrt(s * u), duration: t };
  }
}
const na = 12;
function sa(t, e, n) {
  let s = n;
  for (let i = 1; i < na; i++) s = s - t(s) / e(s);
  return s;
}
function Te(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const ia = ["duration", "bounce"],
  oa = ["stiffness", "damping", "mass"];
function Rn(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function ra(t) {
  let e = {
    velocity: D.velocity,
    stiffness: D.stiffness,
    damping: D.damping,
    mass: D.mass,
    isResolvedFromDuration: !1,
    ...t,
  };
  if (!Rn(t, oa) && Rn(t, ia))
    if (t.visualDuration) {
      const n = t.visualDuration,
        s = (2 * Math.PI) / (n * 1.2),
        i = s * s,
        r = 2 * H(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = { ...e, mass: D.mass, stiffness: i, damping: r };
    } else {
      const n = ea(t);
      (e = { ...e, ...n, mass: D.mass }), (e.isResolvedFromDuration = !0);
    }
  return e;
}
function Vi(t = D.visualDuration, e = D.bounce) {
  const n =
    typeof t != "object"
      ? { visualDuration: t, keyframes: [0, 1], bounce: e }
      : t;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0],
    o = n.keyframes[n.keyframes.length - 1],
    a = { done: !1, value: r },
    {
      stiffness: l,
      damping: u,
      mass: c,
      duration: h,
      velocity: f,
      isResolvedFromDuration: d,
    } = ra({ ...n, velocity: -z(n.velocity || 0) }),
    m = f || 0,
    p = u / (2 * Math.sqrt(l * c)),
    y = o - r,
    g = z(Math.sqrt(l / c)),
    v = Math.abs(y) < 5;
  s || (s = v ? D.restSpeed.granular : D.restSpeed.default),
    i || (i = v ? D.restDelta.granular : D.restDelta.default);
  let x;
  if (p < 1) {
    const P = Te(g, p);
    x = (w) => {
      const R = Math.exp(-p * g * w);
      return (
        o - R * (((m + p * g * y) / P) * Math.sin(P * w) + y * Math.cos(P * w))
      );
    };
  } else if (p === 1) x = (P) => o - Math.exp(-g * P) * (y + (m + g * y) * P);
  else {
    const P = g * Math.sqrt(p * p - 1);
    x = (w) => {
      const R = Math.exp(-p * g * w),
        A = Math.min(P * w, 300);
      return (
        o - (R * ((m + p * g * y) * Math.sinh(A) + P * y * Math.cosh(A))) / P
      );
    };
  }
  const b = {
    calculatedDuration: (d && h) || null,
    next: (P) => {
      const w = x(P);
      if (d) a.done = P >= h;
      else {
        let R = 0;
        p < 1 && (R = P === 0 ? $(m) : wi(x, P, w));
        const A = Math.abs(R) <= s,
          j = Math.abs(o - w) <= i;
        a.done = A && j;
      }
      return (a.value = a.done ? o : w), a;
    },
    toString: () => {
      const P = Math.min(Gs(b), fe),
        w = $s((R) => b.next(P * R).value, P, 30);
      return P + "ms " + w;
    },
  };
  return b;
}
function En({
  keyframes: t,
  velocity: e = 0,
  power: n = 0.8,
  timeConstant: s = 325,
  bounceDamping: i = 10,
  bounceStiffness: r = 500,
  modifyTarget: o,
  min: a,
  max: l,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const h = t[0],
    f = { done: !1, value: h },
    d = (A) => (a !== void 0 && A < a) || (l !== void 0 && A > l),
    m = (A) =>
      a === void 0
        ? l
        : l === void 0 || Math.abs(a - A) < Math.abs(l - A)
          ? a
          : l;
  let p = n * e;
  const y = h + p,
    g = o === void 0 ? y : o(y);
  g !== y && (p = g - h);
  const v = (A) => -p * Math.exp(-A / s),
    x = (A) => g + v(A),
    b = (A) => {
      const j = v(A),
        O = x(A);
      (f.done = Math.abs(j) <= u), (f.value = f.done ? g : O);
    };
  let P, w;
  const R = (A) => {
    d(f.value) &&
      ((P = A),
      (w = Vi({
        keyframes: [f.value, m(f.value)],
        velocity: wi(x, A, f.value),
        damping: i,
        stiffness: r,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    R(0),
    {
      calculatedDuration: null,
      next: (A) => {
        let j = !1;
        return (
          !w && P === void 0 && ((j = !0), b(A), R(A)),
          P !== void 0 && A >= P ? w.next(A - P) : (!j && b(A), f)
        );
      },
    }
  );
}
const aa = Rt(0.42, 0, 1, 1),
  la = Rt(0, 0, 0.58, 1),
  Ci = Rt(0.42, 0, 0.58, 1),
  ua = (t) => Array.isArray(t) && typeof t[0] != "number",
  ca = {
    linear: I,
    easeIn: aa,
    easeInOut: Ci,
    easeOut: la,
    circIn: Je,
    circInOut: ai,
    circOut: ri,
    backIn: Ze,
    backInOut: ii,
    backOut: si,
    anticipate: oi,
  },
  Ln = (t) => {
    if (ze(t)) {
      ws(t.length === 4);
      const [e, n, s, i] = t;
      return Rt(e, n, s, i);
    } else if (typeof t == "string") return ca[t];
    return t;
  };
function ha(t, e, n) {
  const s = [],
    i = n || bi,
    r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || I : e;
      a = Et(l, a);
    }
    s.push(a);
  }
  return s;
}
function fa(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = t.length;
  if ((ws(r === e.length), r === 1)) return () => e[0];
  if (r === 2 && e[0] === e[1]) return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
  const a = ha(e, s, i),
    l = a.length,
    u = (c) => {
      if (o && c < t[0]) return e[0];
      let h = 0;
      if (l > 1) for (; h < t.length - 2 && !(c < t[h + 1]); h++);
      const f = ct(t[h], t[h + 1], c);
      return a[h](f);
    };
  return n ? (c) => u(H(t[0], t[r - 1], c)) : u;
}
function da(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = ct(0, e, s);
    t.push(C(n, 1, i));
  }
}
function ma(t) {
  const e = [0];
  return da(e, t.length - 1), e;
}
function pa(t, e) {
  return t.map((n) => n * e);
}
function ga(t, e) {
  return t.map(() => e || Ci).splice(0, t.length - 1);
}
function Kt({
  duration: t = 300,
  keyframes: e,
  times: n,
  ease: s = "easeInOut",
}) {
  const i = ua(s) ? s.map(Ln) : Ln(s),
    r = { done: !1, value: e[0] },
    o = pa(n && n.length === e.length ? n : ma(e), t),
    a = fa(o, e, { ease: Array.isArray(i) ? i : ga(e, i) });
  return {
    calculatedDuration: t,
    next: (l) => ((r.value = a(l)), (r.done = l >= t), r),
  };
}
const ya = (t) => {
    const e = ({ timestamp: n }) => t(n);
    return {
      start: () => V.update(e, !0),
      stop: () => Y(e),
      now: () => (E.isProcessing ? E.timestamp : W.now()),
    };
  },
  va = { decay: En, inertia: En, tween: Kt, keyframes: Kt, spring: Vi },
  xa = (t) => t / 100;
class on extends Si {
  constructor(e) {
    super(e),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.startTime = null),
      (this.state = "idle"),
      (this.stop = () => {
        if (
          (this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")
        )
          return;
        this.teardown();
        const { onStop: l } = this.options;
        l && l();
      });
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options,
      o = (i == null ? void 0 : i.KeyframeResolver) || nn,
      a = (l, u) => this.onKeyframesResolved(l, u);
    (this.resolver = new o(r, a, n, s, i)), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(),
      this._resolved &&
        Object.assign(
          this._resolved,
          this.initPlayback(this._resolved.keyframes),
        );
  }
  initPlayback(e) {
    const {
        type: n = "keyframes",
        repeat: s = 0,
        repeatDelay: i = 0,
        repeatType: r,
        velocity: o = 0,
      } = this.options,
      a = $e(n) ? n : va[n] || Kt;
    let l, u;
    a !== Kt &&
      typeof e[0] != "number" &&
      ((l = Et(xa, bi(e[0], e[1]))), (e = [0, 100]));
    const c = a({ ...this.options, keyframes: e });
    r === "mirror" &&
      (u = a({ ...this.options, keyframes: [...e].reverse(), velocity: -o })),
      c.calculatedDuration === null && (c.calculatedDuration = Gs(c));
    const { calculatedDuration: h } = c,
      f = h + i,
      d = f * (s + 1) - i;
    return {
      generator: c,
      mirroredGenerator: u,
      mapPercentToKeyframes: l,
      calculatedDuration: h,
      resolvedDuration: f,
      totalDuration: d,
    };
  }
  onPostResolved() {
    const { autoplay: e = !0 } = this.options;
    this.play(),
      this.pendingPlayState === "paused" || !e
        ? this.pause()
        : (this.state = this.pendingPlayState);
  }
  tick(e, n = !1) {
    const { resolved: s } = this;
    if (!s) {
      const { keyframes: A } = this.options;
      return { done: !0, value: A[A.length - 1] };
    }
    const {
      finalKeyframe: i,
      generator: r,
      mirroredGenerator: o,
      mapPercentToKeyframes: a,
      keyframes: l,
      calculatedDuration: u,
      totalDuration: c,
      resolvedDuration: h,
    } = s;
    if (this.startTime === null) return r.next(0);
    const {
      delay: f,
      repeat: d,
      repeatType: m,
      repeatDelay: p,
      onUpdate: y,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, e))
      : this.speed < 0 &&
        (this.startTime = Math.min(e - c / this.speed, this.startTime)),
      n
        ? (this.currentTime = e)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(e - this.startTime) * this.speed);
    const g = this.currentTime - f * (this.speed >= 0 ? 1 : -1),
      v = this.speed >= 0 ? g < 0 : g > c;
    (this.currentTime = Math.max(g, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = c);
    let x = this.currentTime,
      b = r;
    if (d) {
      const A = Math.min(this.currentTime, c) / h;
      let j = Math.floor(A),
        O = A % 1;
      !O && A >= 1 && (O = 1),
        O === 1 && j--,
        (j = Math.min(j, d + 1)),
        !!(j % 2) &&
          (m === "reverse"
            ? ((O = 1 - O), p && (O -= p / h))
            : m === "mirror" && (b = o)),
        (x = H(0, 1, O) * h);
    }
    const P = v ? { done: !1, value: l[0] } : b.next(x);
    a && (P.value = a(P.value));
    let { done: w } = P;
    !v &&
      u !== null &&
      (w = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const R =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && w));
    return (
      R && i !== void 0 && (P.value = Yt(l, this.options, i)),
      y && y(P.value),
      R && this.finish(),
      P
    );
  }
  get duration() {
    const { resolved: e } = this;
    return e ? z(e.calculatedDuration) : 0;
  }
  get time() {
    return z(this.currentTime);
  }
  set time(e) {
    (e = $(e)),
      (this.currentTime = e),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = e)
        : this.driver && (this.startTime = this.driver.now() - e / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    (this.playbackSpeed = e), n && (this.time = z(this.currentTime));
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: e = ya, onPlay: n, startTime: s } = this.options;
    this.driver || (this.driver = e((r) => this.tick(r))), n && n();
    const i = this.driver.now();
    this.holdTime !== null
      ? (this.startTime = i - this.holdTime)
      : this.startTime
        ? this.state === "finished" && (this.startTime = i)
        : (this.startTime = s ?? this.calcStartTime()),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    var e;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    (this.state = "paused"),
      (this.holdTime = (e = this.currentTime) !== null && e !== void 0 ? e : 0);
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.pendingPlayState = this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    this.teardown(), (this.state = "finished");
    const { onComplete: e } = this.options;
    e && e();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(e) {
    return (this.startTime = 0), this.tick(e, !0);
  }
}
const Ta = new Set(["opacity", "clipPath", "filter", "transform"]);
function Pa(
  t,
  e,
  n,
  {
    delay: s = 0,
    duration: i = 300,
    repeat: r = 0,
    repeatType: o = "loop",
    ease: a = "easeInOut",
    times: l,
  } = {},
) {
  const u = { [e]: n };
  l && (u.offset = l);
  const c = Hs(a, i);
  return (
    Array.isArray(c) && (u.easing = c),
    t.animate(u, {
      delay: s,
      duration: i,
      easing: Array.isArray(c) ? "linear" : c,
      fill: "both",
      iterations: r + 1,
      direction: o === "reverse" ? "alternate" : "normal",
    })
  );
}
const Sa = Me(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  Wt = 10,
  Aa = 2e4;
function ba(t) {
  return $e(t.type) || t.type === "spring" || !zs(t.ease);
}
function wa(t, e) {
  const n = new on({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let s = { done: !1, value: t[0] };
  const i = [];
  let r = 0;
  for (; !s.done && r < Aa; ) (s = n.sample(r)), i.push(s.value), (r += Wt);
  return { times: void 0, keyframes: i, duration: r - Wt, ease: "linear" };
}
const Di = { anticipate: oi, backInOut: ii, circInOut: ai };
function Va(t) {
  return t in Di;
}
class Fn extends Si {
  constructor(e) {
    super(e);
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options;
    (this.resolver = new Pi(
      r,
      (o, a) => this.onKeyframesResolved(o, a),
      n,
      s,
      i,
    )),
      this.resolver.scheduleResolve();
  }
  initPlayback(e, n) {
    let {
      duration: s = 300,
      times: i,
      ease: r,
      type: o,
      motionValue: a,
      name: l,
      startTime: u,
    } = this.options;
    if (!a.owner || !a.owner.current) return !1;
    if (
      (typeof r == "string" && Ut() && Va(r) && (r = Di[r]), ba(this.options))
    ) {
      const {
          onComplete: h,
          onUpdate: f,
          motionValue: d,
          element: m,
          ...p
        } = this.options,
        y = wa(e, p);
      (e = y.keyframes),
        e.length === 1 && (e[1] = e[0]),
        (s = y.duration),
        (i = y.times),
        (r = y.ease),
        (o = "keyframes");
    }
    const c = Pa(a.owner.current, l, e, {
      ...this.options,
      duration: s,
      times: i,
      ease: r,
    });
    return (
      (c.startTime = u ?? this.calcStartTime()),
      this.pendingTimeline
        ? (gn(c, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (c.onfinish = () => {
            const { onComplete: h } = this.options;
            a.set(Yt(e, this.options, n)),
              h && h(),
              this.cancel(),
              this.resolveFinishedPromise();
          }),
      { animation: c, duration: s, times: i, type: o, ease: r, keyframes: e }
    );
  }
  get duration() {
    const { resolved: e } = this;
    if (!e) return 0;
    const { duration: n } = e;
    return z(n);
  }
  get time() {
    const { resolved: e } = this;
    if (!e) return 0;
    const { animation: n } = e;
    return z(n.currentTime || 0);
  }
  set time(e) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: s } = n;
    s.currentTime = $(e);
  }
  get speed() {
    const { resolved: e } = this;
    if (!e) return 1;
    const { animation: n } = e;
    return n.playbackRate;
  }
  set speed(e) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: s } = n;
    s.playbackRate = e;
  }
  get state() {
    const { resolved: e } = this;
    if (!e) return "idle";
    const { animation: n } = e;
    return n.playState;
  }
  get startTime() {
    const { resolved: e } = this;
    if (!e) return null;
    const { animation: n } = e;
    return n.startTime;
  }
  attachTimeline(e) {
    if (!this._resolved) this.pendingTimeline = e;
    else {
      const { resolved: n } = this;
      if (!n) return I;
      const { animation: s } = n;
      gn(s, e);
    }
    return I;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: e } = this;
    if (!e) return;
    const { animation: n } = e;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: e } = this;
    if (!e) return;
    const { animation: n } = e;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
      return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const { resolved: e } = this;
    if (!e) return;
    const {
      animation: n,
      keyframes: s,
      duration: i,
      type: r,
      ease: o,
      times: a,
    } = e;
    if (n.playState === "idle" || n.playState === "finished") return;
    if (this.time) {
      const {
          motionValue: u,
          onUpdate: c,
          onComplete: h,
          element: f,
          ...d
        } = this.options,
        m = new on({
          ...d,
          keyframes: s,
          duration: i,
          type: r,
          ease: o,
          times: a,
          isGenerator: !0,
        }),
        p = $(this.time);
      u.setWithVelocity(m.sample(p - Wt).value, m.sample(p).value, Wt);
    }
    const { onStop: l } = this.options;
    l && l(), this.cancel();
  }
  complete() {
    const { resolved: e } = this;
    e && e.animation.finish();
  }
  cancel() {
    const { resolved: e } = this;
    e && e.animation.cancel();
  }
  static supports(e) {
    const {
      motionValue: n,
      name: s,
      repeatDelay: i,
      repeatType: r,
      damping: o,
      type: a,
    } = e;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1;
    const { onUpdate: l, transformTemplate: u } = n.owner.getProps();
    return (
      Sa() &&
      s &&
      Ta.has(s) &&
      !l &&
      !u &&
      !i &&
      r !== "mirror" &&
      o !== 0 &&
      a !== "inertia"
    );
  }
}
const Ca = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  Da = (t) => ({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  Ma = { type: "keyframes", duration: 0.8 },
  Ra = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  Ea = (t, { keyframes: e }) =>
    e.length > 2
      ? Ma
      : st.has(t)
        ? t.startsWith("scale")
          ? Da(e[1])
          : Ca
        : Ra;
function La({
  when: t,
  delay: e,
  delayChildren: n,
  staggerChildren: s,
  staggerDirection: i,
  repeat: r,
  repeatType: o,
  repeatDelay: a,
  from: l,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length;
}
const rn =
  (t, e, n, s = {}, i, r) =>
  (o) => {
    const a = Ge(s, t) || {},
      l = a.delay || s.delay || 0;
    let { elapsed: u = 0 } = s;
    u = u - $(l);
    let c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: e.getVelocity(),
      ...a,
      delay: -u,
      onUpdate: (f) => {
        e.set(f), a.onUpdate && a.onUpdate(f);
      },
      onComplete: () => {
        o(), a.onComplete && a.onComplete();
      },
      name: t,
      motionValue: e,
      element: r ? void 0 : i,
    };
    La(a) || (c = { ...c, ...Ea(t, c) }),
      c.duration && (c.duration = $(c.duration)),
      c.repeatDelay && (c.repeatDelay = $(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from);
    let h = !1;
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        ((c.duration = 0), c.delay === 0 && (h = !0)),
      h && !r && e.get() !== void 0)
    ) {
      const f = Yt(c.keyframes, a);
      if (f !== void 0)
        return (
          V.update(() => {
            c.onUpdate(f), c.onComplete();
          }),
          new Zo([])
        );
    }
    return !r && Fn.supports(c) ? new Fn(c) : new on(c);
  };
function Fa({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return (e[n] = !1), s;
}
function Mi(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  var r;
  let { transition: o = t.getDefaultTransition(), transitionEnd: a, ...l } = e;
  s && (o = s);
  const u = [],
    c = i && t.animationState && t.animationState.getState()[i];
  for (const h in l) {
    const f = t.getValue(
        h,
        (r = t.latestValues[h]) !== null && r !== void 0 ? r : null,
      ),
      d = l[h];
    if (d === void 0 || (c && Fa(c, h))) continue;
    const m = { delay: n, ...Ge(o || {}, h) };
    let p = !1;
    if (window.MotionHandoffAnimation) {
      const g = Qs(t);
      if (g) {
        const v = window.MotionHandoffAnimation(g, h, V);
        v !== null && ((m.startTime = v), (p = !0));
      }
    }
    me(t, h),
      f.start(
        rn(h, f, d, t.shouldReduceMotion && Zs.has(h) ? { type: !1 } : m, t, p),
      );
    const y = f.animation;
    y && u.push(y);
  }
  return (
    a &&
      Promise.all(u).then(() => {
        V.update(() => {
          a && hr(t, a);
        });
      }),
    u
  );
}
function Pe(t, e, n = {}) {
  var s;
  const i = Xt(
    t,
    e,
    n.type === "exit"
      ? (s = t.presenceContext) === null || s === void 0
        ? void 0
        : s.custom
      : void 0,
  );
  let { transition: r = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (r = n.transitionOverride);
  const o = i ? () => Promise.all(Mi(t, i, n)) : () => Promise.resolve(),
    a =
      t.variantChildren && t.variantChildren.size
        ? (u = 0) => {
            const {
              delayChildren: c = 0,
              staggerChildren: h,
              staggerDirection: f,
            } = r;
            return Ba(t, e, c + u, h, f, n);
          }
        : () => Promise.resolve(),
    { when: l } = r;
  if (l) {
    const [u, c] = l === "beforeChildren" ? [o, a] : [a, o];
    return u().then(() => c());
  } else return Promise.all([o(), a(n.delay)]);
}
function Ba(t, e, n = 0, s = 0, i = 1, r) {
  const o = [],
    a = (t.variantChildren.size - 1) * s,
    l = i === 1 ? (u = 0) => u * s : (u = 0) => a - u * s;
  return (
    Array.from(t.variantChildren)
      .sort(ka)
      .forEach((u, c) => {
        u.notify("AnimationStart", e),
          o.push(
            Pe(u, e, { ...r, delay: n + l(c) }).then(() =>
              u.notify("AnimationComplete", e),
            ),
          );
      }),
    Promise.all(o)
  );
}
function ka(t, e) {
  return t.sortNodePosition(e);
}
function ja(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const i = e.map((r) => Pe(t, r, n));
    s = Promise.all(i);
  } else if (typeof e == "string") s = Pe(t, e, n);
  else {
    const i = typeof e == "function" ? Xt(t, e, n.custom) : e;
    s = Promise.all(Mi(t, i, n));
  }
  return s.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function Ri(t, e) {
  if (!Array.isArray(e)) return !1;
  const n = e.length;
  if (n !== t.length) return !1;
  for (let s = 0; s < n; s++) if (e[s] !== t[s]) return !1;
  return !0;
}
const Ia = Ee.length;
function Ei(t) {
  if (!t) return;
  if (!t.isControllingVariants) {
    const n = t.parent ? Ei(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < Ia; n++) {
    const s = Ee[n],
      i = t.props[s];
    (At(i) || i === !1) && (e[s] = i);
  }
  return e;
}
const Oa = [...Re].reverse(),
  Na = Re.length;
function Ua(t) {
  return (e) =>
    Promise.all(e.map(({ animation: n, options: s }) => ja(t, n, s)));
}
function _a(t) {
  let e = Ua(t),
    n = Bn(),
    s = !0;
  const i = (l) => (u, c) => {
    var h;
    const f = Xt(
      t,
      c,
      l === "exit"
        ? (h = t.presenceContext) === null || h === void 0
          ? void 0
          : h.custom
        : void 0,
    );
    if (f) {
      const { transition: d, transitionEnd: m, ...p } = f;
      u = { ...u, ...p, ...m };
    }
    return u;
  };
  function r(l) {
    e = l(t);
  }
  function o(l) {
    const { props: u } = t,
      c = Ei(t.parent) || {},
      h = [],
      f = new Set();
    let d = {},
      m = 1 / 0;
    for (let y = 0; y < Na; y++) {
      const g = Oa[y],
        v = n[g],
        x = u[g] !== void 0 ? u[g] : c[g],
        b = At(x),
        P = g === l ? v.isActive : null;
      P === !1 && (m = y);
      let w = x === c[g] && x !== u[g] && b;
      if (
        (w && s && t.manuallyAnimateOnMount && (w = !1),
        (v.protectedKeys = { ...d }),
        (!v.isActive && P === null) ||
          (!x && !v.prevProp) ||
          zt(x) ||
          typeof x == "boolean")
      )
        continue;
      const R = Ka(v.prevProp, x);
      let A = R || (g === l && v.isActive && !w && b) || (y > m && b),
        j = !1;
      const O = Array.isArray(x) ? x : [x];
      let it = O.reduce(i(g), {});
      P === !1 && (it = {});
      const { prevResolvedValues: an = {} } = v,
        Ji = { ...an, ...it },
        ln = (B) => {
          (A = !0),
            f.has(B) && ((j = !0), f.delete(B)),
            (v.needsAnimating[B] = !0);
          const G = t.getValue(B);
          G && (G.liveStyle = !1);
        };
      for (const B in Ji) {
        const G = it[B],
          qt = an[B];
        if (d.hasOwnProperty(B)) continue;
        let Zt = !1;
        he(G) && he(qt) ? (Zt = !Ri(G, qt)) : (Zt = G !== qt),
          Zt
            ? G != null
              ? ln(B)
              : f.add(B)
            : G !== void 0 && f.has(B)
              ? ln(B)
              : (v.protectedKeys[B] = !0);
      }
      (v.prevProp = x),
        (v.prevResolvedValues = it),
        v.isActive && (d = { ...d, ...it }),
        s && t.blockInitialAnimation && (A = !1),
        A &&
          (!(w && R) || j) &&
          h.push(...O.map((B) => ({ animation: B, options: { type: g } })));
    }
    if (f.size) {
      const y = {};
      f.forEach((g) => {
        const v = t.getBaseTarget(g),
          x = t.getValue(g);
        x && (x.liveStyle = !0), (y[g] = v ?? null);
      }),
        h.push({ animation: y });
    }
    let p = !!h.length;
    return (
      s &&
        (u.initial === !1 || u.initial === u.animate) &&
        !t.manuallyAnimateOnMount &&
        (p = !1),
      (s = !1),
      p ? e(h) : Promise.resolve()
    );
  }
  function a(l, u) {
    var c;
    if (n[l].isActive === u) return Promise.resolve();
    (c = t.variantChildren) === null ||
      c === void 0 ||
      c.forEach((f) => {
        var d;
        return (d = f.animationState) === null || d === void 0
          ? void 0
          : d.setActive(l, u);
      }),
      (n[l].isActive = u);
    const h = o(l);
    for (const f in n) n[f].protectedKeys = {};
    return h;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: r,
    getState: () => n,
    reset: () => {
      (n = Bn()), (s = !0);
    },
  };
}
function Ka(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !Ri(e, t) : !1;
}
function J(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function Bn() {
  return {
    animate: J(!0),
    whileInView: J(),
    whileHover: J(),
    whileTap: J(),
    whileDrag: J(),
    whileFocus: J(),
    exit: J(),
  };
}
class Z {
  constructor(e) {
    (this.isMounted = !1), (this.node = e);
  }
  update() {}
}
class Wa extends Z {
  constructor(e) {
    super(e), e.animationState || (e.animationState = _a(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    zt(e) && (this.unmountControls = e.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var e;
    this.node.animationState.reset(),
      (e = this.unmountControls) === null || e === void 0 || e.call(this);
  }
}
let Ga = 0;
class $a extends Z {
  constructor() {
    super(...arguments), (this.id = Ga++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext,
      { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === s) return;
    const i = this.node.animationState.setActive("exit", !e);
    n &&
      !e &&
      i.then(() => {
        n(this.id);
      });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {}
}
const za = { animation: { Feature: Wa }, exit: { Feature: $a } };
function Dt(t, e, n, s = { passive: !0 }) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n);
}
function Lt(t) {
  return { point: { x: t.pageX, y: t.pageY } };
}
const Ha = (t) => (e) => He(e) && t(e, Lt(e));
function Tt(t, e, n, s) {
  return Dt(t, e, Ha(n), s);
}
const kn = (t, e) => Math.abs(t - e);
function Xa(t, e) {
  const n = kn(t.x, e.x),
    s = kn(t.y, e.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
class Li {
  constructor(
    e,
    n,
    { transformPagePoint: s, contextWindow: i, dragSnapToOrigin: r = !1 } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const h = ie(this.lastMoveEventInfo, this.history),
          f = this.startEvent !== null,
          d = Xa(h.offset, { x: 0, y: 0 }) >= 3;
        if (!f && !d) return;
        const { point: m } = h,
          { timestamp: p } = E;
        this.history.push({ ...m, timestamp: p });
        const { onStart: y, onMove: g } = this.handlers;
        f ||
          (y && y(this.lastMoveEvent, h),
          (this.startEvent = this.lastMoveEvent)),
          g && g(this.lastMoveEvent, h);
      }),
      (this.handlePointerMove = (h, f) => {
        (this.lastMoveEvent = h),
          (this.lastMoveEventInfo = se(f, this.transformPagePoint)),
          V.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (h, f) => {
        this.end();
        const { onEnd: d, onSessionEnd: m, resumeAnimation: p } = this.handlers;
        if (
          (this.dragSnapToOrigin && p && p(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const y = ie(
          h.type === "pointercancel"
            ? this.lastMoveEventInfo
            : se(f, this.transformPagePoint),
          this.history,
        );
        this.startEvent && d && d(h, y), m && m(h, y);
      }),
      !He(e))
    )
      return;
    (this.dragSnapToOrigin = r),
      (this.handlers = n),
      (this.transformPagePoint = s),
      (this.contextWindow = i || window);
    const o = Lt(e),
      a = se(o, this.transformPagePoint),
      { point: l } = a,
      { timestamp: u } = E;
    this.history = [{ ...l, timestamp: u }];
    const { onSessionStart: c } = n;
    c && c(e, ie(a, this.history)),
      (this.removeListeners = Et(
        Tt(this.contextWindow, "pointermove", this.handlePointerMove),
        Tt(this.contextWindow, "pointerup", this.handlePointerUp),
        Tt(this.contextWindow, "pointercancel", this.handlePointerUp),
      ));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), Y(this.updatePoint);
  }
}
function se(t, e) {
  return e ? { point: e(t.point) } : t;
}
function jn(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function ie({ point: t }, e) {
  return {
    point: t,
    delta: jn(t, Fi(e)),
    offset: jn(t, Ya(e)),
    velocity: qa(e, 0.1),
  };
}
function Ya(t) {
  return t[0];
}
function Fi(t) {
  return t[t.length - 1];
}
function qa(t, e) {
  if (t.length < 2) return { x: 0, y: 0 };
  let n = t.length - 1,
    s = null;
  const i = Fi(t);
  for (; n >= 0 && ((s = t[n]), !(i.timestamp - s.timestamp > $(e))); ) n--;
  if (!s) return { x: 0, y: 0 };
  const r = z(i.timestamp - s.timestamp);
  if (r === 0) return { x: 0, y: 0 };
  const o = { x: (i.x - s.x) / r, y: (i.y - s.y) / r };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
const Bi = 1e-4,
  Za = 1 - Bi,
  Ja = 1 + Bi,
  ki = 0.01,
  Qa = 0 - ki,
  tl = 0 + ki;
function k(t) {
  return t.max - t.min;
}
function el(t, e, n) {
  return Math.abs(t - e) <= n;
}
function In(t, e, n, s = 0.5) {
  (t.origin = s),
    (t.originPoint = C(e.min, e.max, t.origin)),
    (t.scale = k(n) / k(e)),
    (t.translate = C(n.min, n.max, t.origin) - t.originPoint),
    ((t.scale >= Za && t.scale <= Ja) || isNaN(t.scale)) && (t.scale = 1),
    ((t.translate >= Qa && t.translate <= tl) || isNaN(t.translate)) &&
      (t.translate = 0);
}
function Pt(t, e, n, s) {
  In(t.x, e.x, n.x, s ? s.originX : void 0),
    In(t.y, e.y, n.y, s ? s.originY : void 0);
}
function On(t, e, n) {
  (t.min = n.min + e.min), (t.max = t.min + k(e));
}
function nl(t, e, n) {
  On(t.x, e.x, n.x), On(t.y, e.y, n.y);
}
function Nn(t, e, n) {
  (t.min = e.min - n.min), (t.max = t.min + k(e));
}
function St(t, e, n) {
  Nn(t.x, e.x, n.x), Nn(t.y, e.y, n.y);
}
function sl(t, { min: e, max: n }, s) {
  return (
    e !== void 0 && t < e
      ? (t = s ? C(e, t, s.min) : Math.max(t, e))
      : n !== void 0 && t > n && (t = s ? C(n, t, s.max) : Math.min(t, n)),
    t
  );
}
function Un(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0,
  };
}
function il(t, { top: e, left: n, bottom: s, right: i }) {
  return { x: Un(t.x, n, i), y: Un(t.y, e, s) };
}
function _n(t, e) {
  let n = e.min - t.min,
    s = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, s] = [s, n]), { min: n, max: s };
}
function ol(t, e) {
  return { x: _n(t.x, e.x), y: _n(t.y, e.y) };
}
function rl(t, e) {
  let n = 0.5;
  const s = k(t),
    i = k(e);
  return (
    i > s
      ? (n = ct(e.min, e.max - s, t.min))
      : s > i && (n = ct(t.min, t.max - i, e.min)),
    H(0, 1, n)
  );
}
function al(t, e) {
  const n = {};
  return (
    e.min !== void 0 && (n.min = e.min - t.min),
    e.max !== void 0 && (n.max = e.max - t.min),
    n
  );
}
const Se = 0.35;
function ll(t = Se) {
  return (
    t === !1 ? (t = 0) : t === !0 && (t = Se),
    { x: Kn(t, "left", "right"), y: Kn(t, "top", "bottom") }
  );
}
function Kn(t, e, n) {
  return { min: Wn(t, e), max: Wn(t, n) };
}
function Wn(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Gn = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  at = () => ({ x: Gn(), y: Gn() }),
  $n = () => ({ min: 0, max: 0 }),
  M = () => ({ x: $n(), y: $n() });
function U(t) {
  return [t("x"), t("y")];
}
function ji({ top: t, left: e, right: n, bottom: s }) {
  return { x: { min: e, max: n }, y: { min: t, max: s } };
}
function ul({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function cl(t, e) {
  if (!e) return t;
  const n = e({ x: t.left, y: t.top }),
    s = e({ x: t.right, y: t.bottom });
  return { top: n.y, left: n.x, bottom: s.y, right: s.x };
}
function oe(t) {
  return t === void 0 || t === 1;
}
function Ae({ scale: t, scaleX: e, scaleY: n }) {
  return !oe(t) || !oe(e) || !oe(n);
}
function Q(t) {
  return (
    Ae(t) ||
    Ii(t) ||
    t.z ||
    t.rotate ||
    t.rotateX ||
    t.rotateY ||
    t.skewX ||
    t.skewY
  );
}
function Ii(t) {
  return zn(t.x) || zn(t.y);
}
function zn(t) {
  return t && t !== "0%";
}
function Gt(t, e, n) {
  const s = t - n,
    i = e * s;
  return n + i;
}
function Hn(t, e, n, s, i) {
  return i !== void 0 && (t = Gt(t, i, s)), Gt(t, n, s) + e;
}
function be(t, e = 0, n = 1, s, i) {
  (t.min = Hn(t.min, e, n, s, i)), (t.max = Hn(t.max, e, n, s, i));
}
function Oi(t, { x: e, y: n }) {
  be(t.x, e.translate, e.scale, e.originPoint),
    be(t.y, n.translate, n.scale, n.originPoint);
}
const Xn = 0.999999999999,
  Yn = 1.0000000000001;
function hl(t, e, n, s = !1) {
  const i = n.length;
  if (!i) return;
  e.x = e.y = 1;
  let r, o;
  for (let a = 0; a < i; a++) {
    (r = n[a]), (o = r.projectionDelta);
    const { visualElement: l } = r.options;
    (l && l.props.style && l.props.style.display === "contents") ||
      (s &&
        r.options.layoutScroll &&
        r.scroll &&
        r !== r.root &&
        ut(t, { x: -r.scroll.offset.x, y: -r.scroll.offset.y }),
      o && ((e.x *= o.x.scale), (e.y *= o.y.scale), Oi(t, o)),
      s && Q(r.latestValues) && ut(t, r.latestValues));
  }
  e.x < Yn && e.x > Xn && (e.x = 1), e.y < Yn && e.y > Xn && (e.y = 1);
}
function lt(t, e) {
  (t.min = t.min + e), (t.max = t.max + e);
}
function qn(t, e, n, s, i = 0.5) {
  const r = C(t.min, t.max, i);
  be(t, e, n, r, s);
}
function ut(t, e) {
  qn(t.x, e.x, e.scaleX, e.scale, e.originX),
    qn(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function Ni(t, e) {
  return ji(cl(t.getBoundingClientRect(), e));
}
function fl(t, e, n) {
  const s = Ni(t, n),
    { scroll: i } = e;
  return i && (lt(s.x, i.offset.x), lt(s.y, i.offset.y)), s;
}
const Ui = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
  dl = new WeakMap();
class ml {
  constructor(e) {
    (this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = M()),
      (this.visualElement = e);
  }
  start(e, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1) return;
    const i = (c) => {
        const { dragSnapToOrigin: h } = this.getProps();
        h ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(Lt(c).point);
      },
      r = (c, h) => {
        const { drag: f, dragPropagation: d, onDragStart: m } = this.getProps();
        if (
          f &&
          !d &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = rr(f)),
          !this.openDragLock)
        )
          return;
        (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          U((y) => {
            let g = this.getAxisMotionValue(y).get() || 0;
            if (K.test(g)) {
              const { projection: v } = this.visualElement;
              if (v && v.layout) {
                const x = v.layout.layoutBox[y];
                x && (g = k(x) * (parseFloat(g) / 100));
              }
            }
            this.originPoint[y] = g;
          }),
          m && V.postRender(() => m(c, h)),
          me(this.visualElement, "transform");
        const { animationState: p } = this.visualElement;
        p && p.setActive("whileDrag", !0);
      },
      o = (c, h) => {
        const {
          dragPropagation: f,
          dragDirectionLock: d,
          onDirectionLock: m,
          onDrag: p,
        } = this.getProps();
        if (!f && !this.openDragLock) return;
        const { offset: y } = h;
        if (d && this.currentDirection === null) {
          (this.currentDirection = pl(y)),
            this.currentDirection !== null && m && m(this.currentDirection);
          return;
        }
        this.updateAxis("x", h.point, y),
          this.updateAxis("y", h.point, y),
          this.visualElement.render(),
          p && p(c, h);
      },
      a = (c, h) => this.stop(c, h),
      l = () =>
        U((c) => {
          var h;
          return (
            this.getAnimationState(c) === "paused" &&
            ((h = this.getAxisMotionValue(c).animation) === null || h === void 0
              ? void 0
              : h.play())
          );
        }),
      { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new Li(
      e,
      {
        onSessionStart: i,
        onStart: r,
        onMove: o,
        onSessionEnd: a,
        resumeAnimation: l,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: u,
        contextWindow: Ui(this.visualElement),
      },
    );
  }
  stop(e, n) {
    const s = this.isDragging;
    if ((this.cancel(), !s)) return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: r } = this.getProps();
    r && V.postRender(() => r(e, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: s } = this.getProps();
    !s &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1);
  }
  updateAxis(e, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !kt(e, i, this.currentDirection)) return;
    const r = this.getAxisMotionValue(e);
    let o = this.originPoint[e] + s[e];
    this.constraints &&
      this.constraints[e] &&
      (o = sl(o, this.constraints[e], this.elastic[e])),
      r.set(o);
  }
  resolveConstraints() {
    var e;
    const { dragConstraints: n, dragElastic: s } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (e = this.visualElement.projection) === null || e === void 0
            ? void 0
            : e.layout,
      r = this.constraints;
    n && ot(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
        ? (this.constraints = il(i.layoutBox, n))
        : (this.constraints = !1),
      (this.elastic = ll(s)),
      r !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        U((o) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(o) &&
            (this.constraints[o] = al(i.layoutBox[o], this.constraints[o]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !ot(e)) return !1;
    const s = e.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const r = fl(s, i.root, this.visualElement.getTransformPagePoint());
    let o = ol(i.layout.layoutBox, r);
    if (n) {
      const a = n(ul(o));
      (this.hasMutatedConstraints = !!a), a && (o = ji(a));
    }
    return o;
  }
  startAnimation(e) {
    const {
        drag: n,
        dragMomentum: s,
        dragElastic: i,
        dragTransition: r,
        dragSnapToOrigin: o,
        onDragTransitionEnd: a,
      } = this.getProps(),
      l = this.constraints || {},
      u = U((c) => {
        if (!kt(c, n, this.currentDirection)) return;
        let h = (l && l[c]) || {};
        o && (h = { min: 0, max: 0 });
        const f = i ? 200 : 1e6,
          d = i ? 40 : 1e7,
          m = {
            type: "inertia",
            velocity: s ? e[c] : 0,
            bounceStiffness: f,
            bounceDamping: d,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...r,
            ...h,
          };
        return this.startAxisValueAnimation(c, m);
      });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(e, n) {
    const s = this.getAxisMotionValue(e);
    return (
      me(this.visualElement, e), s.start(rn(e, s, 0, n, this.visualElement, !1))
    );
  }
  stopAnimation() {
    U((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    U((e) => {
      var n;
      return (n = this.getAxisMotionValue(e).animation) === null || n === void 0
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(e) {
    var n;
    return (n = this.getAxisMotionValue(e).animation) === null || n === void 0
      ? void 0
      : n.state;
  }
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`,
      s = this.visualElement.getProps(),
      i = s[n];
    return (
      i ||
      this.visualElement.getValue(e, (s.initial ? s.initial[e] : void 0) || 0)
    );
  }
  snapToCursor(e) {
    U((n) => {
      const { drag: s } = this.getProps();
      if (!kt(n, s, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        r = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: o, max: a } = i.layout.layoutBox[n];
        r.set(e[n] - C(o, a, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: e, dragConstraints: n } = this.getProps(),
      { projection: s } = this.visualElement;
    if (!ot(n) || !s || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    U((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[o] = rl({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: r } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = r ? r({}, "") : "none"),
      s.root && s.root.updateScroll(),
      s.updateLayout(),
      this.resolveConstraints(),
      U((o) => {
        if (!kt(o, e, null)) return;
        const a = this.getAxisMotionValue(o),
          { min: l, max: u } = this.constraints[o];
        a.set(C(l, u, i[o]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    dl.set(this.visualElement, this);
    const e = this.visualElement.current,
      n = Tt(e, "pointerdown", (l) => {
        const { drag: u, dragListener: c = !0 } = this.getProps();
        u && c && this.start(l);
      }),
      s = () => {
        const { dragConstraints: l } = this.getProps();
        ot(l) && l.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      r = i.addEventListener("measure", s);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
      V.read(s);
    const o = Dt(window, "resize", () => this.scalePositionWithinConstraints()),
      a = i.addEventListener(
        "didUpdate",
        ({ delta: l, hasLayoutChanged: u }) => {
          this.isDragging &&
            u &&
            (U((c) => {
              const h = this.getAxisMotionValue(c);
              h &&
                ((this.originPoint[c] += l[c].translate),
                h.set(h.get() + l[c].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      o(), n(), r(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: s = !1,
        dragPropagation: i = !1,
        dragConstraints: r = !1,
        dragElastic: o = Se,
        dragMomentum: a = !0,
      } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: r,
      dragElastic: o,
      dragMomentum: a,
    };
  }
}
function kt(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function pl(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? (n = "y") : Math.abs(t.x) > e && (n = "x"), n;
}
class gl extends Z {
  constructor(e) {
    super(e),
      (this.removeGroupControls = I),
      (this.removeListeners = I),
      (this.controls = new ml(e));
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || I);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Zn = (t) => (e, n) => {
  t && V.postRender(() => t(e, n));
};
class yl extends Z {
  constructor() {
    super(...arguments), (this.removePointerDownListener = I);
  }
  onPointerDown(e) {
    this.session = new Li(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Ui(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: e,
      onPanStart: n,
      onPan: s,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: Zn(e),
      onStart: Zn(n),
      onMove: s,
      onEnd: (r, o) => {
        delete this.session, i && V.postRender(() => i(r, o));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Tt(this.node.current, "pointerdown", (e) =>
      this.onPointerDown(e),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const Ot = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Jn(t, e) {
  return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
}
const pt = {
    correct: (t, e) => {
      if (!e.target) return t;
      if (typeof t == "string")
        if (T.test(t)) t = parseFloat(t);
        else return t;
      const n = Jn(t, e.target.x),
        s = Jn(t, e.target.y);
      return `${n}% ${s}%`;
    },
  },
  vl = {
    correct: (t, { treeScale: e, projectionDelta: n }) => {
      const s = t,
        i = q.parse(t);
      if (i.length > 5) return s;
      const r = q.createTransformer(t),
        o = typeof i[0] != "number" ? 1 : 0,
        a = n.x.scale * e.x,
        l = n.y.scale * e.y;
      (i[0 + o] /= a), (i[1 + o] /= l);
      const u = C(a, l, 0.5);
      return (
        typeof i[2 + o] == "number" && (i[2 + o] /= u),
        typeof i[3 + o] == "number" && (i[3 + o] /= u),
        r(i)
      );
    },
  };
class xl extends S.Component {
  componentDidMount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: s,
        layoutId: i,
      } = this.props,
      { projection: r } = e;
    bo(Tl),
      r &&
        (n.group && n.group.add(r),
        s && s.register && i && s.register(r),
        r.root.didUpdate(),
        r.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        r.setOptions({
          ...r.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Ot.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(e) {
    const {
        layoutDependency: n,
        visualElement: s,
        drag: i,
        isPresent: r,
      } = this.props,
      o = s.projection;
    return (
      o &&
        ((o.isPresent = r),
        i || e.layoutDependency !== n || n === void 0
          ? o.willUpdate()
          : this.safeToRemove(),
        e.isPresent !== r &&
          (r
            ? o.promote()
            : o.relegate() ||
              V.postRender(() => {
                const a = o.getStack();
                (!a || !a.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e &&
      (e.root.didUpdate(),
      Fe.postRender(() => {
        !e.currentAnimation && e.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: s,
      } = this.props,
      { projection: i } = e;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function _i(t) {
  const [e, n] = to(),
    s = S.useContext(As);
  return ce.jsx(xl, {
    ...t,
    layoutGroup: s,
    switchLayoutGroup: S.useContext(Es),
    isPresent: e,
    safeToRemove: n,
  });
}
const Tl = {
  borderRadius: {
    ...pt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: pt,
  borderTopRightRadius: pt,
  borderBottomLeftRadius: pt,
  borderBottomRightRadius: pt,
  boxShadow: vl,
};
function Pl(t, e, n) {
  const s = F(t) ? t : Vt(t);
  return s.start(rn("", s, e, n)), s.animation;
}
function Sl(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const Al = (t, e) => t.depth - e.depth;
class bl {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(e) {
    Xe(this.children, e), (this.isDirty = !0);
  }
  remove(e) {
    Ye(this.children, e), (this.isDirty = !0);
  }
  forEach(e) {
    this.isDirty && this.children.sort(Al),
      (this.isDirty = !1),
      this.children.forEach(e);
  }
}
function wl(t, e) {
  const n = W.now(),
    s = ({ timestamp: i }) => {
      const r = i - n;
      r >= e && (Y(s), t(r - e));
    };
  return V.read(s, !0), () => Y(s);
}
const Ki = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  Vl = Ki.length,
  Qn = (t) => (typeof t == "string" ? parseFloat(t) : t),
  ts = (t) => typeof t == "number" || T.test(t);
function Cl(t, e, n, s, i, r) {
  i
    ? ((t.opacity = C(0, n.opacity !== void 0 ? n.opacity : 1, Dl(s))),
      (t.opacityExit = C(e.opacity !== void 0 ? e.opacity : 1, 0, Ml(s))))
    : r &&
      (t.opacity = C(
        e.opacity !== void 0 ? e.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        s,
      ));
  for (let o = 0; o < Vl; o++) {
    const a = `border${Ki[o]}Radius`;
    let l = es(e, a),
      u = es(n, a);
    if (l === void 0 && u === void 0) continue;
    l || (l = 0),
      u || (u = 0),
      l === 0 || u === 0 || ts(l) === ts(u)
        ? ((t[a] = Math.max(C(Qn(l), Qn(u), s), 0)),
          (K.test(u) || K.test(l)) && (t[a] += "%"))
        : (t[a] = u);
  }
  (e.rotate || n.rotate) && (t.rotate = C(e.rotate || 0, n.rotate || 0, s));
}
function es(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const Dl = Wi(0, 0.5, ri),
  Ml = Wi(0.5, 0.95, I);
function Wi(t, e, n) {
  return (s) => (s < t ? 0 : s > e ? 1 : n(ct(t, e, s)));
}
function ns(t, e) {
  (t.min = e.min), (t.max = e.max);
}
function N(t, e) {
  ns(t.x, e.x), ns(t.y, e.y);
}
function ss(t, e) {
  (t.translate = e.translate),
    (t.scale = e.scale),
    (t.originPoint = e.originPoint),
    (t.origin = e.origin);
}
function is(t, e, n, s, i) {
  return (
    (t -= e), (t = Gt(t, 1 / n, s)), i !== void 0 && (t = Gt(t, 1 / i, s)), t
  );
}
function Rl(t, e = 0, n = 1, s = 0.5, i, r = t, o = t) {
  if (
    (K.test(e) && ((e = parseFloat(e)), (e = C(o.min, o.max, e / 100) - o.min)),
    typeof e != "number")
  )
    return;
  let a = C(r.min, r.max, s);
  t === r && (a -= e),
    (t.min = is(t.min, e, n, a, i)),
    (t.max = is(t.max, e, n, a, i));
}
function os(t, e, [n, s, i], r, o) {
  Rl(t, e[n], e[s], e[i], e.scale, r, o);
}
const El = ["x", "scaleX", "originX"],
  Ll = ["y", "scaleY", "originY"];
function rs(t, e, n, s) {
  os(t.x, e, El, n ? n.x : void 0, s ? s.x : void 0),
    os(t.y, e, Ll, n ? n.y : void 0, s ? s.y : void 0);
}
function as(t) {
  return t.translate === 0 && t.scale === 1;
}
function Gi(t) {
  return as(t.x) && as(t.y);
}
function ls(t, e) {
  return t.min === e.min && t.max === e.max;
}
function Fl(t, e) {
  return ls(t.x, e.x) && ls(t.y, e.y);
}
function us(t, e) {
  return (
    Math.round(t.min) === Math.round(e.min) &&
    Math.round(t.max) === Math.round(e.max)
  );
}
function $i(t, e) {
  return us(t.x, e.x) && us(t.y, e.y);
}
function cs(t) {
  return k(t.x) / k(t.y);
}
function hs(t, e) {
  return (
    t.translate === e.translate &&
    t.scale === e.scale &&
    t.originPoint === e.originPoint
  );
}
class Bl {
  constructor() {
    this.members = [];
  }
  add(e) {
    Xe(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (
      (Ye(this.members, e),
      e === this.prevLead && (this.prevLead = void 0),
      e === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((i) => e === i);
    if (n === 0) return !1;
    let s;
    for (let i = n; i >= 0; i--) {
      const r = this.members[i];
      if (r.isPresent !== !1) {
        s = r;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(e, n) {
    const s = this.lead;
    if (e !== s && ((this.prevLead = s), (this.lead = e), e.show(), s)) {
      s.instance && s.scheduleRender(),
        e.scheduleRender(),
        (e.resumeFrom = s),
        n && (e.resumeFrom.preserveOpacity = !0),
        s.snapshot &&
          ((e.snapshot = s.snapshot),
          (e.snapshot.latestValues = s.animationValues || s.latestValues)),
        e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
      const { crossfade: i } = e.options;
      i === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: s } = e;
      n.onExitComplete && n.onExitComplete(),
        s && s.options.onExitComplete && s.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function kl(t, e, n) {
  let s = "";
  const i = t.x.translate / e.x,
    r = t.y.translate / e.y,
    o = (n == null ? void 0 : n.z) || 0;
  if (
    ((i || r || o) && (s = `translate3d(${i}px, ${r}px, ${o}px) `),
    (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `),
    n)
  ) {
    const {
      transformPerspective: u,
      rotate: c,
      rotateX: h,
      rotateY: f,
      skewX: d,
      skewY: m,
    } = n;
    u && (s = `perspective(${u}px) ${s}`),
      c && (s += `rotate(${c}deg) `),
      h && (s += `rotateX(${h}deg) `),
      f && (s += `rotateY(${f}deg) `),
      d && (s += `skewX(${d}deg) `),
      m && (s += `skewY(${m}deg) `);
  }
  const a = t.x.scale * e.x,
    l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (s += `scale(${a}, ${l})`), s || "none";
}
const tt = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  vt = typeof window < "u" && window.MotionDebug !== void 0,
  re = ["", "X", "Y", "Z"],
  jl = { visibility: "hidden" },
  fs = 1e3;
let Il = 0;
function ae(t, e, n, s) {
  const { latestValues: i } = e;
  i[t] && ((n[t] = i[t]), e.setStaticValue(t, 0), s && (s[t] = 0));
}
function zi(t) {
  if (((t.hasCheckedOptimisedAppear = !0), t.root === t)) return;
  const { visualElement: e } = t.options;
  if (!e) return;
  const n = Qs(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: r } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", V, !(i || r));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && zi(s);
}
function Hi({
  attachResizeListener: t,
  defaultParent: e,
  measureScroll: n,
  checkIsScrollRoot: s,
  resetTransform: i,
}) {
  return class {
    constructor(o = {}, a = e == null ? void 0 : e()) {
      (this.id = Il++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            vt &&
              (tt.totalNodes =
                tt.resolvedTargetDeltas =
                tt.recalculatedProjection =
                  0),
            this.nodes.forEach(Ul),
            this.nodes.forEach($l),
            this.nodes.forEach(zl),
            this.nodes.forEach(_l),
            vt && window.MotionDebug.record(tt);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = o),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0);
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new bl());
    }
    addEventListener(o, a) {
      return (
        this.eventHandlers.has(o) || this.eventHandlers.set(o, new qe()),
        this.eventHandlers.get(o).add(a)
      );
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    mount(o, a = this.root.hasTreeAnimated) {
      if (this.instance) return;
      (this.isSVG = Sl(o)), (this.instance = o);
      const { layoutId: l, layout: u, visualElement: c } = this.options;
      if (
        (c && !c.current && c.mount(o),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        a && (u || l) && (this.isLayoutDirty = !0),
        t)
      ) {
        let h;
        const f = () => (this.root.updateBlockedByResize = !1);
        t(o, () => {
          (this.root.updateBlockedByResize = !0),
            h && h(),
            (h = wl(f, 250)),
            Ot.hasAnimatedSinceResize &&
              ((Ot.hasAnimatedSinceResize = !1), this.nodes.forEach(ms));
        });
      }
      l && this.root.registerSharedNode(l, this),
        this.options.animate !== !1 &&
          c &&
          (l || u) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: h,
              hasLayoutChanged: f,
              hasRelativeLayoutChanged: d,
              layout: m,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const p =
                  this.options.transition || c.getDefaultTransition() || Zl,
                { onLayoutAnimationStart: y, onLayoutAnimationComplete: g } =
                  c.getProps(),
                v = !this.targetLayout || !$i(this.targetLayout, m),
                x = !f && d;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                x ||
                (f && (v || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(h, x);
                const b = { ...Ge(p, "layout"), onPlay: y, onComplete: g };
                (c.shouldReduceMotion || this.options.layoutRoot) &&
                  ((b.delay = 0), (b.type = !1)),
                  this.startAnimation(b);
              } else
                f || ms(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = m;
            },
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Y(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(Hl),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          zi(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const h = this.path[c];
        (h.shouldResetTransform = !0),
          h.updateScroll("snapshot"),
          h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l) return;
      const u = this.getTransformTemplate();
      (this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        o && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(ds);
        return;
      }
      this.isUpdating || this.nodes.forEach(Wl),
        (this.isUpdating = !1),
        this.nodes.forEach(Gl),
        this.nodes.forEach(Ol),
        this.nodes.forEach(Nl),
        this.clearAllSnapshots();
      const a = W.now();
      (E.delta = H(0, 1e3 / 60, a - E.timestamp)),
        (E.timestamp = a),
        (E.isProcessing = !0),
        Jt.update.process(E),
        Jt.preRender.process(E),
        Jt.render.process(E),
        (E.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Fe.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Kl), this.sharedNodes.forEach(Xl);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        V.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      V.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !k(this.snapshot.measuredBox.x) &&
          !k(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      const o = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = M()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a &&
        a.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          o ? o.layoutBox : void 0,
        );
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === o &&
          (a = !1),
        a)
      ) {
        const l = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      const o =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        a = this.projectionDelta && !Gi(this.projectionDelta),
        l = this.getTransformTemplate(),
        u = l ? l(this.latestValues, "") : void 0,
        c = u !== this.prevTransformTemplateValue;
      o &&
        (a || Q(this.latestValues) || c) &&
        (i(this.instance, u),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return (
        o && (l = this.removeTransform(l)),
        Jl(l),
        {
          animationId: this.root.animationId,
          measuredBox: a,
          layoutBox: l,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var o;
      const { visualElement: a } = this.options;
      if (!a) return M();
      const l = a.measureViewportBox();
      if (
        !(
          ((o = this.scroll) === null || o === void 0 ? void 0 : o.wasRoot) ||
          this.path.some(Ql)
        )
      ) {
        const { scroll: c } = this.root;
        c && (lt(l.x, c.offset.x), lt(l.y, c.offset.y));
      }
      return l;
    }
    removeElementScroll(o) {
      var a;
      const l = M();
      if ((N(l, o), !((a = this.scroll) === null || a === void 0) && a.wasRoot))
        return l;
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u],
          { scroll: h, options: f } = c;
        c !== this.root &&
          h &&
          f.layoutScroll &&
          (h.wasRoot && N(l, o), lt(l.x, h.offset.x), lt(l.y, h.offset.y));
      }
      return l;
    }
    applyTransform(o, a = !1) {
      const l = M();
      N(l, o);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          ut(l, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          Q(c.latestValues) && ut(l, c.latestValues);
      }
      return Q(this.latestValues) && ut(l, this.latestValues), l;
    }
    removeTransform(o) {
      const a = M();
      N(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !Q(u.latestValues)) continue;
        Ae(u.latestValues) && u.updateSnapshot();
        const c = M(),
          h = u.measurePageBox();
        N(c, h),
          rs(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return Q(this.latestValues) && rs(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      (this.targetDelta = o),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== E.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      var a;
      const l = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = l.isSharedProjectionDirty);
      const u = !!this.resumingFrom || this !== l;
      if (
        !(
          o ||
          (u && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((a = this.parent) === null || a === void 0) &&
            a.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: h, layoutId: f } = this.options;
      if (!(!this.layout || !(h || f))) {
        if (
          ((this.resolvedRelativeTargetAt = E.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const d = this.getClosestProjectingParent();
          d && d.layout && this.animationProgress !== 1
            ? ((this.relativeParent = d),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = M()),
              (this.relativeTargetOrigin = M()),
              St(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                d.layout.layoutBox,
              ),
              N(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = M()), (this.targetWithTransforms = M())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                nl(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target,
                ))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : N(this.target, this.layout.layoutBox),
                  Oi(this.target, this.targetDelta))
                : N(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const d = this.getClosestProjectingParent();
            d &&
            !!d.resumingFrom == !!this.resumingFrom &&
            !d.options.layoutScroll &&
            d.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = d),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = M()),
                (this.relativeTargetOrigin = M()),
                St(this.relativeTargetOrigin, this.target, d.target),
                N(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          vt && tt.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Ae(this.parent.latestValues) ||
          Ii(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var o;
      const a = this.getLead(),
        l = !!this.resumingFrom || this !== a;
      let u = !0;
      if (
        ((this.isProjectionDirty ||
          (!((o = this.parent) === null || o === void 0) &&
            o.isProjectionDirty)) &&
          (u = !1),
        l &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (u = !1),
        this.resolvedRelativeTargetAt === E.timestamp && (u = !1),
        u)
      )
        return;
      const { layout: c, layoutId: h } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || h))
      )
        return;
      N(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x,
        d = this.treeScale.y;
      hl(this.layoutCorrected, this.treeScale, this.path, l),
        a.layout &&
          !a.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((a.target = a.layout.layoutBox), (a.targetWithTransforms = M()));
      const { target: m } = a;
      if (!m) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (ss(this.prevProjectionDelta.x, this.projectionDelta.x),
          ss(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Pt(this.projectionDelta, this.layoutCorrected, m, this.latestValues),
        (this.treeScale.x !== f ||
          this.treeScale.y !== d ||
          !hs(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !hs(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", m)),
        vt && tt.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      var a;
      if (
        ((a = this.options.visualElement) === null ||
          a === void 0 ||
          a.scheduleRender(),
        o)
      ) {
        const l = this.getStack();
        l && l.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = at()),
        (this.projectionDelta = at()),
        (this.projectionDeltaWithTransform = at());
    }
    setAnimationOrigin(o, a = !1) {
      const l = this.snapshot,
        u = l ? l.latestValues : {},
        c = { ...this.latestValues },
        h = at();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a);
      const f = M(),
        d = l ? l.source : void 0,
        m = this.layout ? this.layout.source : void 0,
        p = d !== m,
        y = this.getStack(),
        g = !y || y.members.length <= 1,
        v = !!(p && !g && this.options.crossfade === !0 && !this.path.some(ql));
      this.animationProgress = 0;
      let x;
      (this.mixTargetDelta = (b) => {
        const P = b / 1e3;
        ps(h.x, o.x, P),
          ps(h.y, o.y, P),
          this.setTargetDelta(h),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (St(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            Yl(this.relativeTarget, this.relativeTargetOrigin, f, P),
            x && Fl(this.relativeTarget, x) && (this.isProjectionDirty = !1),
            x || (x = M()),
            N(x, this.relativeTarget)),
          p &&
            ((this.animationValues = c), Cl(c, u, this.latestValues, P, v, g)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = P);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (Y(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = V.update(() => {
          (Ot.hasAnimatedSinceResize = !0),
            (this.currentAnimation = Pl(0, fs, {
              ...o,
              onUpdate: (a) => {
                this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a);
              },
              onComplete: () => {
                o.onComplete && o.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const o = this.getStack();
      o && o.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(fs),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let {
        targetWithTransforms: a,
        target: l,
        layout: u,
        latestValues: c,
      } = o;
      if (!(!a || !l || !u)) {
        if (
          this !== o &&
          this.layout &&
          u &&
          Xi(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          l = this.target || M();
          const h = k(this.layout.layoutBox.x);
          (l.x.min = o.target.x.min), (l.x.max = l.x.min + h);
          const f = k(this.layout.layoutBox.y);
          (l.y.min = o.target.y.min), (l.y.max = l.y.min + f);
        }
        N(a, l),
          ut(a, c),
          Pt(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new Bl()),
        this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity
            ? u.shouldPreserveFollowOpacity(a)
            : void 0,
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      var o;
      const { layoutId: a } = this.options;
      return a
        ? ((o = this.getStack()) === null || o === void 0 ? void 0 : o.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var o;
      const { layoutId: a } = this.options;
      return a
        ? (o = this.getStack()) === null || o === void 0
          ? void 0
          : o.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o) return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l),
        o && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o) return;
      let a = !1;
      const { latestValues: l } = o;
      if (
        ((l.z ||
          l.rotate ||
          l.rotateX ||
          l.rotateY ||
          l.rotateZ ||
          l.skewX ||
          l.skewY) &&
          (a = !0),
        !a)
      )
        return;
      const u = {};
      l.z && ae("z", o, u, this.animationValues);
      for (let c = 0; c < re.length; c++)
        ae(`rotate${re[c]}`, o, u, this.animationValues),
          ae(`skew${re[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u)
        o.setStaticValue(c, u[c]),
          this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    getProjectionStyles(o) {
      var a, l;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return jl;
      const u = { visibility: "" },
        c = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (u.opacity = ""),
          (u.pointerEvents = jt(o == null ? void 0 : o.pointerEvents) || ""),
          (u.transform = c ? c(this.latestValues, "") : "none"),
          u
        );
      const h = this.getLead();
      if (!this.projectionDelta || !this.layout || !h.target) {
        const p = {};
        return (
          this.options.layoutId &&
            ((p.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (p.pointerEvents = jt(o == null ? void 0 : o.pointerEvents) || "")),
          this.hasProjected &&
            !Q(this.latestValues) &&
            ((p.transform = c ? c({}, "") : "none"), (this.hasProjected = !1)),
          p
        );
      }
      const f = h.animationValues || h.latestValues;
      this.applyTransformsToTarget(),
        (u.transform = kl(
          this.projectionDeltaWithTransform,
          this.treeScale,
          f,
        )),
        c && (u.transform = c(f, u.transform));
      const { x: d, y: m } = this.projectionDelta;
      (u.transformOrigin = `${d.origin * 100}% ${m.origin * 100}% 0`),
        h.animationValues
          ? (u.opacity =
              h === this
                ? (l =
                    (a = f.opacity) !== null && a !== void 0
                      ? a
                      : this.latestValues.opacity) !== null && l !== void 0
                  ? l
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : f.opacityExit)
          : (u.opacity =
              h === this
                ? f.opacity !== void 0
                  ? f.opacity
                  : ""
                : f.opacityExit !== void 0
                  ? f.opacityExit
                  : 0);
      for (const p in bt) {
        if (f[p] === void 0) continue;
        const { correct: y, applyTo: g, isCSSVariable: v } = bt[p],
          x = u.transform === "none" ? f[p] : y(f[p], h);
        if (g) {
          const b = g.length;
          for (let P = 0; P < b; P++) u[g[P]] = x;
        } else
          v ? (this.options.visualElement.renderState.vars[p] = x) : (u[p] = x);
      }
      return (
        this.options.layoutId &&
          (u.pointerEvents =
            h === this
              ? jt(o == null ? void 0 : o.pointerEvents) || ""
              : "none"),
        u
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((o) => {
        var a;
        return (a = o.currentAnimation) === null || a === void 0
          ? void 0
          : a.stop();
      }),
        this.root.nodes.forEach(ds),
        this.root.sharedNodes.clear();
    }
  };
}
function Ol(t) {
  t.updateLayout();
}
function Nl(t) {
  var e;
  const n =
    ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) ||
    t.snapshot;
  if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
    const { layoutBox: s, measuredBox: i } = t.layout,
      { animationType: r } = t.options,
      o = n.source !== t.layout.source;
    r === "size"
      ? U((h) => {
          const f = o ? n.measuredBox[h] : n.layoutBox[h],
            d = k(f);
          (f.min = s[h].min), (f.max = f.min + d);
        })
      : Xi(r, n.layoutBox, s) &&
        U((h) => {
          const f = o ? n.measuredBox[h] : n.layoutBox[h],
            d = k(s[h]);
          (f.max = f.min + d),
            t.relativeTarget &&
              !t.currentAnimation &&
              ((t.isProjectionDirty = !0),
              (t.relativeTarget[h].max = t.relativeTarget[h].min + d));
        });
    const a = at();
    Pt(a, s, n.layoutBox);
    const l = at();
    o ? Pt(l, t.applyTransform(i, !0), n.measuredBox) : Pt(l, s, n.layoutBox);
    const u = !Gi(a);
    let c = !1;
    if (!t.resumeFrom) {
      const h = t.getClosestProjectingParent();
      if (h && !h.resumeFrom) {
        const { snapshot: f, layout: d } = h;
        if (f && d) {
          const m = M();
          St(m, n.layoutBox, f.layoutBox);
          const p = M();
          St(p, s, d.layoutBox),
            $i(m, p) || (c = !0),
            h.options.layoutRoot &&
              ((t.relativeTarget = p),
              (t.relativeTargetOrigin = m),
              (t.relativeParent = h));
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: s,
      snapshot: n,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeLayoutChanged: c,
    });
  } else if (t.isLead()) {
    const { onExitComplete: s } = t.options;
    s && s();
  }
  t.options.transition = void 0;
}
function Ul(t) {
  vt && tt.totalNodes++,
    t.parent &&
      (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
      t.isSharedProjectionDirty ||
        (t.isSharedProjectionDirty = !!(
          t.isProjectionDirty ||
          t.parent.isProjectionDirty ||
          t.parent.isSharedProjectionDirty
        )),
      t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function _l(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function Kl(t) {
  t.clearSnapshot();
}
function ds(t) {
  t.clearMeasurements();
}
function Wl(t) {
  t.isLayoutDirty = !1;
}
function Gl(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
    t.resetTransform();
}
function ms(t) {
  t.finishAnimation(),
    (t.targetDelta = t.relativeTarget = t.target = void 0),
    (t.isProjectionDirty = !0);
}
function $l(t) {
  t.resolveTargetDelta();
}
function zl(t) {
  t.calcProjection();
}
function Hl(t) {
  t.resetSkewAndRotation();
}
function Xl(t) {
  t.removeLeadSnapshot();
}
function ps(t, e, n) {
  (t.translate = C(e.translate, 0, n)),
    (t.scale = C(e.scale, 1, n)),
    (t.origin = e.origin),
    (t.originPoint = e.originPoint);
}
function gs(t, e, n, s) {
  (t.min = C(e.min, n.min, s)), (t.max = C(e.max, n.max, s));
}
function Yl(t, e, n, s) {
  gs(t.x, e.x, n.x, s), gs(t.y, e.y, n.y, s);
}
function ql(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const Zl = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  ys = (t) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(t),
  vs = ys("applewebkit/") && !ys("chrome/") ? Math.round : I;
function xs(t) {
  (t.min = vs(t.min)), (t.max = vs(t.max));
}
function Jl(t) {
  xs(t.x), xs(t.y);
}
function Xi(t, e, n) {
  return (
    t === "position" || (t === "preserve-aspect" && !el(cs(e), cs(n), 0.2))
  );
}
function Ql(t) {
  var e;
  return (
    t !== t.root &&
    ((e = t.scroll) === null || e === void 0 ? void 0 : e.wasRoot)
  );
}
const tu = Hi({
    attachResizeListener: (t, e) => Dt(t, "resize", e),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  le = { current: void 0 },
  Yi = Hi({
    measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
    defaultParent: () => {
      if (!le.current) {
        const t = new tu({});
        t.mount(window), t.setOptions({ layoutScroll: !0 }), (le.current = t);
      }
      return le.current;
    },
    resetTransform: (t, e) => {
      t.style.transform = e !== void 0 ? e : "none";
    },
    checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed",
  }),
  eu = {
    pan: { Feature: yl },
    drag: { Feature: gl, ProjectionNode: Yi, MeasureLayout: _i },
  };
function Ts(t, e, n) {
  const { props: s } = t;
  t.animationState &&
    s.whileHover &&
    t.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n,
    r = s[i];
  r && V.postRender(() => r(e, Lt(e)));
}
class nu extends Z {
  mount() {
    const { current: e } = this.node;
    e &&
      (this.unmount = er(
        e,
        (n, s) => (Ts(this.node, s, "Start"), (i) => Ts(this.node, i, "End")),
      ));
  }
  unmount() {}
}
class su extends Z {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Et(
      Dt(this.node.current, "focus", () => this.onFocus()),
      Dt(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function Ps(t, e, n) {
  const { props: s } = t;
  t.animationState &&
    s.whileTap &&
    t.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n),
    r = s[i];
  r && V.postRender(() => r(e, Lt(e)));
}
class iu extends Z {
  mount() {
    const { current: e } = this.node;
    e &&
      (this.unmount = or(
        e,
        (n, s) => (
          Ps(this.node, s, "Start"),
          (i, { success: r }) => Ps(this.node, i, r ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const we = new WeakMap(),
  ue = new WeakMap(),
  ou = (t) => {
    const e = we.get(t.target);
    e && e(t);
  },
  ru = (t) => {
    t.forEach(ou);
  };
function au({ root: t, ...e }) {
  const n = t || document;
  ue.has(n) || ue.set(n, {});
  const s = ue.get(n),
    i = JSON.stringify(e);
  return s[i] || (s[i] = new IntersectionObserver(ru, { root: t, ...e })), s[i];
}
function lu(t, e, n) {
  const s = au(e);
  return (
    we.set(t, n),
    s.observe(t),
    () => {
      we.delete(t), s.unobserve(t);
    }
  );
}
const uu = { some: 0, all: 1 };
class cu extends Z {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(),
      { root: n, margin: s, amount: i = "some", once: r } = e,
      o = {
        root: n ? n.current : void 0,
        rootMargin: s,
        threshold: typeof i == "number" ? i : uu[i],
      },
      a = (l) => {
        const { isIntersecting: u } = l;
        if (
          this.isInView === u ||
          ((this.isInView = u), r && !u && this.hasEnteredView)
        )
          return;
        u && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", u);
        const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(),
          f = u ? c : h;
        f && f(l);
      };
    return lu(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(hu(e, n)) && this.startObserver();
  }
  unmount() {}
}
function hu({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const fu = {
    inView: { Feature: cu },
    tap: { Feature: iu },
    focus: { Feature: su },
    hover: { Feature: nu },
  },
  du = { layout: { ProjectionNode: Yi, MeasureLayout: _i } },
  Ve = { current: null },
  qi = { current: !1 };
function mu() {
  if (((qi.current = !0), !!De))
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"),
        e = () => (Ve.current = t.matches);
      t.addListener(e), e();
    } else Ve.current = !1;
}
const pu = [...Ti, L, q],
  gu = (t) => pu.find(xi(t)),
  yu = new WeakMap();
function vu(t, e, n) {
  for (const s in e) {
    const i = e[s],
      r = n[s];
    if (F(i)) t.addValue(s, i);
    else if (F(r)) t.addValue(s, Vt(i, { owner: t }));
    else if (r !== i)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, Vt(o !== void 0 ? o : i, { owner: t }));
      }
  }
  for (const s in n) e[s] === void 0 && t.removeValue(s);
  return e;
}
const Ss = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class xu {
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor(
    {
      parent: e,
      props: n,
      presenceContext: s,
      reducedMotionConfig: i,
      blockInitialAnimation: r,
      visualState: o,
    },
    a = {},
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = nn),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const d = W.now();
        this.renderScheduledAt < d &&
          ((this.renderScheduledAt = d), V.render(this.render, !1, !0));
      });
    const { latestValues: l, renderState: u, onUpdate: c } = o;
    (this.onUpdate = c),
      (this.latestValues = l),
      (this.baseTarget = { ...l }),
      (this.initialValues = n.initial ? { ...l } : {}),
      (this.renderState = u),
      (this.parent = e),
      (this.props = n),
      (this.presenceContext = s),
      (this.depth = e ? e.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = a),
      (this.blockInitialAnimation = !!r),
      (this.isControllingVariants = Ht(n)),
      (this.isVariantNode = Ms(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(e && e.current));
    const { willChange: h, ...f } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this,
    );
    for (const d in f) {
      const m = f[d];
      l[d] !== void 0 && F(m) && m.set(l[d], !1);
    }
  }
  mount(e) {
    (this.current = e),
      yu.set(e, this),
      this.projection && !this.projection.instance && this.projection.mount(e),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, s) => this.bindToMotionValue(s, n)),
      qi.current || mu(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : Ve.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(),
      Y(this.notifyUpdate),
      Y(this.render),
      this.valueSubscriptions.forEach((e) => e()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this);
    for (const e in this.events) this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), (n.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const s = st.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (a) => {
        (this.latestValues[e] = a),
          this.props.onUpdate && V.preRender(this.notifyUpdate),
          s && this.projection && (this.projection.isTransformDirty = !0);
      }),
      r = n.on("renderRequest", this.scheduleRender);
    let o;
    window.MotionCheckAppearSync &&
      (o = window.MotionCheckAppearSync(this, e, n)),
      this.valueSubscriptions.set(e, () => {
        i(), r(), o && o(), n.owner && n.stop();
      });
  }
  sortNodePosition(e) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== e.type
      ? 0
      : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in ht) {
      const n = ht[e];
      if (!n) continue;
      const { isEnabled: s, Feature: i } = n;
      if (
        (!this.features[e] &&
          i &&
          s(this.props) &&
          (this.features[e] = new i(this)),
        this.features[e])
      ) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), (r.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : M();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = e),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n);
    for (let s = 0; s < Ss.length; s++) {
      const i = Ss[s];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const r = "on" + i,
        o = e[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    (this.prevMotionValues = vu(
      this,
      this.scrapeMotionValuesFromProps(e, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue(),
      this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(e),
        () => n.variantChildren.delete(e)
      );
  }
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s &&
      (s && this.removeValue(e),
      this.bindToMotionValue(e, n),
      this.values.set(e, n),
      (this.latestValues[e] = n.get()));
  }
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)),
      delete this.latestValues[e],
      this.removeValueFromRenderState(e, this.renderState);
  }
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e]) return this.props.values[e];
    let s = this.values.get(e);
    return (
      s === void 0 &&
        n !== void 0 &&
        ((s = Vt(n === null ? void 0 : n, { owner: this })),
        this.addValue(e, s)),
      s
    );
  }
  readValue(e, n) {
    var s;
    let i =
      this.latestValues[e] !== void 0 || !this.current
        ? this.latestValues[e]
        : (s = this.getBaseTargetFromProps(this.props, e)) !== null &&
            s !== void 0
          ? s
          : this.readValueFromInstance(this.current, e, this.options);
    return (
      i != null &&
        (typeof i == "string" && (yi(i) || li(i))
          ? (i = parseFloat(i))
          : !gu(i) && q.test(n) && (i = mi(e, n)),
        this.setBaseTarget(e, F(i) ? i.get() : i)),
      F(i) ? i.get() : i
    );
  }
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  getBaseTarget(e) {
    var n;
    const { initial: s } = this.props;
    let i;
    if (typeof s == "string" || typeof s == "object") {
      const o = Ke(
        this.props,
        s,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom,
      );
      o && (i = o[e]);
    }
    if (s && i !== void 0) return i;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !F(r)
      ? r
      : this.initialValues[e] !== void 0 && i === void 0
        ? void 0
        : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new qe()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class Zi extends xu {
  constructor() {
    super(...arguments), (this.KeyframeResolver = Pi);
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    F(e) &&
      (this.childSubscription = e.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function Tu(t) {
  return window.getComputedStyle(t);
}
class Pu extends Zi {
  constructor() {
    super(...arguments), (this.type = "html"), (this.renderInstance = Us);
  }
  readValueFromInstance(e, n) {
    if (st.has(n)) {
      const s = en(n);
      return (s && s.default) || 0;
    } else {
      const s = Tu(e),
        i = (Be(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Ni(e, n);
  }
  build(e, n, s) {
    Ie(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return We(e, n, s);
  }
}
class Su extends Zi {
  constructor() {
    super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = M),
      (this.updateDimensions = () => {
        this.current &&
          !this.renderState.dimensions &&
          Ns(this.current, this.renderState);
      });
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (st.has(n)) {
      const s = en(n);
      return (s && s.default) || 0;
    }
    return (n = _s.has(n) ? n : Le(n)), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Ws(e, n, s);
  }
  onBindTransform() {
    this.current &&
      !this.renderState.dimensions &&
      V.postRender(this.updateDimensions);
  }
  build(e, n, s) {
    Ue(e, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, s, i) {
    Ks(e, n, s, i);
  }
  mount(e) {
    (this.isSVGTag = _e(e.tagName)), super.mount(e);
  }
}
const Au = (t, e) =>
    Ne(t) ? new Su(e) : new Pu(e, { allowProjection: t !== S.Fragment }),
  bu = Xo({ ...za, ...fu, ...eu, ...du }, Au),
  Ru = uo(bu);
export { Ru as m };
