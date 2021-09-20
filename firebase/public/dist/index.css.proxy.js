// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "/*https://codepen.io/tigt/post/fixing-the-white-glow-in-the-css-blur-filter*/\r\n\r\n@font-face {\r\n    font-family: Ubuntu-Regular;\r\n    src: local('Ubuntu-Regular'), url('/fonts/Ubuntu-Regular.ttf') format('truetype');\r\n}\r\n\r\n@font-face {\r\n    font-family: SanFrancisco-Regular;\r\n    src: local('SanFrancisco-Regular'), url('/fonts/SanFrancisco-Regular.ttf') format('truetype');\r\n}\r\n\r\nbody {\r\n    margin: 0;\r\n    font-family: 'SanFrancisco-Regular', 'Ubuntu-Regular', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\r\n    background-color: black;\r\n}\r\n\r\ncode {\r\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\r\n    monospace;\r\n}\r\n\r\n/** {\r\n    -webkit-box-sizing: border-box;\r\n    -moz-box-sizing: border-box;\r\n    -ms-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n}*/";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}