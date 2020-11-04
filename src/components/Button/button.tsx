import React from 'react'
import classnames from 'classnames'
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  href?: string
  children: React.ReactNode
}

type NativeButtonTypes = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonTypes = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonTypes & AnchorButtonTypes>


const Button: React.FC<ButtonProps> = (props) => {
  const {
    disabled,
    size,
    className,
    btnType,
    href,
    children,
    ... restProps
  } = props
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button
          className={classes}
          disabled={disabled}
          {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
