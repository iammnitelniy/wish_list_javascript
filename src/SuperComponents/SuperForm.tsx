import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {SuperButton} from "./SuperButton";
import {SuperInput} from "./SuperInput";

type SuperInputPropsType = {
    callBack: (newValue: string) => void
    setError: (value: string | null) => void


}


export const SuperForm: React.FC<SuperInputPropsType> = (
    {
        callBack,
        setError,
        ...restProps


    }
) => {

const [value, setValue] = useState<string>("")



    const onChangeHandler = (newValue: string) => {
            setValue(newValue)
        setError(null)
    }
    const onKeyDownHandler = (onKeyDownValue: string) => {
        if (onKeyDownValue === "Enter") {
            onClickHandler()
        }
    }
    const onClickHandler = () => {
            callBack(value)
            setValue("")
    }

    return (

        <div>
            <SuperInput callBack={onChangeHandler} value={value} onKeyDownHandlerCallBack={onKeyDownHandler}/>
            {/*<input value={newValue} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>*/}
            <SuperButton callBack={onClickHandler} name={"Add"}/>
        </div>


    );
};

