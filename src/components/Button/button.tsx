import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
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
  /** whether button is disabled**/
  disabled?: boolean
  /** the size of button**/
  size?: ButtonSize
  // type of button
  btnType?: ButtonType
  href?: string
  children: React.ReactNode
}

type NativeButtonTypes = BaseButtonProps &
  ButtonHTMLAttributes<HTMLElement>
type AnchorButtonTypes = BaseButtonProps &
  AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonTypes & AnchorButtonTypes>

/**
 *
 * ## Button Component
 * ~~~js
 * import { Button } from 'monproui'
 * ~~~
 *
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled,
    size,
    className,
    btnType,
    href,
    children,
    ...restProps
  } = props
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
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
