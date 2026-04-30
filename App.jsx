import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PARKS = [
  {
    id: 1,
    name: "Garfield Park Conservatory",
    district: "Chicago Park District",
    zip: "60624",
    neighborhood: "East Garfield Park",
    income: "low",
    pulseScore: 54,
    parkServeScore: 92,
    lat: 41.886, lng: -87.717,
    amenities: ["greenhouse", "walking paths", "picnic area"],
    freePrograms: 8,
    lastAudit: "2025-11",
    reports: 14,
    img: "🌿",
    color: "#2D6A4F",
    tags: ["nature", "family", "accessible"],
    stories: [
      { user: "Keisha T.", text: "The greenhouse is STUNNING but the public bathrooms have been locked for 3 weeks 😤", likes: 47, time: "2h", img: "🚽" },
      { user: "Marcus D.", text: "Brought my kids here for the free summer program — staff was amazing 🙌", likes: 89, time: "5h", img: "👨‍👧‍👦" },
    ]
  },
  {
    id: 2,
    name: "Lincoln Park",
    district: "Chicago Park District",
    zip: "60614",
    neighborhood: "Lincoln Park",
    income: "high",
    pulseScore: 84,
    parkServeScore: 96,
    lat: 41.921, lng: -87.635,
    amenities: ["zoo", "beach", "tennis courts", "playground", "bike path", "gym"],
    freePrograms: 3,
    lastAudit: "2025-12",
    reports: 2,
    img: "🦁",
    color: "#52B788",
    tags: ["beach", "zoo", "active"],
    stories: [
      { user: "Priya M.", text: "Perfect morning run by the lake. Facilities are immaculate 💪", likes: 203, time: "1h", img: "🏃‍♀️" },
    ]
  },
  {
    id: 3,
    name: "Altgeld Park",
    district: "Chicago Park District",
    zip: "60629",
    neighborhood: "Marquette Park",
    income: "low",
    pulseScore: 31,
    parkServeScore: 88,
    lat: 41.774, lng: -87.700,
    amenities: ["basketball court"],
    freePrograms: 12,
    lastAudit: "2025-10",
    reports: 31,
    img: "🏀",
    color: "#D62828",
    tags: ["courts", "youth", "community"],
    stories: [
      { user: "Destiny R.", text: "ParkServe says 88% access score. Come see the actual playground. I'll wait. 📍", likes: 412, time: "30m", img: "⚠️" },
      { user: "Carlos V.", text: "Filed a report about the broken water fountain 3 months ago. Still nothing.", likes: 187, time: "1d", img: "💧" },
      { user: "Aisha B.", text: "The after-school program here literally changed my son's life. Staff = heroes", likes: 156, time: "2d", img: "⭐" },
    ]
  },
  {
    id: 4,
    name: "Sinnissippi Park",
    district: "Rockford Park District",
    zip: "61103",
    neighborhood: "North Rockford",
    income: "mixed",
    pulseScore: 67,
    parkServeScore: 81,
    lat: 42.285, lng: -89.093,
    amenities: ["lagoon", "bandshell", "tennis", "walking trails", "ice skating"],
    freePrograms: 6,
    lastAudit: "2025-09",
    reports: 7,
    img: "🦢",
    color: "#3A86FF",
    tags: ["scenic", "events", "all-ages"],
    stories: [
      { user: "Tom W.", text: "Best sunsets in Rockford. The lagoon is magical in fall 🍂", likes: 94, time: "3h", img: "🌅" },
    ]
  },
  {
    id: 5,
    name: "Douglas Park",
    district: "Chicago Park District",
    zip: "60623",
    neighborhood: "Little Village",
    income: "low",
    pulseScore: 38,
    parkServeScore: 91,
    lat: 41.856, lng: -87.714,
    amenities: ["lagoon", "baseball field"],
    freePrograms: 9,
    lastAudit: "2025-08",
    reports: 22,
    img: "⚾",
    color: "#F77F00",
    tags: ["baseball", "lagoon", "community"],
    stories: [
      { user: "Sofia R.", text: "The lagoon is gorgeous but the equipment by the south entrance is a hazard for real", likes: 78, time: "6h", img: "🏚️" },
      { user: "Emmanuel L.", text: "Little League here every Saturday — community showing UP", likes: 201, time: "1d", img: "🏟️" },
    ]
  },
  {
    id: 6,
    name: "Millennium Park",
    district: "Chicago Park District",
    zip: "60601",
    neighborhood: "The Loop",
    income: "high",
    pulseScore: 91,
    parkServeScore: 98,
    lat: 41.883, lng: -87.623,
    amenities: ["fountain", "art installations", "concerts", "ice rink", "garden", "cafe"],
    freePrograms: 5,
    lastAudit: "2025-12",
    reports: 1,
    img: "🫘",
    color: "#7B2D8B",
    tags: ["iconic", "arts", "tourist"],
    stories: [
      { user: "Jin L.", text: "The Bean on a foggy morning is literally a painting 🎨", likes: 891, time: "45m", img: "✨" },
    ]
  },
];

