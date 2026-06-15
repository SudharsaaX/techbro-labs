// Verified data from GitHub repositories and profile
// Source: https://github.com/SudharsaaX

export const siteConfig = {
  name: "TechBro Labs",
  tagline: "Student Project Development & AI/ML Solutions",
  description: "We build projects, explore technology, learn continuously, and help students with technical solutions.",
  author: "Sudharsan S",
  github: "https://github.com/SudharsaaX",
  portfolio: "https://sudharsaax.web.app/",
  email: "sudharsaa149@gmail.com",
  githubEmail: "sudharsan1527@gmail.com",
  linkedin: "",
};

export const projects = [
  {
    id: "reviva-yawn-detection",
    title: "Reviva — Yawn Detection",
    subtitle: "Real-time Driver Fatigue Detection System",
    description:
      "A real-time AI system that detects driver yawning using YOLOv8 computer vision. When a yawn is detected, the system triggers IoT alerts including a buzzer and Telegram notifications to prevent fatigue-based road accidents.",
    longDescription:
      "Reviva is an intelligent driver safety system that uses YOLOv8, a state-of-the-art object detection model, to monitor a driver's face in real-time. Upon detecting yawning — a key indicator of driver fatigue — the system immediately activates IoT-based alert mechanisms including a physical buzzer and instant Telegram notifications, helping prevent fatigue-related road accidents.",
    tags: ["Python", "YOLOv8", "Computer Vision", "IoT", "Telegram API", "OpenCV"],
    category: "AI / Computer Vision / IoT",
    github: "https://github.com/SudharsaaX/Reviva-Yawn-Detection",
    featured: true,
    color: "from-blue-500 to-cyan-400",
    icon: "eye",
    highlights: [
      "Real-time yawn detection using YOLOv8",
      "IoT buzzer alerts on detection",
      "Telegram notification integration",
      "Prevents fatigue-based road accidents",
    ],
  },
  {
    id: "lifetracker-bot",
    title: "LifeTracker Bot",
    subtitle: "AI-Powered Productivity Tracking via Telegram",
    description:
      "A productivity tracking system built using n8n, Telegram, and AI. Log daily activities through simple text or voice messages — the system understands, extracts, and stores data in Google Sheets automatically.",
    longDescription:
      "LifeTracker Bot makes activity tracking simple and natural. Instead of manually logging tasks, users can send messages like 'I studied 2 hours' or a voice note. The system uses AI to understand the input, extract activity data and duration, then automatically logs it to Google Sheets. It also provides productivity insights and detects important emails.",
    tags: ["n8n", "Telegram API", "AI", "Google Sheets", "Speech-to-Text", "Workflow Automation"],
    category: "AI / Automation / Productivity",
    github: "https://github.com/SudharsaaX/LifeTracker-Bot",
    featured: true,
    color: "from-purple-500 to-pink-500",
    icon: "bot",
    highlights: [
      "Text and voice-based activity logging",
      "AI-powered activity & time extraction",
      "Automatic Google Sheets logging",
      "Email importance detection",
      "Productivity insights dashboard",
    ],
  },
  {
    id: "futurenest-real-estate-ml",
    title: "FutureNest — Real Estate ML",
    subtitle: "Chennai House Price Prediction System",
    description:
      "A complete Machine Learning system to predict current and future house prices in Chennai using CatBoost and Streamlit. Achieves high accuracy with R² > 89% through clean preprocessing and EDA pipeline.",
    longDescription:
      "FutureNest is a data-driven real estate price prediction platform built for the Chennai housing market. It uses CatBoost, a gradient boosting algorithm, to predict both current and future location-based house prices. The interactive Streamlit interface makes it accessible to non-technical users, while the clean preprocessing and EDA pipeline ensure model reliability.",
    tags: ["Python", "CatBoost", "Scikit-learn", "Pandas", "Streamlit", "Machine Learning", "EDA"],
    category: "Machine Learning / Data Science",
    github: "https://github.com/SudharsaaX/FutureNest-RealEstate-ML",
    featured: true,
    color: "from-emerald-500 to-teal-400",
    icon: "home",
    highlights: [
      "R² accuracy > 89%",
      "Current & future price predictions",
      "Location-based price forecasting",
      "Interactive Streamlit web UI",
      "Clean preprocessing & EDA pipeline",
    ],
  },
  {
    id: "dream-analyzer",
    title: "Dream Analyzer",
    subtitle: "AI-Powered Dream Interpretation App",
    description:
      "A Streamlit-based web application that analyzes dream narratives using NLP techniques. Provides emotional, symbolic, and cultural analysis with visualizations and personalized book/podcast recommendations.",
    longDescription:
      "Dream Analyzer is an NLP application that transforms dream descriptions into meaningful insights. It uses NRCLex and TextBlob for emotion detection, extracts symbols and themes, considers cultural contexts, and generates word clouds and pie charts. The modular, rule-based architecture ensures explainability, and the app provides personalized book and podcast recommendations based on detected themes.",
    tags: ["Python", "Streamlit", "NLTK", "TextBlob", "NRCLex", "Matplotlib", "WordCloud", "NLP"],
    category: "NLP / AI / Web App",
    github: "https://github.com/SudharsaaX/Dream-Analyzer",
    featured: false,
    color: "from-violet-500 to-indigo-500",
    icon: "brain",
    highlights: [
      "Emotion detection via NRCLex & TextBlob",
      "Symbol & theme interpretation",
      "Cultural context analysis",
      "Word cloud & pie chart visualizations",
      "Book & podcast recommendations",
    ],
  },
  {
    id: "pharmacy-sales-forecast",
    title: "Pharmacy Sales Forecast",
    subtitle: "Pharmaceutical Sales Dashboard with AI Insights",
    description:
      "A Streamlit dashboard integrating Prophet (monthly) and XGBoost (weekly) forecasting for 8 pharmaceutical product categories. Includes AI-generated explanations of forecast trends using Google's Generative AI.",
    longDescription:
      "This pharmaceutical sales forecasting dashboard supports dual forecasting methods: Facebook Prophet for monthly trends and XGBoost for weekly precision. It covers 8 drug categories (M01AB, M01AE, N02BA, N02BE, N05B, N05C, R03, R06), provides interactive visualizations, performance metrics (MAPE, RMSE, R²), and automatically generates AI explanations of forecast trends using Google's Generative AI API.",
    tags: ["Python", "Streamlit", "Prophet", "XGBoost", "Google Generative AI", "Data Science", "Forecasting"],
    category: "Data Science / Forecasting",
    github: "https://github.com/SudharsaaX/cts-group13-pharmacy-sales-forecast",
    featured: false,
    color: "from-orange-500 to-red-500",
    icon: "bar-chart",
    highlights: [
      "Dual forecasting: Prophet + XGBoost",
      "8 pharmaceutical product categories",
      "Performance metrics: MAPE, RMSE, R²",
      "AI-generated trend explanations",
      "Customizable forecast horizon",
      "Data export functionality",
    ],
  },
  {
    id: "dubsync",
    title: "DubSync",
    subtitle: "Cross-Language Video Translation & Voice Cloning",
    description: "End-to-end AI system that automatically translates spoken content in videos while preserving the original speaker's voice identity using F5-TTS.",
    longDescription: "DubSync is an end-to-end AI system that automatically translates spoken content in videos into another language while preserving the original speaker's voice identity. It combines speech recognition, neural machine translation, context-aware refinement, and neural voice cloning to generate natural and emotionally consistent dubbed videos.",
    github: "https://github.com/SudharsaaX/DubSync.git",
    category: "AI / Automation / Productivity",
    icon: "bot",
    color: "from-orange-500 to-pink-500",
    tags: ["Python", "PyTorch", "F5-TTS", "Indic Conformer", "Gemini API", "PyAnnote"],
    highlights: [
      "Identity-preserving voice cloning",
      "Speaker diarization for multiple speakers",
      "End-to-end automated video dubbing pipeline"
    ],
    featured: true,
  },
];

