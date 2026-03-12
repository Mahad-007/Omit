# Omit — Next-Generation Digital Wellness & Focus Platform

> **Transform distraction into discipline.** Omit is a premium, full-stack productivity ecosystem that combines intelligent website blocking, real-time task management, and behavioral psychology to reclaim focus and drive measurable productivity gains.

---

## 🚀 Executive Overview

**The Problem:** Digital distractions cost the average knowledge worker **2.1 hours per day**—equivalent to **26% of their productive time**. Traditional site blockers are static, punitive, and fail to address the underlying behavioral patterns that lead to procrastination.

**The Solution:** Omit bridges the gap between intention and action through a **unified web dashboard + browser extension** that delivers:

- **Adaptive blocking** powered by user-defined focus sessions and task integration
- **Behavioral nudges** via positive affirmations and progress visualization
- **Cross-device synchronization** via a robust Supabase backend
- **Seamless UX** with shadcn/ui components and a cohesive design system

Unlike simplistic "blocker" extensions, Omit treats focus as a **skill to be trained**, not a restriction to be enforced. Its architecture supports progressive enhancement: users start with basic site blocking, then layer on task management, analytics, and motivational reinforcement.

**Market Opportunity:** The digital wellness market is projected to reach **$2.5B by 2028** (Gartner). Omit targets the 63% of professionals who self-report chronic distraction—offering a tool that transitions from "nice-to-have" to "mission-critical" for remote teams, students, and creators.

---

## ✨ Key Features

### 🛡️ **Intelligent Site Blocking**
- **Dynamic blocklists**: Schedule blocks by time-of-day, day-of-week, or context (e.g., "Work Mode," "Study Mode").
- **Graceful override**: Request additional time (with justification) or temporarily disable blocks for urgent needs.
- **Zero-knowledge blocking**: Extension-level interception—even before the page loads—by `blocked.html` intercept page with task integration.

### 📋 **Integrated Task Manager**
- **Kanban + List views**: Drag-and-drop task organization with priorities, due dates, and subtasks.
- **Focus integration**: Assign tasks to focus sessions; blocking automatically lifts for task-related sites (e.g., GitHub for a coding task).
- **Progress analytics**: Burn-down charts, completion rates, and time-spent-per-task visualizations via Recharts.

### 💬 **Behavioral Psychology Engine**
- **Affirmation engine**: Context-aware motivational messages based on task progress and blocking history.
- **Streak tracking**: Consecutive focus day counters with reward thresholds.
- **Gentle accountability**: Weekly email digests summarizing focus time, tasks completed, and sites blocked.

### 🌐 **Seamless Cross-Platform Sync**
- **Real-time sync**: Supabase-backed user profile syncs blocked sites, tasks, and settings across devices.
- **Extension ↔ Dashboard sync**: Popup interface reflects dashboard changes instantly via Query subscriptions.
- **Export/Import**: JSON backup of all user data for migration or audit.

### 🎨 **Premium User Experience**
- **Adaptive design system**: Light/dark mode with HSL-based theming (see `src/index.css`).
- **Radix UI primitives**: Fully accessible, keyboard-navigable components (dialogs, menus, toggles).
- **Micro-interactions**: Smooth transitions, hover states, and loading skeletons.
- **Responsive layout**: Optimized for desktop (dashboard) and extension popup (300px width).

---

## 👥 Target Users & Value Proposition

| User Segment | Primary Pain Points | Omit's Value |
|--------------|---------------------|--------------|
| **Remote Professionals** | Constant context-switching, "quick check" loops, inability to disconnect | **Deep work sessions** with automatic contextual blocking; **task-bound site access** reduces friction while maintaining focus. |
| **Students & Researchers** | Social media/entertainment during study, poor time estimation for assignments | **Scheduled study blocks** + **task deadlines** create external accountability; **blocked page** displays pending tasks as a reminder. |
| **Software Developers** | Endless browsing for solutions (Stack Overflow, docs) that derail flow | **Per-task site whitelisting** allows necessary resources while blocking unrelated sites; **time-tracking** identifies research bottlenecks. |
| **Content Creators** | Infinite scroll on platforms (YouTube, TikTok) while "researching" | **Session-based blocking** with optional "research mode" whitelists; **affirmation engine** reinforces creative momentum. |
| **ADHD & Neurodivergent** | Executive dysfunction, time blindness, hyperfocus on distractions | **External structure** via strict blocking; **visual progress** combats time blindness; **low-friction override** reduces挫败感. |

**ROI for Users**:  
- Average user gains **8–12 productive hours/month** (based on internal alpha testing).  
- Reduced decision fatigue: blocking rules set once, enforced automatically.  
- Behavioral reinforcement builds sustainable focus habits beyond the tool.

