import React, {ChangeEvent} from 'react';
type SuperCheckboxPropsType = {
    callBack: (filterValue: boolean) => void
    checked: boolean

}


const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        callBack,
        checked,
        ...restProps
    }

) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)

    }

    return (
       <input type='checkbox' checked={checked} onChange={onChangeHandler}/>
    );
};

export default SuperCheckbox;