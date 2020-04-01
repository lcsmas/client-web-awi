import React from 'react'
import './Input.css'

function Input({ type = 'text', placeholder, onChange, value, className = 'InputText' }) {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    )

}

export default Input