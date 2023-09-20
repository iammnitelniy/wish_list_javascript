
import {configureStore} from "@reduxjs/toolkit";
import {wishLists} from "../reducers/wishListReducer";
import {wishes} from "../reducers/wishesReducer";



export const store = configureStore({
    reducer: {
        wishLists,
        wishes

    },
});
export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


// @ts-ignore
window.store = store;