import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {OsType, WishesDataPropsType} from "./App";
import {SuperInput} from "./SuperComponents/SuperInput";
import SuperButton from "./SuperComponents/SuperButton";

export type OsTypeForSelect = "Android" | "iOS" | "Select OS"
export type StatusTypeForSelect = "All" | "Active" | "Completed"

export type WishListPropsType = {
	wishes: WishesDataPropsType[]
	osFilter: OsType
	setOsFilter: (text: OsType) => void
	statusFilter: StatusTypeForSelect
	setStatusFilter: (text: StatusTypeForSelect) => void
	addNewWish: (value: string, oS: OsTypeForSelect) => void
	value?: string
	removeWish: (id: string) => void
	changeWishStatus: (wishId: string, isDone: boolean) => void


}

export const WishList: React.FC<WishListPropsType> = (
{
	wishes,
	osFilter,
	setOsFilter,
	statusFilter,
	setStatusFilter,
	addNewWish,
	value,
	removeWish,
	changeWishStatus,

	... restProps
}) => {
	let [oS, setOS] = useState<OsTypeForSelect>("Select OS")

	const [error2, setError2] = useState<null | string>(null)


	const addWishHandler = (value: string) => {
		if (oS !== "Select OS") {
			if (value.trim() !== "") {
				addNewWish(value, oS)
				setOS("Select OS")
				setError2(null)
			} else setError2("Item was not selected")
			return
		} else setError2("OS is not selected")
	}

	const removeWishHandler = (id: string) => {
		removeWish(id)
	}
	const onChangeOSHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setOS(e.currentTarget.value as OsTypeForSelect)
		if (e.currentTarget.value !== "Select OS") {
			setError2(null)
		}
	}
	const onChangeFilterOSHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setOsFilter(e.currentTarget.value as OsType)
	}
	const onChangeFilterStatusHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setStatusFilter(e.currentTarget.value as StatusTypeForSelect)
	}

	return (
		<div>
			<h1>Phones</h1>
			<div style={{display: "flex", justifyContent: "space-between"}}>
				<div>
					<SuperInput callBack={addWishHandler} placeholder={"Enter an item"}/>
					{/*<input placeholder={"Enter an item"}*/}


					{/*/>*/}
					{error2 && <div style={{maxWidth: "80px"}} className={"error-message"}>{error2}</div>}

				</div>
				<div>
					<select value={oS} onChange={onChangeOSHandler}>
						<option value={"Select OS"}>Select OS</option>
						<option value={"Android"}>Android</option>
						<option value={"iOS"}>iOS</option>
					</select>
				</div>
				<div>
					{/*<button onClick={addWishHandler}>Add</button>*/}
				</div>
			</div>
			<ul>
				{wishes.map(el => {
					const changeWishStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
						changeWishStatus(el.id, e.currentTarget.checked)
					}
					return (
						<li key={el.id} className={el.checked ? "selected" : ""}>
							<input type="checkbox" checked={el.checked} onChange={changeWishStatusHandler}/>
							<span> {el.title} </span>
							<span> / OS: </span>
							<span> {el.OS} </span>
							<SuperButton callBack={() => removeWishHandler(el.id)} name={'x'}/>
							{/*<button onClick={() => removeWishHandler(el.id)}>X</button>*/}
						</li>
					)
				})}
			</ul>
			<div style={{display: "flex", justifyContent: "space-between"}}>
				<div style={{marginRight: "20px"}}>
					FILTER BY OS:
					<div>
						<select value={osFilter} onChange={onChangeFilterOSHandler}>
							<option value={"All"}>All</option>
							<option value={"Android"}>Android</option>
							<option value={"iOS"}>iOS</option>
						</select>
					</div>
				</div>
				<div>
					FILTER BY ACTIVITY:
					<div>
						<select value={statusFilter} onChange={onChangeFilterStatusHandler}>
							<option value={"All"}>All</option>
							<option value={"Active"}>Active</option>
							<option value={"Completed"}>Completed</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}