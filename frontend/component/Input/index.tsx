import React from 'react'
import styles from './input.module.scss'

interface InputProps {
  id: string
  name?: string
  placeholder?: string
  type?: string
  label?: string
  readOnly?: boolean
  value?: string
  labelIcon?: React.ReactNode
  icon?: React.ReactNode
  size?: string
  maxLength?: number
  inputClass?: string
  autocomplete?: string
  handleFocus?: React.FocusEventHandler<HTMLInputElement>
  handleBlur?: React.FocusEventHandler<HTMLInputElement>
  handleChange?: React.ChangeEventHandler<HTMLElement>
  option?: string
}

const Input: React.FC<InputProps> = ({
  autocomplete,
  inputClass,
  maxLength,
  placeholder,
  type,
  label,
  id,
  name,
  readOnly,
  value,
  labelIcon,
  icon,
  handleFocus,
  handleBlur,
  handleChange,
  size,
  option,
}) => {
  const content = () => {
    if (type === 'textarea') {
      return (
        <div className={styles.textarea}>
          <textarea
            readOnly={readOnly}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
          />
        </div>
      )
    }
    return (
      <input
        type={type}
        readOnly={readOnly}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onFocus={handleFocus}
        autoComplete={autocomplete || 'off'}
        onBlur={handleBlur}
        onChange={handleChange}
        maxLength={maxLength}
        className={`${inputClass} ${option && styles[`input-${option}`]}`}
      />
    )
  }
  return (
    <div className={`${styles.container} ${styles[`size-${size ? size : 'm'}`]} ${labelIcon ? styles.icon : ''} input`}>
      {labelIcon ? <label htmlFor={id}>{labelIcon}</label> : <label htmlFor={id}>{label}</label>}
      {content()}
    </div>
  )
}

Input.defaultProps = {
  readOnly: false,
  type: 'text',
}
export default Input
