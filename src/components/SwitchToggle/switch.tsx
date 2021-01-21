import {FC} from "react";
import Icon from "../Icon/icon";
import React from "react";
import {InputProps} from "../Input/input";

export const SwitchToggle: FC<InputProps> = (props) => {
  return (
    <input type="checkbox" name="name" id="id"/>
  )
}


export default SwitchToggle;
