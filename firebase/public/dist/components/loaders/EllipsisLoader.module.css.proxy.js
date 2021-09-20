
export let code = "._lds-ellipsis_1c5d8_1 {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 80px;\r\n    height: 80px;\r\n}\r\n\r\n    ._lds-ellipsis_1c5d8_1 div {\r\n        position: absolute;\r\n        top: 33px;\r\n        width: 13px;\r\n        height: 13px;\r\n        border-radius: 50%;\r\n        background: #fff;\r\n        animation-timing-function: cubic-bezier(0, 1, 1, 0);\r\n    }\r\n\r\n        ._lds-ellipsis_1c5d8_1 div:nth-child(1) {\r\n            left: 8px;\r\n            animation: _lds-ellipsis1_1c5d8_1 0.6s infinite;\r\n        }\r\n\r\n        ._lds-ellipsis_1c5d8_1 div:nth-child(2) {\r\n            left: 8px;\r\n            animation: _lds-ellipsis2_1c5d8_1 0.6s infinite;\r\n        }\r\n\r\n        ._lds-ellipsis_1c5d8_1 div:nth-child(3) {\r\n            left: 32px;\r\n            animation: _lds-ellipsis2_1c5d8_1 0.6s infinite;\r\n        }\r\n\r\n        ._lds-ellipsis_1c5d8_1 div:nth-child(4) {\r\n            left: 56px;\r\n            animation: _lds-ellipsis3_1c5d8_1 0.6s infinite;\r\n        }\r\n\r\n@keyframes _lds-ellipsis1_1c5d8_1 {\r\n    0% {\r\n        transform: scale(0);\r\n    }\r\n\r\n    100% {\r\n        transform: scale(1);\r\n    }\r\n}\r\n\r\n@keyframes _lds-ellipsis3_1c5d8_1 {\r\n    0% {\r\n        transform: scale(1);\r\n    }\r\n\r\n    100% {\r\n        transform: scale(0);\r\n    }\r\n}\r\n\r\n@keyframes _lds-ellipsis2_1c5d8_1 {\r\n    0% {\r\n        transform: translate(0, 0);\r\n    }\r\n\r\n    100% {\r\n        transform: translate(24px, 0);\r\n    }\r\n}\r\n";
let json = {"lds-ellipsis":"_lds-ellipsis_1c5d8_1","lds-ellipsis1":"_lds-ellipsis1_1c5d8_1","lds-ellipsis2":"_lds-ellipsis2_1c5d8_1","lds-ellipsis3":"_lds-ellipsis3_1c5d8_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}