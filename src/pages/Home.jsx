import Hero from "../components/Hero";
import Services from "../components/Services";
import Certifications from "../components/Certifications";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Certifications />
            <About />
            <Contact />
        </>
    );
}
