import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardLike, card, onCardDelete }) {
    
    const currentUser = React.useContext(CurrentUserContext);
    const { link, name, _id, owner: { _id: ownerId } } = card;
    const likes = card.likes.map((item) => item._id);
    const isOwn = ownerId === currentUser?._id; // Определяем, являемся ли мы владельцем текущей карточки
    const isLiked = likes.includes(currentUser?._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

    function handleClick() {
        onCardClick(card);
    }
    
    function handleLikeClick() {
        onCardLike(_id, isLiked);
    }

    function handleDeleteCard() {
        onCardDelete(_id);
    }
    
    return (
        <article className="element">
            <img className="element__image" src={link} alt={name} onClick={handleClick} />
            <div className="element__description">
            <h2 className="element__title">{name}</h2>
                <div className="element__likeBox">
                    <button className={`element__like ${isLiked ? "element__like_active" : ''}`} onClick={handleLikeClick} type="button" />
                    <h4 className="element__likeCounter">{likes.length}</h4>
                </div>
            </div>
            <button className={isOwn ? "element__delete" : "element__delete_removed"} onClick={handleDeleteCard} type="button" />
        </article>
    );
}

export default Card;
