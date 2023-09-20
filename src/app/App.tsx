import React, {DragEvent, useState} from 'react';
import './App.css';
import {FilterTypeForSelect, StatusTypeForSelect, WishList} from "../WishList";
import {useDispatch, useSelector} from "react-redux";
import {ButtonUniversal} from "../common/SuperComponents/ButtonUniversal";
import {InputUniversal} from "../common/SuperComponents/InputUniversal";
import {wishListsActions} from "../reducers/wishListReducer";
import {v1} from "uuid";
import {AppRootStateType} from "../redux/store";


export type OsType = "All" | 'Important' | "Usual" | FilterTypeForSelect | StatusTypeForSelect
export type WishlistType = {
	id: string, category: string, filterByActivity: OsType, filterByStatus: OsType, order: number
}
export type WishType = { id: string, title: string, status: string, checked: boolean }
export type WishesDataType = {
	[key: string]: WishType[]
}
export function App() {
	const [wishlistTitle, setWishlistTitle] = useState<string>("")
	const [currentWishList, setCurrentWishList] = useState<WishlistType | null>(null)
	const dispatch = useDispatch()
	const wishLists = useSelector<AppRootStateType, WishlistType[]>((store) => {
		return store.wishLists
	})

	const wishes = useSelector<AppRootStateType, WishesDataType>((store) => {
		return store.wishes
	})
	const addNewWishList = () => {
		const action = wishListsActions.addWishlist({wishListId: v1(), title: wishlistTitle})
		dispatch(action)
		setWishlistTitle("")
	}
	const keyDownForAddWishlist = (key: string) => {
		key === 'Enter' && addNewWishList()
	}
	const onDragStartHandler = (e: DragEvent<HTMLDivElement>, wl: WishlistType) => {
		setCurrentWishList(wishLists.find(el => el.id === wl.id) as WishlistType)
	}
	const onDragEndHandler = (e: DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.backgroundColor = "#FFFFFF";
	}
	const onDragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.backgroundColor = "#FFFFFF";
	}
	const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.currentTarget.style.backgroundColor = "#FFFFFF";
	}
	const onDropHandler = (e: DragEvent<HTMLDivElement>, wl: WishlistType) => {
		e.preventDefault()
		const leaveWishlist = wishLists.find(el => el.id === wl.id) as WishlistType
		dispatch(wishListsActions.changeWishListOrder({currentWishList: currentWishList as WishlistType, leaveWishList: leaveWishlist as WishlistType}))
	}
    return (
		<div className="App wishlist">
			<div className="wishlist__adding-form">
				<div className="wishlist__adding-form__title">Adding new Wishlist</div>
				<div className="wishlist__adding-form__input-with-button">
					<InputUniversal callBack={setWishlistTitle} value={wishlistTitle}
								onKeyDownCallBack={(e) => {keyDownForAddWishlist(e)}}/>
					<ButtonUniversal callBack={addNewWishList} name={"Add"}/>
				</div>

			</div>
			<div className="wishlist__cards">
				{wishLists?.sort((a, b) => a.order - b.order).map((wl) => {
					const wishesWhatWeWantToSee = wl.filterByStatus === 'All' ? wishes[wl.id]
						: wishes[wl.id].filter(el => el.status === wl.filterByStatus)
					const wishesWhatWeWantToSeeGeneral = wl.filterByActivity === 'All' ? wishesWhatWeWantToSee :
						wishesWhatWeWantToSee.filter(el => wl.filterByActivity === 'Active' ? !el.checked : el.checked)
					return <div
						key={wl.id}
						draggable={true}
						onDragStart={(e) => {onDragStartHandler(e, wl)}}
						onDragLeave={(e) => {onDragLeaveHandler(e)}}
						onDragEnd={(e) => {onDragEndHandler(e)}}
						onDragOver={(e) => {onDragOverHandler(e)}}
						onDrop={(e) => {onDropHandler(e, wl)}}
					>
                        <WishList
						key={wl.id}
						wishlistID={wl.id}
						wishes={wishesWhatWeWantToSeeGeneral}
						activityFilter={wl.filterByActivity}
						valueOfImportantFilter={wl.filterByStatus}
						category={wl.category}
					    />
                    </div>
				})}
			</div>
		</div>
	);
}
