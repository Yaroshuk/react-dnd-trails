import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export const store = configureStore({ reducer });

// @ts-ignore
globalThis.store = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
