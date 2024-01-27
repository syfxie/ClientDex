import React from 'react'
import './button.css'

export default function Button({
                                   onClick,
                                   text = 'Button',
                                   color = '#00527A',
                                   fontSize=16,
                                   fontWeight='400',
                                   background = 'white',
                                   border = '#C3C0C0 3px solid',
                                   width='fit-content',
                                   height='fit-content',
                                   margin='5px',
                                   padding = '5px 10px 5px 10px',
                                   disabled = false,
                               }) {

    return (
        <button
            onClick={disabled ? () => {} : onClick}
            disabled={disabled}
            style={{color: color, fontSize: fontSize, fontWeight: fontWeight, background: background, border: border, width: width, height: height, padding: padding, margin:margin}}
        >
            {text}
        </button>
    );
}
