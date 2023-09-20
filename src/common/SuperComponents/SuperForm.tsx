import React, {useState} from 'react';
import {InputUniversal} from "./InputUniversal";
import {ButtonUniversal} from "./ButtonUniversal";

type SuperInputPropsType = {
    callBack: (newValue: string) => void
    setError: (value: string | null) => void
}
export const SuperForm: React.FC<SuperInputPropsType> = ({callBack,setError}) => {
    const [newValue, setNewValue] = useState<string>("")
    const onChangeHandler = (newValue: string) => {
        setNewValue(newValue)
        setError(null)
    }
    const onKeyDownCallBack = (key: string) => {
        if (key === "Enter") {
            onClickHandler()
        }
    }
    const onClickHandler = () => {
            callBack(newValue)
            setNewValue("")
    }
    return (
        <div>
            <InputUniversal callBack={onChangeHandler} value={newValue} onKeyDownCallBack={onKeyDownCallBack}/>
            <ButtonUniversal callBack={onClickHandler} name={"Add"}/>
        </div>
    );
};

