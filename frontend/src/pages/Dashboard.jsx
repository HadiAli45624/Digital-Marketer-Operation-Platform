import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import "./Dashboard.css";

const modules = [
  {
    path: "/report",
    icon: "◈",
    title: "Report Generator",
    description:
      "Feed in your Google and Meta campaign metrics. Get a client-ready performance report with analysis, ROAS, CTR, and actionable recommendations.",
    tags: ["Google Ads", "Meta", "AI Analysis"],
  },
  {
    path: "/copy",
    icon: "✦",
    title: "CopyCrafter",
    description:
      "Generate platform-specific ad copy in seconds. Set your tone, format, audience, and number of copies — get results that convert.",
    tags: ["Instagram", "Facebook", "Google", "LinkedIn"],
  },
  {
    path: "/conversations",
    icon: "◎",
    title: "Conversations",
    description:
      "Log client messages, get AI-powered summaries, surface pending tasks, and generate professional draft replies instantly.",
    tags: ["Summarize", "Pending Tasks", "Draft Reply"],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="dashboard">
        <div className="dashboard-header">
          <p className="dashboard-eyebrow">Welcome back</p>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Your marketing operations hub. Pick a module to get started.
          </p>
        </div>

        <div className="dashboard-grid">
          {modules.map((mod) => (
            <div
              key={mod.path}
              className="dash-card"
              onClick={() => navigate(mod.path)}
            >
              <div className="dash-card-top">
                <span className="dash-card-icon">{mod.icon}</span>
                <span className="dash-card-arrow">→</span>
              </div>
              <h2 className="dash-card-title">{mod.title}</h2>
              <p className="dash-card-desc">{mod.description}</p>
              <div className="dash-card-tags">
                {mod.tags.map((tag) => (
                  <span key={tag} className="dash-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}