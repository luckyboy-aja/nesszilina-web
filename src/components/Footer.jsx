import "./Footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>NESS <span className="logo-accent">Žilina</span></h3>
                    <p>Spoľahlivý partner pre vaše podnikanie od roku 1993.</p>
                </div>
                <div className="footer-section">
                    <h4>Služby</h4>
                    <ul>
                        <li><a href="/#sluzby">IT Služby</a></li>
                        <li><a href="/#sluzby">Účtovníctvo</a></li>
                        <li><a href="/#sluzby">Obchod a sprostredkovanie</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Kontakt</h4>
                    <p>IČO: 31598404</p>
                    <p><a href="mailto:info@nesszilina.sk">Email: info@nesszilina.sk</a></p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} NESS Žilina, spol. s r.o. Všetky práva vyhradené.</p>
            </div>
        </footer>
    );
}
