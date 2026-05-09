/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { RepositorynContext, UIAPIContext } from "./obsidian/context";

const elem = document.getElementById("root")!;
const app = (
    <StrictMode>
        {/* create context in the same as the obsidian plugin (view.tsx) */}
        <RepositorynContext value={undefined}>
            <UIAPIContext value={undefined}>
                <App />
            </UIAPIContext>
        </RepositorynContext>
    </StrictMode>
);

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
(import.meta.hot.data.root ??= createRoot(elem)).render(app);
