import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import Button, {ButtonProps, ButtonSize, ButtonType} from './button'

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Danger,
    size: ButtonSize.Small,
    className: 'test-class'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button component', () => {
    it('should render the default button', () => {
        const wrapper = render(<Button {...defaultProps} >test nice</Button>)
        const element = wrapper.getByText('test nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()

        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it('should render the correct component with testProps', () => {
        const wrapper = render(<Button {...testProps} >test nice</Button>)
        const element = wrapper.getByText('test nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-danger btn-sm test-class')
    })
    it('should render a link when btnType is link and href is assigned', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href={"https://www.google.com"}>test link</Button>)
        const element = wrapper.getByText('test link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render a disabled button when disabled is true', () => {
        const wrapper = render(<Button {...disabledProps} >test nice</Button>)
        const element = wrapper.getByText('test nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })


})

