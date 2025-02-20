import { j as D } from "./jsx-runtime-C8_8iAox.js";
import { d as z, T as je } from "./Typography-BU4bE9sX.js";
import { g as We } from "./getBorderType-XRkN7lgl.js";
import { B as ne } from "./Button-7IZEOquv.js";
import { a as Be, g as Ye } from "./index-Dkaqzkgy.js";
import { B as Ze } from "./BorderProps-BeEA2FI6.js";
var H = {},
  L = {},
  X = {},
  N = {},
  I = {},
  Q = {},
  ie;
function He() {
  return (
    ie ||
      ((ie = 1),
      (function (t) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Doctype =
            t.CDATA =
            t.Tag =
            t.Style =
            t.Script =
            t.Comment =
            t.Directive =
            t.Text =
            t.Root =
            t.isTag =
            t.ElementType =
              void 0);
        var s;
        (function (c) {
          (c.Root = "root"),
            (c.Text = "text"),
            (c.Directive = "directive"),
            (c.Comment = "comment"),
            (c.Script = "script"),
            (c.Style = "style"),
            (c.Tag = "tag"),
            (c.CDATA = "cdata"),
            (c.Doctype = "doctype");
        })((s = t.ElementType || (t.ElementType = {})));
        function f(c) {
          return c.type === s.Tag || c.type === s.Script || c.type === s.Style;
        }
        (t.isTag = f),
          (t.Root = s.Root),
          (t.Text = s.Text),
          (t.Directive = s.Directive),
          (t.Comment = s.Comment),
          (t.Script = s.Script),
          (t.Style = s.Style),
          (t.Tag = s.Tag),
          (t.CDATA = s.CDATA),
          (t.Doctype = s.Doctype);
      })(Q)),
    Q
  );
}
var g = {},
  oe;
