
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const contextCards = [
  { title: 'Who wrote Luke/Acts?', body: 'Luke the physician, a Gentile, wrote Luke–Acts (c. late 50s/early 60s AD). Luke + Acts comprise ~27% of the NT.' },
  { title: 'Purpose & Audience', body: 'Addressed to Theophilus (likely a Roman official). Purpose: assure certainty about Jesus and defend the Church as God\'s people.' },
  { title: 'Theophilus — name meaning', body: "Means 'lover of God' or 'loved by God.' Luke addresses him with an honorific: 'most excellent.'" },
  { title: 'Herod the Great — quick sketch', body: 'Efficient yet ruthless client-king under Rome; massive building projects (incl. the Temple), high taxation, persistent paranoia.' },
  { title: 'Course of Abia & daughters of Aaron', body: 'Priests served in 24 divisions (1 week, twice a year). Abia was the 8th. Elisabeth being of Aaron highlights priestly lineage.' },
  { title: 'Casting Lots at the Temple', body: 'Lots assigned priestly tasks; being chosen to offer incense was once-in-a-lifetime. People prayed outside during incense offering.' },
];

const diggingQuestions = [
  { id: 'q1', prompt: 'Luke begins in a formal scholarly tone (vv.1–4) then writes for everyday readers. Why might this matter for how you trust and read Luke?' },
  { id: 'q2', prompt: 'What is the significance of Zechariah being of the course of Abia and Elisabeth of the daughters of Aaron? What does this communicate to the first readers?' },
  { id: 'q3', prompt: 'Many fear when encountering angels. From this passage (and others), what do you think they feared—the appearance, the authority, or the implications?' },
  { id: 'q4', prompt: 'Gabriel says, “Thy prayer is heard” (v.13). Which prayer? A long-ago, abandoned one? A present intercession for Israel? What does this suggest about God’s timing?' },
];

const crossRefs = [
  { ref: 'Malachi 4:5–6', note: 'Elijah motif; hearts of fathers to children — echoed in John’s ministry.' },
  { ref: 'Isaiah 40:3', note: 'A voice in the wilderness preparing the Lord’s way.' },
  { ref: 'Numbers 6:24–26', note: 'Priestly blessing Zechariah would have spoken to the people.' },
  { ref: 'Daniel 8:16–17; 9:20–27', note: 'Gabriel’s prior appearances; messianic timeline in view.' },
];

const nowWhatChallenges = [
  { title: 'Revive an Old Prayer', text: 'Write down a prayer you stopped praying. Commit to pray it daily this week. Note any nudges, doors, or encouragements that appear.' },
  { title: 'Blessing Someone by Name', text: 'Use Numbers 6:24–26 to bless someone today. Write their name into the blessing and send it to them.' },
  { title: 'Prepare the Way', text: 'Choose a small act that “makes a straight path” for someone else to meet Jesus (forgiveness, invitation, practical help). Do it this week.' },
];

const timeline = [
  { label: 'Gabriel to Daniel', sub: 'Dan 8–9', blurb: 'Angelic messenger frames a messianic hope.' },
  { label: 'Herod’s Temple Era', sub: '37–4 BC', blurb: 'Massive rebuilding; priestly rotations and public worship.' },
  { label: 'Zechariah’s Incense Duty', sub: 'Luke 1', blurb: 'Once-in-a-lifetime lot; people praying outside.' },
  { label: 'John’s Birth & Ministry', sub: 'Luke 1; 3', blurb: 'Turning hearts; preparing the Lord’s way.' },
];

function useLocalAnswers(key, initial) {
  const [answers, setAnswers] = useState(initial || {});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, [key]);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(answers));
    } catch {}
  }, [key, answers]);
  return [answers, setAnswers];
}

