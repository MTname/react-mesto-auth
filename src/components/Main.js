import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardDelete, onCardClick, cards, onCardLike }) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="content">
            <section className="profile content__profile-gap">
                <button 
                    className="profile__avatar" 
                    onClick={onEditAvatar} 
                    type="button" 
                    aria-label="Кнопка редактирования аватара" 
                    style={{ backgroundImage: `url(${currentUser?.avatar})` }}
                ></button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser?.name}</h1>
                    <button 
                        className="profile__edit-button" 
                        onClick={onEditProfile} 
                        type="button" 
                        aria-label="Кнопка редактирования профиля"
                    ></button>
                    <p className="profile__text">{currentUser?.about}</p>
                </div>
                <button 
                    className="profile__add-button" 
                    onClick={onAddPlace} 
                    type="button" 
                    aria-label="Кнопка добавления карточки"
                ></button>
            </section>
            <section className="elements" aria-label="Каталог изображений">
                {cards?.map(card => 
                    <Card
                        key={card._id}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        card={card}
                        onCardDelete={onCardDelete}
                    />
                )}
            </section>
        </main>
    );
}

export default Main;
