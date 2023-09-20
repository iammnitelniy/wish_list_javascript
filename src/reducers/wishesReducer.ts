import {OsType, WishesDataType, WishlistType} from "../app/App";
import {wishlistID1, wishlistID2, wishListsActions} from "./wishListReducer";
import {FilterTypeForSelect} from "../WishList";
import {v1} from "uuid";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: WishesDataType = {
	[wishlistID1]: [
		{id: v1(), title: 'Samsung Galaxy S23', status: "Usual", checked: true},
		{id: v1(), title: 'IPhone 13 ProMax', status: 'Important', checked: true},
		{id: v1(), title: 'Xiaomi 13', status: "Usual", checked: true},
		{id: v1(), title: 'Huawei', status: "Usual", checked: false},
		{id: v1(), title: 'Iphone 14', status: 'Important', checked: false}
	],
	[wishlistID2]: [
		{id: v1(), title: 'Hamlet ', status: "Usual", checked: true},
		{id: v1(), title: 'The Odyssey ', status: "Important", checked: true},
		{id: v1(), title: 'Sherlock Holmes', status: "Usual", checked: true},
		{id: v1(), title: 'Don Quixote', status: "Important", checked: false},
		{id: v1(), title: 'HeadFirst JS', status: "Usual", checked: false}]
}




const slice = createSlice({
	name: 'wishes',
	initialState,
	reducers: {
		addWish: (state, action: PayloadAction<{wishlistId: string, oS: FilterTypeForSelect, newValue: string }>) => {

			const wish =  {id: v1(), title: action.payload.newValue, status: action.payload.oS, checked: false}
			const wishes = state[action.payload.wishlistId];
			wishes.unshift(wish);
		},
		removeWish: (state, action: PayloadAction<{wishlistID: string, id: string}>) => {
			const wishes = state[action.payload.wishlistID];
			const index = wishes.findIndex((t) => t.id === action.payload.id);
			if (index !== -1) wishes.splice(index, 1);
		},
		changeWishTitle: (state, action: PayloadAction<{wishlistID: string, wishId: string, newTitle: string }>) => {
				const wishes = state[action.payload.wishlistID];
				const index = wishes.findIndex((t) => t.id === action.payload.wishId);
				if (index !== -1) {
					wishes[index] = { ...wishes[index], title: action.payload.newTitle};
					}
		},
		changeWishStatus: (state, action: PayloadAction<{ wishlistID: string, wishId: string, statusValue: boolean }>) => {


			const wishes = state[action.payload.wishlistID];
			const index = wishes.findIndex((t) => t.id === action.payload.wishId);
			if (index !== -1) {
				wishes[index] = { ...wishes[index], checked: action.payload.statusValue};
			}
		},



	},
	extraReducers: (builder) => {
		builder
			.addCase(wishListsActions.removeWishlist,(state, action) => {
				delete state[action.payload.wishListId]
			})
			.addCase(wishListsActions.addWishlist,(state, action) => {
					state[action.payload.wishListId] = []
			})
	}
})

export const wishes = slice.reducer
export const wishesActions = slice.actions


//
// export const _wishes = (state: WishesDataType = initialState, action: WishesMainType): WishesDataType => {
// 	switch (action.type) {
// 		case 'ADD-WISHLIST': {
// 			return {...state, [action.payload.wishListId]: []}
// 		}
// 		case 'REMOVE-WISHLIST': {
// 			delete state[action.payload.wishListId]
// 			return {...state}
// 		}
// 		case "ADD-WISHES": {
// 			const newItem = {id: v1(), title: action.payload.newValue, status: action.payload.oS, checked: false}
// 			return {...state, [action.payload.wishlistId]: [newItem, ...state[action.payload.wishlistId]]}
// 		}
// 		case "REMOVE-WISHES": {
// 			return {
// 				...state,
// 				[action.payload.wishlistID]: state[action.payload.wishlistID].filter(el => el.id !== action.payload.id)
// 			}
// 		}
// 		case "CHANGE-WISH-TITLE" : {
// 			return {
// 				...state,
// 				[action.payload.wishlistID]: state[action.payload.wishlistID].map(el => el.id === action.payload.wishId ? {
// 					...el,
// 					title: action.payload.newTitle
// 				} : el)
// 			}
// 		}
// 		case "CHANGE-WISH-STATUS" : {
// 			return {
// 				...state,
// 				[action.payload.wishlistID]: state[action.payload.wishlistID].map(el => el.id === action.payload.wishId ? {
// 					...el,
// 					checked: action.payload.statusValue
// 				} : el)
// 			}
// 		}
// 		default:
// 			return state
// 	}
// }
// export type WishesMainType =
// 	AddWishListACType
// 	| RemoveWishListACType
// 	| AddNewWishACType
// 	| RemoveWishACType
// 	| ChangeWishStatusACType
// 	| ChangeWishTitleACType
//
// export type AddNewWishACType = ReturnType<typeof addNewWishAC>
// export const addNewWishAC = (wishlistId: string, oS: FilterTypeForSelect, newValue: string) => {
// 	return {
// 		type: 'ADD-WISHES',
// 		payload: {wishlistId, oS, newValue}
// 	} as const
// }
//
// export type RemoveWishACType = ReturnType<typeof removeWishAC>
// export const removeWishAC = (wishlistID: string, id: string) => {
// 	return {
// 		type: 'REMOVE-WISHES',
// 		payload: {wishlistID, id}
// 	} as const
// }
//
// export type ChangeWishTitleACType = ReturnType<typeof changeWishTitleAC>
// export const changeWishTitleAC = (wishlistID: string, wishId: string, newTitle: string) => {
// 	return {
// 		type: 'CHANGE-WISH-TITLE',
// 		payload: {wishlistID, wishId, newTitle}
// 	} as const
// }
//
// export type ChangeWishStatusACType = ReturnType<typeof changeWishStatusAC>
// export const changeWishStatusAC = (wishlistID: string, wishId: string, statusValue: boolean) => {
// 	return {
// 		type: 'CHANGE-WISH-STATUS',
// 		payload: {wishlistID, wishId, statusValue}
// 	} as const
// }
