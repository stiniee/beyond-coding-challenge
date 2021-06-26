import React from 'react'
import './input.css'

export interface InputProps extends DefaultProps {
    value?: string | number
    type?: string
    icon?: React.ReactNode
    placeholder?: string
    name?: string
    maxLength?: number
    onChange?: (value: string | number) => void
    onFocus?: () => void
    onBlur?: () => void
    onSubmit?: (value: string | number) => void
}

/**
 * Input: This component serves as a standard input field
 * @prop value: The input's value
 * @prop icon: The input's icon, placed on the left of the input field
 * @prop type: The input's type (i.e text, number)
 * @prop placeholder: The input's placeholder text
 * @prop name: The input's name
 * @prop maxLength: The maximum length of characters allowed for the input
 * @prop onChange: Callback invoked upon input change
 * @prop onFocus: Callback invoked upon input focus
 * @prop onBlur: Callback invoked upon input blur
 * @prop onSubmit: Callback invoked upon input submit (i.e upon hitting "Enter" on the input)
 * @returns the Input component (JSX.Element)
 * */
const Input = ({
    id,
    className,
    style,
    type,
    icon,
    value,
    name,
    placeholder,
    maxLength,
    onChange,
    onFocus,
    onBlur,
    onSubmit,
}: InputProps): JSX.Element => {
    // Invokes onChange with the current input value (truncated if exceeds maxLength)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (onChange) onChange(event.target.value?.substring(0, maxLength))
    }

    // Invokes onSubmit upon hitting "Enter" key on the input
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (onSubmit && value && event.key === 'Enter') {
            onSubmit(value)
        }
    }

    return (
        <div className={`input ${icon ? 'with-icon' : ''} ${className}`}>
            {icon ? (
                <div
                    className="input_icon-container"
                    data-testid="input-icon-container"
                >
                    {icon}
                </div>
            ) : null}
            <input
                id={id}
                style={style}
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                maxLength={maxLength}
                data-testid="input"
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

Input.defaultProps = {
    className: '',
    placeholder: '',
    name: 'input',
    type: 'text',
    maxLength: 256,
}

export default Input
