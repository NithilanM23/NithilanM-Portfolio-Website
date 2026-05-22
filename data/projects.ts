import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    title: "F1 Race Position Predictor",
    description:
      "Predictive web application for Formula 1 race outcomes using historical data and XGBoost regression.",
    tags: ["Django", "XGBoost", "REST APIs", "Data Analysis"],
    category: "web",
    demoUrl: "https://f1predictor.onrender.com",
    repoUrl: "https://github.com/NithilanM23/F1-Predictor",
    images: ["/projects/f1-predictor/mainpage_f1.png", "/projects/f1-predictor/homepage_f1.png"],
  },
  {
    title: "Multimodal RAG System",
    description:
      "Enterprise-grade RAG system processing PDFs with text, tables, and images. Hybrid retrieval pipeline with local LLM inference.",
    tags: ["RAG", "Local LLMs", "Hybrid Search", "PyTorch"],
    category: "rag",
    featured: true,
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    images: ["/projects/multimodal_rag/ui_rag.png"],
  },
  {
    title: "AI Chatbot with Pinecone",
    description:
      "Company knowledge assistant using Flowise and Pinecone. Built with website scraping, embeddings, and vector retrieval.",
    tags: ["FlowiseAI", "Pinecone", "LLMs", "Web Scraping"],
    category: "rag",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    images: ["/projects/chatbot/blocks.png", "/projects/chatbot/chatbubble.png"],
  },
  {
    title: "Intelligent CSV Assistant",
    description:
      "Interactive AI-powered CSV analysis tool with automated EDA, conversational insights, and dynamic visualizations.",
    tags: ["Streamlit", "Pandas", "Gemini LLM", "Matplotlib"],
    category: "web",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/NithilanM23/Intelligent-CSV-Assistant-LLM-Powered",
    images: [
      "/projects/csv_bot/ex1.png",
      "/projects/csv_bot/ex2.png",
      "/projects/csv_bot/ex3.png",
    ],
  },
  {
    title: "RGAE-PNNR Anomaly Detection",
    description:
      "Research paper on visual anomaly detection using hybrid approach. Achieved 99.6% AUROC on MVTec AD benchmark.",
    tags: ["PyTorch", "Computer Vision", "AutoEncoders", "Research"],
    category: "cv",
    featured: true,
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    images: [],
  },
  {
    title: "Clinic Triage System",
    description:
      "AI-powered healthcare triage assistant using NLP for symptom classification and nearby hospital recommendations.",
    tags: ["Flask", "SpaCy", "NLP", "APIs", "Deployment"],
    category: "web",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/NithilanM23/BERT-Finetuning-For-MedicalData",
    images: [],
  },
]

export const projectFilters = [
  { id: "all" as const, label: "All" },
  { id: "rag" as const, label: "RAG" },
  { id: "cv" as const, label: "CV" },
  { id: "web" as const, label: "Web" },
]
