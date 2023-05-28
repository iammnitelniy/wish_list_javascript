import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import SuperButton from "./SuperButton";



export type SuperInputPropsType = {
    callBack: (value: string) => void
    type?: string;
    placeholder?: string;
    className?: string


}

export const SuperInput: React.FC<SuperInputPropsType> = (
    {

        callBack,
        ...restProps
    }
) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)

    }

    const addHandler = () => {
        callBack(title)
        setTitle("")
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addHandler()
        }
    }

    return (
        <>
        <input value={title} type={restProps.type} placeholder={restProps.placeholder} onChange={onChangeHandler}
               className={error ? "error" : ""} onKeyDown={onKeyDownHandler}
        />
            <SuperButton callBack={addHandler} name={'+'}/>
        {/*<button onClick={addHandler}>+</button>*/}
            {error && <div className={"error-message"}>{error}</div>}
        </>

    );
};

