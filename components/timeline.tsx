"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "AI/ML Intern",
    company: "Sopra Steria India – Chennai, India",
    period: "Dec 2025 – March 2026",
    description:
      "Worked on secure enterprise-grade multimodal Retrieval-Augmented Generation (RAG) systems focused on private document intelligence workflows. Designed a fully local multimodal RAG system capable of processing PDFs containing text, tables, and images. Developed a hybrid retrieval pipeline combining semantic and keyword-based retrieval. Integrated locally hosted LLMs to ensure secure offline inference and built privacy-focused AI workflows with zero external API dependency.",
    skills: ["RAG Pipelines", "Local LLMs", "Hybrid Search", "Semantic Retrieval", "Enterprise AI"],
  },
  {
    title: "Data Science Intern",
    company: "8Queens Software Technologies Private Limited – Chennai, India",
    period: "June 2025 – July 2025",
    description:
      "Worked on data analytics, automation, dashboards, and AI chatbot solutions using both code-based and no-code tools. Built an internal chatbot using Flowise and Pinecone by scraping company website data and deploying LLM-powered responses. Automated preprocessing and reporting workflows, analyzed client datasets to identify trends, and developed dashboards using Power BI.",
    skills: ["Flowise", "Pinecone", "Web Scraping", "Power BI", "Data Analytics"],
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-orange-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-400 mb-4">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
