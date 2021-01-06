import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { NavbarTitleContextController } from './contexts/NavbarTitleContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { MirrorsEdgeApiHistoryContextController } from './contexts/MirrorsEdgeApiHistoryContext';
import { SpeedrunApiHistoryContextController } from './contexts/SpeedrunApiHistoryContext';
import { SettingsContextController } from './contexts/SettingsContext';
//import { createBrowserHistory } from 'history';
//export const history = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <SettingsContextController>
                <MirrorsEdgeApiHistoryContextController>
                    <SpeedrunApiHistoryContextController>
                        <NavbarTitleContextController>
                            <App />
                        </NavbarTitleContextController>
                    </SpeedrunApiHistoryContextController>
                </MirrorsEdgeApiHistoryContextController>
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
