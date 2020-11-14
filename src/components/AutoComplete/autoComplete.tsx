import React, { ChangeEvent, FC, ReactElement, useState } from 'react'
import Input, { InputProps } from '../Input/input'

interface RenderItemObject {
  value: string
}

export type RenderItemType<T = {}> = T & RenderItemObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  getSuggestions: (input: string) => RenderItemType[]
  onSelect?: (item: RenderItemType) => void
  renderOption?: (item: RenderItemType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { getSuggestions, onSelect, renderOption, ...restProps } = props

  const [inputVal, setInputVal] = useState('')
  const [suggestions, setSuggestions] = useState<RenderItemType[]>([])
  console.log(suggestions)
  const getRenderChildren = (item: RenderItemType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const getDropDownList = (suggestions: RenderItemType[]) => {
    const handleClick = (item: RenderItemType) => {
      setInputVal(item.value)
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
              {getRenderChildren(item)}
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
