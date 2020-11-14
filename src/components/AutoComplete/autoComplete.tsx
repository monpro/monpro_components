import React, { ChangeEvent, FC, useState } from 'react'
import Input, { InputProps } from '../Input/input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  getSuggestions: (input: string) => string[]
  onSelect?: (item: string) => void
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { getSuggestions, onSelect, ...restProps } = props

  const [inputVal, setInputVal] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  console.log(suggestions)

  const getDropDownList = (suggestions: string[]) => {
    const handleClick = (item: string) => {
      setInputVal(item)
      setSuggestions([])
      if (onSelect) {
        onSelect(item)
      }
    }
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleClick(item)}>
              {item}
            </li>
          )
        })}
      </ul>
    )
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputVal(value)
    if (value) {
      const result = getSuggestions(value)
      setSuggestions(result)
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="mon-auto-complete">
      <Input value={inputVal} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && getDropDownList(suggestions)}
    </div>
  )
}

export default AutoComplete
