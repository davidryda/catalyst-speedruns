
export let code = "._background_knybs_1 {\r\n    z-index: -1;\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    background-position: center;\r\n    background-size: cover;\r\n    width: 100%;\r\n    height: 100%;\r\n    -webkit-filter: var(--leaderboardBackgroundBlurAmount);\r\n    -moz-filter: var(--leaderboardBackgroundBlurAmount);\r\n    -o-filter: var(--leaderboardBackgroundBlurAmount);\r\n    -ms-filter: var(--leaderboardBackgroundBlurAmount);\r\n    filter: var(--leaderboardBackgroundBlurAmount);\r\n    /*transform: scale(1.1);*/\r\n}\r\n\r\n._backgroundColorLayer_knybs_35 {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: var(--leaderboardBackgroundColor);\r\n}\r\n\r\n._container_knybs_49 > div, ._container_knybs_49 > tr, ._container_knybs_49 > a {\r\n    text-decoration: none;\r\n    color: white;\r\n}\r\n\r\n._container_knybs_49 > *:not(:last-child) {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n    ._container_knybs_49 > *:first-child {\r\n        margin-top: 10px;\r\n    }\r\n\r\n    ._container_knybs_49 > *:nth-child(3) {\r\n        max-height: 30px;\r\n    }\r\n\r\n._platformCountContainer_knybs_83 {\r\n    display: flex;\r\n    justify-content: center;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n    ._platformCountContainer_knybs_83 > div {\r\n        display: flex;\r\n        align-items: center;\r\n        padding: 3px 7px;\r\n    }\r\n\r\n    ._platformCountContainer_knybs_83 > div > span {\r\n        margin-left: 5px;\r\n    }\r\n\r\n    ._platformCountContainer_knybs_83 > div > img {\r\n        height: 24px;\r\n    }\r\n\r\n._pvpContainer_knybs_123 {\r\n    display: flex;\r\n    justify-content: center;\r\n    margin: 0 10px;\r\n}\r\n\r\n    ._pvpContainer_knybs_123 > form {\r\n        display: flex;\r\n        width: 100%;\r\n        justify-content: center;\r\n    }\r\n\r\n    ._pvpContainer_knybs_123 > form > select {\r\n        flex: 1;\r\n        border: 1px solid white;\r\n        padding: 3px 5px;\r\n        border-radius: 0;\r\n        height: 100%;\r\n        min-width: 10px;\r\n        max-width: 150px;\r\n    }\r\n\r\n    ._pvpContainer_knybs_123 > form > button {\r\n        border: 1px solid white;\r\n        border-radius: 0;\r\n        padding: 3px 15px;\r\n        margin: 0 10px;\r\n        color: white;\r\n        background-color: transparent;\r\n        height: 100%;\r\n    }\r\n\r\n._fastestAvailableRunContainer_knybs_187 {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n    ._fastestAvailableRunContainer_knybs_187 > a {\r\n        color: white;\r\n        text-decoration: none;\r\n    }\r\n\r\n._table_knybs_209 {\r\n    color: white;\r\n    width: 100%;\r\n    border-top: 2px solid white;\r\n}\r\n\r\n    ._table_knybs_209 > tbody > tr {\r\n        height: 24px;\r\n    }\r\n\r\n        ._table_knybs_209 > tbody > tr > td > a {\r\n            color: white;\r\n            text-decoration: none;\r\n        }\r\n\r\n    ._table_knybs_209 tr:hover {\r\n        background-color: rgba(255,255,255,0.2);\r\n    }\r\n\r\n    ._table_knybs_209 > tbody > tr > td {\r\n        height: inherit;\r\n        text-align: center;\r\n    }\r\n\r\n        ._table_knybs_209 > tbody > tr > td > img {\r\n            height: 24px;\r\n            vertical-align: inherit;\r\n        }";
let json = {"background":"_background_knybs_1","backgroundColorLayer":"_backgroundColorLayer_knybs_35","container":"_container_knybs_49","platformCountContainer":"_platformCountContainer_knybs_83","pvpContainer":"_pvpContainer_knybs_123","fastestAvailableRunContainer":"_fastestAvailableRunContainer_knybs_187","table":"_table_knybs_209"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}