import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Contact.css";
import { useState } from "react";

export default function Contact() {
    useScrollReveal();
    const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("submitting");

        const formData = new FormData(e.target);
        formData.append("access_key", "22522cab-cd3e-4231-be6c-ac4fe6e6b10d");
        formData.append("subject", "Nová správa z webu nesszilina.sk");
        formData.append("from_name", "NESS Žilina Web");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                setFormStatus("success");
                e.target.reset();
                setTimeout(() => setFormStatus("idle"), 5000);
            } else {
                setFormStatus("error");
                setTimeout(() => setFormStatus("idle"), 5000);
            }
        } catch (err) {
            console.error("Chyba pri odosielaní:", err);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 5000);
        }
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
                            <p><strong>NESS Žilina, spol. s r.o.</strong><br />IČO: 31598404<br />DIČ: 2020444327<br />IČ DPH: SK2020444327</p>
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
                            <input type="text" id="name" name="name" required placeholder="Vaše meno" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder="vas@email.sk" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Správa / Požiadavka</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Ako vám môžeme pomôcť?"></textarea>
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
