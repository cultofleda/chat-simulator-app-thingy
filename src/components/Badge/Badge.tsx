import * as React from 'react'

import { Span } from './styles'

type BadgeProps = {
  color?: 'primary' | 'secondary'
  label: string
  margin?: 'top' | 'right' | 'bottom' | 'left'
}

const Badge: React.FC<BadgeProps> = ({ color, label, margin }) => (
  <Span margin={margin || 'left'} color={color || 'primary'}>
    {label}
  </Span>
)

Badge.defaultProps = {
  margin: 'left',
  color: 'primary',
}

export default Badge
