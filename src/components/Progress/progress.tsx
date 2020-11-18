import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'
export interface ProgressProps {
  percent: number
  height?: number
  displayText?: boolean
  styles?: React.CSSProperties
  theme?: ThemeProps
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, height, displayText, styles, theme } = props
  return (
    <div className="mon-progress-bar" style={styles}>
      <div
        className="mon-progress-bar-layout"
        style={{ height: `${height}px` }}
      >
        <div
          className={`mon-progress-bar-container color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {displayText && <span className="percent-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  height: 20,
  displayText: true,
  theme: 'success',
}

export default Progress
