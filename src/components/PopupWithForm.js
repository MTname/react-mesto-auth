import React from "react";

function PopupWithForm({ isFormNotValid, btnText, name, title, children, isOpen, onClose, onSubmit }) {
    const className = `popup popup_type_${name} ${isOpen ? "popup_active" : ''}`;
    
    return (
        <div className={className} onClick={onClose} >
            <div className="popup__box" onClick={(event) => {event.stopPropagation()}}>
                <button className="popup__close-button" onClick={onClose} type="button"></button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit}>
                    {children}
                    <button 
                        className={`popup__save-button ${isFormNotValid ? "popup__save-button_disabled" : ''}`} 
                        type="submit" 
                        disabled={isFormNotValid}
                    >
                        {btnText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
