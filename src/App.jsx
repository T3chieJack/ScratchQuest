import React, { useMemo, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ diff: "all", tag: "all", time: "all" });
  const [active, setActive] = useState(null);

  const projects = useMemo(
    () => [
      {
        id: "chase-game",
        title: "Chase Game",
        summary: "Make a character chase a target with score and timer.",
        difficulty: "Beginner",
        time: 45,
        ages: "7–12",
        tags: ["Game", "Loops", "Events"],
        starterLink: "https://scratch.mit.edu/projects/editor/",
        steps: [
          "Add Cat (player) and Star (target) sprites.",
          "Move with arrow keys using ‘when key pressed’.",
          "Make Star jump with ‘go to random position’.",
          "On touching Star: add 1 to score and play a sound.",
          "Add timer and win screen at 30 points."
        ],
        assets: [
          { name: "Star sprite PNG", url: "#" },
          { name: "Bleep sound WAV", url: "#" }
        ],
        teacherPack: "#",
        coverEmoji: "🟡"
      },
      {
        id: "clicker",
        title: "Cookie Clicker Clone",
        summary: "Build a click-to-score game with upgrades and variables.",
        difficulty: "Intermediate",
        time: 60,
        ages: "8–13",
        tags: ["Game", "Variables", "Conditions"],
        starterLink: "https://scratch.mit.edu/projects/editor/",
        steps: [
          "Create ‘score’ variable and increase on sprite click.",
          "Add upgrade button that increases points per click.",
          "Use ‘broadcast’ to update UI labels.",
          "Save high score using cloud variable (optional)."
        ],
        assets: [
          { name: "Cookie PNG", url: "#" },
          { name: "UI buttons PNG", url: "#" }
        ],
        teacherPack: "#",
        coverEmoji: "🍪"
      },
      {
        id: "story-animator",
        title: "Animated Story",
        summary: "Tell a two-scene story with dialogue, music, and transitions.",
        difficulty: "Beginner",
        time: 45,
        ages: "7–12",
        tags: ["Story", "Sounds", "Broadcasts"],
        starterLink: "https://scratch.mit.edu/projects/editor/",
        steps: [
          "Pick two backdrops and two characters.",
          "Use ‘say’ and ‘wait’ to time dialogue.",
          "Switch scenes with ‘broadcast next scene’.",
          "Add background music that loops."
        ],
        assets: [
          { name: "Speech bubble PNGs", url: "#" },
          { name: "Calm music MP3", url: "#" }
        ],
        teacherPack: "#",
        coverEmoji: "🎬"
      }
    ],
    []
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery = `${p.title} ${p.summary} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      const matchesDiff = filters.diff === "all" || p.difficulty.toLowerCase() === filters.diff;
      const matchesTag = filters.tag === "all" || p.tags.map((t) => t.toLowerCase()).includes(filters.tag);
      const matchesTime =
        filters.time === "all" ||
        (filters.time === "short" && p.time <= 45) ||
        (filters.time === "medium" && p.time > 45 && p.time <= 60) ||
        (filters.time === "long" && p.time > 60);
      return matchesQuery && matchesDiff && matchesTag && matchesTime;
    });
  }, [query, filters, projects]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 group">
              <Logo className="h-8 w-8" />
              <span className="font-bold text-lg tracking-tight group-hover:opacity-80">ScratchQuest</span>
              <span className="sr-only">Go to home</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#projects" className="text-sm font-medium hover:text-neutral-700">Projects</a>
              <a href="#getting-started" className="text-sm font-medium hover:text-neutral-700">Getting Started</a>
              <a href="#faq" className="text-sm font-medium hover:text-neutral-700">FAQ</a>
              <a href="#contact" className="text-sm font-medium hover:text-neutral-700">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm mb-4">
                <span>Free & self-paced</span>
                <span className="w-1 h-1 rounded-full bg-indigo-300" />
                <span>Beginner friendly</span>
                <span className="w-1 h-1 rounded-full bg-indigo-300" />
                <span>Downloadable packs</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Scratch Projects <span className="text-indigo-600">kids can build</span>
              </h1>
              <p className="mt-4 text-lg text-neutral-700 max-w-prose">
                Pick a project, open the starter in Scratch, follow the steps, and download the assets. Perfect for classrooms, clubs, or tinkering at home.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className="px-5 py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow">Browse projects</a>
                <a href="#getting-started" className="px-5 py-3 rounded-xl font-semibold bg-white border border-neutral-200 hover:bg-neutral-50 shadow-sm">How it works</a>
              </div>
            </div>
            <div className="relative">
              <ScratchHeroArt />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Project Library</h2>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="w-full md:w-64 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Select label="Difficulty" value={filters.diff} onChange={(v) => setFilters({ ...filters, diff: v })} options={[
                { label: "All", value: "all" },
                { label: "Beginner", value: "beginner" },
                { label: "Intermediate", value: "intermediate" },
                { label: "Advanced", value: "advanced" }
              ]} />
              <Select label="Tag" value={filters.tag} onChange={(v) => setFilters({ ...filters, tag: v })} options={[
                { label: "All", value: "all" },
                { label: "Game", value: "game" },
                { label: "Story", value: "story" },
                { label: "Music", value: "music" },
                { label: "Loops", value: "loops" },
                { label: "Events", value: "events" },
                { label: "Variables", value: "variables" },
                { label: "Broadcasts", value: "broadcasts" }
              ]} />
              <Select label="Time" value={filters.time} onChange={(v) => setFilters({ ...filters, time: v })} options={[
                { label: "Any", value: "all" },
                { label: "≤45m", value: "short" },
                { label: "46–60m", value: "medium" },
                { label: ">60m", value: "long" }
              ]} />
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article key={p.id} className="rounded-2xl p-5 border bg-neutral-50 hover:bg-white transition shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2"><span className="text-2xl">{p.coverEmoji}</span>{p.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-white border">{p.difficulty}</span>
                </div>
                <p className="text-neutral-700 mt-2 text-sm">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-600">
                  <Tag>{p.ages}</Tag>
                  <Tag>{p.time} mins</Tag>
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <a href={p.starterLink} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow">Open Starter</a>
                  <button onClick={() => setActive(p)} className="px-3 py-2 rounded-xl text-sm font-semibold bg-white border hover:bg-neutral-50">View Guide</button>
                  <a href={p.teacherPack} className="px-3 py-2 rounded-xl text-sm font-semibold bg-white border hover:bg-neutral-50">Download Pack</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Logo className="h-5 w-5" />
            <span>© {new Date().getFullYear()} ScratchQuest. Free Scratch guides for young coders.</span>
          </div>
          <div className="text-sm text-neutral-500 flex items-center gap-3">
            <a href="#projects" className="hover:text-neutral-700">Projects</a>
            <a href="#getting-started" className="hover:text-neutral-700">Getting Started</a>
            <a href="#contact" className="hover:text-neutral-700">Contact</a>
          </div>
        </div>
      </footer>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="text-xs text-neutral-600 flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function Tag({ children }) {
  return <span className="px-2 py-1 rounded-full bg-white border text-neutral-600">{children}</span>;
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[min(100%,_720px)] max-h-[85vh] overflow-auto rounded-2xl bg-white border shadow-xl p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold flex items-center gap-2"><span className="text-2xl">{project.coverEmoji}</span>{project.title}</h3>
          <button onClick={onClose} className="rounded-lg border px-2 py-1 text-sm hover:bg-neutral-50">Close</button>
        </div>
        <p className="mt-1 text-neutral-700">{project.summary}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-600">
          <Tag>{project.difficulty}</Tag>
          <Tag>{project.time} mins</Tag>
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold">Steps</h4>
            <ol className="mt-2 space-y-2 text-sm text-neutral-800 list-decimal list-inside">
              {project.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <div className="mt-4 flex gap-2">
              <a href={project.starterLink} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow">Open Starter in Scratch</a>
              <button onClick={() => window.print()} className="px-4 py-2 rounded-xl text-sm font-semibold bg-white border hover:bg-neutral-50">Print Guide</button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Assets</h4>
            <ul className="mt-2 space-y-2 text-sm text-neutral-800">
              {project.assets.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-3">
                  <span>{a.name}</span>
                  <a href={a.url} className="px-3 py-1 rounded-lg border bg-neutral-50 hover:bg-white">Download</a>
                </li>
              ))}
            </ul>
            <a href={project.teacherPack} className="mt-4 inline-block px-4 py-2 rounded-xl text-sm font-semibold bg-white border hover:bg-neutral-50">Download Teacher Pack (ZIP)</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#g)" />
      <g fill="#fff">
        <circle cx="24" cy="32" r="6" />
        <circle cx="40" cy="24" r="4" />
        <path d="M18 44c8-10 18-10 28 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ScratchHeroArt() {
  const Block = ({ color, w = "w-40", text = "when green flag clicked" }) => (
    <div className={`relative ${w} rounded-2xl py-3 pl-4 pr-6 text-white font-semibold shadow`} style={{ backgroundColor: color }}>
      <span className="absolute -left-3 top-3 w-6 h-6 bg-white/20 rounded-full" />
      <span className="absolute -right-3 bottom-3 w-6 h-6 bg-white/20 rounded-full" />
      <span className="opacity-95">{text}</span>
    </div>
  );
  return (
    <div className="relative h-[340px] md:h-[420px]">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-100 to-fuchsia-100" />
      <div className="absolute inset-4 md:inset-6 rounded-3xl bg-white border shadow-lg p-6 overflow-hidden">
        <div className="absolute -top-6 -left-6 w-40 h-40 bg-indigo-200 rounded-full blur-2xl opacity-50" />
        <div className="absolute -bottom-8 -right-6 w-48 h-48 bg-fuchsia-200 rounded-full blur-2xl opacity-50" />
        <div className="grid gap-3">
          <Block color="#6366f1" w="w-56" text="when green flag clicked" />
          <Block color="#22c55e" w="w-64" text="forever → move 10 steps" />
          <Block color="#f59e0b" w="w-48" text="if on edge, bounce" />
          <Block color="#3b82f6" w="w-72" text="when space pressed → start sound" />
          <Block color="#ef4444" w="w-60" text="set score to 0" />
        </div>
      </div>
    </div>
  );
}
