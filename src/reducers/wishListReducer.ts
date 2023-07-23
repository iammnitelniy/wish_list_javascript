import {OsType, WishlistType} from "../AppWithRedux";
import {v1} from "uuid";


export const wishlistID1 = v1();
export const wishlistID2 = v1()

const initialState: WishlistType[] = [
    {id: wishlistID1, category: "phones", filterByActivity: 'All', filterByStatus: 'All', order: 1},
    {id: wishlistID2, category: "books", filterByActivity: 'All', filterByStatus: 'All', order: 2}
]

export const wishListReducer = (state: WishlistType[]=initialState, action: MainType): WishlistType[] => {
        switch (action.type) {
            case 'ADD-WISHLIST': {


                let countForOrder = 2
                state.forEach(el => el.order > countForOrder ? countForOrder = el.order : countForOrder)

                const newWishList: WishlistType = {id: action.payload.wishListId, category: action.payload.title, filterByActivity: 'All', filterByStatus: 'All', order: countForOrder + 1}
                console.log(newWishList)

                return [...state, newWishList]
            }
            case 'REMOVE-WISHLIST': {
                return state.filter(el => el.id !== action.payload.wishListId)
            }
            case 'CHANGE-WISHLIST-TITLE': {
                return state.map(el=> el.id === action.payload.wishlistID ? {...el, category: action.payload.newTitle} : el)
            }
            case 'CHANGE-WISHLIST-FILTER': {
                if (action.payload.filterId === "filterByImportant") {
                    return state.map(el => el.id === action.payload.wishlistID ? {...el, filterByStatus: action.payload.filterValue} : el)
                } else {
                    return state.map(el => el.id === action.payload.wishlistID ? {...el, filterByActivity: action.payload.filterValue} : el)
                }
            }
            case 'CHANGE-ORDER': {
                return state.map(el => {
                    if (el.id === action.payload.startId) {
                        return {...el, order: action.payload.finishOrder};
                    } else if (el.id === action.payload.finishId) {
                        return {...el, order: action.payload.startOrder};
                    } else {
                        return el;
                    }
                });
            }
            default: return state
        }
}

export type MainType = AddWishListACType | RemoveWishListACType | ChangeWishListTitleACType | ChangeWishListFilterACType | ChangeWishListOrderACType

export type AddWishListACType = ReturnType<typeof addWishListAC>
export const addWishListAC = (title: string) => {
        return {
            type: 'ADD-WISHLIST',
            payload: {
                wishListId: v1(), title
            }
        } as const
}

export type RemoveWishListACType = ReturnType<typeof removeWishListAC>
export const removeWishListAC = (wishListId: string) => {
    return {
        type: 'REMOVE-WISHLIST',
        payload: {
            wishListId
        }
    }  as const
}

export type ChangeWishListTitleACType = ReturnType<typeof changeWishListTitleAC>
export const changeWishListTitleAC = (wishlistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-WISHLIST-TITLE',
        payload: {wishlistID, newTitle}
    } as const
}

export type ChangeWishListFilterACType = ReturnType<typeof changeWishListFilterAC>
export const changeWishListFilterAC = (wishlistID: string, filterId: string, filterValue: OsType )=>{
    return {
        type: 'CHANGE-WISHLIST-FILTER',
        payload: {wishlistID, filterId, filterValue}
    } as const
}

export type ChangeWishListOrderACType = ReturnType<typeof ChangeWishListOrderAC>
export const ChangeWishListOrderAC = (startId: string, startOrder: number, finishId: string, finishOrder: number )=>{
    return {
        type: 'CHANGE-ORDER',
        payload: {startId, startOrder, finishId, finishOrder}
    } as const
}
