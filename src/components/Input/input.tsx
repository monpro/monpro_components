import React, {ReactElement, InputHTMLAttributes, FC, ChangeEvent} from 'react'
import { IconProps } from "../Icon/icon";
import classNames from 'classnames';
type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProps;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        onChange,
        style,
        ...restProps
    } = props

    const classes = classNames('mon-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append
    })
    const filterValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }

    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = filterValue(props.value)
    }
    return (
        <div className={classes} style={style}>

        </div>
    )
}

export default Input
