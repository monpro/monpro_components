import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../hooks/useDebounce'
import classNames from 'classnames'
import useClickOutside from '../hooks/useClickOutside'

interface RenderItemObject {
  value: string
}

export type RenderItemType<T = {}> = T & RenderItemObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  getSuggestions: (
    input: string
  ) => RenderItemType[] | Promise<RenderItemType[]>
  onSelect?: (item: RenderItemType) => void
  renderOption?: (item: RenderItemType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { getSuggestions, onSelect, renderOption, value, ...restProps } = props

  const [inputVal, setInputVal] = useState(value as string)
  const [suggestions, setSuggestions] = useState<RenderItemType[]>([])
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const debounceValue = useDebounce(inputVal, 500)
  const startSearch = useRef(false)
  const autoCompleteRef = useRef<HTMLDivElement>(null)

  useClickOutside(autoCompleteRef, () => setSuggestions([]))
  useEffect(() => {
    async function handleSuggestions() {
      if (debounceValue && startSearch.current) {
        const result = getSuggestions(debounceValue)
        if (result instanceof Promise) {
          setIsLoading(true)
          const data = await result
          setIsLoading(false)
          setSuggestions(data)
        } else {
          setSuggestions(result)
        }
      } else {
        setSuggestions([])
      }
      setHighlightIndex(-1)
    }
    handleSuggestions()
  }, [debounceValue])
  const getRenderChildren = (item: RenderItemType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const handleSelect = (item: RenderItemType) => {
    setInputVal(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    startSearch.current = false
  }

  const getDropDownList = (suggestions: RenderItemType[]) => {
    return (
      <ul className="mon-suggestion-list">
        {suggestions.map((item, index) => {
          const classes = classNames('suggestion-item', {
            'highlight-item': index === highlightIndex,
          })
          return (
            <li
              className={classes}
              key={index}
              onClick={() => handleSelect(item)}
            >
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
    startSearch.current = true
  }

  const setHighLight = (index: number) => {
    index = Math.max(0, index)
    index = Math.min(suggestions.length - 1, index)
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // enter
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38: // up
        setHighLight(highlightIndex - 1)
        break
      case 40: // down
        setHighLight(highlightIndex + 1)
        break
      case 27: // esc
        setSuggestions([])
        break
      default:
        break
    }
  }

  return (
    <div className="mon-auto-complete" ref={autoCompleteRef}>
      <Input
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {suggestions.length > 0 && getDropDownList(suggestions)}
      {isLoading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
    </div>
  )
}

export default AutoComplete
