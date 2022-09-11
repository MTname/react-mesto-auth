import React from "react";

function ImagePopup({ name, card, isOpen, onClose }) {
    
    return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_active" : ''}`} onClick={onClose}>
        <div className="popup__illustration" onClick={(event) => {event.stopPropagation()}}>
            <button className="popup__close-button popup__close-button_type_openImg" onClick={onClose} type="button"></button>
            <img className="popup__image" src={`${card?.link || '#'}`} alt={`${card?.name ?? ' '}`}/>
            <p className="popup__subtitle">{`${card?.name ?? ' '}`}</p>
        </div>
    </div>
    );
}

export default ImagePopup;
