
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <header className="siteHeader">
        <h1>The Word Swamp</h1>
        <p className="tagline">Dig & Discover Bible Studies</p>
      </header>

      <section className="card intro">
        <h2>Welcome</h2>
        <p>
          Dive into Scripture with our wise and witty gator guides! Explore God’s Word,
          dig up hidden treasures, and discover truths that stick—no waders required.
        </p>
        <p>
          Start with our hands-on study of <strong>Luke 1:1–25</strong>:
        </p>
        <p className="buttonRow">
          <Link className="button" href="/luke-1-1-25">Open the Study</Link>
          <a className="button outline" href="https://discord.gg/your-invite" target="_blank" rel="noreferrer">Join Discord</a>
        </p>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Marvels of Christ — The Word Swamp</footer>
    </main>
  );
}