export const skills = {
  "Programming Languages": [
    { name: "Python", level: 85 },
  ],
  "Machine Learning & AI": [
    { name: "YOLOv8 (Computer Vision)", level: 80 },
    { name: "CatBoost", level: 78 },
    { name: "XGBoost", level: 75 },
    { name: "Scikit-learn", level: 80 },
    { name: "NLP (NLTK, TextBlob, NRCLex)", level: 75 },
  ],
  "Data Science": [
    { name: "Pandas", level: 82 },
    { name: "Matplotlib", level: 75 },
    { name: "Data Preprocessing & EDA", level: 80 },
    { name: "Prophet (Time Series)", level: 72 },
  ],
  "Web & App Development": [
    { name: "Streamlit", level: 82 },
    { name: "Next.js", level: 60 },
    { name: "HTML / CSS", level: 70 },
  ],
  "Tools & Platforms": [
    { name: "n8n (Workflow Automation)", level: 78 },
    { name: "Telegram Bot API", level: 80 },
    { name: "Google Generative AI API", level: 70 },
    { name: "Google Sheets API", level: 72 },
    { name: "Git & GitHub", level: 78 },
    { name: "Jupyter Notebook", level: 82 },
  ],
  "IoT & Hardware": [
    { name: "IoT Integration", level: 68 },
    { name: "Sensor & Buzzer Control", level: 65 },
  ],
};

export const services = [
  {
    icon: "code",
    title: "Web Development",
    description: "Building functional, clean web applications using modern frameworks and tools. Focus on usability and clear code.",
    tags: ["Next.js", "Streamlit", "HTML/CSS"],
  },
  {
    icon: "brain",
    title: "AI & ML Projects",
    description: "Developing machine learning systems for computer vision, NLP, prediction, and classification tasks using Python and modern ML libraries.",
    tags: ["Python", "YOLOv8", "Scikit-learn", "CatBoost"],
  },
  {
    icon: "bar-chart-2",
    title: "Data Science Projects",
    description: "End-to-end data science pipelines: data collection, preprocessing, exploratory analysis, model building, and dashboard visualization.",
    tags: ["Pandas", "Prophet", "XGBoost", "Matplotlib"],
  },
  {
    icon: "bot",
    title: "Automation & Bots",
    description: "Building intelligent automation workflows using n8n and Telegram bots that simplify repetitive tasks with AI-powered processing.",
    tags: ["n8n", "Telegram API", "Automation"],
  },
  {
    icon: "file-text",
    title: "Project Documentation",
    description: "Helping structure and document technical projects with clear READMEs, architecture explanations, and code comments.",
    tags: ["Technical Writing", "README", "Architecture"],
  },
  {
    icon: "rocket",
    title: "Deployment Assistance",
    description: "Whether you already have a project idea or need help discovering one, TechBro Labs can guide you through the entire process.",
    tags: ["Streamlit Cloud", "Vercel", "Firebase"],
  },
];
