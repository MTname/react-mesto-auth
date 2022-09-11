import React from "react";

function Footer() {
    return (
        <footer className="footer page__footer-gap">
            <p className="footer__copyright">© {new Date().getFullYear()} Tuganov M.| Mesto Russia</p>
        </footer>
    );
}

export default Footer;