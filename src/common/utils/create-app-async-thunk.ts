import {createAsyncThunk} from "@reduxjs/toolkit";
import {BaseResponseType} from "../types";
import {AppDispatch, AppRootStateType} from "../../redux/store";


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType;
    dispatch: AppDispatch;
    rejectValue: null | BaseResponseType;
}>();