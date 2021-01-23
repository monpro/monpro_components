import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react'
import classnames from 'classnames'
export interface SwitchToggleProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'onChange'> {
  id: string
  name?: string
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  optionalLabels?: [string, string]
  disabled?: boolean
}

export const SwitchToggle: FC<SwitchToggleProps> = (props) => {
  const {
    id,
    name,
    checked,
    onChange,
    optionalLabels = ['Y', 'N'],
    disabled = false,
  } = props
  const switchClasses = classnames('mon-toggle-switch-switch', {
    'mon-toggle-switch-disabled': disabled,
  })

  return (
    <div className="mon-toggle-switch">
      <input
        className="mon-toggle-switch-checkbox"
        checked={checked}
        onChange={onChange}
        type="checkbox"
        name={name}
        id={name}
      />
      <label className="mon-toggle-switch-label" htmlFor={name}>
        <span
          className="mon-toggle-switch-inner"
          yes-text={optionalLabels[0]}
          no-text={optionalLabels[1]}
        />
        <span className={switchClasses} />
      </label>
    </div>
  )
}

export default SwitchToggle
