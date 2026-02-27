import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Contact.css";
import { useState } from "react";

export default function Contact() {
    useScrollReveal();
    const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus("submitting");

        // Simulate form submission
        setTimeout(() => {
            setFormStatus("success");
            e.target.reset();

            // Reset status after a few seconds
            setTimeout(() => setFormStatus("idle"), 5000);
        }, 1500);
    };

    return (
        <section id="kontakt" className="contact-section">
            <div className="section-header animate-on-scroll">
                <h2 className="section-title">Kontaktujte nás</h2>
                <p className="section-subtitle">Sme pripravení vypočuť si vaše potreby a navrhnúť optimálne riešenie</p>
            </div>

            <div className="contact-container animate-on-scroll">
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-icon">📍</div>
                        <div className="info-details">
                            <h3>Adresa</h3>
                            <p>Stará Hradská 24<br />010 03 Žilina - Budatín<br />Slovenská republika</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">🏢</div>
                        <div className="info-details">
                            <h3>Fakturačné údaje</h3>
                            <p><strong>NESS Žilina, spol. s r.o.</strong><br />IČO: 31598404<br />DIČ: 2020448135<br />IČ DPH: SK2020448135</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">✉️</div>
                        <div className="info-details">
                            <h3>Email</h3>
                            <p><a href="mailto:info@nesszilina.sk">info@nesszilina.sk</a></p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Meno / Spoločnosť</label>
                            <input type="text" id="name" required placeholder="Vaše meno" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required placeholder="vas@email.sk" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Správa / Požiadavka</label>
                            <textarea id="message" rows="5" required placeholder="Ako vám môžeme pomôcť?"></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${formStatus}`}
                            disabled={formStatus === 'submitting' || formStatus === 'success'}
                        >
                            {formStatus === 'submitting' ? 'Odosielam...' :
                                formStatus === 'success' ? 'Správa odoslaná ✓' :
                                    'Odoslať správu'}
                        </button>

                        {formStatus === 'success' && (
                            <p className="form-success-msg">Ďakujeme. Vaša správa bola úspešne odoslaná. Ozveme sa vám čo najskôr.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