const FEED_POSTS = [
  { id: 1, parkId: 3, user: "Destiny R.", handle: "@destiny_r", time: "30m", type: "report", content: "ParkServe says 88% access. I live 2 blocks from Altgeld. Come see this playground. I'll wait. This is what 'access' looks like in our neighborhood.", img: "⚠️", likes: 412, comments: 67, shares: 89, tags: ["#ParkEquity", "#Chicago", "#AccessIsNotQuality"], verified: false },
  { id: 2, parkId: 1, user: "Marcus Davis", handle: "@marcus_d", time: "5h", type: "story", content: "Brought my 3 kids to the Garfield Park Conservatory free summer program today. The staff energy was everything. THIS is what public parks should be. More funding to programs like this ✊", img: "👨‍👧‍👦", likes: 203, comments: 31, shares: 44, tags: ["#GarfieldPark", "#FreeProgramming", "#Chicago"], verified: false },
  { id: 3, parkId: 6, user: "Jin Li", handle: "@jin_creates", time: "45m", type: "photo", content: "Foggy morning at The Bean 🫘 This city has real magic in it. Now imagine if EVERY Chicago park got this level of investment and care.", img: "✨", likes: 1204, comments: 88, shares: 201, tags: ["#Millennium", "#Chicago", "#EveryParkMatters"], verified: true },
  { id: 4, parkId: 5, user: "Emmanuel L.", handle: "@emmylft", time: "1d", type: "story", content: "Little League at Douglas Park on Saturday and the community was OUT. Like 200 people watching kids play ball. This is what we fight for. This is why park quality matters.", img: "🏟️", likes: 567, comments: 44, shares: 78, tags: ["#Douglas", "#LittleVillage", "#Community"], verified: false },
  { id: 5, parkId: 4, user: "Tom W.", handle: "@tom_rockford", time: "3h", type: "photo", content: "Sinnissippi lagoon at golden hour. Rockford, you're underrated and I won't stop saying it 🌅", img: "🌅", likes: 394, comments: 19, shares: 29, tags: ["#Rockford", "#Sinnissippi", "#Illinois"], verified: false },
  { id: 6, parkId: 3, user: "Carlos Vega", handle: "@carlos_v", time: "1d", type: "report", content: "Update on my broken fountain report at Altgeld from 3 MONTHS ago: still not fixed. I've tagged the park district 4 times. Posted photos. Nothing. Who's accountable?", img: "💧", likes: 287, comments: 93, shares: 112, tags: ["#Accountability", "#AltgeldPark", "#FixOurParks"], verified: false },
];

const REPORTS = [
  { id: 1, parkId: 3, category: "Equipment", issue: "Broken playground structure — rusted bars near swingset", severity: "high", backers: 47, status: "pending", time: "3 days ago", reporter: "Anonymous" },
  { id: 2, parkId: 3, category: "Sanitation", issue: "Water fountain non-functional for 3+ months", severity: "high", backers: 89, status: "pending", time: "3 months ago", reporter: "Carlos V." },
  { id: 3, parkId: 5, category: "Safety", issue: "Broken glass near south entrance basketball court", severity: "medium", backers: 23, status: "in-progress", time: "1 week ago", reporter: "Sofia R." },
  { id: 4, parkId: 1, category: "Access", issue: "Public restrooms locked with no signage on hours", severity: "medium", backers: 61, status: "pending", time: "3 weeks ago", reporter: "Keisha T." },
  { id: 5, parkId: 4, category: "Maintenance", issue: "Trail lighting out on east loop — dark after 7pm", severity: "medium", backers: 18, status: "resolved", time: "2 weeks ago", reporter: "Tom W." },
];

