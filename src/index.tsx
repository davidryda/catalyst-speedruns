//fonts
//import './assets/fonts/Ubuntu-Regular.ttf';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './assets/design/css-variables.css';
import { NavbarTitleContextController } from './contexts/NavbarTitleContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { MirrorsEdgeApiHistoryContextController } from './contexts/MirrorsEdgeApiHistoryContext';
import { SpeedrunApiHistoryContextController } from './contexts/SpeedrunApiHistoryContext';
import { SettingsContextController } from './contexts/SettingsContext';
import { GlobalDataContextController } from './contexts/GlobalDataContext';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <SettingsContextController>
                <GlobalDataContextController>
                    <MirrorsEdgeApiHistoryContextController>
                        <SpeedrunApiHistoryContextController>
                            <NavbarTitleContextController>
                                <App />
                            </NavbarTitleContextController>
                        </SpeedrunApiHistoryContextController>
                    </MirrorsEdgeApiHistoryContextController>
                </GlobalDataContextController>
            </SettingsContextController>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept();
}
