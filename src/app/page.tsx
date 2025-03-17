import { Navigation } from "@/components/Navigation";
import { Home } from "@/components/Home";
import { Formation } from "@/components/Formation";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function Page() {
    return (
        <main className="min-h-screen bg-darker-gray">
            <Navigation />
            <section id="home">
                <Home />
            </section>
            <section id="formation">
                <Formation />
            </section>
            <section id="experience">
                <Experience />
            </section>
            <section id="projects">
                <Projects />
            </section>
            <section id="skills">
                <Skills />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </main>
    );
}