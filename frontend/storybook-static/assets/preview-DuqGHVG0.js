const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./DocsRenderer-CFRXHY34-Bx-c0K-R.js",
      "./iframe-B8jR8wPv.js",
      "./index-Dkaqzkgy.js",
      "./index-CQCQVTgp.js",
      "./jsx-runtime-C8_8iAox.js",
      "./index-CV8h-g8d.js",
      "./index-CXQShRbs.js",
      "./index-DrFu-skq.js",
      "./react-18-4A5AJjOS.js",
    ]),
) => i.map((i) => d[i]);
import { _ as a } from "./iframe-B8jR8wPv.js";
var s = Object.entries(globalThis.TAGS_OPTIONS ?? {}).reduce((e, r) => {
    let [t, o] = r;
    return o.excludeFromDocsStories && (e[t] = !0), e;
  }, {}),
  l = {
    docs: {
      renderer: async () => {
        let { DocsRenderer: e } = await a(
          () => import("./DocsRenderer-CFRXHY34-Bx-c0K-R.js"),
          __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8]),
          import.meta.url,
        );
        return new e();
      },
      stories: {
        filter: (e) => {
          var r;
          return (
            (e.tags || []).filter((t) => s[t]).length === 0 &&
            !((r = e.parameters.docs) != null && r.disable)
          );
        },
      },
    },
  };
export { l as parameters };
