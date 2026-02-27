import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Services.css";

const services = [
    {
        icon: "💻",
        title: "IT a spracovanie údajov",
        description: "Komplexné počítačové služby a automatizované spracovanie dát pre optimalizáciu vašich procesov."
    },
    {
        icon: "📊",
        title: "Vedenie účtovníctva",
        description: "Profesionálne vedenie podvojného aj jednoduchého účtovníctva s garantovanou diskrétnosťou."
    },
    {
        icon: "🤝",
        title: "Účtovné a ekonomické poradenstvo",
        description: "Činnosť organizačných a ekonomických poradcov pre zdravý rast a stabilitu vašej firmy."
    },
    {
        icon: "📈",
        title: "Obchodná činnosť",
        description: "Široká obchodná činnosť v rozsahu voľných živností na mieru vašim potrebám."
    },
    {
        icon: "🌐",
        title: "Sprostredkovanie obchodu",
        description: "Efektívne prepájanie obchodných partnerov a sprostredkovateľské služby na vysokej úrovni."
    },
    {
        icon: "⚙️",
        title: "Prenájom strojov a prístrojov",
        description: "Krátkodobý aj dlhodobý prenájom techniky a prístrojov pre zabezpečenie vašej plynulej prevádzky."
    }
];

export default function Services() {
    useScrollReveal();

    return (
        <section id="sluzby" className="services-section">
            <div className="section-header animate-on-scroll">
                <h2 className="section-title">Naše Služby</h2>
                <p className="section-subtitle">Odbornosť, skúsenosti a komplexné riešenia od roku 1993</p>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card animate-on-scroll"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-desc">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
