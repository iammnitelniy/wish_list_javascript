import React, {FC, memo, useState} from 'react';
import {OsType, WishType} from "./app/App";

import {useDispatch} from "react-redux";
import {EditableSpan} from "./common/SuperComponents/Editable";
import {SuperForm} from "./common/SuperComponents/SuperForm";
import SuperCheckbox from "./common/SuperComponents/SuperCheckbox";
import {SuperSelect} from "./common/SuperComponents/SuperSelect";
import {wishListsActions} from "./reducers/wishListReducer";
import {wishesActions} from "./reducers/wishesReducer";
import {ButtonUniversal} from "./common/SuperComponents/ButtonUniversal";


export type FilterTypeForSelect = "Usual" | "Important" | "Select"
export type StatusTypeForSelect = "All" | "Active" | "Completed"
export type WishListPropsType = {
	wishes: WishType[]
	valueOfImportantFilter: OsType
	activityFilter: OsType
	wishlistID: string
	category: string
}
export const WishList: FC<WishListPropsType> = memo(({wishes, valueOfImportantFilter, activityFilter, wishlistID, category}) => {
	const dispatch = useDispatch()
	const [error, setError] = useState<string | null>(null)
	const [oS, setOS] = useState<FilterTypeForSelect>("Select")
	const addWishHandler = (newValue: string) => {
		if (oS !== "Select") {
			if (newValue.trim() !== "") {
				dispatch(wishesActions.addWish({wishlistId: wishlistID, oS, newValue}))
				setOS("Select")
			} else setError("Type wish name")
		} else setError("Select wish status")
	}
	const removeWishHandler = (id: string) => {
		dispatch(wishesActions.removeWish({wishlistID: wishlistID, id}))
	}
	const onChangeOSHandler = (value: string) => {
		setOS(value as FilterTypeForSelect)
		setError(null)
	}
	const onChangeFilterImportantHandler = (value: string) => {
		const filterId = "filterByImportant"
		dispatch(wishListsActions.changeWishListFilter({wishlistID, filterId: filterId as OsType, filterValue: value as OsType}))
	}
	const onChangeActivityFilterHandler = (value: string) => {
		const filterId = "filterByActivity"
		dispatch(wishListsActions.changeWishListFilter({wishlistID, filterId: filterId as OsType, filterValue: value as OsType}))

	}
	const changeStatusHandler = (wishId: string, value: boolean) => {
		dispatch(wishesActions.changeWishStatus({wishlistID: wishlistID, wishId, statusValue: value}))
	}
	const changeWishListTitleHandler = (newTitle: string) => {
		dispatch(wishListsActions.changeWishListTitle({wishlistID, newTitle}))
	}
	const changeWishTitleHandler = (wishId: string, newTitle: string) => {
		dispatch(wishesActions.changeWishTitle({wishlistID, wishId, newTitle}))
	}
	const removeWishListHandler = () => {
		dispatch(wishListsActions.removeWishlist({wishListId: wishlistID}))
	}
	return (
		<div className="wishlist__cards-item">
			<div className="wishlist__title-container">
					<div className={"wishlist__title-container__editable-span"}>
						<ButtonUniversal callBack={removeWishListHandler} name={'X'} />
						<EditableSpan callBack={changeWishListTitleHandler} value={category}/>
					</div>
				<div className={"wishlist__title-container__super-button"}>

				</div>

			</div>
			<div className="input-container">
				<div>
					<SuperForm callBack={addWishHandler} setError={setError}/>
					{error === "Type wish name" ? <div className="error-message">{error}</div> : ""}
				</div>
				<div>
					<SuperSelect value={oS} options={[{value: 'Select', label: "Select"}, {
						value: 'Usual',
						label: "Usual"
					}, {value: 'Important', label: "Important"}]} callBack={onChangeOSHandler}/>
					{error === "Select wish status" ? <div className="error-message">{error}</div> : ""}
				</div>
			</div>
			<div className="main-container">
				<div className="table-container">
					<div className="table-row heading">
						<div className="row-item checkbox"></div>
						<div className="row-item title">Title</div>
						<div className="row-item status">Status</div>
						<div className="row-item"></div>
					</div>
					{wishes.map((el: WishType) => {
						return (
							<div className={el.checked ? "table-row selected" : "table-row"} key={el.id}>
								<div className="row-item checkbox">
									<SuperCheckbox checked={el.checked} callBack={(value) => {
										changeStatusHandler(el.id, value)
									}}/>
								</div>
								<div className="row-item title">
									<EditableSpan callBack={(newTitle)=>changeWishTitleHandler(el.id, newTitle)} value={el.title}/>
								</div>
								<div className="row-item status"> {el.status} </div>
								<div className="row-item">
									<button onClick={() => removeWishHandler(el.id)}>X</button>
								</div>
							</div>
						)
					})}
				</div>
			</div>
			<div className={"wishlist__card-filters"}>
				<div className={"wishlist__card-filter-container"}>
					<div className={"wishlist__card-filter-title"}>FILTER BY IMPORTANCE:</div>
					<div className={"wishlist__card-filter-select"}>
						<SuperSelect value={valueOfImportantFilter} options={[{value: 'All', label: "All"}, {
							value: "Usual",
							label: "Usual"
						}, {value: 'Important', label: "Important"}]} callBack={onChangeFilterImportantHandler}/>
					</div>
				</div>
				<div className={"wishlist__card-filter-container"}>
					<div className={"wishlist__card-filter-title"}>FILTER BY ACTIVITY:</div>
					<div className={"wishlist__card-filter-select"}>
						<SuperSelect value={activityFilter} options={[{value: 'All', label: "All"}, {
							value: "Active",
							label: "Active"
						}, {value: 'Completed', label: "Completed"}]} callBack={onChangeActivityFilterHandler}/>
					</div>
				</div>
			</div>
		</div>)
})