function ae() {
  if (oe) return g;
  oe = 1;
  var t =
      (g && g.__extends) ||
      (function () {
        var e = function (i, o) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (b, _) {
                  b.__proto__ = _;
                }) ||
              function (b, _) {
                for (var S in _)
                  Object.prototype.hasOwnProperty.call(_, S) && (b[S] = _[S]);
              }),
            e(i, o)
          );
        };
        return function (i, o) {
          if (typeof o != "function" && o !== null)
            throw new TypeError(
              "Class extends value " +
                String(o) +
                " is not a constructor or null",
            );
          e(i, o);
          function b() {
            this.constructor = i;
          }
          i.prototype =
            o === null
              ? Object.create(o)
              : ((b.prototype = o.prototype), new b());
        };
      })(),
    s =
      (g && g.__assign) ||
      function () {
        return (
          (s =
            Object.assign ||
            function (e) {
              for (var i, o = 1, b = arguments.length; o < b; o++) {
                i = arguments[o];
                for (var _ in i)
                  Object.prototype.hasOwnProperty.call(i, _) && (e[_] = i[_]);
              }
              return e;
            }),
          s.apply(this, arguments)
        );
      };
  Object.defineProperty(g, "__esModule", { value: !0 }),
    (g.cloneNode =
      g.hasChildren =
      g.isDocument =
      g.isDirective =
      g.isComment =
      g.isText =
      g.isCDATA =
      g.isTag =
      g.Element =
      g.Document =
      g.CDATA =
      g.NodeWithChildren =
      g.ProcessingInstruction =
      g.Comment =
      g.Text =
      g.DataNode =
      g.Node =
        void 0);
  var f = He(),
    c = (function () {
      function e() {
        (this.parent = null),
          (this.prev = null),
          (this.next = null),
          (this.startIndex = null),
          (this.endIndex = null);
      }
      return (
        Object.defineProperty(e.prototype, "parentNode", {
          get: function () {
            return this.parent;
          },
          set: function (i) {
            this.parent = i;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "previousSibling", {
          get: function () {
            return this.prev;
          },
          set: function (i) {
            this.prev = i;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "nextSibling", {
          get: function () {
            return this.next;
          },
          set: function (i) {
            this.next = i;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.cloneNode = function (i) {
          return i === void 0 && (i = !1), k(this, i);
        }),
        e
      );
    })();
  g.Node = c;
  var d = (function (e) {
    t(i, e);
    function i(o) {
      var b = e.call(this) || this;
      return (b.data = o), b;
    }
    return (
      Object.defineProperty(i.prototype, "nodeValue", {
        get: function () {
          return this.data;
        },
        set: function (o) {
          this.data = o;
        },
        enumerable: !1,
        configurable: !0,
      }),
      i
    );
  })(c);
  g.DataNode = d;
  var p = (function (e) {
    t(i, e);
    function i() {
      var o = (e !== null && e.apply(this, arguments)) || this;
      return (o.type = f.ElementType.Text), o;
    }
    return (
      Object.defineProperty(i.prototype, "nodeType", {
        get: function () {
          return 3;
        },
        enumerable: !1,
        configurable: !0,
      }),
      i
    );
  })(d);
  g.Text = p;
  var T = (function (e) {
    t(i, e);
    function i() {
      var o = (e !== null && e.apply(this, arguments)) || this;
      return (o.type = f.ElementType.Comment), o;
    }
    return (
      Object.defineProperty(i.prototype, "nodeType", {
        get: function () {
          return 8;
        },
        enumerable: !1,
        configurable: !0,
      }),
      i
    );
  })(d);
  g.Comment = T;
  var a = (function (e) {
    t(i, e);
    function i(o, b) {
      var _ = e.call(this, b) || this;
      return (_.name = o), (_.type = f.ElementType.Directive), _;
    }
    return (
      Object.defineProperty(i.prototype, "nodeType", {
        get: function () {
          return 1;
        },
        enumerable: !1,
        configurable: !0,
      }),
      i
    );
  })(d);
  g.ProcessingInstruction = a;
  var r = (function (e) {
    t(i, e);
    function i(o) {
      var b = e.call(this) || this;
      return (b.children = o), b;
    }
    return (
      Object.defineProperty(i.prototype, "firstChild", {
        get: function () {
          var o;
          return (o = this.children[0]) !== null && o !== void 0 ? o : null;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "lastChild", {
        get: function () {
          return this.children.length > 0
            ? this.children[this.children.length - 1]
            : null;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "childNodes", {
        get: function () {
          return this.children;
        },
        set: function (o) {
          this.children = o;
        },
        enumerable: !1,
        configurable: !0,
      }),
      i
    );
  })(c);
  g.NodeWithChildren = r;
  var n = (function (e) {
    t(i, e);
    function i() {
      var o = (e !== null && e.apply(this, arguments)) || this;
      return (o.type = f.ElementType.CDATA), o;
    }
    return (
      Object.defineProperty(i.prototype, "nodeType", {
        get: function () {
          return 4;
        },
        enumerable: !1,
        configurable: !0,
      }),
      i
    );
  })(r);
  g.CDATA = n;
  var l = (function (e) {
    t(i, e);
    function i() {
      var o = (e !== null && e.apply(this, arguments)) || this;
      return (o.type = f.ElementType.Root), o;
    }
    return (
      Object.defineProperty(i.prototype, "nodeType", {
        get: function () {
          return 9;
        },
        enumerable: !1,
        configurable: !0,
      }),
      i
    );
  })(r);
  g.Document = l;
  var u = (function (e) {
    t(i, e);
    function i(o, b, _, S) {
      _ === void 0 && (_ = []),
        S === void 0 &&
          (S =
            o === "script"
              ? f.ElementType.Script
              : o === "style"
                ? f.ElementType.Style
                : f.ElementType.Tag);
      var F = e.call(this, _) || this;
      return (F.name = o), (F.attribs = b), (F.type = S), F;
    }
    return (
      Object.defineProperty(i.prototype, "nodeType", {
        get: function () {
          return 1;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "tagName", {
        get: function () {
          return this.name;
        },
        set: function (o) {
          this.name = o;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "attributes", {
        get: function () {
          var o = this;
          return Object.keys(this.attribs).map(function (b) {
            var _, S;
            return {
              name: b,
              value: o.attribs[b],
              namespace:
                (_ = o["x-attribsNamespace"]) === null || _ === void 0
                  ? void 0
                  : _[b],
              prefix:
                (S = o["x-attribsPrefix"]) === null || S === void 0
                  ? void 0
                  : S[b],
            };
          });
        },
        enumerable: !1,
        configurable: !0,
      }),
      i
    );
  })(r);
  g.Element = u;
  function m(e) {
    return (0, f.isTag)(e);
  }
  g.isTag = m;
  function x(e) {
    return e.type === f.ElementType.CDATA;
  }
  g.isCDATA = x;
  function A(e) {
    return e.type === f.ElementType.Text;
  }
  g.isText = A;
  function E(e) {
    return e.type === f.ElementType.Comment;
  }
  g.isComment = E;
  function h(e) {
    return e.type === f.ElementType.Directive;
  }
  g.isDirective = h;
  function C(e) {
    return e.type === f.ElementType.Root;
  }
  g.isDocument = C;
  function v(e) {
    return Object.prototype.hasOwnProperty.call(e, "children");
  }
  g.hasChildren = v;
  function k(e, i) {
    i === void 0 && (i = !1);
    var o;
    if (A(e)) o = new p(e.data);
    else if (E(e)) o = new T(e.data);
    else if (m(e)) {
      var b = i ? O(e.children) : [],
        _ = new u(e.name, s({}, e.attribs), b);
      b.forEach(function (R) {
        return (R.parent = _);
      }),
        e.namespace != null && (_.namespace = e.namespace),
        e["x-attribsNamespace"] &&
          (_["x-attribsNamespace"] = s({}, e["x-attribsNamespace"])),
        e["x-attribsPrefix"] &&
          (_["x-attribsPrefix"] = s({}, e["x-attribsPrefix"])),
        (o = _);
    } else if (x(e)) {
      var b = i ? O(e.children) : [],
        S = new n(b);
      b.forEach(function (y) {
        return (y.parent = S);
      }),
        (o = S);
    } else if (C(e)) {
      var b = i ? O(e.children) : [],
        F = new l(b);
      b.forEach(function (y) {
        return (y.parent = F);
      }),
        e["x-mode"] && (F["x-mode"] = e["x-mode"]),
        (o = F);
    } else if (h(e)) {
      var M = new a(e.name, e.data);
      e["x-name"] != null &&
        ((M["x-name"] = e["x-name"]),
        (M["x-publicId"] = e["x-publicId"]),
        (M["x-systemId"] = e["x-systemId"])),
        (o = M);
    } else throw new Error("Not implemented yet: ".concat(e.type));
    return (
      (o.startIndex = e.startIndex),
      (o.endIndex = e.endIndex),
      e.sourceCodeLocation != null &&
        (o.sourceCodeLocation = e.sourceCodeLocation),
      o
    );
  }
  g.cloneNode = k;
  function O(e) {
    for (
      var i = e.map(function (b) {
          return k(b, !0);
        }),
        o = 1;
      o < i.length;
      o++
    )
      (i[o].prev = i[o - 1]), (i[o - 1].next = i[o]);
    return i;
  }
  return g;
}
var le;
function qe() {
  return (
    le ||
      ((le = 1),
      (function (t) {
        var s =
            (I && I.__createBinding) ||
            (Object.create
              ? function (a, r, n, l) {
                  l === void 0 && (l = n);
                  var u = Object.getOwnPropertyDescriptor(r, n);
                  (!u ||
                    ("get" in u
                      ? !r.__esModule
                      : u.writable || u.configurable)) &&
                    (u = {
                      enumerable: !0,
                      get: function () {
                        return r[n];
                      },
                    }),
                    Object.defineProperty(a, l, u);
                }
              : function (a, r, n, l) {
                  l === void 0 && (l = n), (a[l] = r[n]);
                }),
          f =
            (I && I.__exportStar) ||
            function (a, r) {
              for (var n in a)
                n !== "default" &&
                  !Object.prototype.hasOwnProperty.call(r, n) &&
                  s(r, a, n);
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.DomHandler = void 0);
        var c = He(),
          d = ae();
        f(ae(), t);
        var p = { withStartIndices: !1, withEndIndices: !1, xmlMode: !1 },
          T = (function () {
            function a(r, n, l) {
              (this.dom = []),
                (this.root = new d.Document(this.dom)),
                (this.done = !1),
                (this.tagStack = [this.root]),
                (this.lastNode = null),
                (this.parser = null),
                typeof n == "function" && ((l = n), (n = p)),
                typeof r == "object" && ((n = r), (r = void 0)),
                (this.callback = r ?? null),
                (this.options = n ?? p),
                (this.elementCB = l ?? null);
            }
            return (
              (a.prototype.onparserinit = function (r) {
                this.parser = r;
              }),
              (a.prototype.onreset = function () {
                (this.dom = []),
                  (this.root = new d.Document(this.dom)),
                  (this.done = !1),
                  (this.tagStack = [this.root]),
                  (this.lastNode = null),
                  (this.parser = null);
              }),
              (a.prototype.onend = function () {
                this.done ||
                  ((this.done = !0),
                  (this.parser = null),
                  this.handleCallback(null));
              }),
              (a.prototype.onerror = function (r) {
                this.handleCallback(r);
              }),
              (a.prototype.onclosetag = function () {
                this.lastNode = null;
                var r = this.tagStack.pop();
                this.options.withEndIndices &&
                  (r.endIndex = this.parser.endIndex),
                  this.elementCB && this.elementCB(r);
              }),
              (a.prototype.onopentag = function (r, n) {
                var l = this.options.xmlMode ? c.ElementType.Tag : void 0,
                  u = new d.Element(r, n, void 0, l);
                this.addNode(u), this.tagStack.push(u);
              }),
              (a.prototype.ontext = function (r) {
                var n = this.lastNode;
                if (n && n.type === c.ElementType.Text)
                  (n.data += r),
                    this.options.withEndIndices &&
                      (n.endIndex = this.parser.endIndex);
                else {
                  var l = new d.Text(r);
                  this.addNode(l), (this.lastNode = l);
                }
              }),
              (a.prototype.oncomment = function (r) {
                if (
                  this.lastNode &&
                  this.lastNode.type === c.ElementType.Comment
                ) {
                  this.lastNode.data += r;
                  return;
                }
                var n = new d.Comment(r);
                this.addNode(n), (this.lastNode = n);
              }),
              (a.prototype.oncommentend = function () {
                this.lastNode = null;
              }),
              (a.prototype.oncdatastart = function () {
                var r = new d.Text(""),
                  n = new d.CDATA([r]);
                this.addNode(n), (r.parent = n), (this.lastNode = r);
              }),
              (a.prototype.oncdataend = function () {
                this.lastNode = null;
              }),
              (a.prototype.onprocessinginstruction = function (r, n) {
                var l = new d.ProcessingInstruction(r, n);
                this.addNode(l);
              }),
              (a.prototype.handleCallback = function (r) {
                if (typeof this.callback == "function")
                  this.callback(r, this.dom);
                else if (r) throw r;
              }),
              (a.prototype.addNode = function (r) {
                var n = this.tagStack[this.tagStack.length - 1],
                  l = n.children[n.children.length - 1];
                this.options.withStartIndices &&
                  (r.startIndex = this.parser.startIndex),
                  this.options.withEndIndices &&
                    (r.endIndex = this.parser.endIndex),
                  n.children.push(r),
                  l && ((r.prev = l), (l.next = r)),
                  (r.parent = n),
                  (this.lastNode = null);
              }),
              a
            );
          })();
        (t.DomHandler = T), (t.default = T);
      })(I)),
    I
  );
}
var ee = {},
  se;
function Ke() {
  return (
    se ||
      ((se = 1),
      (function (t) {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.CARRIAGE_RETURN_PLACEHOLDER_REGEX =
            t.CARRIAGE_RETURN_PLACEHOLDER =
            t.CARRIAGE_RETURN_REGEX =
            t.CARRIAGE_RETURN =
            t.CASE_SENSITIVE_TAG_NAMES_MAP =
            t.CASE_SENSITIVE_TAG_NAMES =
              void 0),
          (t.CASE_SENSITIVE_TAG_NAMES = [
            "animateMotion",
            "animateTransform",
            "clipPath",
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDropShadow",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
            "foreignObject",
            "linearGradient",
            "radialGradient",
            "textPath",
          ]),
          (t.CASE_SENSITIVE_TAG_NAMES_MAP = t.CASE_SENSITIVE_TAG_NAMES.reduce(
            function (s, f) {
              return (s[f.toLowerCase()] = f), s;
            },
            {},
          )),
          (t.CARRIAGE_RETURN = "\r"),
          (t.CARRIAGE_RETURN_REGEX = new RegExp(t.CARRIAGE_RETURN, "g")),
          (t.CARRIAGE_RETURN_PLACEHOLDER =
            "__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_".concat(
              Date.now(),
              "__",
            )),
          (t.CARRIAGE_RETURN_PLACEHOLDER_REGEX = new RegExp(
            t.CARRIAGE_RETURN_PLACEHOLDER,
            "g",
          ));
      })(ee)),
    ee
  );
}
var ce;
function Ge() {
  if (ce) return N;
  (ce = 1),
    Object.defineProperty(N, "__esModule", { value: !0 }),
    (N.formatAttributes = c),
    (N.escapeSpecialCharacters = p),
    (N.revertEscapedCharacters = T),
    (N.formatDOM = a);
  var t = qe(),
    s = Ke();
  function f(r) {
    return s.CASE_SENSITIVE_TAG_NAMES_MAP[r];
  }
  function c(r) {
    for (var n = {}, l = 0, u = r.length; l < u; l++) {
      var m = r[l];
      n[m.name] = m.value;
    }
    return n;
  }
  function d(r) {
    r = r.toLowerCase();
    var n = f(r);
    return n || r;
  }
  function p(r) {
    return r.replace(s.CARRIAGE_RETURN_REGEX, s.CARRIAGE_RETURN_PLACEHOLDER);
  }
  function T(r) {
    return r.replace(s.CARRIAGE_RETURN_PLACEHOLDER_REGEX, s.CARRIAGE_RETURN);
  }
  function a(r, n, l) {
    n === void 0 && (n = null);
    for (var u = [], m, x = 0, A = r.length; x < A; x++) {
      var E = r[x];
      switch (E.nodeType) {
        case 1: {
          var h = d(E.nodeName);
          (m = new t.Element(h, c(E.attributes))),
            (m.children = a(
              h === "template" ? E.content.childNodes : E.childNodes,
              m,
            ));
          break;
        }
        case 3:
          m = new t.Text(T(E.nodeValue));
          break;
        case 8:
          m = new t.Comment(E.nodeValue);
          break;
        default:
          continue;
      }
      var C = u[x - 1] || null;
      C && (C.next = m),
        (m.parent = n),
        (m.prev = C),
        (m.next = null),
        u.push(m);
    }
    return (
      l &&
        ((m = new t.ProcessingInstruction(
          l.substring(0, l.indexOf(" ")).toLowerCase(),
          l,
        )),
        (m.next = u[0] || null),
        (m.parent = n),
        u.unshift(m),
        u[1] && (u[1].prev = u[0])),
      u
    );
  }
  return N;
}
var ue;
function Je() {
  if (ue) return X;
  (ue = 1),
    Object.defineProperty(X, "__esModule", { value: !0 }),
    (X.default = E);
  var t = Ge(),
    s = "html",
    f = "head",
    c = "body",
    d = /<([a-zA-Z]+[0-9]?)/,
    p = /<head[^]*>/i,
    T = /<body[^]*>/i,
    a = function (h, C) {
      throw new Error(
        "This browser does not support `document.implementation.createHTMLDocument`",
      );
    },
    r = function (h, C) {
      throw new Error(
        "This browser does not support `DOMParser.prototype.parseFromString`",
      );
    },
    n = typeof window == "object" && window.DOMParser;
  if (typeof n == "function") {
    var l = new n(),
      u = "text/html";
    (r = function (h, C) {
      return (
        C && (h = "<".concat(C, ">").concat(h, "</").concat(C, ">")),
        l.parseFromString(h, u)
      );
    }),
      (a = r);
  }
  if (typeof document == "object" && document.implementation) {
    var m = document.implementation.createHTMLDocument();
    a = function (h, C) {
      if (C) {
        var v = m.documentElement.querySelector(C);
        return v && (v.innerHTML = h), m;
      }
      return (m.documentElement.innerHTML = h), m;
    };
  }
  var x = typeof document == "object" && document.createElement("template"),
    A;
  x &&
    x.content &&
    (A = function (h) {
      return (x.innerHTML = h), x.content.childNodes;
    });
  function E(h) {
    var C, v;
    h = (0, t.escapeSpecialCharacters)(h);
    var k = h.match(d),
      O = k && k[1] ? k[1].toLowerCase() : "";
    switch (O) {
      case s: {
        var e = r(h);
        if (!p.test(h)) {
          var i = e.querySelector(f);
          (C = i == null ? void 0 : i.parentNode) === null ||
            C === void 0 ||
            C.removeChild(i);
        }
        if (!T.test(h)) {
          var i = e.querySelector(c);
          (v = i == null ? void 0 : i.parentNode) === null ||
            v === void 0 ||
            v.removeChild(i);
        }
        return e.querySelectorAll(s);
      }
      case f:
      case c: {
        var o = a(h).querySelectorAll(O);
        return T.test(h) && p.test(h) ? o[0].parentNode.childNodes : o;
      }
      default: {
        if (A) return A(h);
        var i = a(h, c).querySelector(c);
        return i.childNodes;
      }
    }
  }
  return X;
}
var fe;
function Qe() {
  if (fe) return L;
  fe = 1;
  var t =
    (L && L.__importDefault) ||
    function (p) {
      return p && p.__esModule ? p : { default: p };
    };
  Object.defineProperty(L, "__esModule", { value: !0 }), (L.default = d);
  var s = t(Je()),
    f = Ge(),
    c = /<(![a-zA-Z\s]+)>/;
  function d(p) {
    if (typeof p != "string")
      throw new TypeError("First argument must be a string");
    if (!p) return [];
    var T = p.match(c),
      a = T ? T[1] : void 0;
    return (0, f.formatDOM)((0, s.default)(p), null, a);
  }
  return L;
}
var $ = {},
  w = {},
  q = {},
  de;
function et() {
  if (de) return q;
  de = 1;
  var t = 0;
  q.SAME = t;
  var s = 1;
  return (
    (q.CAMELCASE = s),
    (q.possibleStandardNames = {
      accept: 0,
      acceptCharset: 1,
      "accept-charset": "acceptCharset",
      accessKey: 1,
      action: 0,
      allowFullScreen: 1,
      alt: 0,
      as: 0,
      async: 0,
      autoCapitalize: 1,
      autoComplete: 1,
      autoCorrect: 1,
      autoFocus: 1,
      autoPlay: 1,
      autoSave: 1,
      capture: 0,
      cellPadding: 1,
      cellSpacing: 1,
      challenge: 0,
      charSet: 1,
      checked: 0,
      children: 0,
      cite: 0,
      class: "className",
      classID: 1,
      className: 1,
      cols: 0,
      colSpan: 1,
      content: 0,
      contentEditable: 1,
      contextMenu: 1,
      controls: 0,
      controlsList: 1,
      coords: 0,
      crossOrigin: 1,
      dangerouslySetInnerHTML: 1,
      data: 0,
      dateTime: 1,
      default: 0,
      defaultChecked: 1,
      defaultValue: 1,
      defer: 0,
      dir: 0,
      disabled: 0,
      disablePictureInPicture: 1,
      disableRemotePlayback: 1,
      download: 0,
      draggable: 0,
      encType: 1,
      enterKeyHint: 1,
      for: "htmlFor",
      form: 0,
      formMethod: 1,
      formAction: 1,
      formEncType: 1,
      formNoValidate: 1,
      formTarget: 1,
      frameBorder: 1,
      headers: 0,
      height: 0,
      hidden: 0,
      high: 0,
      href: 0,
      hrefLang: 1,
      htmlFor: 1,
      httpEquiv: 1,
      "http-equiv": "httpEquiv",
      icon: 0,
      id: 0,
      innerHTML: 1,
      inputMode: 1,
      integrity: 0,
      is: 0,
      itemID: 1,
      itemProp: 1,
      itemRef: 1,
      itemScope: 1,
      itemType: 1,
      keyParams: 1,
      keyType: 1,
      kind: 0,
      label: 0,
      lang: 0,
      list: 0,
      loop: 0,
      low: 0,
      manifest: 0,
      marginWidth: 1,
      marginHeight: 1,
      max: 0,
      maxLength: 1,
      media: 0,
      mediaGroup: 1,
      method: 0,
      min: 0,
      minLength: 1,
      multiple: 0,
      muted: 0,
      name: 0,
      noModule: 1,
      nonce: 0,
      noValidate: 1,
      open: 0,
      optimum: 0,
      pattern: 0,
      placeholder: 0,
      playsInline: 1,
      poster: 0,
      preload: 0,
      profile: 0,
      radioGroup: 1,
      readOnly: 1,
      referrerPolicy: 1,
      rel: 0,
      required: 0,
      reversed: 0,
      role: 0,
      rows: 0,
      rowSpan: 1,
      sandbox: 0,
      scope: 0,
      scoped: 0,
      scrolling: 0,
      seamless: 0,
      selected: 0,
      shape: 0,
      size: 0,
      sizes: 0,
      span: 0,
      spellCheck: 1,
      src: 0,
      srcDoc: 1,
      srcLang: 1,
      srcSet: 1,
      start: 0,
      step: 0,
      style: 0,
      summary: 0,
      tabIndex: 1,
      target: 0,
      title: 0,
      type: 0,
      useMap: 1,
      value: 0,
      width: 0,
      wmode: 0,
      wrap: 0,
      about: 0,
      accentHeight: 1,
      "accent-height": "accentHeight",
      accumulate: 0,
      additive: 0,
      alignmentBaseline: 1,
      "alignment-baseline": "alignmentBaseline",
      allowReorder: 1,
      alphabetic: 0,
      amplitude: 0,
      arabicForm: 1,
      "arabic-form": "arabicForm",
      ascent: 0,
      attributeName: 1,
      attributeType: 1,
      autoReverse: 1,
      azimuth: 0,
      baseFrequency: 1,
      baselineShift: 1,
      "baseline-shift": "baselineShift",
      baseProfile: 1,
      bbox: 0,
      begin: 0,
      bias: 0,
      by: 0,
      calcMode: 1,
      capHeight: 1,
      "cap-height": "capHeight",
      clip: 0,
      clipPath: 1,
      "clip-path": "clipPath",
      clipPathUnits: 1,
      clipRule: 1,
      "clip-rule": "clipRule",
      color: 0,
      colorInterpolation: 1,
      "color-interpolation": "colorInterpolation",
      colorInterpolationFilters: 1,
      "color-interpolation-filters": "colorInterpolationFilters",
      colorProfile: 1,
      "color-profile": "colorProfile",
      colorRendering: 1,
      "color-rendering": "colorRendering",
      contentScriptType: 1,
      contentStyleType: 1,
      cursor: 0,
      cx: 0,
      cy: 0,
      d: 0,
      datatype: 0,
      decelerate: 0,
      descent: 0,
      diffuseConstant: 1,
      direction: 0,
      display: 0,
      divisor: 0,
      dominantBaseline: 1,
      "dominant-baseline": "dominantBaseline",
      dur: 0,
      dx: 0,
      dy: 0,
      edgeMode: 1,
      elevation: 0,
      enableBackground: 1,
      "enable-background": "enableBackground",
      end: 0,
      exponent: 0,
      externalResourcesRequired: 1,
      fill: 0,
      fillOpacity: 1,
      "fill-opacity": "fillOpacity",
      fillRule: 1,
      "fill-rule": "fillRule",
      filter: 0,
      filterRes: 1,
      filterUnits: 1,
      floodOpacity: 1,
      "flood-opacity": "floodOpacity",
      floodColor: 1,
      "flood-color": "floodColor",
      focusable: 0,
      fontFamily: 1,
      "font-family": "fontFamily",
      fontSize: 1,
      "font-size": "fontSize",
      fontSizeAdjust: 1,
      "font-size-adjust": "fontSizeAdjust",
      fontStretch: 1,
      "font-stretch": "fontStretch",
      fontStyle: 1,
      "font-style": "fontStyle",
      fontVariant: 1,
      "font-variant": "fontVariant",
      fontWeight: 1,
      "font-weight": "fontWeight",
      format: 0,
      from: 0,
      fx: 0,
      fy: 0,
      g1: 0,
      g2: 0,
      glyphName: 1,
      "glyph-name": "glyphName",
      glyphOrientationHorizontal: 1,
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphOrientationVertical: 1,
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphRef: 1,
      gradientTransform: 1,
      gradientUnits: 1,
      hanging: 0,
      horizAdvX: 1,
      "horiz-adv-x": "horizAdvX",
      horizOriginX: 1,
      "horiz-origin-x": "horizOriginX",
      ideographic: 0,
      imageRendering: 1,
      "image-rendering": "imageRendering",
      in2: 0,
      in: 0,
      inlist: 0,
      intercept: 0,
      k1: 0,
      k2: 0,
      k3: 0,
      k4: 0,
      k: 0,
      kernelMatrix: 1,
      kernelUnitLength: 1,
      kerning: 0,
      keyPoints: 1,
      keySplines: 1,
      keyTimes: 1,
      lengthAdjust: 1,
      letterSpacing: 1,
      "letter-spacing": "letterSpacing",
      lightingColor: 1,
      "lighting-color": "lightingColor",
      limitingConeAngle: 1,
      local: 0,
      markerEnd: 1,
      "marker-end": "markerEnd",
      markerHeight: 1,
      markerMid: 1,
      "marker-mid": "markerMid",
      markerStart: 1,
      "marker-start": "markerStart",
      markerUnits: 1,
      markerWidth: 1,
      mask: 0,
      maskContentUnits: 1,
      maskUnits: 1,
      mathematical: 0,
      mode: 0,
      numOctaves: 1,
      offset: 0,
      opacity: 0,
      operator: 0,
      order: 0,
      orient: 0,
      orientation: 0,
      origin: 0,
      overflow: 0,
      overlinePosition: 1,
      "overline-position": "overlinePosition",
      overlineThickness: 1,
      "overline-thickness": "overlineThickness",
      paintOrder: 1,
      "paint-order": "paintOrder",
      panose1: 0,
      "panose-1": "panose1",
      pathLength: 1,
      patternContentUnits: 1,
      patternTransform: 1,
      patternUnits: 1,
      pointerEvents: 1,
      "pointer-events": "pointerEvents",
      points: 0,
      pointsAtX: 1,
      pointsAtY: 1,
      pointsAtZ: 1,
      prefix: 0,
      preserveAlpha: 1,
      preserveAspectRatio: 1,
      primitiveUnits: 1,
      property: 0,
      r: 0,
      radius: 0,
      refX: 1,
      refY: 1,
      renderingIntent: 1,
      "rendering-intent": "renderingIntent",
      repeatCount: 1,
      repeatDur: 1,
      requiredExtensions: 1,
      requiredFeatures: 1,
      resource: 0,
      restart: 0,
      result: 0,
      results: 0,
      rotate: 0,
      rx: 0,
      ry: 0,
      scale: 0,
      security: 0,
      seed: 0,
      shapeRendering: 1,
      "shape-rendering": "shapeRendering",
      slope: 0,
      spacing: 0,
      specularConstant: 1,
      specularExponent: 1,
      speed: 0,
      spreadMethod: 1,
      startOffset: 1,
      stdDeviation: 1,
      stemh: 0,
      stemv: 0,
      stitchTiles: 1,
      stopColor: 1,
      "stop-color": "stopColor",
      stopOpacity: 1,
      "stop-opacity": "stopOpacity",
      strikethroughPosition: 1,
      "strikethrough-position": "strikethroughPosition",
      strikethroughThickness: 1,
      "strikethrough-thickness": "strikethroughThickness",
      string: 0,
      stroke: 0,
      strokeDasharray: 1,
      "stroke-dasharray": "strokeDasharray",
      strokeDashoffset: 1,
      "stroke-dashoffset": "strokeDashoffset",
      strokeLinecap: 1,
      "stroke-linecap": "strokeLinecap",
      strokeLinejoin: 1,
      "stroke-linejoin": "strokeLinejoin",
      strokeMiterlimit: 1,
      "stroke-miterlimit": "strokeMiterlimit",
      strokeWidth: 1,
      "stroke-width": "strokeWidth",
      strokeOpacity: 1,
      "stroke-opacity": "strokeOpacity",
      suppressContentEditableWarning: 1,
      suppressHydrationWarning: 1,
      surfaceScale: 1,
      systemLanguage: 1,
      tableValues: 1,
      targetX: 1,
      targetY: 1,
      textAnchor: 1,
      "text-anchor": "textAnchor",
      textDecoration: 1,
      "text-decoration": "textDecoration",
      textLength: 1,
      textRendering: 1,
      "text-rendering": "textRendering",
      to: 0,
      transform: 0,
      typeof: 0,
      u1: 0,
      u2: 0,
      underlinePosition: 1,
      "underline-position": "underlinePosition",
      underlineThickness: 1,
      "underline-thickness": "underlineThickness",
      unicode: 0,
      unicodeBidi: 1,
      "unicode-bidi": "unicodeBidi",
      unicodeRange: 1,
      "unicode-range": "unicodeRange",
      unitsPerEm: 1,
      "units-per-em": "unitsPerEm",
      unselectable: 0,
      vAlphabetic: 1,
      "v-alphabetic": "vAlphabetic",
      values: 0,
      vectorEffect: 1,
      "vector-effect": "vectorEffect",
      version: 0,
      vertAdvY: 1,
      "vert-adv-y": "vertAdvY",
      vertOriginX: 1,
      "vert-origin-x": "vertOriginX",
      vertOriginY: 1,
      "vert-origin-y": "vertOriginY",
      vHanging: 1,
      "v-hanging": "vHanging",
      vIdeographic: 1,
      "v-ideographic": "vIdeographic",
      viewBox: 1,
      viewTarget: 1,
      visibility: 0,
      vMathematical: 1,
      "v-mathematical": "vMathematical",
      vocab: 0,
      widths: 0,
      wordSpacing: 1,
      "word-spacing": "wordSpacing",
      writingMode: 1,
      "writing-mode": "writingMode",
      x1: 0,
      x2: 0,
      x: 0,
      xChannelSelector: 1,
      xHeight: 1,
      "x-height": "xHeight",
      xlinkActuate: 1,
      "xlink:actuate": "xlinkActuate",
      xlinkArcrole: 1,
      "xlink:arcrole": "xlinkArcrole",
      xlinkHref: 1,
      "xlink:href": "xlinkHref",
      xlinkRole: 1,
      "xlink:role": "xlinkRole",
      xlinkShow: 1,
      "xlink:show": "xlinkShow",
      xlinkTitle: 1,
      "xlink:title": "xlinkTitle",
      xlinkType: 1,
      "xlink:type": "xlinkType",
      xmlBase: 1,
      "xml:base": "xmlBase",
      xmlLang: 1,
      "xml:lang": "xmlLang",
      xmlns: 0,
      "xml:space": "xmlSpace",
      xmlnsXlink: 1,
      "xmlns:xlink": "xmlnsXlink",
      xmlSpace: 1,
      y1: 0,
      y2: 0,
      y: 0,
      yChannelSelector: 1,
      z: 0,
      zoomAndPan: 1,
    }),
    q
  );
}
var pe;
function tt() {
  if (pe) return w;
  pe = 1;
  const t = 0,
    s = 1,
    f = 2,
    c = 3,
    d = 4,
    p = 5,
    T = 6;
  function a(e) {
    return n.hasOwnProperty(e) ? n[e] : null;
  }
  function r(e, i, o, b, _, S, F) {
    (this.acceptsBooleans = i === f || i === c || i === d),
      (this.attributeName = b),
      (this.attributeNamespace = _),
      (this.mustUseProperty = o),
      (this.propertyName = e),
      (this.type = i),
      (this.sanitizeURL = S),
      (this.removeEmptyString = F);
  }
  const n = {};
  [
    "children",
    "dangerouslySetInnerHTML",
    "defaultValue",
    "defaultChecked",
    "innerHTML",
    "suppressContentEditableWarning",
    "suppressHydrationWarning",
    "style",
  ].forEach((e) => {
    n[e] = new r(e, t, !1, e, null, !1, !1);
  }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(([e, i]) => {
      n[e] = new r(e, s, !1, i, null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach((e) => {
      n[e] = new r(e, f, !1, e.toLowerCase(), null, !1, !1);
    }),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach((e) => {
      n[e] = new r(e, f, !1, e, null, !1, !1);
    }),
    [
      "allowFullScreen",
      "async",
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      "itemScope",
    ].forEach((e) => {
      n[e] = new r(e, c, !1, e.toLowerCase(), null, !1, !1);
    }),
    ["checked", "multiple", "muted", "selected"].forEach((e) => {
      n[e] = new r(e, c, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach((e) => {
      n[e] = new r(e, d, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach((e) => {
      n[e] = new r(e, T, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach((e) => {
      n[e] = new r(e, p, !1, e.toLowerCase(), null, !1, !1);
    });
  const u = /[\-\:]([a-z])/g,
    m = (e) => e[1].toUpperCase();
  [
    "accent-height",
    "alignment-baseline",
    "arabic-form",
    "baseline-shift",
    "cap-height",
    "clip-path",
    "clip-rule",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "dominant-baseline",
    "enable-background",
    "fill-opacity",
    "fill-rule",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-name",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "horiz-adv-x",
    "horiz-origin-x",
    "image-rendering",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "overline-position",
    "overline-thickness",
    "paint-order",
    "panose-1",
    "pointer-events",
    "rendering-intent",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "strikethrough-position",
    "strikethrough-thickness",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "underline-position",
    "underline-thickness",
    "unicode-bidi",
    "unicode-range",
    "units-per-em",
    "v-alphabetic",
    "v-hanging",
    "v-ideographic",
    "v-mathematical",
    "vector-effect",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "word-spacing",
    "writing-mode",
    "xmlns:xlink",
    "x-height",
  ].forEach((e) => {
    const i = e.replace(u, m);
    n[i] = new r(i, s, !1, e, null, !1, !1);
  }),
    [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type",
    ].forEach((e) => {
      const i = e.replace(u, m);
      n[i] = new r(i, s, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    }),
    ["xml:base", "xml:lang", "xml:space"].forEach((e) => {
      const i = e.replace(u, m);
      n[i] = new r(i, s, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach((e) => {
      n[e] = new r(e, s, !1, e.toLowerCase(), null, !1, !1);
    });
  const x = "xlinkHref";
  (n[x] = new r(
    "xlinkHref",
    s,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1,
  )),
    ["src", "href", "action", "formAction"].forEach((e) => {
      n[e] = new r(e, s, !1, e.toLowerCase(), null, !0, !0);
    });
  const { CAMELCASE: A, SAME: E, possibleStandardNames: h } = et(),
    v =
      ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD" +
      "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
    k = RegExp.prototype.test.bind(new RegExp("^(data|aria)-[" + v + "]*$")),
    O = Object.keys(h).reduce((e, i) => {
      const o = h[i];
      return (
        o === E ? (e[i] = i) : o === A ? (e[i.toLowerCase()] = i) : (e[i] = o),
        e
      );
    }, {});
  return (
    (w.BOOLEAN = c),
    (w.BOOLEANISH_STRING = f),
    (w.NUMERIC = p),
    (w.OVERLOADED_BOOLEAN = d),
    (w.POSITIVE_NUMERIC = T),
    (w.RESERVED = t),
    (w.STRING = s),
    (w.getPropertyInfo = a),
    (w.isCustomAttribute = k),
    (w.possibleStandardNames = O),
    w
  );
}
var G = {},
  j = {},
  te,
  he;
function rt() {
  if (he) return te;
  he = 1;
  var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
    s = /\n/g,
    f = /^\s*/,
    c = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
    d = /^:\s*/,
    p = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
    T = /^[;\s]*/,
    a = /^\s+|\s+$/g,
    r = `
`,
    n = "/",
    l = "*",
    u = "",
    m = "comment",
    x = "declaration";
  te = function (E, h) {
    if (typeof E != "string")
      throw new TypeError("First argument must be a string");
    if (!E) return [];
    h = h || {};
    var C = 1,
      v = 1;
    function k(R) {
      var y = R.match(s);
      y && (C += y.length);
      var P = R.lastIndexOf(r);
      v = ~P ? R.length - P : v + R.length;
    }
    function O() {
      var R = { line: C, column: v };
      return function (y) {
        return (y.position = new e(R)), b(), y;
      };
    }
    function e(R) {
      (this.start = R),
        (this.end = { line: C, column: v }),
        (this.source = h.source);
    }
    e.prototype.content = E;
    function i(R) {
      var y = new Error(h.source + ":" + C + ":" + v + ": " + R);
      if (
        ((y.reason = R),
        (y.filename = h.source),
        (y.line = C),
        (y.column = v),
        (y.source = E),
        !h.silent)
      )
        throw y;
    }
    function o(R) {
      var y = R.exec(E);
      if (y) {
        var P = y[0];
        return k(P), (E = E.slice(P.length)), y;
      }
    }
    function b() {
      o(f);
    }
    function _(R) {
      var y;
      for (R = R || []; (y = S()); ) y !== !1 && R.push(y);
      return R;
    }
    function S() {
      var R = O();
      if (!(n != E.charAt(0) || l != E.charAt(1))) {
        for (
          var y = 2;
          u != E.charAt(y) && (l != E.charAt(y) || n != E.charAt(y + 1));

        )
          ++y;
        if (((y += 2), u === E.charAt(y - 1)))
          return i("End of comment missing");
        var P = E.slice(2, y - 2);
        return (
          (v += 2), k(P), (E = E.slice(y)), (v += 2), R({ type: m, comment: P })
        );
      }
    }
    function F() {
      var R = O(),
        y = o(c);
      if (y) {
        if ((S(), !o(d))) return i("property missing ':'");
        var P = o(p),
          $e = R({
            type: x,
            property: A(y[0].replace(t, u)),
            value: P ? A(P[0].replace(t, u)) : u,
          });
        return o(T), $e;
      }
    }
    function M() {
      var R = [];
      _(R);
      for (var y; (y = F()); ) y !== !1 && (R.push(y), _(R));
      return R;
    }
    return b(), M();
  };
  function A(E) {
    return E ? E.replace(a, u) : u;
  }
  return te;
}
var me;
function nt() {
  if (me) return j;
  me = 1;
  var t =
    (j && j.__importDefault) ||
    function (c) {
      return c && c.__esModule ? c : { default: c };
    };
  Object.defineProperty(j, "__esModule", { value: !0 }), (j.default = f);
  var s = t(rt());
  function f(c, d) {
    var p = null;
    if (!c || typeof c != "string") return p;
    var T = (0, s.default)(c),
      a = typeof d == "function";
    return (
      T.forEach(function (r) {
        if (r.type === "declaration") {
          var n = r.property,
            l = r.value;
          a ? d(n, l, r) : l && ((p = p || {}), (p[n] = l));
        }
      }),
      p
    );
  }
  return j;
}
var U = {},
  ge;
function it() {
  if (ge) return U;
  (ge = 1),
    Object.defineProperty(U, "__esModule", { value: !0 }),
    (U.camelCase = void 0);
  var t = /^--[a-zA-Z0-9_-]+$/,
    s = /-([a-z])/g,
    f = /^[^-]+$/,
    c = /^-(webkit|moz|ms|o|khtml)-/,
    d = /^-(ms)-/,
    p = function (n) {
      return !n || f.test(n) || t.test(n);
    },
    T = function (n, l) {
      return l.toUpperCase();
    },
    a = function (n, l) {
      return "".concat(l, "-");
    },
    r = function (n, l) {
      return (
        l === void 0 && (l = {}),
        p(n)
          ? n
          : ((n = n.toLowerCase()),
            l.reactCompat ? (n = n.replace(d, a)) : (n = n.replace(c, a)),
            n.replace(s, T))
      );
    };
  return (U.camelCase = r), U;
}
var V, ve;
function ot() {
  if (ve) return V;
  ve = 1;
  var t =
      (V && V.__importDefault) ||
      function (d) {
        return d && d.__esModule ? d : { default: d };
      },
    s = t(nt()),
    f = it();
  function c(d, p) {
    var T = {};
    return (
      !d ||
        typeof d != "string" ||
        (0, s.default)(d, function (a, r) {
          a && r && (T[(0, f.camelCase)(a, p)] = r);
        }),
      T
    );
  }
  return (c.default = c), (V = c), V;
}
var ye;
function Ue() {
  return (
    ye ||
      ((ye = 1),
      (function (t) {
        var s =
          (G && G.__importDefault) ||
          function (l) {
            return l && l.__esModule ? l : { default: l };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.returnFirstArg =
            t.canTextBeChildOfNode =
            t.ELEMENTS_WITH_NO_TEXT_CHILDREN =
            t.PRESERVE_CUSTOM_ATTRIBUTES =
              void 0),
          (t.isCustomComponent = p),
          (t.setStyleProp = a);
        var f = Be(),
          c = s(ot()),
          d = new Set([
            "annotation-xml",
            "color-profile",
            "font-face",
            "font-face-src",
            "font-face-uri",
            "font-face-format",
            "font-face-name",
            "missing-glyph",
          ]);
        function p(l, u) {
          return l.includes("-") ? !d.has(l) : !!(u && typeof u.is == "string");
        }
        var T = { reactCompat: !0 };
        function a(l, u) {
          if (typeof l == "string") {
            if (!l.trim()) {
              u.style = {};
              return;
            }
            try {
              u.style = (0, c.default)(l, T);
            } catch {
              u.style = {};
            }
          }
        }
        (t.PRESERVE_CUSTOM_ATTRIBUTES = Number(f.version.split(".")[0]) >= 16),
          (t.ELEMENTS_WITH_NO_TEXT_CHILDREN = new Set([
            "tr",
            "tbody",
            "thead",
            "tfoot",
            "colgroup",
            "table",
            "head",
            "html",
            "frameset",
          ]));
        var r = function (l) {
          return !t.ELEMENTS_WITH_NO_TEXT_CHILDREN.has(l.name);
        };
        t.canTextBeChildOfNode = r;
        var n = function (l) {
          return l;
        };
        t.returnFirstArg = n;
      })(G)),
    G
  );
}
var Ee;
function Ve() {
  if (Ee) return $;
  (Ee = 1),
    Object.defineProperty($, "__esModule", { value: !0 }),
    ($.default = p);
  var t = tt(),
    s = Ue(),
    f = ["checked", "value"],
    c = ["input", "select", "textarea"],
    d = { reset: !0, submit: !0 };
  function p(a, r) {
    a === void 0 && (a = {});
    var n = {},
      l = !!(a.type && d[a.type]);
    for (var u in a) {
      var m = a[u];
      if ((0, t.isCustomAttribute)(u)) {
        n[u] = m;
        continue;
      }
      var x = u.toLowerCase(),
        A = T(x);
      if (A) {
        var E = (0, t.getPropertyInfo)(A);
        switch (
          (f.includes(A) && c.includes(r) && !l && (A = T("default" + x)),
          (n[A] = m),
          E && E.type)
        ) {
          case t.BOOLEAN:
            n[A] = !0;
            break;
          case t.OVERLOADED_BOOLEAN:
            m === "" && (n[A] = !0);
            break;
        }
        continue;
      }
      s.PRESERVE_CUSTOM_ATTRIBUTES && (n[u] = m);
    }
    return (0, s.setStyleProp)(a.style, n), n;
  }
  function T(a) {
    return t.possibleStandardNames[a];
  }
  return $;
}
var B = {},
  be;
function at() {
  if (be) return B;
  be = 1;
  var t =
    (B && B.__importDefault) ||
    function (a) {
      return a && a.__esModule ? a : { default: a };
    };
  Object.defineProperty(B, "__esModule", { value: !0 }), (B.default = p);
  var s = Be(),
    f = t(Ve()),
    c = Ue(),
    d = {
      cloneElement: s.cloneElement,
      createElement: s.createElement,
      isValidElement: s.isValidElement,
    };
  function p(a, r) {
    r === void 0 && (r = {});
    for (
      var n = [],
        l = typeof r.replace == "function",
        u = r.transform || c.returnFirstArg,
        m = r.library || d,
        x = m.cloneElement,
        A = m.createElement,
        E = m.isValidElement,
        h = a.length,
        C = 0;
      C < h;
      C++
    ) {
      var v = a[C];
      if (l) {
        var k = r.replace(v, C);
        if (E(k)) {
          h > 1 && (k = x(k, { key: k.key || C })), n.push(u(k, v, C));
          continue;
        }
      }
      if (v.type === "text") {
        var O = !v.data.trim().length;
        if (
          (O && v.parent && !(0, c.canTextBeChildOfNode)(v.parent)) ||
          (r.trim && O)
        )
          continue;
        n.push(u(v.data, v, C));
        continue;
      }
      var e = v,
        i = {};
      T(e)
        ? ((0, c.setStyleProp)(e.attribs.style, e.attribs), (i = e.attribs))
        : e.attribs && (i = (0, f.default)(e.attribs, e.name));
      var o = void 0;
      switch (v.type) {
        case "script":
        case "style":
          v.children[0] &&
            (i.dangerouslySetInnerHTML = { __html: v.children[0].data });
          break;
        case "tag":
          v.name === "textarea" && v.children[0]
            ? (i.defaultValue = v.children[0].data)
            : v.children && v.children.length && (o = p(v.children, r));
          break;
        default:
          continue;
      }
      h > 1 && (i.key = C), n.push(u(A(v.name, i, o), v, C));
    }
    return n.length === 1 ? n[0] : n;
  }
  function T(a) {
    return (
      c.PRESERVE_CUSTOM_ATTRIBUTES &&
      a.type === "tag" &&
      (0, c.isCustomComponent)(a.name, a.attribs)
    );
  }
  return B;
}
var Te;
function lt() {
  return (
    Te ||
      ((Te = 1),
      (function (t) {
        var s =
          (H && H.__importDefault) ||
          function (r) {
            return r && r.__esModule ? r : { default: r };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.htmlToDOM =
            t.domToReact =
            t.attributesToProps =
            t.Text =
            t.ProcessingInstruction =
            t.Element =
            t.Comment =
              void 0),
          (t.default = a);
        var f = s(Qe());
        t.htmlToDOM = f.default;
        var c = s(Ve());
        t.attributesToProps = c.default;
        var d = s(at());
        t.domToReact = d.default;
        var p = qe();
        Object.defineProperty(t, "Comment", {
          enumerable: !0,
          get: function () {
            return p.Comment;
          },
        }),
          Object.defineProperty(t, "Element", {
            enumerable: !0,
            get: function () {
              return p.Element;
            },
          }),
          Object.defineProperty(t, "ProcessingInstruction", {
            enumerable: !0,
            get: function () {
              return p.ProcessingInstruction;
            },
          }),
          Object.defineProperty(t, "Text", {
            enumerable: !0,
            get: function () {
              return p.Text;
            },
          });
        var T = { lowerCaseAttributeNames: !1 };
        function a(r, n) {
          if (typeof r != "string")
            throw new TypeError("First argument must be a string");
          return r
            ? (0, d.default)(
                (0, f.default)(r, (n == null ? void 0 : n.htmlparser2) || T),
                n,
              )
            : [];
        }
      })(H)),
    H
  );
}
var st = lt();
const Ce = Ye(st),
  ct = Ce.default || Ce,
  ze = ({
    title: t,
    body: s = "",
    onConfirm: f = () => {},
    onDismiss: c = () => {},
    backgroundColor: d = "#FFFFFF",
    titleBackgroundColor: p = "#F4F4F4",
    titleTextColor: T = "#393939",
    bodyTextColor: a = "#525252",
    confirmButton: r,
    dissmissButton: n,
    border: l,
  }) =>
    D.jsxs(ut, {
      backgroundColor: d,
      border: l,
      children: [
        t &&
          D.jsx(ft, {
            titleBackgroundColor: p,
            children: D.jsx(dt, {
              variant: "body2",
              titleTextColor: T,
              children: t,
            }),
          }),
        D.jsx(pt, { variant: "body1", bodyTextColor: a, children: ct(s) }),
        D.jsxs(ht, {
          children: [
            n &&
              D.jsx(ne, {
                ...n,
                onClick: () => c(),
                children: n == null ? void 0 : n.text,
              }),
            D.jsx(ne, {
              ...r,
              onClick: () => f(),
              children: r == null ? void 0 : r.text,
            }),
          ],
        }),
      ],
    }),
  ut = z.div`
  position: fixed;
  top: 214px;
  padding: 24px 12px 12px 12px;
  width: 90%;
  max-width: 324px;
  background-color: ${(t) => t.backgroundColor};
  ${(t) => (t.border ? We(t.border) : "border: none;")}
  border-radius: ${(t) => {
    var s;
    return ((s = t.border) == null ? void 0 : s.borderRadius) || "14px";
  }};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,
  ft = z.div`
  width: 100%;
  padding: 9px 22px 9px 22px;
  margin-bottom: 18px;
  box-sizing: border-box;
  background-color: ${(t) => t.titleBackgroundColor};
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
`,
  dt = z(je)`
  color: ${(t) => t.titleTextColor};
`,
  pt = z(je)`
  color: ${(t) => t.bodyTextColor};
  text-align: center;
`,
  ht = z.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;
ze.__docgenInfo = {
  description: "",
  methods: [],
  displayName: "DialogContainer",
  props: {
    body: { defaultValue: { value: "''", computed: !1 }, required: !1 },
    onConfirm: {
      defaultValue: { value: "() => {}", computed: !1 },
      required: !1,
    },
    onDismiss: {
      defaultValue: { value: "() => {}", computed: !1 },
      required: !1,
    },
    backgroundColor: {
      defaultValue: { value: "'#FFFFFF'", computed: !1 },
      required: !1,
    },
    titleBackgroundColor: {
      defaultValue: { value: "'#F4F4F4'", computed: !1 },
      required: !1,
    },
    titleTextColor: {
      defaultValue: { value: "'#393939'", computed: !1 },
      required: !1,
    },
    bodyTextColor: {
      defaultValue: { value: "'#525252'", computed: !1 },
      required: !1,
    },
  },
};
const Tt = {
    title: "Components/Dialog",
    component: ze,
    argTypes: {
      backgroundColor: { control: "color" },
      titleBackgroundColor: { control: "color" },
      titleTextColor: { control: "color" },
      bodyTextColor: { control: "color" },
      border: { control: "object" },
    },
    args: { onConfirm: () => {}, onDismiss: () => {} },
    parameters: { backgrounds: { default: "Dark" } },
  },
  re = { text: "Confirm" },
  Xe = { text: "Cancel", backgroundColor: "#F4F4F4", textColor: "#A8A8A8" },
  W = {
    args: {
      title: "Title",
      body: "body Text",
      backgroundColor: "#FFFFFF",
      titleBackgroundColor: "#F4F4F4",
      titleTextColor: "#393939",
      bodyTextColor: "#525252",
      confirmButton: re,
      dissmissButton: Xe,
    },
  },
  Y = {
    args: {
      body: "body Text",
      backgroundColor: "#FFFFFF",
      titleBackgroundColor: "#F4F4F4",
      titleTextColor: "#393939",
      bodyTextColor: "#525252",
      confirmButton: re,
    },
  },
  Z = {
    args: {
      title: "학교 리모델링과 관련한 학생 의견 모집",
      body: `채팅방을 종료하시나요?<br/>
  종료된 채팅방은 종료 페이지로 이동되며,<br/>
  다시 개설이 되지 않습니다.`,
      backgroundColor: "#FFFFFF",
      titleBackgroundColor: "#F4F4F4",
      titleTextColor: "#393939",
      bodyTextColor: "#525252",
      confirmButton: {
        text: "종료",
        backgroundColor: "#FF4B4B",
        textColor: "#FFFFFF",
      },
      dissmissButton: {
        text: "취소",
        backgroundColor: "#F4F4F4",
        textColor: "#A8A8A8",
      },
    },
  },
  K = {
    args: {
      body: `채팅방에 입장하시겠어요?<br/>
        입장한 채팅방의 알림은<br/>
        <span style="color: #1F87FF; font-weight: 700;">[내 의견]</span>에서 확인할 수 있습니다.`,
      confirmButton: { text: "입장하기" },
      dissmissButton: {
        text: "취소",
        backgroundColor: "#F4F4F4",
        textColor: "#A8A8A8",
      },
    },
  },
  J = {
    args: {
      title: "Title",
      body: "body",
      confirmButton: re,
      dissmissButton: Xe,
      border: {
        borderWidth: "5px",
        borderColor: "red",
        disabledBorderColor: "blue",
        borderRadius: "0px",
        borderType: Ze.ALL,
      },
    },
  };
var _e, Re, Ae;
W.parameters = {
  ...W.parameters,
  docs: {
    ...((_e = W.parameters) == null ? void 0 : _e.docs),
    source: {
      originalSource: `{
  args: {
    title: 'Title',
    body: 'body Text',
    backgroundColor: '#FFFFFF',
    titleBackgroundColor: '#F4F4F4',
    titleTextColor: '#393939',
    bodyTextColor: '#525252',
    confirmButton: confirmButton,
    dissmissButton: dismissButton
  }
}`,
      ...((Ae = (Re = W.parameters) == null ? void 0 : Re.docs) == null
        ? void 0
        : Ae.source),
    },
  },
};
var xe, Se, ke;
Y.parameters = {
  ...Y.parameters,
  docs: {
    ...((xe = Y.parameters) == null ? void 0 : xe.docs),
    source: {
      originalSource: `{
  args: {
    body: 'body Text',
    backgroundColor: '#FFFFFF',
    titleBackgroundColor: '#F4F4F4',
    titleTextColor: '#393939',
    bodyTextColor: '#525252',
    confirmButton: confirmButton
  }
}`,
      ...((ke = (Se = Y.parameters) == null ? void 0 : Se.docs) == null
        ? void 0
        : ke.source),
    },
  },
};
var Oe, Fe, we;
Z.parameters = {
  ...Z.parameters,
  docs: {
    ...((Oe = Z.parameters) == null ? void 0 : Oe.docs),
    source: {
      originalSource: `{
  args: {
    title: '학교 리모델링과 관련한 학생 의견 모집',
    body: \`채팅방을 종료하시나요?<br/>
  종료된 채팅방은 종료 페이지로 이동되며,<br/>
  다시 개설이 되지 않습니다.\`,
    backgroundColor: '#FFFFFF',
    titleBackgroundColor: '#F4F4F4',
    titleTextColor: '#393939',
    bodyTextColor: '#525252',
    confirmButton: {
      text: '종료',
      backgroundColor: '#FF4B4B',
      textColor: '#FFFFFF'
    },
    dissmissButton: {
      text: '취소',
      backgroundColor: '#F4F4F4',
      textColor: '#A8A8A8'
    }
  }
}`,
      ...((we = (Fe = Z.parameters) == null ? void 0 : Fe.docs) == null
        ? void 0
        : we.source),
    },
  },
};
var Pe, De, Ne;
K.parameters = {
  ...K.parameters,
  docs: {
    ...((Pe = K.parameters) == null ? void 0 : Pe.docs),
    source: {
      originalSource: `{
  args: {
    body: \`채팅방에 입장하시겠어요?<br/>
        입장한 채팅방의 알림은<br/>
        <span style="color: #1F87FF; font-weight: 700;">[내 의견]</span>에서 확인할 수 있습니다.\`,
    confirmButton: {
      text: '입장하기'
    },
    dissmissButton: {
      text: '취소',
      backgroundColor: '#F4F4F4',
      textColor: '#A8A8A8'
    }
  }
}`,
      ...((Ne = (De = K.parameters) == null ? void 0 : De.docs) == null
        ? void 0
        : Ne.source),
    },
  },
};
var Ie, Me, Le;
J.parameters = {
  ...J.parameters,
  docs: {
    ...((Ie = J.parameters) == null ? void 0 : Ie.docs),
    source: {
      originalSource: `{
  args: {
    title: 'Title',
    body: 'body',
    confirmButton: confirmButton,
    dissmissButton: dismissButton,
    border: {
      borderWidth: '5px',
      borderColor: 'red',
      disabledBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL
    }
  }
}`,
      ...((Le = (Me = J.parameters) == null ? void 0 : Me.docs) == null
        ? void 0
        : Le.source),
    },
  },
};
const Ct = [
  "Default",
  "NoTitle",
  "WarningDialog",
  "HTMLBodyDialog",
  "WithBorder",
];
export {
  W as Default,
  K as HTMLBodyDialog,
  Y as NoTitle,
  Z as WarningDialog,
  J as WithBorder,
  Ct as __namedExportsOrder,
  Tt as default,
};
