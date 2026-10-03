// Static seed data for Mohammed Shimak A's portfolio
// This data is based on the provided resume.
// The admin dashboard will override this with live Firestore data.

export const profileData = {
  name: "Mohammed Shimak A",
  headline: "Information Technology Student & Aspiring Software Developer",
  tagline: "Building meaningful software — one project at a time.",
  about: `I'm Mohammed Shimak, an Information Technology undergraduate at Velalar College of Engineering & Technology, Erode. My journey in tech is driven by a genuine passion for software development, programming, and building things that solve real problems.

I work primarily with Java, Python, and web technologies. I enjoy designing and building complete systems — from database schemas to user interfaces — and I am deeply curious about how AI and machine learning can be applied to create more intelligent software.

I believe in continuous learning and hands-on project development. Every project I take on teaches me something new — whether that is clean code architecture, working with APIs, or designing systems that actually hold up under real-world conditions.

Currently, I am focused on strengthening my foundation in software engineering while exploring the intersection of AI and practical application development.`,
  email: "shimak8870@gmail.com",
  location: "Erode, Tamil Nadu, India",
  cgpa: "7.73",
  college: "Velalar College of Engineering & Technology",
  degree: "B.Tech – Information Technology",
  graduationYear: "2027",
  photo: "/images/profile.png",
  resumeUrl: "/resume/Mohammed_Shimak_A_Resume.pdf",
  socialLinks: {
    github: "https://github.com/shimak",
    linkedin: "https://www.linkedin.com/in/mohammed-shimak-a",
    leetcode: "https://leetcode.com/shimak",
  },
};

export const skillsData = [
  // Programming
  { id: "1", category: "Programming", name: "Java", level: "Intermediate" },
  { id: "2", category: "Programming", name: "C", level: "Beginner" },
  { id: "3", category: "Programming", name: "Python", level: "Beginner" },
  // Web Technologies
  { id: "4", category: "Web Technologies", name: "HTML", level: "Intermediate" },
  { id: "5", category: "Web Technologies", name: "CSS", level: "Intermediate" },
  // Database
  { id: "6", category: "Database", name: "SQL", level: "Intermediate" },
  { id: "7", category: "Database", name: "Database Management", level: "Intermediate" },
  // Core Concepts
  { id: "8", category: "Core Concepts", name: "Object-Oriented Programming", level: "Intermediate" },
  { id: "9", category: "Core Concepts", name: "Problem Solving", level: "Intermediate" },
  // Tools
  { id: "10", category: "Tools", name: "Git", level: "Beginner" },
  { id: "11", category: "Tools", name: "GitHub", level: "Beginner" },
  // AI / ML
  { id: "12", category: "AI / ML", name: "Basic Machine Learning", level: "Beginner" },
  { id: "13", category: "AI / ML", name: "MFCC Feature Extraction", level: "Beginner" },
];

export const projectsData = [
  {
    id: "1",
    name: "Smart Stock & POS Management System",
    category: "Web Application",
    status: "Completed",
    shortDesc: "A web-based supermarket management system for inventory control and point-of-sale billing.",
    description: `Developed a comprehensive web-based supermarket management system designed to streamline inventory management and point-of-sale operations. The system provides a unified interface for managing stock, tracking sales, and organizing shelf/rack storage.`,
    problem: "Supermarkets often struggle with manual inventory tracking, leading to stock discrepancies, inefficient billing, and lack of real-time visibility over stock levels.",
    features: [
      "Barcode scanning for fast product identification",
      "Real-time stock tracking and inventory management",
      "Shelf and rack organization system",
      "Sales reporting and analytics",
      "Point-of-sale billing and invoicing",
      "Transaction monitoring and history",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "SQL"],
    github: "",
    demo: "",
    image: "",
  },
  {
    id: "2",
    name: "Multilingual Deepfake Audio Detection",
    category: "AI / Machine Learning",
    status: "Completed",
    shortDesc: "A machine learning system for detecting deepfake audio across multiple languages using MFCC features and Gradient Boosting.",
    description: `Built a multilingual deepfake audio detection system that classifies audio as real or synthesized (deepfake). The system uses MFCC (Mel-Frequency Cepstral Coefficients) feature extraction combined with a Gradient Boosting classifier to distinguish authentic speech from AI-generated audio across multiple languages.`,
    problem: "The proliferation of AI-generated audio content poses significant risks for misinformation, identity fraud, and digital trust. Existing detection methods often fail across language boundaries.",
    features: [
      "Multilingual audio support",
      "MFCC feature extraction from audio signals",
      "Gradient Boosting classifier for real vs. deepfake classification",
      "Audio preprocessing pipeline",
      "Classification with standard evaluation metrics",
    ],
    technologies: ["Python", "Machine Learning", "Gradient Boosting", "MFCC", "Scikit-learn"],
    github: "",
    demo: "",
    image: "",
  },
];

