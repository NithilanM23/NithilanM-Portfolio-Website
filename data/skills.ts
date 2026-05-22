export type SkillGroup = "ml" | "llm" | "tools"

export type Skill = {
  name: string
  level: number
  group: SkillGroup
}

export const skillGroups: { id: SkillGroup; label: string }[] = [
  { id: "ml", label: "ML & Data" },
  { id: "llm", label: "LLM & RAG" },
  { id: "tools", label: "Tools & Web" },
]

export const skills: Skill[] = [
  { name: "Python", level: 95, group: "ml" },
  { name: "Machine Learning", level: 90, group: "ml" },
  { name: "Deep Learning", level: 88, group: "ml" },
  { name: "NLP", level: 85, group: "ml" },
  { name: "PyTorch", level: 85, group: "ml" },
  { name: "Pandas", level: 90, group: "ml" },
  { name: "Scikit-learn", level: 85, group: "ml" },
  { name: "RAG Systems", level: 92, group: "llm" },
  { name: "LLMs", level: 90, group: "llm" },
  { name: "LangChain", level: 88, group: "llm" },
  { name: "Pinecone", level: 88, group: "llm" },
  { name: "FAISS", level: 85, group: "llm" },
  { name: "Django", level: 82, group: "tools" },
  { name: "Streamlit", level: 85, group: "tools" },
  { name: "SQL", level: 80, group: "tools" },
  { name: "HTML/CSS", level: 80, group: "tools" },
]
