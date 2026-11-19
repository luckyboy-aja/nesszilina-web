import { useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Certifications.css";

const certifications = [
    // Microsoft Certifications
    {
        id: "ms-architect-expert",
        vendor: "ms",
        vendorName: "Microsoft",
        title: "Microsoft Certified: Azure Solutions Architect Expert",
        level: "Expert",
        tier: "expert",
        domain: "cloud",
        description: "Návrh a architektúra komplexných cloudových a hybridných riešení na platforme Microsoft Azure s dôrazom na vysokú dostupnosť, škálovateľnosť a bezpečnosť.",
        tags: ["Cloud Architecture", "Microsoft Azure", "Infrastructure"],
        credentialId: "29073989E656ED9A",
        certNumber: "4B46E0-E4C3CS",
        featured: true
    },
    {
        id: "ms-security-engineer",
        vendor: "ms",
        vendorName: "Microsoft",
        title: "Microsoft Certified: Cloud and AI Security Engineer Associate",
        level: "Associate",
        tier: "associate",
        domain: "security",
        description: "Zabezpečenie cloudových prostredí a AI riešení, správa identít, ochrana dát a implementácia princípov Zero Trust architektúry.",
        tags: ["Cloud Security", "AI Security", "Zero Trust"],
        credentialId: "AB85879A541E1602",
        certNumber: "69C302-6CE839",
        featured: true
    },
    {
        id: "ms-azure-admin",
        vendor: "ms",
        vendorName: "Microsoft",
        title: "Microsoft Certified: Azure Administrator Associate",
        level: "Associate",
        tier: "associate",
        domain: "cloud",
        description: "Implementácia, správa a monitorovanie kritickej cloudovej infraštruktúry, virtuálnych sietí, úložísk a výpočtových zdrojov v Microsoft Azure.",
        tags: ["Cloud Administration", "Microsoft Azure", "Operations"],
        credentialId: "6337D428CFA30576",
        certNumber: "6770EC-ZD5766"
    },
    {
        id: "ms-ai-cloud-dev",
        vendor: "ms",
        vendorName: "Microsoft",
        title: "Microsoft Certified: Azure AI Cloud Developer Associate",
        level: "Associate",
        tier: "associate",
        domain: "ai",
        description: "Vývoj a integrácia inteligentných cloudových aplikácií s využitím Azure AI služieb, kognitívnych modelov a automatizovaného spracovania dát.",
        tags: ["Azure AI", "Cloud Development", "Cognitive Services"],
        credentialId: "C270C24CA82B6C58",
        certNumber: "80F4C3-69EOFD"
    },
    {
        id: "ms-ai-transformation-leader",
        vendor: "ms",
        vendorName: "Microsoft",
        title: "Microsoft Certified: AI Transformation Leader",
        level: "Leader",
        tier: "leader",
        domain: "ai",
        description: "Strategické riadenie digitálnej transformácie a zavádzanie umelej inteligencie do firemných procesov s cieľom maximalizovať efektivitu a obchodnú hodnotu.",
        tags: ["AI Strategy", "Digital Transformation", "Leadership"],
        credentialId: "D7A9D9360CEA9A13",
        certNumber: "R15703-F742ED"
    },
    {
        id: "ms-ai-fundamentals",
        vendor: "ms",
        vendorName: "Microsoft",
        title: "Microsoft Certified: Azure AI Fundamentals",
        level: "Fundamentals",
        tier: "fundamentals",
        domain: "ai",
        description: "Praktické využitie strojového učenia, spracovania prirodzeného jazyka a generatívnej umelej inteligencie v ekosystéme Microsoft Azure.",
        tags: ["Artificial Intelligence", "Machine Learning", "Azure"],
        credentialId: "86089550E861990A",
        certNumber: "CBD603-54C2BC"
    },

    // Oracle Certifications
    {
        id: "ora-oci-architect-associate",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Cloud Infrastructure Certified Architect Associate",
        level: "Associate",
        tier: "ora-associate",
        domain: "cloud",
        description: "Profesionálny návrh a nasadzovanie bezpečnej, vysoko výkonnej infraštruktúry, databáz a sieťových riešení v prostredí Oracle Cloud Infrastructure (OCI).",
        tags: ["Cloud Architecture", "OCI", "Infrastructure"],
        credentialId: "332336431OCI26CAA",
        featured: true
    },
    {
        id: "ora-agentic-ai",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Agentic AI Certified Foundations Associate",
        level: "Foundations Associate",
        tier: "ora-foundations",
        domain: "ai",
        description: "Návrh a využitie autonómnych AI agentov pre inteligentnú automatizáciu podnikových pracovných tokov a rozhodovacích procesov.",
        tags: ["Agentic AI", "Autonomous Agents", "Oracle AI"],
        credentialId: "332336431AAI26OFA"
    },
    {
        id: "ora-ai-database",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle AI Database Certified Foundations Associate",
        level: "Foundations Associate",
        tier: "ora-foundations",
        domain: "ai",
        description: "Moderná správa podnikových dát v Oracle AI Database vrátane vektorového vyhľadávania (AI Vector Search) a integrácie s jazykovými modelmi.",
        tags: ["AI Database", "Vector Search", "Data Management"],
        credentialId: "332336431OCI26DCFA"
    },
    {
        id: "ora-oci-ai-foundations",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
        level: "Foundations Associate",
        tier: "ora-foundations",
        domain: "ai",
        description: "Implementácia modelov strojového učenia, hlbokého učenia a generatívnej AI priamo nad cloudovou infraštruktúrou Oracle Cloud.",
        tags: ["OCI AI", "Machine Learning", "Generative AI"],
        credentialId: "332336431OCI26AICFA"
    },
    {
        id: "ora-oci-foundations",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Cloud Infrastructure Certified Foundations Associate",
        level: "Foundations Associate",
        tier: "ora-foundations",
        domain: "cloud",
        description: "Komplexná znalosť kľúčových cloudových služieb, bezpečnosti, správy nákladov a riadenia prístupov v Oracle Cloud Infrastructure.",
        tags: ["Oracle Cloud", "Core Infrastructure", "Cloud Services"],
        credentialId: "332336431OCI26FNDCFA"
    },
    {
        id: "ora-fusion-ai-agent-studio",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Fusion AI Agent Studio Certified Foundations Associate - Rel 1",
        level: "Foundations Associate",
        tier: "ora-foundations",
        domain: "ai",
        description: "Tvorba, konfigurácia a nasadzovanie špecializovaných AI asistentov a agentov v prostredí podnikových aplikácií Oracle Fusion.",
        tags: ["AI Agent Studio", "Oracle Fusion", "AI Automation"],
        credentialId: "332336431OFAASOFA"
    },
    {
        id: "ora-guided-learning-admin",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Guided Learning Administrator Certified Foundations Associate - Rel 1",
        level: "Foundations Associate",
        tier: "ora-foundations",
        domain: "enterprise",
        description: "Správa a nasadzovanie digitálnej adopčnej platformy Oracle Guided Learning pre efektívne zaškolenie používateľov v cloudových systémoch.",
        tags: ["Guided Learning", "Cloud Adoption", "Administration"],
        credentialId: "332336431OGLADM1CFA"
    },
    {
        id: "ora-fusion-erp",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Fusion Cloud Applications ERP Process Essentials Certified - Rel 1",
        level: "Process Essentials",
        tier: "ora-essentials",
        domain: "enterprise",
        description: "Optimalizácia podnikových finančných a účtovných procesov, fakturácie, správy majetku a controllingu v systéme Oracle Fusion Cloud ERP.",
        tags: ["Fusion ERP", "Financie & Účtovníctvo", "Enterprise"],
        credentialId: "332336431OMBPERPCFA1"
    },
    {
        id: "ora-cloud-epm",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Cloud Applications EPM Process Essentials Certified - Rel 1",
        level: "Process Essentials",
        tier: "ora-essentials",
        domain: "enterprise",
        description: "Riadenie výkonnosti podniku (Enterprise Performance Management), finančné plánovanie, rozpočtovanie, konsolidácia a reporting v Oracle Cloud EPM.",
        tags: ["Cloud EPM", "Enterprise Performance", "Planning"],
        credentialId: "332336431OMBPEPMCFA1"
    },
    {
        id: "ora-fusion-cx",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Fusion Cloud Applications CX Process Essentials Certified - Rel 1",
        level: "Process Essentials",
        tier: "ora-essentials",
        domain: "enterprise",
        description: "Digitalizácia obchodných, marketingových a servisných procesov pre riadenie vzťahov so zákazníkmi v Oracle Fusion Cloud CX.",
        tags: ["Fusion CX", "Customer Experience", "CRM"],
        credentialId: "332336431OMBPCXCFA1"
    },
    {
        id: "ora-fusion-hcm",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Fusion Cloud Applications HCM Process Essentials Certified - Rel 1",
        level: "Process Essentials",
        tier: "ora-essentials",
        domain: "enterprise",
        description: "Moderné riadenie ľudských zdrojov, personálnych procesov, talent manažmentu a miezd na platforme Oracle Fusion Cloud HCM.",
        tags: ["Fusion HCM", "Human Capital", "HR Procesy"],
        credentialId: "332336431OMBPHCMCFA1"
    },
    {
        id: "ora-fusion-scm",
        vendor: "oracle",
        vendorName: "Oracle",
        title: "Oracle Fusion Cloud Applications SCM Process Essentials Certified - Rel 1",
        level: "Process Essentials",
        tier: "ora-essentials",
        domain: "enterprise",
        description: "Komplexné riadenie dodávateľského reťazca, skladového hospodárstva, nákupu a logistiky v prostredí Oracle Fusion Cloud SCM.",
        tags: ["Fusion SCM", "Supply Chain", "Logistika"],
        credentialId: "332336431OMBPSCMCFA1"
    }
];

function MicrosoftLogo({ size = 18 }) {
    return (
        <svg className="vendor-logo-svg" viewBox="0 0 21 21" width={size} height={size} aria-hidden="true">
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
        </svg>
    );
}

function OracleLogo({ width = 28, height = 14 }) {
    return (
        <svg className="vendor-logo-svg oracle-svg" viewBox="0 0 36 18" width={width} height={height} aria-hidden="true">
            <rect x="3" y="3" width="30" height="12" rx="6" fill="none" stroke="#f80000" strokeWidth="3.2" />
        </svg>
    );
}

function CertificationBadge({ cert, scale = 1 }) {
    const w = Math.round(62 * scale);
    const h = Math.round(68 * scale);

    if (cert.vendor === "ms") {
        const starCount =
            cert.tier === "expert" ? 3 :
            cert.tier === "associate" ? 2 : 1;

        if (cert.tier === "leader") {
            return (
                <div className="cert-badge ms-badge ms-leader-badge" aria-hidden="true">
                    <svg viewBox="0 0 80 88" width={w} height={h}>
                        <defs>
                            <linearGradient id="msLeaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff5f6d" />
                                <stop offset="50%" stopColor="#d63384" />
                                <stop offset="100%" stopColor="#0078d4" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M40 4 L72 18 L72 46 C72 66 58 78 40 84 C22 78 8 66 8 46 L8 18 Z"
                            fill="url(#msLeaderGrad)"
                            stroke="#ffffff"
                            strokeWidth="2.5"
                        />
                        <path
                            d="M40 11 L65 22 L65 45 C65 61 53 71 40 77 C27 71 15 61 15 45 L15 22 Z"
                            fill="#0d1b2a"
                            opacity="0.88"
                        />
                        <text x="40" y="30" textAnchor="middle" fill="#93c5fd" fontSize="7.5" fontWeight="700" letterSpacing="0.8">
                            MICROSOFT
                        </text>
                        <text x="40" y="42" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800" letterSpacing="1">
                            AI LEADER
                        </text>
                        <polygon
                            points="40,49 42.9,55 49.5,55.9 44.7,60.5 45.8,67 40,63.9 34.2,67 35.3,60.5 30.5,55.9 37.1,55"
                            fill="#ff4d6d"
                        />
                    </svg>
                </div>
            );
        }

        const badgeLabel =
            cert.tier === "expert" ? "EXPERT" :
            cert.tier === "associate" ? "ASSOCIATE" : "FUNDAMENTALS";

        return (
            <div className={`cert-badge ms-badge ms-${cert.tier}-badge`} aria-hidden="true">
                <svg viewBox="0 0 80 88" width={w} height={h}>
                    <defs>
                        <linearGradient id={`msShield-${cert.tier}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={cert.tier === "expert" ? "#0078d4" : "#1e3a5f"} />
                            <stop offset="100%" stopColor="#004578" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M40 4 L70 15 L70 46 C70 65 57 77 40 84 C23 77 10 65 10 46 L10 15 Z"
                        fill={`url(#msShield-${cert.tier})`}
                        stroke={cert.tier === "expert" ? "#64ffda" : "#38bdf8"}
                        strokeWidth="2"
                    />
                    <text x="40" y="24" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="700">
                        Microsoft
                    </text>
                    <text x="40" y="32" textAnchor="middle" fill="#bae6fd" fontSize="5.5" fontWeight="600" letterSpacing="0.8">
                        CERTIFIED
                    </text>
                    <rect x="5" y="38" width="70" height="17" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
                    <text
                        x="40"
                        y="49.5"
                        textAnchor="middle"
                        fill="#0f172a"
                        fontSize={cert.tier === "fundamentals" ? "6.6" : "8"}
                        fontWeight="800"
                        letterSpacing="0.5"
                    >
                        {badgeLabel}
                    </text>
                    {starCount === 1 && (
                        <polygon
                            points="40,60 42.2,64.5 47,65.2 43.5,68.6 44.3,73.4 40,71.1 35.7,73.4 36.5,68.6 33,65.2 37.8,64.5"
                            fill="#ffffff"
                        />
                    )}
                    {starCount === 2 && (
                        <>
                            <polygon
                                points="32,60 33.9,63.9 38.2,64.5 35.1,67.5 35.8,71.8 32,69.8 28.2,71.8 28.9,67.5 25.8,64.5 30.1,63.9"
                                fill="#ffffff"
                            />
                            <polygon
                                points="48,60 49.9,63.9 54.2,64.5 51.1,67.5 51.8,71.8 48,69.8 44.2,71.8 44.9,67.5 41.8,64.5 46.1,63.9"
                                fill="#ffffff"
                            />
                        </>
                    )}
                    {starCount === 3 && (
                        <>
                            <polygon
                                points="26,59 27.6,62.3 31.2,62.8 28.6,65.3 29.2,68.9 26,67.2 22.8,68.9 23.4,65.3 20.8,62.8 24.4,62.3"
                                fill="#64ffda"
                            />
                            <polygon
                                points="40,63 41.8,66.6 45.8,67.2 42.9,70 43.6,74 40,72.1 36.4,74 37.1,70 34.2,67.2 38.2,66.6"
                                fill="#64ffda"
                            />
                            <polygon
                                points="54,59 55.6,62.3 59.2,62.8 56.6,65.3 57.2,68.9 54,67.2 50.8,68.9 51.4,65.3 48.8,62.8 52.4,62.3"
                                fill="#64ffda"
                            />
                        </>
                    )}
                </svg>
            </div>
        );
    }

    // Oracle Badges
    const ringColor =
        cert.tier === "ora-associate" ? "#94a3b8" :
        cert.tier === "ora-foundations" ? "#d97706" : "#8b5cf6";

    const labelTop =
        cert.tier === "ora-associate" ? "Associate" :
        cert.tier === "ora-foundations" ? "Foundations" : "Essentials";

    const labelBottom =
        cert.tier === "ora-foundations" ? "Associate" : "";

    return (
        <div className={`cert-badge oracle-badge ${cert.tier}`} aria-hidden="true">
            <svg viewBox="0 0 80 88" width={w} height={h}>
                <path d="M22 60 L22 84 L32 78 L40 84 L40 60 Z" fill={ringColor} opacity="0.65" />
                <path d="M40 60 L40 84 L48 78 L58 84 L58 60 Z" fill={ringColor} opacity="0.85" />
                <circle cx="40" cy="38" r="32" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
                <circle cx="40" cy="38" r="27" fill="#ffffff" stroke={ringColor} strokeWidth="3.5" />
                <text x="40" y="28" textAnchor="middle" fill="#e11d48" fontSize="7.5" fontWeight="800" letterSpacing="0.8">
                    ORACLE
                </text>
                <text x="40" y="35.5" textAnchor="middle" fill="#475569" fontSize="6" fontWeight="600">
                    Certified
                </text>
                <text x="40" y={labelBottom ? "45" : "47"} textAnchor="middle" fill="#0f172a" fontSize="7.2" fontWeight="800">
                    {labelTop}
                </text>
                {labelBottom && (
                    <text x="40" y="53" textAnchor="middle" fill="#0f172a" fontSize="6.8" fontWeight="800">
                        {labelBottom}
                    </text>
                )}
            </svg>
        </div>
    );
}

export default function Certifications() {
    useScrollReveal();
    const [vendorFilter, setVendorFilter] = useState("all");
    const [domainFilter, setDomainFilter] = useState("all");
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedCert(null);
            }
        };
        if (selectedCert) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedCert]);

    const filteredCerts = certifications.filter((cert) => {
        const matchesVendor = vendorFilter === "all" || cert.vendor === vendorFilter;
        const matchesDomain = domainFilter === "all" || cert.domain === domainFilter;
        return matchesVendor && matchesDomain;
    });

    return (
        <section id="certifikacie" className="certifications-section">
            <div className="section-header animate-on-scroll">
                <h2 className="section-title">Certifikácie a Odbornosť</h2>
                <p className="section-subtitle">
                    Garancia najvyššej technologickej kvality podložená medzinárodne uznávanými certifikátmi spoločností{" "}
                    <strong>Microsoft</strong> a <strong>Oracle</strong>
                </p>
            </div>

            {/* Highlight Banner without counts */}
            <div className="cert-stats-banner animate-on-scroll">
                <div className="cert-stat-item">
                    <span className="cert-pillar-title">Medzinárodne overená expertíza</span>
                    <span className="cert-stat-label">
                        Certifikované kompetencie pre návrh, bezpečnosť a prevádzku moderných podnikových IT riešení
                    </span>
                </div>
                <div className="cert-stat-divider"></div>
                <div className="cert-stat-item">
                    <div className="cert-stat-brand">
                        <MicrosoftLogo size={20} />
                        <span className="cert-pillar-title">Microsoft Certified</span>
                    </div>
                    <span className="cert-stat-label">
                        Cloudová architektúra Azure (Expert), umelá inteligencia a kybernetická bezpečnosť
                    </span>
                </div>
                <div className="cert-stat-divider"></div>
                <div className="cert-stat-item">
                    <div className="cert-stat-brand">
                        <OracleLogo width={30} height={15} />
                        <span className="cert-pillar-title">Oracle Certified</span>
                    </div>
                    <span className="cert-stat-label">
                        Oracle Cloud Infrastructure (OCI), autonómne AI databázy a podnikové systémy Fusion ERP / EPM
                    </span>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="cert-filters-wrapper animate-on-scroll">
                <div className="cert-vendor-tabs" role="tablist" aria-label="Filtrovať podľa poskytovateľa">
                    <button
                        type="button"
                        className={`cert-tab-btn ${vendorFilter === "all" ? "active" : ""}`}
                        onClick={() => setVendorFilter("all")}
                    >
                        Všetky certifikácie
                    </button>
                    <button
                        type="button"
                        className={`cert-tab-btn ms-tab ${vendorFilter === "ms" ? "active" : ""}`}
                        onClick={() => setVendorFilter("ms")}
                    >
                        <MicrosoftLogo />
                        Microsoft
                    </button>
                    <button
                        type="button"
                        className={`cert-tab-btn oracle-tab ${vendorFilter === "oracle" ? "active" : ""}`}
                        onClick={() => setVendorFilter("oracle")}
                    >
                        <OracleLogo />
                        Oracle
                    </button>
                </div>

                <div className="cert-domain-chips" aria-label="Filtrovať podľa technologickej oblasti">
                    {[
                        { key: "all", label: "Všetky oblasti" },
                        { key: "cloud", label: "Cloud & Architektúra" },
                        { key: "ai", label: "Umelá Inteligencia (AI)" },
                        { key: "security", label: "Kybernetická bezpečnosť" },
                        { key: "enterprise", label: "ERP / EPM / Fusion Aplikácie" }
                    ].map((d) => (
                        <button
                            key={d.key}
                            type="button"
                            className={`domain-chip ${domainFilter === d.key ? "active" : ""}`}
                            onClick={() => setDomainFilter(d.key)}
                        >
                            {d.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cards Grid */}
            <div className="certifications-grid">
                {filteredCerts.map((cert) => (
                    <article
                        key={cert.id}
                        className={`cert-card vendor-${cert.vendor} ${cert.featured ? "cert-featured" : ""}`}
                        onClick={() => setSelectedCert(cert)}
                    >
                        <div className="cert-card-main">
                            <div className="cert-card-top">
                                <div className="cert-vendor-pill">
                                    {cert.vendor === "ms" ? <MicrosoftLogo /> : <OracleLogo />}
                                    <span>{cert.vendorName}</span>
                                </div>
                                <span className={`cert-level-badge level-${cert.tier}`}>
                                    {cert.level}
                                </span>
                            </div>

                            <div className="cert-card-header-row">
                                <CertificationBadge cert={cert} />
                                <h3 className="cert-card-title">{cert.title}</h3>
                            </div>

                            <p className="cert-card-desc">{cert.description}</p>

                            <div className="cert-tags">
                                {cert.tags.map((tag, i) => (
                                    <span key={i} className="cert-tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="cert-card-footer">
                            <div className="cert-meta-row">
                                <span className="meta-label">ID certifikátu:</span>
                                <span className="meta-value mono">{cert.credentialId}</span>
                            </div>

                            <button
                                type="button"
                                className="cert-preview-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCert(cert);
                                }}
                            >
                                Detail certifikátu
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {/* Clean Visual Certificate Modal (without personal name or validity dates) */}
            {selectedCert && (
                <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
                    <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="cert-modal-header">
                            <div className="cert-modal-title-group">
                                <div className="cert-vendor-pill">
                                    {selectedCert.vendor === "ms" ? <MicrosoftLogo /> : <OracleLogo />}
                                    <span>{selectedCert.vendorName}</span>
                                    <span className={`cert-level-badge level-${selectedCert.tier}`}>
                                        {selectedCert.level}
                                    </span>
                                </div>
                                <h3>{selectedCert.title}</h3>
                            </div>
                            <button
                                type="button"
                                className="cert-modal-close"
                                onClick={() => setSelectedCert(null)}
                                aria-label="Zavrieť detail"
                            >
                                ✕
                            </button>
                        </div>

                        <div className={`cert-plaque plaque-${selectedCert.vendor}`}>
                            <div className="plaque-inner">
                                <div className="plaque-brand">
                                    {selectedCert.vendor === "ms" ? (
                                        <div className="plaque-ms-header">
                                            <MicrosoftLogo size={26} />
                                            <span>Microsoft Certified</span>
                                        </div>
                                    ) : (
                                        <div className="plaque-oracle-header">
                                            <OracleLogo width={40} height={20} />
                                            <span>ORACLE University • Certificate of Recognition</span>
                                        </div>
                                    )}
                                </div>

                                <div className="plaque-badge-center">
                                    <CertificationBadge cert={selectedCert} scale={1.45} />
                                </div>

                                <p className="plaque-company-label">Certifikovaná odbornosť spoločnosti</p>
                                <h4 className="plaque-company-name">NESS Žilina, spol. s r.o.</h4>

                                <h2 className="plaque-cert-title">{selectedCert.title}</h2>
                                <p className="plaque-cert-desc">{selectedCert.description}</p>

                                <div className="plaque-tags">
                                    {selectedCert.tags.map((tag, idx) => (
                                        <span key={idx} className="plaque-tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="plaque-credentials">
                                    <div className="plaque-cred-item">
                                        <span className="cred-label">Credential ID:</span>
                                        <code className="cred-code">{selectedCert.credentialId}</code>
                                    </div>
                                    {selectedCert.certNumber && (
                                        <div className="plaque-cred-item">
                                            <span className="cred-label">Číslo certifikátu:</span>
                                            <code className="cred-code">{selectedCert.certNumber}</code>
                                        </div>
                                    )}
                                    <div className="plaque-verified-pill">
                                        ✓ Overený certifikát
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
