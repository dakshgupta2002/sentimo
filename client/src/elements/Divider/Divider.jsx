import React from 'react'
import './Divider.css';

export default function Divider({text}) {
    return (
        <div className="divider">
            <span></span> <span>{text}</span> <span></span>   
        </div>
    )
}