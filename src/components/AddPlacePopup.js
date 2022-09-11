import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    
    const [values, setValues] = useState({ placeName: '', text: '' });
    const [isErrors, setIsErrors] = useState({ placeName: false, text: false });
    const [errorMessages, setErrorMessages] = useState({ placeName: '', text: '' });
    const [isFormNotValid, setIsFormNotValid] = useState(false); //или const [isFormNotValid, setIsFormNotValid] = useState();
    
    React.useEffect(() => {
        setIsFormNotValid(isErrors.placeName || isErrors.text);
    }, [isErrors.placeName, isErrors.text]);
     
    React.useEffect(() => {
        if (isOpen || onClose) {
            setIsFormNotValid(true);
            setValues({
                placeName: '',
                text: '',
            });
            setIsErrors({ placeName: false, text: false });
            setErrorMessages({ placeName: '', text: '' });
        }
    }, [isOpen, onClose]);

    const onChange = (event) => {
        setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
        setIsErrors((isErrors) => ({ ...isErrors, [event.target.name]: !event.target.validity.valid }));
        if(!event.target.validity.valid) {
            setErrorMessages({ ...errorMessages, [event.target.name]: event.target.validationMessage });
        } else {
            setErrorMessages({ ...errorMessages, [event.target.name]: '' });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            name: values.placeName,
            link: values.text,
        });
    };
    
    return (
        <PopupWithForm 
            isFormNotValid={isFormNotValid} 
            btnText="Создать" 
            name="card-item" 
            title="Новое место" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit}
        >
            <input 
                className={`popup__form-input popup__form-input_value_name ${isErrors.placeName ? "popup__form-input_type_error" : ''}`} 
                id="input-name" 
                name="placeName" 
                value={values.placeName} 
                onChange={onChange} 
                type="text" 
                placeholder="Название" 
                autoComplete="off" 
                minLength={2} 
                maxLength={30} 
                required
            />
            <span 
                className={`popup__form-input-error input-name-error ${isErrors.placeName ? "popup__form-input-error_type_active" : ''}`}
            >
                {errorMessages.placeName}
            </span>
            <input 
                className={`popup__form-input popup__form-input_value_text ${isErrors.text ? "popup__form-input_type_error" : ''}`} 
                id="input-link" 
                name="text" 
                value={values.text} 
                onChange={onChange} 
                type="url" 
                placeholder="Путь файла фото" 
                autoComplete="off" 
                minLength={2} 
                required
            />
            <span className={`popup__form-input-error input-link-error ${isErrors.text ? "popup__form-input-error_type_active" : ''}`}
            >
                {errorMessages.text}
            </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
