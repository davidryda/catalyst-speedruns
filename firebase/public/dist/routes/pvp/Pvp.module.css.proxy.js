
export let code = "._container_11abn_1 {\r\n    color: white;\r\n}\r\n\r\n._leaderContainer_11abn_9 {\r\n    font-weight: bold;\r\n    text-align: center;\r\n    font-size: 16px;\r\n    margin: 10px 0;\r\n}\r\n\r\n._table_11abn_23 {\r\n    color: white;\r\n    width: 100%;\r\n    border-top: 2px solid white;\r\n    font-weight: bold;\r\n    table-layout: fixed;\r\n}\r\n\r\n    ._table_11abn_23 > thead > tr > th {\r\n        white-space: nowrap;\r\n        text-overflow: ellipsis;\r\n        overflow: hidden;\r\n        /*max-width: 1px;*/\r\n    }\r\n\r\n        ._table_11abn_23 > thead > tr > th > a {\r\n            color: white;\r\n            text-decoration: none;\r\n        }\r\n\r\n    ._table_11abn_23 > tbody > tr {\r\n        height: 24px;\r\n    }\r\n\r\n        ._table_11abn_23 > tbody > tr > td > a {\r\n            color: white;\r\n            text-decoration: none;\r\n        }\r\n\r\n    ._table_11abn_23 tr:hover {\r\n        background-color: rgba(255,255,255,0.2);\r\n    }\r\n\r\n    ._table_11abn_23 > tbody > tr > td {\r\n        height: inherit;\r\n        text-align: center;\r\n    }\r\n\r\n    ._table_11abn_23 > tbody > tr:last-child > td:nth-child(2), ._table_11abn_23 > tbody > tr:last-child > td:nth-child(3) {\r\n        border-top: 2px solid white;\r\n    }\r\n\r\n        ._table_11abn_23 > tbody > tr > td > img {\r\n            height: 100%;\r\n            vertical-align: inherit;\r\n        }";
let json = {"container":"_container_11abn_1","leaderContainer":"_leaderContainer_11abn_9","table":"_table_11abn_23"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}