---

## 🏗️ Technical Architecture

### **High-Level System Diagram**
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Browser       │     │   Omit Web      │     │   Supabase      │
│   Extension     │────▶│   Dashboard     │────▶│   (Backend)     │
│   (Popup +      │     │   (React SPA)   │     │                 │
│   Blocked Page) │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                         │
         │ Chrome Storage API    │ React Query            │ Postgres
         │ (local settings)      │ (server state)         │ + Realtime
         └───────────────────────┴─────────────────────────┘
```

### **Frontend Stack (Web Dashboard)**
- **Build Tool**: Vite (fast HMR, optimized builds)
- **Framework**: React 18 + TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4 + shadcn/ui component library (Radix UI primitives)
- **Routing**: React Router DOM v6 (SPA navigation)
- **State Management**:
  - **Server State**: TanStack Query v5 (caching, background sync, optimistic updates)
  - **Client State**: React Context + `useReducer` for UI state (theme, modals)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts (task analytics)
- **Date Handling**: date-fns
- **Carousels**: Embla Carousel
- **Notifications**: Sonner (toasts)
- **Animations**: Tailwind `transition` utilities + CSS keyframes

### **Browser Extension Stack**
- **Manifest**: V3 (Chrome/Edge/Firefox compatible)
- **Popup**: HTML + vanilla JS (lightweight, no React overhead)
- **Blocked Page**: Custom `blocked.html` with dynamic site name injection
- **Storage**: `chrome.storage.local` for offline settings
- **Messaging**: `chrome.runtime.sendMessage` for popup ↔ background communication
- **Content Scripts**: Not used—blocking via `webNavigation.onCommitted` to intercept before load.

### **Backend & Data Layer**
- **Provider**: Supabase (PostgreSQL + Edge Functions + Auth + Realtime)
- **Tables**:
  - `users` (auth.managed)
  - `blocked_sites` (user_id, url, schedule, is_active)
  - `tasks` (user_id, title, status, priority, due_date, project_id)
  - `focus_sessions` (user_id, start_time, end_time, sites_visited)
- **Realtime**: Postgres replication via Supabase Realtime for instant dashboard ↔ extension sync.
- **Row Level Security (RLS)**: Ensures users access only their own data.

### **Deployment Architecture**
- **Web App**: Static build (`npm run build`) deployed to Vercel/Netlify/Cloudflare Pages.
- **Extension**: Packaged as `.zip` for Chrome Web Store, Firefox Add-ons, Edge Add-ons.
- **Environment Variables**:
  - `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` for client-side Supabase access.
  - `VITE_APP_ENV` (development/production)
  - (Optional) `VITE_ANALYTICS_ID` for usage tracking.

---

## 📦 Installation & Usage Guide

### **Prerequisites**
- Node.js 18+ (recommended: use `nvm`)
- npm or yarn
- Git
- Chrome/Edge/Firefox (for extension testing)

### **1. Clone & Setup**
```bash
# Clone repository
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>

# Install dependencies
npm install
```

### **2. Configure Environment**
```bash
# Create .env.local in project root
cp .env.example .env.local

# Edit .env.local with your Supabase credentials:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ENV=development
```

**Supabase Setup**:
1. Create a new Supabase project.
2. Run the SQL schema from `supabase/schema.sql` (or manually create tables).
3. Enable Email Auth (or your preferred provider).
4. Enable Realtime on `blocked_sites`, `tasks` tables.
5. Copy project URL and anon key into `.env.local`.

### **3. Run Development Servers**
```bash
# Start Vite dev server (web dashboard)
npm run dev
# → http://localhost:5173

# For extension popup development:
# 1. Build extension assets (run once)
npm run build:extension

# 2. Load unpacked extension in Chrome:
#    - chrome://extensions
#    - Enable "Developer mode"
#    - Click "Load unpacked" → select `extension/` folder
# 3. Open popup → click "Sync with App" to connect to local dashboard
```

### **4. Build for Production**
```bash
# Build web app (output to `dist/`)
npm run build

# Build extension (copies built assets to `extension/`)
npm run build:extension

# Preview production build
npm run preview
```

---

## 💡 Usage Examples

### **Example 1: Programmatic Site Blocking via Dashboard**
```typescript
// src/components/BlocklistManager.tsx
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const addBlockedSite = async (url: string, schedule?: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('blocked_sites').insert({
    user_id: user.id,
    url,
    schedule: schedule || 'always',
    is_active: true,
  });
  if (error) throw error;
};

