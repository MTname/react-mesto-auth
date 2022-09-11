import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    
    const avatarRef = useRef();

    useEffect(() => {
        if (isOpen) {
            avatarRef.current.value = '';
        }
    }, [isOpen]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    };
    
    return (
        <PopupWithForm isFormNotValid={null} btnText="Сохранить" name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input className="popup__form-input popup__form-input_value_text" id="input-avatar" type="url" name="avatarUrl" ref={avatarRef} placeholder="Путь файла фото" autoComplete="off" minLength={2} required/>
            <span className="popup__form-input-error input-avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
