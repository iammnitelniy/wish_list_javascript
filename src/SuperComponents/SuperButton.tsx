import React from 'react';

type SuperButtonPropsType = {
    callBack: () => void
    name: string
}


const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        callBack,
        name,
        ...restProps

    }

) => {

   const onClickHandler = () => {

       callBack()

   }

    return (
        <button onClick={onClickHandler}>{name}</button>
    );
};

export default SuperButton;