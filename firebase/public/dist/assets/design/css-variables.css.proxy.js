// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ":root {\r\n    --name-of-variable: #000000;\r\n    /*Navbar*/\r\n    --navbarBlurAmount: blur(10px);\r\n    --navbarBackgroundColor: rgba(0, 0, 0, 0.7);\r\n    --navbarBackgroundColorFallback: rgba(0, 0, 0, 0.95);\r\n    /*Navbar Menu*/\r\n    --navbarMenuBlurAmount: blur(10px);\r\n    --navbarMenuBackgroundColor: rgba(25, 25, 25, 0.5);\r\n    --navbarMenuBackgroundColorFallback: rgba(25, 25, 25, 0.9);\r\n    /*Navbar Menu Backdrop*/\r\n    --navbarMenuBackdropColor: rgba(0, 0, 0, 0.3);\r\n    /*Settings*/\r\n    --settingsContainerBlurAmount: blur(10px);\r\n    --settingsContainerBackgroundColor: rgba(25, 25, 25, 0.5);\r\n    --settingsContainerBackgroundColorFallback: rgba(25, 25, 25, 0.9);\r\n    --settingsBackgroundColor: rgba(0, 0, 0, 0.3);\r\n    /*Dash Button*/\r\n    --dashButtonBackgroundBlurAmount: blur(5px);\r\n    --dashButtonBackgroundColor: rgba(0,0,0,0.65);\r\n    /*Leaderboard Background*/\r\n    --leaderboardBackgroundBlurAmount: blur(10px);\r\n    --leaderboardBackgroundColor: rgba(0,0,0,0.7);\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}