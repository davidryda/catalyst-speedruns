
export let code = "._App_1et1d_1 {\r\n    padding-top: 70px;\r\n}\r\n";
let json = {"App":"_App_1et1d_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}