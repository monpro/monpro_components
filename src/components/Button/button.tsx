import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classnames from 'classnames'

type ButtonSize = 'lg' | 'sm'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

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

type NativeButtonTypes = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonTypes = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

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
    disabled: btnType === 'link' && disabled,
  })

  if (btnType === 'link' && href) {
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
  btnType: 'default',
}

export default Button
