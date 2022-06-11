import React, { useEffect, useState } from 'react'
import './ModalContainer.css'
const ModalContainer = ({
    isOpen = true,
    children,
    className,
    close,
    padding,
    style
}) => {
    const modstyle={padding: padding, ...style}
    const [onOutside, setOnOutside] = useState(true);

    return (
        <>
            {isOpen &&
                <div 
                    className="modalContainer"
                    onMouseDown={() => onOutside && close()}
                >
                    <div 
                        className={`modalBox ${className}`} 
                        style={modstyle} 
                        onMouseEnter={() => setOnOutside(false)}
                        onMouseLeave={() => setOnOutside(true)}
                    >
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default ModalContainer;