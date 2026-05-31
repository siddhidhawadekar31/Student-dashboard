# LearnOS — Next-Gen Student Dashboard

A futuristic, dark-mode learning dashboard built for the Frontend Intern Challenge. Features a Bento Grid layout, Supabase-powered course data via React Server Components, and rich Framer Motion animations.

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 15 (App Router)** | Framework with RSC for server-side data fetching |
| **Supabase** | PostgreSQL database + `@supabase/ssr` for secure server-side queries |
| **Tailwind CSS** | Utility-first styling with custom design tokens |
| **Framer Motion** | Spring physics animations, staggered reveals, layout transitions |
| **Lucide React** | Icon library with dynamic icon rendering from DB field |
| **TypeScript** | Full type safety across the stack |

---

## 🏗️ Architecture & Key Decisions

### Server / Client Component Split

```
app/dashboard/page.tsx          ← SERVER component (async, fetches Supabase)
  └── Suspense boundary
       └── BentoGrid.tsx        ← CLIENT component (Framer Motion animations)
            ├── HeroTile.tsx    ← CLIENT (interactive)
            ├── CourseCard.tsx  ← CLIENT (progress animation, icon)
            ├── ActivityTile.tsx← CLIENT (contribution graph)
            └── StatsTile.tsx   ← CLIENT (hover effects)

components/layout/Sidebar.tsx   ← CLIENT (collapsible, layoutId animations)
```

The `page.tsx` is a **pure Server Component** — it fetches courses from Supabase with zero JavaScript sent to the browser for the fetch itself. The `<Suspense>` boundary wraps the data-fetching tree so a skeleton loader (`CoursesSkeleton`) is shown immediately while the DB query runs.

### Why `@supabase/ssr`?

Using `@supabase/ssr` instead of a bare Supabase client ensures cookies are forwarded correctly in the Next.js App Router context, enabling auth-aware RLS queries in the future without any architectural changes.

### Animation Strategy

- **Zero layout shifts**: All animations use `transform` and `opacity` only — never `width`, `height`, or `margin`.
- **Stagger**: `containerVariants` with `staggerChildren: 0.08` creates the sequential reveal.
- **Spring physics**: All hover states use `type: "spring", stiffness: 300, damping: 20` for natural, non-linear feel.
- **`layoutId`**: Sidebar active indicator uses `layoutId="nav-highlight"` for fluid morphing between nav items.

### Progress Bar Animation

The course progress bar animates using Framer Motion's `animate` prop (`width: 0 → progress%`) with a custom cubic-bezier ease. The numeric counter uses `requestAnimationFrame` for a smooth count-up effect synced to the bar.

---

## ⚙️ Setup & Local Development

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/learning-dashboard.git
cd learning-dashboard
npm install
```

### 2. Configure Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor** and run the contents of `supabase/seed.sql`
3. Copy your project URL and anon key from **Project Settings → API**

### 3. Set environment variables

```bash
cp .env.example .env.local
# Edit .env.local and fill in your values
```

### 4. Run locally

```bash
npm run dev
# Visit http://localhost:3000
```

---

## 🗄️ Database Schema

```sql
table: courses
├── id          uuid (primary key)
├── title       text
├── progress    integer (0–100)
├── icon_name   text  -- Lucide icon slug, e.g. "code-2", "layers"
└── created_at  timestamptz
```

The `icon_name` field stores a Lucide icon slug (e.g. `"code-2"`, `"layers"`, `"database"`). `CourseCard` converts this to a PascalCase component name and dynamically renders it.

---

## 📦 Deployment (Vercel)

1. Push to a public GitHub repo
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables under **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — Vercel auto-detects Next.js

---

## 📱 Responsive Behaviour

| Breakpoint | Sidebar | Grid |
|---|---|---|
| `>1024px` | Full sidebar (collapsible) | 12-col Bento |
| `768–1024px` | Icon-only (collapsed) | 2-col grid |
| `<768px` | Bottom navigation bar | Single column |

---

## Challenges & Solutions

- **Dynamic icon rendering**: Lucide exports 1000+ icons as named exports. `CourseCard` converts the `icon_name` string from the DB to PascalCase and indexes into `* as LucideIcons`, with `BookOpen` as a safe fallback.
- **Progress animation timing**: The count-up and bar animations needed to start *after* the staggered entrance. A `setTimeout(400ms)` delay inside `useEffect` ensures they fire after the tile has faded in.
- **Grain texture without images**: CSS SVG data-URI with `feTurbulence` provides the noise overlay without any network request.
