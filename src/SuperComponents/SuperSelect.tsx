import React from 'react';

type OptionType = {
    value: string;
    label: string;
};

type SuperSelectPropsType = {
    options: OptionType[];
    value: string;
    callBack: (value: string) => void;
};

const SuperSelect: React.FC<SuperSelectPropsType> = ({
                                                         options,
                                                         value,
                                                         callBack,
                                                     }) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        callBack(event.target.value);
    };

    return (
        <select value={value} onChange={onChangeHandler}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SuperSelect;