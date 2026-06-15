# TechBro Labs 🚀

Welcome to the **TechBro Labs** repository. 

TechBro Labs is a collaborative project development studio and portfolio website. We build intelligent, functional projects at the intersection of AI, Machine Learning, Data Science, and modern Web Development. This website serves as both our agency platform for clients/students to request project assistance, and a portfolio to showcase our fully transparent, real-world repositories.

## 📸 Screenshots

| Home Page | Projects Page |
| :---: | :---: |
| <img src="/public/screenshots/home.png" alt="Home Page" width="400"/> | <img src="/public/screenshots/projects.png" alt="Projects Page" width="400"/> |

| Skills Page | Request Form |
| :---: | :---: |
| <img src="/public/screenshots/skills.png" alt="Skills Page" width="400"/> | <img src="/public/screenshots/contact.png" alt="Contact Page" width="400"/> |

## ✨ Features

- **Premium Dark UI**: A modern, glassmorphism-inspired dark theme built with Tailwind CSS.
- **Dynamic Animations**: Smooth page-to-page transitions using `framer-motion` and custom typewriter effects.
- **Interactive Project Portfolio**: Browse real-world GitHub repositories with highlighted tech stacks and features.
- **Robust Contact System**: A secure, highly-validated "Request a Project" form powered by EmailJS, completely protected by Honeypot spam defense logic.
- **Responsive Design**: Flawless UX across desktop, tablet, and mobile devices, including performance-optimized custom cursor effects for desktop users.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & CSS keyframes
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: React Hook Form + EmailJS

## 🚀 Getting Started Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SudharsaaX/techbro-labs.git
   cd techbro-labs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your EmailJS configuration:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **View the site:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security Notes
The `.gitignore` is configured strictly to prevent any `.env` files from being committed. Always keep your EmailJS public keys and any future API tokens exclusively in your local `.env.local` file or configure them securely within your hosting provider (like Vercel).

## 🤝 Contact
Built by the TechBro Labs team. For inquiries, please reach out via the website's contact form.
