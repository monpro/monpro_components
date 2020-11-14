import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import { Input, InputProps } from './input'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test input component',
}

describe('test the input component', () => {
  it('the default input should be rendered correctly', () => {
    const wrapper = render(<Input {...defaultProps} />)
    const inputElement = wrapper.getByPlaceholderText(
      'test input component'
    ) as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('mon-input-inner')
    fireEvent.change(inputElement, { target: { value: '33' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(inputElement.value).toEqual('33')
  })

  it('the disabled component cannot trigger onChange', () => {
    const wrapper = render(<Input {...defaultProps} disabled />)
    const inputElement = wrapper.getByPlaceholderText(
      'test input component'
    ) as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    expect(inputElement.disabled).toBeTruthy()
  })

  it('the button should have different size', () => {
    const wrapper = render(<Input {...defaultProps} size="lg" />)
    const inputContainer = wrapper.container.querySelector('.mon-input-wrapper')
    expect(inputContainer).toHaveClass('input-size-lg')
  })

  it('the button should have prepend and append element', () => {
    const wrapper = render(
      <Input placeholder="icons" prepend="coffee" append="latte" />
    )
    const inputContainer = wrapper.container.querySelector('.mon-input-wrapper')
    expect(inputContainer).toHaveClass(
      'input-group input-group-prepend input-group-append'
    )
    expect(wrapper.queryByText('coffee')).toBeInTheDocument()
    expect(wrapper.queryByText('latte')).toBeInTheDocument()
  })
})