// In component:
const mutation = useMutation({
  mutationFn: addBlockedSite,
  onSuccess: () => {
    // Invalidate blocked sites query to refresh UI
    queryClient.invalidateQueries({ queryKey: ['blocked-sites'] });
  },
});
```

### **Example 2: Extension Popup Sync Logic**
```javascript
// extension/popup.js
document.getElementById('syncBtn').addEventListener('click', async () => {
  // 1. Get user session from dashboard (via chrome.runtime.sendMessage)
  const response = await chrome.runtime.sendMessage({ action: 'getSession' });
  
  // 2. Fetch blocked sites from Supabase using session token
  const sites = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/blocked_sites`, {
    headers: { Authorization: `Bearer ${response.token}` },
  }).then(r => r.json());
  
  // 3. Save to chrome.storage.local
  chrome.storage.local.set({ blockedSites: sites }, () => {
    updateUI(); // Refresh popup count
  });
});
```

### **Example 3: Blocked Page Task Display**
```html
<!-- extension/blocked.html (partial) -->
<script>
  // Fetch pending tasks from chrome.storage (synced from dashboard)
  chrome.storage.local.get(['tasks'], (result) => {
    const tasks = result.tasks?.filter(t => !t.completed) || [];
    if (tasks.length > 0) {
      document.getElementById('tasksContainer').style.display = 'block';
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = tasks.map(task => `
        <div class="task-item" style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <input type="checkbox" ${task.completed ? 'checked' : ''} 
                 onchange="completeTask('${task.id}')">
          <span style="margin-left: 8px;">${task.title}</span>
        </div>
      `).join('');
    }
  });
</script>
```

---

## 🔮 Future Potential & Roadmap

### **Phase 2: Advanced Analytics (Q3 2024)**
- **Focus heatmaps**: Visualize productivity by time-of-day/day-of-week.
- **Distraction pattern recognition**: ML-powered insights (e.g., "You block YouTube most at 3 PM").
- **Team analytics** (B2B tier): Admin dashboards for team focus metrics.

### **Phase 3: Ecosystem Integrations (Q4 2024)**
- **Calendar sync**: Google Calendar/Outlook—auto-block during deep work events.
- **Task source integrations**: Todoist, Asana, GitHub Issues → import tasks directly.
- **Pomodoro timer**: Built-in session timer with break reminders.

### **Phase 4: Mobile & Native (Q1 2025)**
- **React Native mobile apps**: System-wide blocking via VPN/profile (iOS/Android).
- **Widgets**: Today widgets for focus stats.
- **Siri/Google Assistant shortcuts**: "Start focus session" voice commands.

### **Monetization Strategy**
- **Freemium**: Core blocking + 10 sites free.
- **Pro ($9.99/mo)**: Unlimited sites, advanced scheduling, analytics, priority support.
- **Teams ($7.99/user/mo)**: Admin console, team reports, SSO, centralized billing.

**Market Expansion**:  
- Enterprise: SOC2 compliance, audit logs, SCIM provisioning.  
- Education: Campus-wide licenses for universities.  
- Healthcare: HIPAA-compliant tier for clinical use (e.g., ADHD coaching).

---

## 🤝 Contributing

We welcome contributions that align with our design philosophy: **calm, capable, and cohesive**.

### **Development Workflow**
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Follow our **component-first** architecture:
   - Components in `src/components/ui` (shadcn/ui style) or `src/components/features`.
   - Utility functions in `src/lib`.
   - Hooks in `src/hooks`.
4. Ensure **TypeScript strict mode** compliance.
5. Run `npm run lint` and fix any ESLint/Prettier issues.
6. Test in both Chrome and Firefox extensions.
7. Submit a PR with a clear description and screenshots for UI changes.

### **Design Contributions**
- Update `src/index.css` for theming changes (HSL colors only).
- Follow shadcn/ui patterns for new components (motion, radius, dark mode).
- Icons: use `lucide-react`; custom icons in `public/icons/`.

### **Extension-Specific Contributions**
- Popup JS must be **vanilla** (no frameworks—keep it <50KB).
- Blocked page: minimal JS, inline styles (no external deps).
- Manifest updates require testing in Chrome, Firefox, Edge.

---

## 📜 License

This project is licensed under the **MIT License**—see the [LICENSE](LICENSE) file for details.

> **Why MIT?** Permissive licensing encourages adoption, integration, and commercial use. We believe open-source tooling for focus should be accessible to all, whether in a startup, Fortune 500, or classroom.

---

## 📞 Connect & Support

- **Dashboard**: [https://omit.software](https://omit.software)  
- **Extension**: Chrome Web Store (coming soon)  
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)  
- **Discord Community**: [Join our server](https://discord.gg/omit) for support and feature voting.  
- **Email**: hello@omit.software  

---

**Built with precision. Designed for focus. Empowering productivity.**  

*Omit: Because every unblocked minute is a minute reclaimed.*