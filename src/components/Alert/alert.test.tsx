import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent } from '@testing-library/react'

import Alert, { AlertProps } from './alert'
config.disabled = true

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span>{props.icon}</span>
  }
})

const testProps: AlertProps = {
  title: 'test title',
  onClose: jest.fn(),
}

const alertTestProps: AlertProps = {
  ...testProps,
  type: 'danger',
  description: 'test danger alert',
  closable: false,
}

describe('test Alert component', () => {
  it('should render the default alert component', () => {
    const { container, queryByText } = render(<Alert {...testProps} />)
    expect(queryByText('test title')).toBeInTheDocument()
    expect(container.querySelector('.mon-alert')).toHaveClass(
      'mon-alert-default'
    )
    fireEvent.click(queryByText('times'))
    expect(testProps.onClose).toHaveBeenCalled()
    expect(queryByText('title')).not.toBeInTheDocument()
  })

  it('should render the alert component correctly with different props', () => {
    const { container, queryByText } = render(<Alert {...alertTestProps} />)
    expect(queryByText('test title')).toHaveClass('bold-title')
    expect(container.querySelector('.mon-alert')).toHaveClass(
      'mon-alert-danger'
    )
    expect(queryByText('test danger alert')).toBeInTheDocument()
    expect(queryByText('times')).not.toBeInTheDocument()
  })
})
