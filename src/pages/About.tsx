import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-24">
      <Helmet>
        <title>Vinicius Motta - About</title>
        <meta name="description" content="About." />
        <link rel="canonical" href="/about" />
      </Helmet>

      <h1 className="text-2xl font-semibold tracking-wider uppercase">About</h1>
      <p className="mt-4 text-sm leading-6">
        Software engineer who enjoys building scalable solutions and solving real problems with code. I like sharing what I learn, exploring new technologies, and collaborating on projects.
      </p>
    </main>
  );
};

export default About;
