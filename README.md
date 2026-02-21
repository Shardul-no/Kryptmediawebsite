# Krypt Media Website

A modern, responsive website for Krypt Media, built with **React**, **Vite**, and **Tailwind CSS**. This project is designed for easy maintenance, scalability, and a visually engaging user experience.

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Kryptmediawebsite
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

4. **Build for production:**
   ```bash
   npm run build
   ```
5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
Kryptmediawebsite/
├── public/                # Static assets (currently empty)
├── src/
│   ├── assets/            # Images and media
│   │   ├── logo.avif      # Site logo
│   │   ├── services/      # Service images (1.jpg, 2.jpg, ...)
│   │   └── team/          # Team member images (1.jpg, 2.jpg, ...)
│   ├── components/        # Reusable React components
│   │   ├── Navbar.jsx     # Responsive navigation bar
│   │   └── AnimateOnScroll.jsx # Animation wrapper for scroll effects
│   ├── data/              # Static JSON data
│   │   ├── projects.json  # Project showcase data
│   │   ├── services.json  # List of services
│   │   └── team.json      # Team member info
│   ├── pages/             # Main page sections
│   │   ├── About.jsx      # About/Founders section
│   │   ├── Hero.jsx       # Hero/landing section
│   │   └── Services.jsx   # Services section
│   ├── App.jsx            # Main app component
│   ├── App.css            # App-specific styles (minimal)
│   ├── index.css          # Global styles (Tailwind, scroll behavior)
│   └── main.jsx           # App entry point
├── index.html             # HTML entry point
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

---

## ✨ Features
- **React + Vite** for fast development and builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Responsive Navbar** with scroll tracking and mobile menu
- **Animated Hero, Services, and About sections**
- **Data-driven content** (services, team, projects)
- **Easy customization and extension**

---

## 🧩 Components

### `Navbar.jsx`
- Responsive navigation bar with scroll tracking
- Desktop and mobile menu with animated hamburger icon
- Links to all main sections (Home, Services, Projects, About, Testimonials, Contact)
- Uses Framer Motion for smooth transitions

### `AnimateOnScroll.jsx`
- Wrapper component to animate children into view on scroll
- Uses `framer-motion` and `react-intersection-observer`

---

## 📄 Pages/Sections

### `Hero.jsx`
- Animated headline and subtitle
- Gradient text and call-to-action button
- Full-screen, centered layout

### `Services.jsx`
- Animated grid of services, loaded from `data/services.json`
- Each card includes image, icon, title, description, and features
- Responsive and visually engaging

### `About.jsx`
- Showcases founders/team, loaded from `data/team.json`
- Alternating layout for each member
- Includes image, name, role, bio, and contact info

---

## 📊 Data Files

### `services.json`
- Array of service objects: `title`, `description`, `image`, `icon`, `features[]`
- Images referenced from `public/assets/services/`

### `team.json`
- Array of team members: `name`, `role`, `phone`, `image`
- Images referenced from `public/assets/team/`

### `projects.json`
- Array of projects: `title`, `description`, `image`, `link`
- (Extend as needed for more projects)

---

## 🛠️ Customization
- **Add new services:** Edit `src/data/services.json` and add images to `public/assets/services/`
- **Add team members:** Edit `src/data/team.json` and add images to `public/assets/team/`
- **Add projects:** Edit `src/data/projects.json` and update the UI as needed
- **Change styles:** Edit Tailwind classes in components or add global styles in `index.css`
- **Update logo:** Replace `public/logo.avif`

---

## 🧹 Linting & Code Quality
- ESLint is configured for React and modern JS (see `eslint.config.js`)
- Run lint checks with:
  ```bash
  npm run lint
  ```
- Follows recommended rules for best practices and unused variable detection

---

## 📜 Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

---

## 🤝 Contributing
- Fork the repo and create a new branch for your feature or fix
- Make your changes and ensure the app runs and lints cleanly
- Submit a pull request with a clear description of your changes

---

## 📞 Contact
For questions or support, contact the founders (see About section in the app for details).

---

## 📝 Notes
- All images are local for fast loading; add new images to the appropriate folders
- The site is fully responsive and works on all modern browsers
- Built with maintainability and scalability in mind