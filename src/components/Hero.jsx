import "./Hero.css";
import { useEffect } from "react";

export default function Hero() {
    useEffect(() => {
        // Simple load animation
        const timer = setTimeout(() => {
            document.querySelector('.hero-content').classList.add('loaded');
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="domov" className="hero-section">
            <div className="hero-background">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
            </div>

            <div className="hero-content">
                <p className="hero-subtitle">IT Služby & Účtovníctvo</p>
                <h1 className="hero-title">
                    Spoľahlivý partner pre <br />
                    <span className="text-gradient">vaše podnikanie</span>
                </h1>
                <p className="hero-description">
                    Poskytujeme komplexné služby v oblasti informačných technológií, automatizovaného spracovania dát, obchodu a profesionálneho vedenia účtovníctva už od roku 1993.
                </p>
                <div className="hero-actions">
                    <a href="#sluzby" className="btn btn-primary">Naše služby</a>
                    <a href="#kontakt" className="btn btn-secondary">Kontaktujte nás</a>
                </div>
            </div>
        </section>
    );
}
