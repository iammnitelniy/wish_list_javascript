import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type SuperInputPropsType = {
    callBack: (newValue: string)=> void
    value: string
    onKeyDownHandlerCallBack: (onKeyDownValue: string)=> void

}






export const SuperInput: React.FC<SuperInputPropsType> = ({callBack, value, onKeyDownHandlerCallBack, ...rest} ) => {

  // const [superInputValue, setSuperInputValue] = useState<string>("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value)


    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyDownHandlerCallBack(e.key)
    }


//update




    return (
        <input type="text" value={value}  onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
    );
};

