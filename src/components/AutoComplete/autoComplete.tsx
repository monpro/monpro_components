import React, {ChangeEvent, FC, useState} from 'react'
import Input, {InputProps} from "../Input/input";


export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'>{
    getSuggestions: (input: string) => string[];
    onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        getSuggestions,
        onSelect,
        value,
        ...restProps
    } = props

    const [inputVal, setInputVal] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputVal(value)
    }

    return (
        <div className='mon-auto-complete'>
            <Input
             value={value}
             {...restProps}
            />
        </div>
    )
}

export default AutoComplete
