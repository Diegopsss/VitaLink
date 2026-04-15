# VitaLink

VitaLink is an educational web application designed for students to log in using their folio and access learning activities in a fun, kid-friendly environment. The app features an animated fox mascot, custom illustrated UI components, and smooth page transitions.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| React Router DOM | Client-side routing |
| Framer Motion | Animations & transitions |
| Supabase | Authentication & database |
| ESLint | Code linting |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### Running the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── assets/
│   └── Images/
│       ├── Backgrounds/   # Page background SVGs
│       ├── Buttons/       # Button PNGs (play, continue, sign up, sidebar)
│       ├── FoxImage/      # Fox mascot illustrations
│       ├── search_bar/    # Search bar assets
│       └── Texts/         # Speech bubble / text images
├── pages/
│   ├── HomePage.tsx       # Landing page with play button
│   └── auth/
│       └── LoginPage.tsx  # Login page with folio input
├── styles/
│   ├── index.css
│   └── App.css
├── utils/
│   └── supabase.ts        # Supabase client setup
├── App.tsx                # Router setup
└── main.tsx               # Entry point
```

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | HomePage | Landing page with animated play button |
| `/login` | LoginPage | Login with folio + sign up access |
| `/sign-up` | SignUpPage | New user registration |
| `/team-onboarding` | TeamOnboarding | Post-login onboarding flow |
