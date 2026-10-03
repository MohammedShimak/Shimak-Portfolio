# Mohammed Shimak A — Personal Portfolio

A modern, premium personal portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Firebase.

## ✨ Features

- **Premium Light Theme** — White/indigo/violet design system with glassmorphism cards
- **Fully Responsive** — Mobile-first design tested from 360px to 1440px+
- **Smooth Animations** — Framer Motion scroll reveals, hover effects, and micro-interactions
- **Admin Dashboard** — Edit all portfolio content without touching source code
- **Firebase Auth** — Secure admin authentication
- **Firestore** — Real-time content management
- **SEO Optimized** — Metadata, OpenGraph, JSON-LD structured data
- **Accessible** — Keyboard navigation, focus states, semantic HTML, reduced motion support

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Auth | Firebase Authentication |
| Database | Firebase Firestore |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main portfolio page
│   ├── layout.tsx         # Root layout + SEO
│   ├── globals.css        # Design system + CSS variables
│   └── admin/
│       ├── page.tsx       # Admin login
│       ├── layout.tsx     # Admin auth provider
│       └── dashboard/
│           ├── layout.tsx     # Dashboard shell + sidebar
│           ├── page.tsx       # Dashboard overview
│           ├── profile/       # Edit profile
│           ├── skills/        # Manage skills
│           ├── projects/      # Manage projects
│           ├── upcoming/      # Manage upcoming projects
│           ├── education/     # Manage education
│           ├── certifications/# Manage certifications
│           └── achievements/  # Manage achievements
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── UpcomingProjects.tsx
│   ├── Education.tsx
│   ├── Achievements.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── lib/
    ├── data.ts            # Static seed data
    ├── types.ts           # TypeScript types
    ├── firebase.ts        # Firebase init
    ├── firestore.ts       # Firestore CRUD helpers
    └── AuthContext.tsx    # Auth context provider
```

## 🔧 Local Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Firebase credentials in `.env.local`.

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Email/Password
4. Create an admin user (Auth → Users → Add user)
5. Enable **Firestore Database** → Start in production mode
6. Copy your web app config to `.env.local`

### Firestore Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for portfolio content
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🎛️ Admin Dashboard

Access the admin panel at `/admin`. Log in with your Firebase admin email/password.

**What you can manage:**
- Profile (name, bio, social links, resume URL)
- Skills (add/edit/delete, with category and level)
- Projects (full CRUD with tech tags, features, links)
- Upcoming Projects (CRUD with status)
- Education (timeline entries)
- Certifications (with optional URL)
- Achievements (with type and event details)

## 📄 Resume

Place your resume PDF at: `public/resume/Mohammed_Shimak_A_Resume.pdf`

It will be downloadable from the hero section.

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard (same as `.env.local`)
4. Deploy!

## 🌐 Environment Variables for Vercel

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

## 📝 License

MIT © Mohammed Shimak A
