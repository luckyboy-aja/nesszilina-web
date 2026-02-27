import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    NESS <span className="logo-accent">Žilina</span>
                </Link>

                <div className={`menu-icon ${isMobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
                    <li className="nav-item">
                        <a href="/#domov" className="nav-links" onClick={closeMobileMenu}>Domov</a>
                    </li>
                    <li className="nav-item">
                        <a href="/#sluzby" className="nav-links" onClick={closeMobileMenu}>Služby</a>
                    </li>
                    <li className="nav-item">
                        <a href="/#o-nas" className="nav-links" onClick={closeMobileMenu}>O nás</a>
                    </li>
                    <li className="nav-item">
                        <a href="/#kontakt" className="nav-links" onClick={closeMobileMenu}>Kontakt</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
