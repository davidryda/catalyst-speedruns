
export let code = "._container_1tgk4_1 {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n._button_1tgk4_11 {\r\n    border: none;\r\n    height: 90px;\r\n    width: 100%;\r\n    overflow: hidden;\r\n    position: relative;\r\n    background-color: transparent;\r\n}\r\n\r\n._button_1tgk4_11:not(:last-child) {\r\n    margin-bottom: 5px;\r\n}\r\n\r\n._buttonNameContainer_1tgk4_37 {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: var(--dashButtonBackgroundColor);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n._buttonName_1tgk4_37 {\r\n    font-weight: bold;\r\n    font-size: 20px;\r\n    color: white;\r\n}\r\n\r\n._buttonBackground_1tgk4_73 {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    -webkit-filter: var(--dashButtonBackgroundBlurAmount);\r\n    -moz-filter: var(--dashButtonBackgroundBlurAmount);\r\n    -o-filter: var(--dashButtonBackgroundBlurAmount);\r\n    -ms-filter: var(--dashButtonBackgroundBlurAmount);\r\n    filter: var(--dashButtonBackgroundBlurAmount);\r\n    background-position: center;\r\n    transform: scale(1.1);\r\n}\r\n\r\n@media (min-width: 767px) {\r\n    ._button_1tgk4_11 {\r\n        height: 200px;\r\n        width: calc((100% / 2) - (5px / 2));\r\n        margin-right: 5px;\r\n    }\r\n\r\n        ._button_1tgk4_11:nth-child(2n) {\r\n            margin-right: 0;\r\n        }\r\n\r\n        ._button_1tgk4_11:nth-last-child(-n+2) {\r\n            margin-bottom: 0px;\r\n        }\r\n}";
let json = {"container":"_container_1tgk4_1","button":"_button_1tgk4_11","buttonNameContainer":"_buttonNameContainer_1tgk4_37","buttonName":"_buttonName_1tgk4_37","buttonBackground":"_buttonBackground_1tgk4_73"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}