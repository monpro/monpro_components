import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'


describe('test Button component', () => {
    it('should render the default button', () => {
        const wrapper = render(<Button>test nice</Button>)
        const element = wrapper.getByText('test nice')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
    })
})

