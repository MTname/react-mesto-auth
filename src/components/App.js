import 'index.css';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from "./Login";
import Main from './Main';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

function App() {
    
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [successReg, setSuccessReg] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    
    const history = useHistory();
    
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };
    
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    };
    
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
    };
    
    const [selectedCard, setSelectedCard] = useState(null);
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
    
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsTooltipPopupOpen(false);
    };
    
    // ?????????????????????????? ???????????????? ???? Esc
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isTooltipPopupOpen;
    useEffect(() => {
        function handleEscClose(event) {
            if(event.key === 'Escape') {
                closeAllPopups();
            }
        }
        if(isOpen) {
            document.addEventListener('keydown', handleEscClose);
            return () => {
                document.removeEventListener('keydown', handleEscClose);
            };
        }
    }, [isOpen]);
    
    const loginUser = useCallback(() => {
        setLoggedIn(true);
    }, []);

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then((res) => {
                if (res?.token) {
                    localStorage.setItem('jwt', res.token);
                    loginUser();
                    history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
                setSuccessReg(false);
                setIsTooltipPopupOpen(true);
            })
    };

    const handleRegister = (email, password) => {
        auth.register(email, password)
        .then((res) => {
            if (res.data) {
                setSuccessReg(true);
                setIsTooltipPopupOpen(true);
                history.push("/sign-in");
            } else {
                setSuccessReg(false);
                setIsTooltipPopupOpen(true);
            }
        })
        .catch(err => {
            console.log(err);
            setSuccessReg(false);
            setIsTooltipPopupOpen(true);
        });
    };
    
    const logoutUser = useCallback(() => {
        setLoggedIn(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt'); // ?????????????? ??????????
        logoutUser();
        history.push("/sign-in");
    };

    // ???????????????? ???????????? ????????????????????????
    useEffect(() => {
        if (loggedIn) {
            api.getUser()
            .then((res) => setCurrentUser(res))
            .catch((err) => console.log(err)); // ?????????????? ???????????? ?? ??????????????
        }
        
    }, [loggedIn]);
    
    // ???????????????? ????????????????
    useEffect(() => {
        if (loggedIn) {
            api.getCards()
            .then((res) => setCards(res))
            .catch((err) => console.log(err));
        }
    }, [loggedIn]);
    
    const handleUpdateAvatar = (avatarData) => {
        api.editAvatar(avatarData)
        .then((newData) => {
            setCurrentUser(newData);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
    };
    
    const handleUpdateUser = (userData) => {
        api.editUserInfo(userData)
        .then((newData) => {
            setCurrentUser(newData);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
    };
    
    const handleAddPlaceSubmit = (cardData) => {
        api.addCard(cardData)
        .then((newCard) => {
            setCards((cards) => [newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
    };

    // ?????????????? ??????????????????/???????????? ?????????? ???? ????????????????
    function handleCardLike(id, isLiked) {
        api.switchLike(id, isLiked) // ??????????????????, ???????? ???? ?????? ???????? ???? ????????(id) ????????????????: ????????????????/?????????? ????????
        .then((res) => {
            setCards((state) => state.map(card => card._id === res._id ? res : card));
        })
        .catch((err) => console.log(err));
    }

    // ?????????????? ???????????????? ????????????????
    function handleDeleteCardClick(cardId) {
        api.deleteCard(cardId) // ?????????????????? _id ?????????????????? ????????????????: ??????????????/??????
        .then((_id) => {
            setCards((state) => state.filter(card => card._id !== cardId));
        })
        .catch((err) => console.log(err));
    }
    
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt)
            .then((res) => { // ?????????????????? ?????????? ????????????????????????
                if (res) {
                    const email = (res.data.email);
                    setEmail(email);
                    loginUser();
                    history.push("/");
                }
            })
            .catch((err) => console.log(err)); 
          }
    }, [loginUser, history, loggedIn]);
    
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header email={email} onLogout={handleLogout} />
                <Switch>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} />
                    </Route>
                    <Route path="/sign-in">
                        <Login onLogin={handleLogin} />
                    </Route>
                    <ProtectedRoute  exact path="/"
                        component={Main}
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardDelete={handleDeleteCardClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                    />
                    <Route path="*">
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                    </Route>
                </Switch>
                <Footer />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <ImagePopup name="photo" isOpen={!!selectedCard} card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip isOpen={isTooltipPopupOpen}  onClose={closeAllPopups} successReg={successReg} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
