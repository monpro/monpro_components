import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import Upload, { UploadProps } from './upload'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'

jest.mock('../Icon/icon', () => {
  // @ts-ignore
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
const defaultProps: UploadProps = {
  action: 'test.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const file = new File(['testsdf'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...defaultProps}>upload area</Upload>)
    fileInput = wrapper.container.querySelector('.mon-file-input')
    uploadArea = wrapper.queryByText('upload area')
  })

  it('upload func works', async () => {
    mockAxios.post.mockResolvedValue({ data: 'cool' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [file] } })
    expect(wrapper.queryByText('spinner')).toBeInTheDocument()
    await wait(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    expect(defaultProps.onSuccess).toHaveBeenCalledWith('cool', file)
    expect(defaultProps.onChange).toHaveBeenCalledWith(file)
  })
})
