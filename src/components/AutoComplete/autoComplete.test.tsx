import React from 'react'
import { config } from 'react-transition-group'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, RenderItemType } from './autoComplete'

config.disabled = true

const states = [
  {
    value: 'Alabama',
    order: 0,
  },
  {
    value: 'Alaska',
    order: 1,
  },
  {
    value: 'American Samoa',
    order: 2,
  },
  {
    value: 'Arizona',
    order: 3,
  },
  {
    value: 'b',
    order: 52,
  },
  {
    value: 'c',
    order: 53,
  },
]

interface StateProps {
  value: string
  order: number
}

const stateRender = (item: RenderItemType<StateProps>) => {
  return (
    <>
      <h5>state: {item.value}</h5>
      <p>order: {item.order}</p>
    </>
  )
}

const defaultProps: AutoCompleteProps = {
  getSuggestions: (inputVal) =>
    states.filter((states) => states.value.includes(inputVal)),
  onSelect: jest.fn(),
  placeholder: 'test auto complete',
}

const getSuggestionsWithPromise = jest.fn((inputVal: string) =>
  Promise.resolve(states.filter((states) => states.value.includes(inputVal)))
)

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test default AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...defaultProps} />)
    inputNode = wrapper.getByPlaceholderText(
      'test auto complete'
    ) as HTMLInputElement
  })

  it('test default behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'A' } })
    await waitFor(() => {
      expect(wrapper.queryByText('Alabama')).toBeInTheDocument()
    })
    expect(
      wrapper.container.querySelectorAll('.suggestion-item').length
    ).toEqual(4)
    fireEvent.click(wrapper.getByText('Alaska'))
    expect(defaultProps.onSelect).toHaveBeenCalledWith({
      value: 'Alaska',
      order: 1,
    })
    expect(wrapper.queryByText('Alabama')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('Alaska')
  })

  it('test keyboard event', async () => {
    fireEvent.change(inputNode, { target: { value: 'A' } })
    await waitFor(() => {
      expect(wrapper.queryByText('Alabama')).toBeInTheDocument()
    })
    const firstItem = wrapper.queryByText('Alabama')
    const secondItem = wrapper.queryByText('Alaska')

    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstItem).toHaveClass('highlight-item')

    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondItem).toHaveClass('highlight-item')

    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstItem).toHaveClass('highlight-item')

    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(defaultProps.onSelect).toHaveBeenCalledWith({
      value: 'Alabama',
      order: 0,
    })
    expect(wrapper.queryByText('Alabama')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('Alabama')
  })

  it('test click outside hook', async () => {
    fireEvent.change(inputNode, { target: { value: 'A' } })
    await waitFor(() => {
      expect(wrapper.queryByText('Alabama')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('Alabama')).not.toBeInTheDocument()
  })

  it('test different rendered children', async () => {
    cleanup()
    const wrapper = render(
      <AutoComplete {...defaultProps} renderOption={stateRender} />
    )
    inputNode = wrapper.getByPlaceholderText(
      'test auto complete'
    ) as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'A' } })
    await waitFor(() => {
      expect(wrapper.queryByText('order: 0')).toBeInTheDocument()
    })
  })

  it('test async get suggestions function', async () => {
    cleanup()
    const wrapper = render(
      <AutoComplete
        {...defaultProps}
        getSuggestions={getSuggestionsWithPromise}
      />
    )
    inputNode = wrapper.getByPlaceholderText(
      'test auto complete'
    ) as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'A' } })
    await waitFor(() => {
      expect(wrapper.queryByText('Alabama')).toBeInTheDocument()
      expect(getSuggestionsWithPromise).toHaveBeenCalled()
    })
  })
})
