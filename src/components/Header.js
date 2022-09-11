import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ email, onLogout }) {
    
    return (
        <header className="header page__header-gap">
            <div className="header__logo"></div>
            <Switch>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__button">Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__button">Регистрация</Link>
                </Route>
                <Route path="/">
                    <div className="header__userEmail">{email}</div>
                    <button className="header__exitButton" onClick={onLogout}>Выйти</button>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;