import React from 'react'
import Icon from '@mdi/react'
import { mdiCurrencyUsd, mdiCurrencyEur } from '@mdi/js'
import './input.css'

export interface InputProps extends DefaultProps {
    value?: string
    type?: string
    currency?: string
    placeholder?: string
    name?: string
    maxLength?: number
    onChange?: (value: string) => void
    onFocus?: () => void
    onBlur?: () => void
    onSubmit?: (value: string) => void
}

/**
 * Input: This component serves as a standard input field
 * @prop value: The input's value
 * @prop type: The input's type (i.e text, number)
 * @prop placeholder: The input's placeholder text
 * @prop name: The input's name
 * @prop maxLength: The maximum length of characters allowed for the input
 * @prop onChange: Callback invoked upon input change
 * @prop onFocus: Callback invoked upon input focus
 * @prop onBlur: Callback invoked upon input blur
 * @prop onSubmit: Callback invoked upon input submit (i.e upon hitting "Enter" on the input)
 * @returns JSX.Element
 * */
const Input = ({
    id,
    className,
    style,
    type,
    currency,
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
        <div className={`input ${className}`}>
            {currency ? (
                // Show currency symbol if currency provided
                // Note, since the data only has USD and EUR,
                // only need to handle those cases
                <div className="input_currency">
                    <Icon
                        path={
                            currency.toLowerCase() === 'eur'
                                ? mdiCurrencyEur
                                : mdiCurrencyUsd
                        }
                        color="#B8B8B9"
                        size={1}
                    />
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
