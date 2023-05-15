import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {OsType, WishesDataPropsType} from "./App";
export type OsTypeForSelect = "Android" | "iOS" | "Select OS"

export type WishListPropsType = {
	wishes: WishesDataPropsType[]
	addItem: (newItem: string, wishFilter: OsTypeForSelect)=> void
	removeTask: (taskId: string) => void
	ChangeOs: (osValue: OsType) => void
	osFilter: OsType
}

export const WishList = (props: WishListPropsType) => {
	let [newItem, setNewItem] = useState("")
	let [os, setOS] = useState<OsTypeForSelect>("Select OS")

	const onNewItemChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewItem(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addItemHandler()

		}
	}

	const addItemHandler = () => {
		if(os !== "Select OS"){
			if (newItem.trim() !== "") {
				props.addItem(newItem, os)
				setNewItem("")
				setOS("Select OS")
			}
		}
		else return
	}

	const onChangeOSHandler = (e:ChangeEvent<HTMLSelectElement>) => {
		setOS(e.currentTarget.value as OsTypeForSelect)
	}

	const removeTaskHandler = (taskId: string) => {
		props.removeTask(taskId)
	}
	const ChangeOsHandler = (OsValue: OsType) => {
		props.ChangeOs(OsValue)
	}
//newpush
//push
//commit + push
	return (
			<div>
				<h1>Phones</h1>
				<div>
					<input placeholder={"Enter an item"}
						   value={newItem}
						   onChange={onNewItemChangeHandler}
						   onKeyDown={onKeyPressHandler}/>
					<select value={os} onChange={onChangeOSHandler}>
						<option value={"Select OS"}>Select OS</option>
						<option value={"Android"}>Android</option>
						<option value={"iOS"}>iOS</option>
					</select>
					<button onClick={addItemHandler}>Add</button>
				</div>
				<ul>
					{props.wishes.map(el => {
						return (
							<li key={el.id}>
								<input type="checkbox" checked={el.checked}/>
								<span> {el.title} </span>
								<span> / OS: </span>
								<span> {el.OS} </span>
								<button onClick={()=>removeTaskHandler(el.id)}>X</button>
							</li>
						)
					})}
				</ul>
				<div>
					FILTER BY:
					<div>
						<select value={props.osFilter} onChange={(e) => ChangeOsHandler(e.currentTarget.value as OsType)}>
							<option value="All">All</option>
							<option value="Android">Android</option>
							<option value="iOS">iOS</option>
						</select>
					</div>
				</div>
			</div>
		);
}
