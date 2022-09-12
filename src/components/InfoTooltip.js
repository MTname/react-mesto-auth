import React from 'react';
import imgFAIL from '../images/Fail.svg';
import imgOK from '../images/Success.svg';

const InfoTooltip = ({ isOpen, onClose, successReg }) => {
    
    return (
        <div className={`popup popup_type_tooltip ${isOpen ? "popup_active" : ''}`} onClick={onClose} >
            {<div className="popup__box" onClick={(event) => {event.stopPropagation()}}>
                <button className="popup__close-button" onClick={onClose} type="button"></button>
                <img 
                    className="popup__imgTooltip" 
                    alt={successReg ? "Успешная регистрация" : "Ошибка регистрации"} 
                    src={successReg ? imgOK : imgFAIL}
                />
                <h2 className="popup__title popup__title_tooltip">
                    {successReg ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
            }
        </div>
    );
};

export default InfoTooltip;
