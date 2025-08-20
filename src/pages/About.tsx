import { Helmet } from "react-helmet-async";
import { Github, Linkedin } from "lucide-react";

const About = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-24">
      <Helmet>
        <title>Vinicius Motta - About</title>
        <meta name="description" content="About." />
        <link rel="canonical" href="/about" />
      </Helmet>

      <h1 className="text-xl font-semibold tracking-wider uppercase">About</h1>

      <div className="relative crt mt-4">
        {/* Profile */}
        <section className="retro-card p-4">
          <p className="text-sm text-muted-foreground leading-6 caret">
            Software engineer focused on building scalable solutions and solving real problems with code. Enjoys sharing what’s learned, exploring new technologies, and collaborating on projects.
          </p>
        </section>

        

        {/* Links */}
        <section className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <a
            href="https://github.com/vmotta8"
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex items-center gap-1"
            aria-label="GitHub"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vmotta8"
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex items-center gap-1"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
        </section>
      </div>
    </main>
  );
};

export default About;
