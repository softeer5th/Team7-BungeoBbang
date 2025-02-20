if (!self.define) {
  let s,
    e = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    e[i] ||
      new Promise((e) => {
        if ("document" in self) {
          const s = document.createElement("script");
          (s.src = i), (s.onload = e), document.head.appendChild(s);
        } else (s = i), importScripts(i), e();
      }).then(() => {
        let s = e[i];
        if (!s) throw new Error(`Module ${i} didn’t register its module`);
        return s;
      })
  );
  self.define = (n, l) => {
    const r =
      s ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (e[r]) return;
    let o = {};
    const u = (s) => i(s, r),
      a = { module: { uri: r }, exports: o, require: u };
    e[r] = Promise.all(n.map((s) => a[s] || u(s))).then((s) => (l(...s), o));
  };
}
define(["./workbox-84318d21"], function (s) {
  "use strict";
  self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        { url: "assets/accessibility-W_h2acOZ.png", revision: null },
        { url: "assets/addon-library-BWUCAmyN.png", revision: null },
        { url: "assets/arrow-left-RKZ4lgrs.js", revision: null },
        { url: "assets/BorderProps-BeEA2FI6.js", revision: null },
        { url: "assets/BottomNavigation.stories-4gqifN7n.js", revision: null },
        { url: "assets/Button-7IZEOquv.js", revision: null },
        { url: "assets/Button.stories-CCHAfWDs.js", revision: null },
        { url: "assets/CategoryIcon.stories-OQkqpWLb.js", revision: null },
        { url: "assets/ChatSendField.stories-Cz054NmZ.js", revision: null },
        { url: "assets/ChipList.stories-CQ86S9aS.js", revision: null },
        { url: "assets/chunk-XP5HYGXS-D5tuasO7.js", revision: null },
        { url: "assets/Color-F6OSRLHC-CSjDJghD.js", revision: null },
        { url: "assets/Configure-Bso9-HBM.js", revision: null },
        { url: "assets/context-C0qIqeS4.png", revision: null },
        { url: "assets/CountTextField.stories-BKAU9c88.js", revision: null },
        { url: "assets/Dialog.stories-DAtxprjH.js", revision: null },
        { url: "assets/docs---vsFbMi.png", revision: null },
        { url: "assets/DocsRenderer-CFRXHY34-CUV2zmqr.js", revision: null },
        { url: "assets/entry-preview-docs-Cu37f8qi.js", revision: null },
        { url: "assets/entry-preview-qY5sGeNj.js", revision: null },
        { url: "assets/figma-plugin-CH2hELiO.png", revision: null },
        { url: "assets/getBorderType-XRkN7lgl.js", revision: null },
        { url: "assets/icons/arrow-down.svg", revision: null },
        { url: "assets/icons/arrow-left.svg", revision: null },
        { url: "assets/icons/arrow-right.svg", revision: null },
        { url: "assets/icons/arrow-up.svg", revision: null },
        { url: "assets/icons/blue-check.svg", revision: null },
        { url: "assets/icons/bubble.svg", revision: null },
        { url: "assets/icons/calendar.svg", revision: null },
        { url: "assets/icons/camera.svg", revision: null },
        { url: "assets/icons/chair.svg", revision: null },
        { url: "assets/icons/check.svg", revision: null },
        { url: "assets/icons/close-1.svg", revision: null },
        { url: "assets/icons/close-2.svg", revision: null },
        { url: "assets/icons/delete.svg", revision: null },
        { url: "assets/icons/dot-vertical.svg", revision: null },
        { url: "assets/icons/edit.svg", revision: null },
        { url: "assets/icons/exit.svg", revision: null },
        { url: "assets/icons/full-arrow-up.svg", revision: null },
        { url: "assets/icons/google-logo.png", revision: null },
        { url: "assets/icons/Group.svg", revision: null },
        { url: "assets/icons/home.svg", revision: null },
        {
          url: "assets/icons/information-circle-contained.svg",
          revision: null,
        },
        { url: "assets/icons/kakao-logo.png", revision: null },
        { url: "assets/icons/laptop.svg", revision: null },
        { url: "assets/icons/logo-192x192.png", revision: null },
        { url: "assets/icons/logo-512x512.png", revision: null },
        { url: "assets/icons/logo.png", revision: null },
        { url: "assets/icons/logo.svg", revision: null },
        { url: "assets/icons/logout.svg", revision: null },
        { url: "assets/icons/message.svg", revision: null },
        { url: "assets/icons/money.svg", revision: null },
        { url: "assets/icons/party.svg", revision: null },
        { url: "assets/icons/plus.svg", revision: null },
        { url: "assets/icons/power.svg", revision: null },
        { url: "assets/icons/profile.svg", revision: null },
        { url: "assets/icons/runner.svg", revision: null },
        { url: "assets/icons/school.svg", revision: null },
        { url: "assets/icons/statistics.svg", revision: null },
        { url: "assets/icons/traffic_light.svg", revision: null },
        { url: "assets/iframe-BI-zXFoL.js", revision: null },
        { url: "assets/imgs/face1.png", revision: null },
        { url: "assets/imgs/face2.png", revision: null },
        { url: "assets/imgs/face3.png", revision: null },
        { url: "assets/imgs/face4.png", revision: null },
        { url: "assets/imgs/face5.png", revision: null },
        { url: "assets/imgs/face6.png", revision: null },
        { url: "assets/imgs/face7.png", revision: null },
        { url: "assets/imgs/face8.png", revision: null },
        { url: "assets/imgs/img_person.svg", revision: null },
        { url: "assets/imgs/img_school.svg", revision: null },
        { url: "assets/imgs/message.png", revision: null },
        { url: "assets/imgs/preview_img.png", revision: null },
        { url: "assets/imgs/school_banner.png", revision: null },
        { url: "assets/index-BYbcEn3Y.js", revision: null },
        { url: "assets/index-CV8h-g8d.js", revision: null },
        { url: "assets/index-CXQShRbs.js", revision: null },
        { url: "assets/index-Dkaqzkgy.js", revision: null },
        { url: "assets/index-DrFu-skq.js", revision: null },
        { url: "assets/index-Dt18g86q.js", revision: null },
        { url: "assets/index-KAnq9XD5.js", revision: null },
        { url: "assets/jsx-runtime-C8_8iAox.js", revision: null },
        { url: "assets/preview-1l6V4UsQ.js", revision: null },
        { url: "assets/preview-BBWR9nbA.js", revision: null },
        { url: "assets/preview-BfCh1b_i.js", revision: null },
        { url: "assets/preview-Br-h4d84.js", revision: null },
        { url: "assets/preview-BWzBA1C2.js", revision: null },
        { url: "assets/preview-D34Q_Rs5.js", revision: null },
        { url: "assets/preview-D77C14du.js", revision: null },
        { url: "assets/preview-DGUiP6tS.js", revision: null },
        { url: "assets/preview-IcLm32zc.js", revision: null },
        { url: "assets/react-18-4A5AJjOS.js", revision: null },
        { url: "assets/ReceiverChat.stories-D5Gq80xm.js", revision: null },
        { url: "assets/SenderChat.stories-KCfyxI11.js", revision: null },
        { url: "assets/share-DGA-UcQf.png", revision: null },
        { url: "assets/styling-Bk6zjRzU.png", revision: null },
        { url: "assets/TabBar.stories-Db7RZtRt.js", revision: null },
        { url: "assets/testing-cbzR9l9r.png", revision: null },
        { url: "assets/TextBadge.stories-B54N8j00.js", revision: null },
        { url: "assets/TextField.stories-C-wCBjGV.js", revision: null },
        { url: "assets/theming-D6WJLNoW.png", revision: null },
        { url: "assets/TopAppBar.stories-C5B4hV53.js", revision: null },
        { url: "assets/Typography-BU4bE9sX.js", revision: null },
        { url: "favicon.svg", revision: "695ec815efa60eb325f23cd67a9b3cf3" },
        { url: "iframe.html", revision: "ffb8e92f350a4bb15b2d44097539bd29" },
        { url: "index.html", revision: "f3687b6412e2b0ec8c5a007cbf278f23" },
        { url: "registerSW.js", revision: "402b66900e731ca748771b6fc5e7a068" },
        {
          url: "sb-addons/chromatic-com-storybook-10/manager-bundle.js",
          revision: "00ff1c147b549688e99959ca2374b481",
        },
        {
          url: "sb-addons/essentials-actions-3/manager-bundle.js",
          revision: "30dcc269978e6fe539b6ef72101ec444",
        },
        {
          url: "sb-addons/essentials-backgrounds-5/manager-bundle.js",
          revision: "cb1c3a8c1344da1397222a88a5c5edf7",
        },
        {
          url: "sb-addons/essentials-controls-2/manager-bundle.js",
          revision: "dae42163b2081a7ce29310f0f520227f",
        },
        {
          url: "sb-addons/essentials-docs-4/manager-bundle.js",
          revision: "6aea2324d901bf98c9591b0936b4e92e",
        },
        {
          url: "sb-addons/essentials-measure-8/manager-bundle.js",
          revision: "df424d67d505d88cd76fa9a6d153817d",
        },
        {
          url: "sb-addons/essentials-outline-9/manager-bundle.js",
          revision: "f0891e5228fb4c06a844a0cfc2b00ecf",
        },
        {
          url: "sb-addons/essentials-toolbars-7/manager-bundle.js",
          revision: "c3658b1803259dc0a9b92dfe32a7cfe1",
        },
        {
          url: "sb-addons/essentials-viewport-6/manager-bundle.js",
          revision: "ed6b391d6f070067adb8d35c4b723a33",
        },
        {
          url: "sb-addons/interactions-11/manager-bundle.js",
          revision: "81a50f619c09f21cf5755381f2fbb438",
        },
        {
          url: "sb-addons/onboarding-1/manager-bundle.js",
          revision: "8980ce4de09db029712d7a1f542d518a",
        },
        {
          url: "sb-addons/storybook-core-core-server-presets-0/common-manager-bundle.js",
          revision: "c9207a30605042ff0a18c8bd2ef0d42d",
        },
        {
          url: "sb-common-assets/favicon.svg",
          revision: "695ec815efa60eb325f23cd67a9b3cf3",
        },
        {
          url: "sb-manager/globals-module-info.js",
          revision: "33eab71e2eefacbf875305b343fd630e",
        },
        {
          url: "sb-manager/globals-runtime.js",
          revision: "f9c8709352d1ff9f499e5403c7caff45",
        },
        {
          url: "sb-manager/globals.js",
          revision: "0b744e53a57d781b7b0091a4ec146dbf",
        },
        {
          url: "sb-manager/runtime.js",
          revision: "80fbad543e61b37534cfc8b10487689b",
        },
        { url: "vite.svg", revision: "8e3a10e157f75ada21ab742c022d5430" },
        {
          url: "assets/icons/logo-192x192.png",
          revision: "959e86a1ebe40a46bde18a1fde57881e",
        },
        {
          url: "assets/icons/logo-512x512.png",
          revision: "b2d2e627014dd9be7d24e0383a4b764e",
        },
        {
          url: "manifest.webmanifest",
          revision: "c13b19f29aac5d0182c18d70c17355e9",
        },
      ],
      {},
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      new s.NavigationRoute(s.createHandlerBoundToURL("index.html")),
    ),
    s.registerRoute(
      /^https:\/\/api\.onu-univ\.site\/.*/i,
      new s.NetworkFirst({
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        plugins: [new s.CacheableResponsePlugin({ statuses: [0, 200] })],
      }),
      "GET",
    );
});
