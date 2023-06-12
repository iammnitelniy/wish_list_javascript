import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    editContent: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {


    const [edit, setEdit] = useState(true)
    const [newTitle, setNewTitle] = useState("")



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onEditHandler = () => {
        props.editContent(newTitle)
        setEdit(!edit)
    }

    const doubleClickHandler = () => {
        setEdit(false)
    }

    return(

        edit ? <span onDoubleClick={doubleClickHandler}>{props.title}</span> : <input autoFocus type="text" onChange={onChangeHandler} onBlur={onEditHandler}/>

    )
};