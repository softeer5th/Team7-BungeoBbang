import { B as o } from "./BorderProps-BeEA2FI6.js";
const d = ({
    borderWidth: e = "1px",
    borderColor: r = "#000000",
    borderType: n = o.ALL,
  }) => {
    switch (n) {
      case o.LEFT:
        return `
        border-top: none;
        border-right: none;
        border-bottom: none;
        border-left: ${e} solid ${r};
      `;
      case o.RIGHT:
        return `
        border-top: none;
        border-right: ${e} solid ${r};
        border-bottom: none;
        border-left: none;
      `;
      case o.TOP:
        return `
        border-top: ${e} solid ${r};
        border-right: none;
        border-bottom: none;
        border-left: none;
      `;
      case o.BOTTOM:
        return `
        border-top: none;
        border-right: none;
        border-bottom: ${e} solid ${r};
        border-left: none;
      `;
      case o.VERTICAL:
        return `
        border-top: none;
        border-right: ${e} solid ${r};
        border-bottom: none;
        border-left: ${e} solid ${r};
      `;
      case o.HORIZONTAL:
        return `
        border-top: ${e} solid ${r};
        border-right: none;
        border-bottom: ${e} solid ${r};
        border-left: none;
      `;
      case o.ALL:
        return `
        border: ${e} solid ${r};
      `;
      default:
        return "border: none;";
    }
  },
  s = () => ({
    borderWidth: "1px",
    borderColor: "#F4F4F4",
    selectedBorderColor: "#1F87FF",
    errorBorderColor: "#FF4B4B",
    disabledBorderColor: "#F4F4F4",
    borderRadius: "0px",
    borderType: o.ALL,
  });
export { s as a, d as g };
