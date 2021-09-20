
export let code = "._container_1o20o_1 {\r\n}\r\n\r\n._table_1o20o_7 {\r\n    color: white;\r\n    width: 100%;\r\n    border-top: 2px solid white;\r\n    table-layout: initial;\r\n}\r\n\r\n    ._table_1o20o_7 > thead {\r\n        border-top: 2px solid white;\r\n    }\r\n\r\n    ._table_1o20o_7 > thead > tr > th:hover {\r\n        cursor: pointer;\r\n    }\r\n\r\n    ._table_1o20o_7 > tbody > tr {\r\n        height: 24px;\r\n    }\r\n\r\n        ._table_1o20o_7 > tbody > tr > td > a {\r\n            color: white;\r\n            text-decoration: none;\r\n        }\r\n\r\n    ._table_1o20o_7 tr:hover {\r\n        background-color: rgba(255,255,255,0.2);\r\n    }\r\n\r\n    ._table_1o20o_7 > tbody > tr > td {\r\n        height: inherit;\r\n        text-align: center;\r\n    }\r\n\r\n        ._table_1o20o_7 > tbody > tr:last-child > td:nth-child(2) {\r\n            border-top: 2px solid white;\r\n        }\r\n\r\n        ._table_1o20o_7 > tbody > tr > td:first-child {\r\n            text-align: center;\r\n        }\r\n\r\n        ._table_1o20o_7 > tbody > tr > td > img {\r\n            height: 100%;\r\n            vertical-align: inherit;\r\n        }\r\n\r\n@media (min-width: 667px) {\r\n    ._table_1o20o_7 {\r\n        table-layout: fixed;\r\n    }\r\n}";
let json = {"container":"_container_1o20o_1","table":"_table_1o20o_7"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}