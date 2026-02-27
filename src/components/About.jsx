import { useScrollReveal } from "../hooks/useScrollReveal";
import "./About.css";

export default function About() {
    useScrollReveal();

    return (
        <section id="o-nas" className="about-section">
            <div className="about-container animate-on-scroll">
                <div className="about-content">
                    <h2 className="section-title">O nás</h2>
                    <p className="about-text">
                        Spoločnosť <strong>NESS Žilina, spol. s r.o.</strong> pôsobí na trhu už od roku 1993. Sme stabilným a spoľahlivým partnerom pre podnikateľov aj spoločnosti v rôznych odvetviach.
                    </p>
                    <p className="about-text">
                        Špecializujeme sa na poskytovanie komplexných služieb v oblasti informačných technológií, od automatizovaného spracovania dát po sofistikované počítačové riešenia. Zároveň sme expertmi na profesionálne vedenie účtovníctva a ekonomické poradenstvo.
                    </p>
                    <p className="about-text">
                        Naším cieľom je odbremeniť vás od byrokracie a technologických výziev, aby ste sa mohli plne sústrediť na rast vášho biznisu.
                    </p>
                    <div className="about-stats">
                        <div className="stat-card">
                            <span className="stat-number">1993</span>
                            <span className="stat-label">Rok založenia</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">30+</span>
                            <span className="stat-label">Rokov skúseností</span>
                        </div>
                    </div>
                </div>

                <div className="about-visual">
                    <div className="visual-graphic">
                        <div className="circle-1"></div>
                        <div className="circle-2"></div>
                        <div className="glass-panel">
                            <h3>NESS Žilina</h3>
                            <p>IČO: 31598404</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
