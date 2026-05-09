import { createContext } from "react";
import type { UIAPI } from "./api";
import type { IObsidianRepository } from "./app";

export const RepositorynContext = createContext<IObsidianRepository | undefined>(undefined);
export const UIAPIContext = createContext<UIAPI | undefined>(undefined);


