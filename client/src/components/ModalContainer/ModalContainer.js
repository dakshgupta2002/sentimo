import React, { useEffect } from 'react'
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
    return (
        <>
            {isOpen &&
                <div className="modalContainer">
                    <div className={`modalBox ${className}`} style={modstyle}>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default ModalContainer;