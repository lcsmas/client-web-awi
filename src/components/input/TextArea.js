import React from 'react'
import './TextArea.css'

export default function TextArea({rows, cols, onChange, className = 'TextArea', placeholder, ...props}) {
    return (
        <textarea className={className} rows={rows} cols={cols} placeholder={placeholder} onChange={onChange}>
            {props.children}
        </textarea>
    )
}
