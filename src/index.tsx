import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import {store} from "./redux/store";
import {App} from "./app/App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
