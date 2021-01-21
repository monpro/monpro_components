import {FC, InputHTMLAttributes, ReactElement} from "react";
import React from "react";

export interface SwitchToggleProps extends InputHTMLAttributes<HTMLElement> {
  name?: string;
}
export const SwitchToggle: FC<SwitchToggleProps> = (props) => {
  const {
    name
  } = props;
  return (
    <div className="mon-toggle-switch">
      <input
        className="mon-toggle-switch-checkbox"
        type="checkbox" name={name} id={name}/>
      <label className="mon-toggle-switch-label" htmlFor={name}>
        <span className="mon-toggle-switch-inner" yes-text="Y" no-text="N"/>
        <span className="mon-toggle-switch-switch"/>
      </label>
    </div>

  )
}


export default SwitchToggle;