export default function Study() {
  const [answers, setAnswers] = useLocalAnswers('luke1-1-25-answers', {});
  const [tab, setTab] = useState('context');
  const [scriptureTab, setScriptureTab] = useState('KJV');

  const exportNotes = useMemo(() => {
    const lines = [
      'Dig & Discover – Luke 1:1–25 — My Notes',
      '',
      ...diggingQuestions.map((q, i) => `${i + 1}. ${q.prompt}\n${answers[q.id] || '(no notes yet)'}`),
    ];
    return lines.join('\n\n');
  }, [answers]);

  function copyNotes() {
    navigator.clipboard.writeText(exportNotes);
  }

  return (
    <main className="container">
      <header className="siteHeader">
        <h1>Luke 1:1–25 — Dig & Discover</h1>
        <p className="tagline">Hands-on Bible study with context, questions, and application.</p>
      </header>

      {/* Scripture Tabs */}
      <section className="card">
        <h2>Read the Scripture</h2>
        <div className="tabs">
          {['KJV','NASB','NIV','NLT'].map(v => (
            <button key={v} className={scriptureTab===v ? 'tab active' : 'tab'} onClick={() => setScriptureTab(v)}>{v}</button>
          ))}
        </div>

        {/* We embed the full passage via trusted Bible hosts to ensure accuracy and permissions */}
        <div className="iframeWrap">
          {scriptureTab === 'KJV' && (
            <iframe
              title="Luke 1:1-25 (KJV)"
              src="https://www.biblegateway.com/passage/?search=Luke%201%3A1-25&version=KJV"
              loading="lazy"
            />
          )}
          {scriptureTab === 'NASB' && (
            <iframe
              title="Luke 1:1-25 (NASB)"
              src="https://www.biblegateway.com/passage/?search=Luke%201%3A1-25&version=NASB"
              loading="lazy"
            />
          )}
          {scriptureTab === 'NIV' && (
            <iframe
              title="Luke 1:1-25 (NIV)"
              src="https://www.biblegateway.com/passage/?search=Luke%201%3A1-25&version=NIV"
              loading="lazy"
            />
          )}
          {scriptureTab === 'NLT' && (
            <iframe
              title="Luke 1:1-25 (NLT)"
              src="https://www.biblegateway.com/passage/?search=Luke%201%3A1-25&version=NLT"
              loading="lazy"
            />
          )}
        </div>
        <p className="muted small">Tip: Switch versions to compare phrasing. KJV appears here under public domain; others are displayed via BibleGateway.</p>
      </section>

      {/* Study Modes */}
      <section className="card">
        <h2>Explore the Passage</h2>
        <div className="tabs">
          <button className={tab==='context' ? 'tab active' : 'tab'} onClick={() => setTab('context')}>Context</button>
          <button className={tab==='word' ? 'tab active' : 'tab'} onClick={() => setTab('word')}>Word Study</button>
          <button className={tab==='application' ? 'tab active' : 'tab'} onClick={() => setTab('application')}>Application</button>
        </div>

        {tab === 'context' && (
          <div className="accordion">
            {contextCards.map((c, idx) => (
              <details key={idx} className="accItem">
                <summary>{c.title}</summary>
                <p>{c.body}</p>
              </details>
            ))}
          </div>
        )}

        {tab === 'word' && (
          <div className="grid2">
            <div className="miniCard">
              <h4>Theophilus</h4>
              <p>Name meaning: lover of God / loved by God; likely a Roman official addressed with honorific.</p>
            </div>
            <div className="miniCard">
              <h4>Abia (Abijah)</h4>
              <p>8th priestly course; signals Zechariah’s rotation in Temple service.</p>
            </div>
          </div>
        )}

        {tab === 'application' && (
          <div className="grid3">
            {nowWhatChallenges.map((nwc, i) => (
              <div key={i} className="miniCard hi">
                <h4>{nwc.title}</h4>
                <p>{nwc.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2>Digging Questions</h2>
        <div className="stack">
          {diggingQuestions.map((q, i) => (
            <div key={q.id} className="qaCard">
              <p className="q"><strong>{i + 1}.</strong> {q.prompt}</p>
              <textarea
                className="answer"
                placeholder="Type your notes here…"
                value={answers[q.id] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <div className="actionsRow">
          <button className="button" onClick={copyNotes}>Copy My Notes</button>
          <a className="button outline" href="https://discord.gg/your-invite" target="_blank" rel="noreferrer">Join Discord</a>
          <span className="muted">Tip: paste your notes in our Discord channel.</span>
        </div>
      </section>

      <section className="grid2">
        <div className="card">
          <h2>Cross-Reference Hunt</h2>
          <ul className="list">
            {crossRefs.map((c, i) => (
              <li key={i}><strong>{c.ref}</strong> — {c.note}</li>
            ))}
          </ul>
          <p className="muted">Open these in your preferred Bible app to see echoes and fulfillment patterns.</p>
        </div>

        <div className="card">
          <h2>Quick Timeline</h2>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <li key={i}>
                <div className="tlItem">
                  <div className="tlHead">
                    <strong>{t.label}</strong>
                    <span className="badge">{t.sub}</span>
                  </div>
                  <div className="tlBody">{t.blurb}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Marvels of Christ — The Word Swamp</footer>
    </main>
  );
}