const EQUITY_DATA = [
  { zip: "60624", name: "East Garfield Park", pulseScore: 54, parkServeScore: 92, medianIncome: 28400, gap: 38, parks: 3 },
  { zip: "60623", name: "Little Village", pulseScore: 38, parkServeScore: 91, medianIncome: 32100, gap: 53, parks: 4 },
  { zip: "60629", name: "Marquette Park", pulseScore: 31, parkServeScore: 88, medianIncome: 34800, gap: 57, parks: 2 },
  { zip: "60614", name: "Lincoln Park", pulseScore: 84, parkServeScore: 96, medianIncome: 112000, gap: 12, parks: 6 },
  { zip: "60601", name: "The Loop", pulseScore: 91, parkServeScore: 98, medianIncome: 98000, gap: 7, parks: 4 },
  { zip: "61103", name: "North Rockford", pulseScore: 67, parkServeScore: 81, medianIncome: 41200, gap: 14, parks: 5 },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function PulseScoreBadge({ score, size = "md" }) {
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const sz = size === "lg" ? 64 : size === "sm" ? 36 : 48;
  const stroke = size === "lg" ? 5 : 3;
  const r = (sz - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: sz, height: sz, flexShrink: 0 }}>
      <svg width={sz} height={sz} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size === "lg" ? 18 : size === "sm" ? 10 : 13, fontWeight: 800, color, fontFamily: "monospace" }}>{score}</span>
      </div>
    </div>
  );
}

function FeedCard({ post, park, onLike, liked }) {
  const typeColors = { report: "#ef4444", story: "#8b5cf6", photo: "#3b82f6" };
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden", marginBottom: 16, transition: "transform 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      {/* Post type bar */}
      <div style={{ height: 3, background: typeColors[post.type] }} />
      <div style={{ padding: "16px 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${typeColors[post.type]}, #1a1a2e)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            {post.img}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{post.user}</span>
              {post.verified && <span style={{ fontSize: 12, color: "#3b82f6" }}>✓</span>}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{post.handle} · {post.time}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, background: typeColors[post.type] + "33", color: typeColors[post.type], padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{post.type}</span>
          </div>
        </div>

        {/* Park reference */}
        {park && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, padding: "6px 10px", background: "rgba(255,255,255,0.06)", borderRadius: 10, width: "fit-content" }}>
            <span style={{ fontSize: 16 }}>{park.img}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{park.name}</span>
            <PulseScoreBadge score={park.pulseScore} size="sm" />
          </div>
        )}

        {/* Content */}
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 12 }}>{post.content}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {post.tags.map(t => (
            <span key={t} style={{ fontSize: 12, color: "#3b82f6", cursor: "pointer" }}>{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 20, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
          <button onClick={onLike} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: liked ? "#ef4444" : "rgba(255,255,255,0.4)", fontSize: 13, transition: "color 0.2s" }}>
            <span style={{ fontSize: 16 }}>{liked ? "❤️" : "🤍"}</span>
            <span style={{ fontWeight: 600 }}>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            <span style={{ fontSize: 16 }}>💬</span>
            <span style={{ fontWeight: 600 }}>{post.comments}</span>
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            <span style={{ fontSize: 16 }}>🔗</span>
            <span style={{ fontWeight: 600 }}>{post.shares}</span>
          </button>
          <button style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            <span style={{ fontSize: 16 }}>🚩</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ParkCard({ park, onClick }) {
  const gapColor = park.parkServeScore - park.pulseScore > 30 ? "#ef4444" : park.parkServeScore - park.pulseScore > 15 ? "#f59e0b" : "#22c55e";
  return (
    <div onClick={onClick} style={{
      background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)",
      padding: "20px", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden"
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = park.color + "66"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: park.color }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: park.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{park.img}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 2 }}>{park.name}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{park.neighborhood} · {park.zip}</div>
        </div>
        <PulseScoreBadge score={park.pulseScore} />
      </div>

      {/* Score comparison */}
      <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontWeight: 700 }}>Access vs. Quality Gap</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>ParkServe</div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${park.parkServeScore}%`, background: "#64748b", borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, fontWeight: 700 }}>{park.parkServeScore}</div>
          </div>
          <span style={{ color: gapColor, fontSize: 18, fontWeight: 900 }}>≠</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>PulseScore™</div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${park.pulseScore}%`, background: park.pulseScore >= 75 ? "#22c55e" : park.pulseScore >= 50 ? "#f59e0b" : "#ef4444", borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, color: park.pulseScore >= 75 ? "#22c55e" : park.pulseScore >= 50 ? "#f59e0b" : "#ef4444", marginTop: 2, fontWeight: 700 }}>{park.pulseScore}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {park.tags.map(t => (
          <span key={t} style={{ fontSize: 10, background: park.color + "22", color: park.color, padding: "3px 8px", borderRadius: 20, fontWeight: 600 }}>#{t}</span>
        ))}
        {park.reports > 0 && (
          <span style={{ fontSize: 10, background: "#ef444422", color: "#ef4444", padding: "3px 8px", borderRadius: 20, fontWeight: 600, marginLeft: "auto" }}>
            ⚠️ {park.reports} reports
          </span>
        )}
      </div>
    </div>
  );
}