export const upcomingProjectsData = [
  {
    id: "1",
    name: "Indian Sign Language Interpreter",
    category: "AI / Computer Vision",
    status: "Coming Soon",
    shortDesc: "An AI-powered system to interpret Indian Sign Language and bridge communication between sign-language users and non-sign-language users.",
    description: "A planned AI and computer vision project aimed at recognizing Indian Sign Language gestures and translating them into text or speech in real time. The goal is to build a communication bridge for the hearing-impaired community.",
    technologies: ["Python", "Computer Vision", "AI / ML"],
  },
  {
    id: "2",
    name: "DataLensAI",
    category: "Data / AI",
    status: "Coming Soon",
    shortDesc: "An AI-powered data analysis and visualization tool designed to make complex datasets accessible and understandable.",
    description: "A planned project focused on intelligent data exploration and visualization. DataLensAI aims to help users gain insights from raw datasets without requiring deep technical expertise.",
    technologies: ["Python", "AI / ML", "Data Analysis"],
  },
  {
    id: "3",
    name: "SpendWiseAI",
    category: "AI / FinTech",
    status: "Coming Soon",
    shortDesc: "An AI-powered personal finance and spending intelligence application to help users understand and manage their spending patterns.",
    description: "A planned AI-driven personal finance tool designed to analyze spending behavior and provide actionable insights. SpendWiseAI aims to make personal financial intelligence accessible and intuitive.",
    technologies: ["Python", "AI / ML", "FinTech"],
  },
];

export const educationData = [
  {
    id: "1",
    institution: "Velalar College of Engineering & Technology",
    location: "Erode, Tamil Nadu",
    degree: "B.Tech – Information Technology",
    period: "2023 – 2027",
    grade: "CGPA: 7.73",
    type: "University",
    current: true,
  },
  {
    id: "2",
    institution: "HSC",
    location: "Tamil Nadu",
    degree: "Higher Secondary Certificate (HSC)",
    period: "2021 – 2023",
    grade: "",
    type: "School",
    current: false,
  },
];

export const certificationsData = [
  {
    id: "1",
    name: "MERN Stack Development",
    issuer: "Yellowmatics",
    year: "2025",
    url: "",
  },
  {
    id: "2",
    name: "Privacy and Security in Online Social Media",
    issuer: "IIIT Hyderabad",
    year: "",
    url: "",
  },
  {
    id: "3",
    name: "FlutterFlow Workshop",
    issuer: "Kongu Engineering College",
    year: "",
    url: "",
  },
];

export const achievementsData = [
  {
    id: "1",
    title: "Paper Presentation",
    event: "ICERECT 2025",
    organizer: "IEEE",
    year: "2025",
    description: "Presented a research paper at the International Conference on Emerging Research in Electronics, Computer Science and Technology (ICERECT 2025), organized under the IEEE banner.",
    type: "Research",
  },
  {
    id: "2",
    title: "Second Prize – Technical Quiz",
    event: "GUSTO'25",
    organizer: "Government Engineering College, Erode",
    year: "2025",
    description: "Won second prize in a Technical Quiz competition at GUSTO'25, the national-level technical symposium hosted by Government Engineering College, Erode.",
    type: "Competition",
  },
];
