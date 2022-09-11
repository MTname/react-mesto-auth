import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    
    const currentUser = useContext(CurrentUserContext);
    
    const [values, setValues] = useState({ author: '', text: '' });
    const [isErrors, setIsErrors] = useState({ author: false, text: false });
    const [errorMessages, setErrorMessages] = useState({ author: '', text: '' });
    const [isFormNotValid, setIsFormNotValid] = useState(false); //или const [isFormNotValid, setIsFormNotValid] = useState();
    
    React.useEffect(() => {
        setIsFormNotValid(isErrors.author || isErrors.text);
    }, [isErrors.author, isErrors.text]);
    
    React.useEffect(() => {
        if (currentUser.name && currentUser.about && isOpen) {
            setValues({ // меняем стейт, когда данные пользователя пришли с сервера
                author: currentUser.name,
                text: currentUser.about,
            });
            setIsErrors({ author: false, text: false });
            setErrorMessages({ author: '', text: '' });
        }
    }, [currentUser, isOpen]);
    
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
        onUpdateUser({
            name: values.author,
            about: values.text,
        });
    };
    
    return (
        <PopupWithForm isFormNotValid={isFormNotValid} btnText="Сохранить" name="info" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input className={`popup__form-input popup__form-input_value_name ${isErrors.author ? "popup__form-input_type_error" : ''}`} id="input-title" name="author" value={values.author} onChange={onChange} type="text" placeholder="Введите имя" autoComplete="off" minLength={2} maxLength={40} required/>
            <span className={`popup__form-input-error input-title-error ${isErrors.author ? "popup__form-input-error_type_active" : ''}`}>{errorMessages.author}</span>
            <input className={`popup__form-input popup__form-input_value_name ${isErrors.text ? "popup__form-input_type_error" : ''}`} id="input-job" name="text" value={values.text} onChange={onChange} type="text" placeholder="Профессия, интересы" autoComplete="off" minLength={2} maxLength={200} required/>
            <span className={`popup__form-input-error input-job-error ${isErrors.text ? "popup__form-input-error_type_active" : ''}`}>{errorMessages.text}</span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