function ReportCard({ report, park }) {
  const [backed, setBacked] = useState(false);
  const sevColor = report.severity === "high" ? "#ef4444" : report.severity === "medium" ? "#f59e0b" : "#22c55e";
  const statusColor = report.status === "resolved" ? "#22c55e" : report.status === "in-progress" ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", padding: 16, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: sevColor, marginTop: 6, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>{report.issue}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{park?.name} · {report.time}</div>
        </div>
        <span style={{ fontSize: 10, background: statusColor + "22", color: statusColor, padding: "3px 8px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap", textTransform: "capitalize" }}>{report.status}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: 8 }}>{report.category}</div>
        <button onClick={() => setBacked(!backed)} style={{
          display: "flex", alignItems: "center", gap: 5, background: backed ? "#3b82f622" : "rgba(255,255,255,0.05)",
          border: `1px solid ${backed ? "#3b82f6" : "rgba(255,255,255,0.1)"}`, borderRadius: 20,
          padding: "5px 12px", cursor: "pointer", color: backed ? "#3b82f6" : "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, transition: "all 0.2s"
        }}>
          <span>{backed ? "✓" : "+"}</span>
          <span>{report.backers + (backed ? 1 : 0)} backing</span>
        </button>
      </div>
    </div>
  );
}

function EquityMapViz({ data }) {
  const maxIncome = Math.max(...data.map(d => d.medianIncome));
  const sorted = [...data].sort((a, b) => a.pulseScore - b.pulseScore);
  return (
    <div>
      <div style={{ marginBottom: 20, padding: 16, background: "rgba(239,68,68,0.08)", borderRadius: 16, border: "1px solid rgba(239,68,68,0.2)" }}>
        <div style={{ fontSize: 13, color: "#ef4444", fontWeight: 700, marginBottom: 4 }}>⚠️ The Equity Gap</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
          Neighborhoods with the highest "access" scores on ParkServe often have the lowest community-rated PulseScores. The gap between what data shows and what residents experience is a policy failure.
        </div>
      </div>
      {sorted.map(d => (
        <div key={d.zip} style={{ marginBottom: 16, padding: 14, background: "rgba(255,255,255,0.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{d.name}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{d.zip} · ${d.medianIncome.toLocaleString()} median income</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>GAP</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: d.gap > 30 ? "#ef4444" : d.gap > 15 ? "#f59e0b" : "#22c55e" }}>-{d.gap}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 3 }}>
                <span>ParkServe</span><span>{d.parkServeScore}</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${d.parkServeScore}%`, background: "#64748b", borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 3 }}>
                <span>PulseScore™</span><span>{d.pulseScore}</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${d.pulseScore}%`, background: d.pulseScore >= 75 ? "#22c55e" : d.pulseScore >= 50 ? "#f59e0b" : "#ef4444", borderRadius: 2 }} />
              </div>
            </div>
          </div>
          {/* Income bar */}
          <div style={{ marginTop: 6 }}>
            <div style={{ height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${(d.medianIncome / maxIncome) * 100}%`, background: "rgba(168,85,247,0.4)", borderRadius: 2 }} />
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 4, borderRadius: 2, background: "#64748b" }} /><span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>ParkServe Access</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 4, borderRadius: 2, background: "#22c55e" }} /><span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>PulseScore™</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 4, borderRadius: 2, background: "rgba(168,85,247,0.5)" }} /><span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Income</span></div>
      </div>
    </div>
  );
}

function ReportModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [parkId, setParkId] = useState("");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const categories = ["🏗️ Broken Equipment", "🚽 Restroom/Sanitation", "💧 Water/Fountain", "🌿 Maintenance", "🔒 Access Barrier", "💡 Lighting/Safety", "♿ Accessibility", "📣 Other"];
  if (submitted) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div style={{ background: "#0f1729", borderRadius: 24, padding: 40, maxWidth: 420, width: "100%", textAlign: "center", border: "1px solid rgba(34,197,94,0.3)" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Report Submitted!</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Your report is now public. Neighbors can back it to increase priority.</div>
        <div style={{ fontSize: 12, color: "rgba(34,197,94,0.8)", marginBottom: 24 }}>📧 Park district notified automatically</div>
        <button onClick={onClose} style={{ background: "#22c55e", border: "none", borderRadius: 14, padding: "12px 32px", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>Done</button>
      </div>
    </div>
  );
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "flex-end", zIndex: 1000 }}>
      <div style={{ background: "#0f1729", borderRadius: "24px 24px 0 0", padding: "28px 24px", width: "100%", maxWidth: 500, margin: "0 auto", border: "1px solid rgba(255,255,255,0.1)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}>📍 Report an Issue</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16 }}>×</button>
        </div>
        {step === 0 && (
          <>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>What kind of issue?</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {categories.map(c => (
                <button key={c} onClick={() => { setCategory(c); setStep(1); }} style={{
                  background: category === c ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${category === c ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 12, padding: "12px 10px", color: "#fff", fontSize: 13, cursor: "pointer", textAlign: "center", fontWeight: 600, transition: "all 0.2s"
                }}>{c}</button>
              ))}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Which park?</div>
            <select value={parkId} onChange={e => setParkId(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 12, color: "#fff", fontSize: 14, marginBottom: 16, outline: "none" }}>
              <option value="">Select a park...</option>
              {PARKS.map(p => <option key={p.id} value={p.id}>{p.name} ({p.zip})</option>)}
            </select>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(0)} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 12, padding: 12, color: "#fff", cursor: "pointer" }}>Back</button>
              <button onClick={() => parkId && setStep(2)} style={{ flex: 2, background: parkId ? "#3b82f6" : "rgba(255,255,255,0.1)", border: "none", borderRadius: 12, padding: 12, color: "#fff", cursor: "pointer", fontWeight: 700, transition: "background 0.2s" }}>Continue</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Describe the issue</div>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="What did you see? Be specific — the more detail, the faster it gets resolved." style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 12, color: "#fff", fontSize: 14, minHeight: 120, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            <div style={{ marginTop: 10, padding: 10, background: "rgba(255,255,255,0.04)", borderRadius: 10, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              📸 Photo upload coming soon · 🔒 You can submit anonymously
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 12, padding: 12, color: "#fff", cursor: "pointer" }}>Back</button>
              <button onClick={() => desc.length > 10 && setSubmitted(true)} style={{ flex: 2, background: desc.length > 10 ? "#22c55e" : "rgba(255,255,255,0.1)", border: "none", borderRadius: 12, padding: 12, color: "#fff", cursor: "pointer", fontWeight: 800, fontSize: 15, transition: "background 0.2s" }}>Submit Report ✓</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function ParkPulse() {
  const [activeTab, setActiveTab] = useState("feed");
  const [selectedPark, setSelectedPark] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [showReport, setShowReport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIncome, setFilterIncome] = useState("all");
  const [storyIdx, setStoryIdx] = useState(0);
  const [activeStory, setActiveStory] = useState(null);
  const storyParks = PARKS.filter(p => p.stories?.length > 0);

  const filteredParks = PARKS.filter(p => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) || p.zip.includes(searchQuery);
    const matchIncome = filterIncome === "all" || p.income === filterIncome;
    return matchSearch && matchIncome;
  });

  const tabs = [
    { id: "feed", label: "Feed", icon: "🔥" },
    { id: "discover", label: "Discover", icon: "🗺️" },
    { id: "equity", label: "Equity", icon: "⚖️" },
    { id: "reports", label: "Reports", icon: "📍" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080d1a",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: "#fff",
      position: "relative",
    }}>
      {/* Background ambient */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, left: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,106,79,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,13,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 20px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #2D6A4F, #52B788)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: -0.5 }}>ParkPulse</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", marginTop: -2 }}>Illinois</div>
            </div>
          </div>
          <button onClick={() => setShowReport(true)} style={{
            display: "flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg, #ef4444, #dc2626)",
            border: "none", borderRadius: 20, padding: "8px 16px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "transform 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <span>📍</span> Report
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 100px", position: "relative", zIndex: 1 }}>

        {/* FEED TAB */}
        {activeTab === "feed" && (
          <div>
            {/* Stories Row */}
            <div style={{ padding: "16px 0 8px" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>📸 Drops — Live Stories</div>
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                {storyParks.map((park, i) => (
                  <button key={park.id} onClick={() => setActiveStory(park)} style={{
                    flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer"
                  }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${park.color}, #1a1a2e)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: `2px solid ${park.color}`, boxShadow: `0 0 16px ${park.color}44` }}>
                      {park.img}
                    </div>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", maxWidth: 60, textAlign: "center", lineHeight: 1.3 }}>{park.name.split(" ")[0]}</span>
                  </button>
                ))}
                <button style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "2px dashed rgba(255,255,255,0.2)" }}>+</div>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Add story</span>
                </button>
              </div>
            </div>

            {/* Stats bar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { n: "31", label: "Open Reports", color: "#ef4444" },
                { n: "847", label: "Park Users Today", color: "#3b82f6" },
                { n: "6", label: "Parks Tracked", color: "#22c55e" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "12px 10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Feed posts */}
            {FEED_POSTS.map(post => (
              <FeedCard key={post.id} post={post} park={PARKS.find(p => p.id === post.parkId)}
                liked={likedPosts.has(post.id)}
                onLike={() => setLikedPosts(prev => {
                  const next = new Set(prev);
                  next.has(post.id) ? next.delete(post.id) : next.add(post.id);
                  return next;
                })} />
            ))}
          </div>
        )}

        {/* DISCOVER TAB */}
        {activeTab === "discover" && !selectedPark && (
          <div style={{ paddingTop: 16 }}>
            {/* Search */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search parks, zip codes, neighborhoods..." style={{
                width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "12px 14px 12px 40px",
                color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit"
              }} />
            </div>

            {/* Income filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[["all", "All Neighborhoods"], ["low", "Underserved"], ["mixed", "Mixed"], ["high", "High Income"]].map(([v, l]) => (
                <button key={v} onClick={() => setFilterIncome(v)} style={{
                  background: filterIncome === v ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${filterIncome === v ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 20, padding: "6px 12px", color: filterIncome === v ? "#3b82f6" : "rgba(255,255,255,0.5)",
                  fontSize: 12, cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap", transition: "all 0.2s"
                }}>{l}</button>
              ))}
            </div>

            {/* Sort hint */}
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span>Showing {filteredParks.length} parks</span>
              <span style={{ marginLeft: "auto" }}>sorted by PulseScore™ ↑</span>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {[...filteredParks].sort((a, b) => a.pulseScore - b.pulseScore).map(park => (
                <ParkCard key={park.id} park={park} onClick={() => setSelectedPark(park)} />
              ))}
            </div>
          </div>
        )}

        {/* PARK DETAIL */}
        {activeTab === "discover" && selectedPark && (
          <div style={{ paddingTop: 16 }}>
            <button onClick={() => setSelectedPark(null)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", marginBottom: 16, fontSize: 14 }}>
              ← Back to parks
            </button>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: 16 }}>
              <div style={{ height: 4, background: `linear-gradient(90deg, ${selectedPark.color}, transparent)` }} />
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: selectedPark.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{selectedPark.img}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}>{selectedPark.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{selectedPark.neighborhood} · {selectedPark.zip}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{selectedPark.district}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[
                    { n: selectedPark.pulseScore, label: "PulseScore™", color: selectedPark.pulseScore >= 70 ? "#22c55e" : selectedPark.pulseScore >= 50 ? "#f59e0b" : "#ef4444" },
                    { n: selectedPark.freePrograms, label: "Free Programs", color: "#8b5cf6" },
                    { n: selectedPark.reports, label: "Open Reports", color: "#ef4444" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 14, padding: 12, textAlign: "center" }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.n}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 14, padding: 14, marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 10 }}>Access vs. Quality Gap</div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                      <span>ParkServe "Access" Score</span><span style={{ fontWeight: 700 }}>{selectedPark.parkServeScore}/100</span>
                    </div>
                    <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
                      <div style={{ height: "100%", width: `${selectedPark.parkServeScore}%`, background: "#64748b", borderRadius: 4 }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                      <span>Community PulseScore™</span><span style={{ fontWeight: 700 }}>{selectedPark.pulseScore}/100</span>
                    </div>
                    <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
                      <div style={{ height: "100%", width: `${selectedPark.pulseScore}%`, background: selectedPark.pulseScore >= 70 ? "#22c55e" : selectedPark.pulseScore >= 50 ? "#f59e0b" : "#ef4444", borderRadius: 4 }} />
                    </div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: "#ef4444", fontWeight: 700 }}>
                    {selectedPark.parkServeScore - selectedPark.pulseScore > 20 ? `⚠️ ${selectedPark.parkServeScore - selectedPark.pulseScore}-point gap: Access data overstates quality` : "✓ Access and quality are roughly aligned"}
                  </div>
                </div>
                {/* Amenities */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>Amenities</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selectedPark.amenities.map(a => (
                      <span key={a} style={{ fontSize: 12, background: "rgba(255,255,255,0.07)", padding: "4px 10px", borderRadius: 20, color: "rgba(255,255,255,0.7)" }}>{a}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setShowReport(true)} style={{ width: "100%", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", borderRadius: 14, padding: 14, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                  📍 Report an Issue at This Park
                </button>
              </div>
            </div>
            {/* Park stories */}
            {selectedPark.stories?.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Community Stories</div>
                {selectedPark.stories.map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 14, marginBottom: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.img}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{s.user}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{s.time} ago</div>
                      </div>
                      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                        <span>❤️</span><span>{s.likes}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{s.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EQUITY TAB */}
        {activeTab === "equity" && (
          <div style={{ paddingTop: 16 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 900, fontSize: 22, color: "#fff", marginBottom: 6 }}>Equity Map</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                The gap between ParkServe's access metrics and community-rated PulseScores tells the real story of park equity in Illinois.
              </div>
            </div>
            {/* Key stat callout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: 16, padding: 16, border: "1px solid rgba(239,68,68,0.2)" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#ef4444" }}>57</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Largest access-quality gap (Marquette Park)</div>
              </div>
              <div style={{ background: "rgba(34,197,94,0.08)", borderRadius: 16, padding: 16, border: "1px solid rgba(34,197,94,0.2)" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>7</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Smallest gap (The Loop / high income)</div>
              </div>
            </div>
            <EquityMapViz data={EQUITY_DATA} />
            {/* Policy callout */}
            <div style={{ marginTop: 24, padding: 20, background: "rgba(59,130,246,0.08)", borderRadius: 20, border: "1px solid rgba(59,130,246,0.2)" }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#3b82f6", marginBottom: 8 }}>📋 Policy Action</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 14 }}>
                IDNR distributes $55M+ annually through the OSLAD grant program. ParkPulse equity data can directly inform which communities should receive priority funding — replacing proximity metrics with lived quality experience.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ flex: 1, background: "#3b82f6", border: "none", borderRadius: 12, padding: "10px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Download Equity Report</button>
                <button style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Contact IDNR</button>
              </div>
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === "reports" && (
          <div style={{ paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 22, color: "#fff", marginBottom: 4 }}>Community Reports</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{REPORTS.filter(r => r.status === "pending").length} open · {REPORTS.filter(r => r.status === "resolved").length} resolved</div>
              </div>
              <button onClick={() => setShowReport(true)} style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", borderRadius: 14, padding: "10px 16px", color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>+ Report</button>
            </div>

            {/* Status breakdown */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[
                { label: "🔴 Pending", n: REPORTS.filter(r => r.status === "pending").length, color: "#ef4444" },
                { label: "🟡 In Progress", n: REPORTS.filter(r => r.status === "in-progress").length, color: "#f59e0b" },
                { label: "🟢 Resolved", n: REPORTS.filter(r => r.status === "resolved").length, color: "#22c55e" },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {REPORTS.map(r => <ReportCard key={r.id} report={r} park={PARKS.find(p => p.id === r.parkId)} />)}

            <div style={{ marginTop: 20, padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>All reports are forwarded to the relevant park district automatically.</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Reports with 50+ backers are escalated to IDNR.</div>
            </div>
          </div>
        )}
      </div>

      {/* Story overlay */}
      {activeStory && (
        <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 200, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(180deg, ${activeStory.color}44 0%, #000 100%)`, padding: 20 }}>
            <div>
              <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>{activeStory.img}</div>
              <div style={{ fontWeight: 900, fontSize: 24, color: "#fff", textAlign: "center", marginBottom: 8 }}>{activeStory.name}</div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", textAlign: "center", marginBottom: 24 }}>{activeStory.neighborhood}</div>
              {activeStory.stories?.slice(storyIdx, storyIdx + 1).map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 20, maxWidth: 360 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.img}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{s.user}</div>
                  </div>
                  <div style={{ fontSize: 16, color: "#fff", lineHeight: 1.6 }}>{s.text}</div>
                  <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>❤️ {s.likes} · {s.time} ago</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "16px 20px 32px", background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => storyIdx > 0 ? setStoryIdx(storyIdx - 1) : null} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 12, padding: "10px 20px", color: "#fff", cursor: "pointer", fontSize: 14 }}>← Prev</button>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Story {storyIdx + 1} / {activeStory.stories?.length}</div>
            <div style={{ display: "flex", gap: 10 }}>
              {storyIdx < (activeStory.stories?.length - 1) ? (
                <button onClick={() => setStoryIdx(storyIdx + 1)} style={{ background: "#fff", border: "none", borderRadius: 12, padding: "10px 20px", color: "#000", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Next →</button>
              ) : (
                <button onClick={() => { setActiveStory(null); setStoryIdx(0); }} style={{ background: "#22c55e", border: "none", borderRadius: 12, padding: "10px 20px", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Done ✓</button>
              )}
            </div>
          </div>
          <button onClick={() => { setActiveStory(null); setStoryIdx(0); }} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: 36, height: 36, color: "#fff", cursor: "pointer", fontSize: 18 }}>×</button>
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(8,13,26,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", zIndex: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", padding: "8px 0 16px" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedPark(null); }} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer", padding: "6px 0",
              color: activeTab === tab.id ? "#22c55e" : "rgba(255,255,255,0.3)", transition: "color 0.2s"
            }}>
              <span style={{ fontSize: 20, filter: activeTab === tab.id ? "drop-shadow(0 0 6px #22c55e)" : "none", transition: "filter 0.3s" }}>{tab.icon}</span>
              <span style={{ fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 400, letterSpacing: 0.5 }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReport && <ReportModal onClose={() => setShowReport(false)} />}
    </div>
  );
}
