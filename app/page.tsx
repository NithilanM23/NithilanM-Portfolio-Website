import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/data/projects"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { AboutStats } from "@/components/about-stats"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 mt-4">
                <span className="relative z-10">AI/ML Engineer & Data Scientist</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 animate-pulse"></span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
                Nithilan M
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-[600px]">
              B.Tech AI/DS student building practical AI systems that solve real-world problems. Specializing in RAG, LLMs, and intelligent systems.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              
              <a href="/#projects">
              <Button className="relative overflow-hidden group bg-gradient-to-r from-orange-500 to-amber-500 border-0">
                <span className="relative z-10 flex items-center">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>

                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </a>
              <Button
                variant="outline"
                className="border-zinc-700 text-orange-400 hover:text-orange-500 hover:border-zinc-500"
              >
                Contact Me
              </Button>
            </div>
            <div className="flex gap-4 pt-4">
              <Link href="https://github.com/NithilanM23" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/nithilanm23/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>             
              <Link href="mailto:nithilan.m.work@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <CreativeHero />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="About Me" subtitle="My background and journey" />

          <div className="mt-16">
            <div className="space-y-6">
              <GlassmorphicCard>
                <p className="text-lg text-zinc-300">
                  I'm a B.Tech student specializing in Artificial Intelligence and Data Science with strong interests in Machine Learning, Deep Learning, Generative AI, and RAG systems. I focus on building practical AI systems that solve real-world problems rather than just theoretical implementations.
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  My experience spans intelligent chatbots, multimodal RAG systems, predictive analytics, healthcare AI, and educational AI systems. I work with both code-first and no-code AI ecosystems, integrating LLMs with vector databases, APIs, and modern deployment workflows.
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  I achieved All India Rank 5 in "Large Language Models" and All India Rank 16 in "Responsible and Safe AI Systems" (NPTEL). Currently exploring full-stack AI engineering and preparing for international research opportunities.
                </p>

                <AboutStats />

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Name</div>
                    <div className="font-medium">Nithilan M</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium">nithilan.am@gmail.com</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Location</div>
                    <div className="font-medium">Chennai, India</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Specialization</div>
                    <div className="font-medium text-orange-400">AI/ML & Data Science</div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">Download Resume</Button>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Research" subtitle="My research contributions" />

          <div className="mt-16">
            <GlassmorphicCard>
              <div className="space-y-8">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-2xl font-bold mb-2">RGAE-PNNR: Unsupervised Visual Anomaly Detection</h3>
                  <p className="text-orange-400 font-medium mb-2">Revised Draft submitted at Springer Nature</p>
                  <p className="text-zinc-400 mb-4">Aug 2025 – Jan 2026</p>
                  
                  <p className="text-zinc-300 mb-4">
                    Co-developed a lightweight hybrid anomaly detection framework combining Residual Gated AutoEncoder (RGAE) and Patchwise Nearest Neighbor Reconstruction (PNNR).
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Key Contributions:</h4>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>Implemented the complete end-to-end pipeline in PyTorch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>Engineered a custom gating mechanism to reduce reconstruction over-smoothing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>Worked on defect localization and semantic consistency optimization</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Performance Results:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <div className="text-orange-400 font-bold text-xl">99.6%</div>
                        <div className="text-sm text-zinc-400">AUROC on MVTec AD Benchmark</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <div className="text-orange-400 font-bold text-xl">5.9M</div>
                        <div className="text-sm text-zinc-400">Parameters (~35% fewer than SOTA)</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Benchmarks Evaluated:</h4>
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 bg-orange-500/20 rounded-full text-sm text-orange-300">MVTec AD Benchmark</div>
                      <div className="px-3 py-1 bg-orange-500/20 rounded-full text-sm text-orange-300">VisA Benchmark</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Research Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">Computer Vision</div>
                      <div className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">Visual Anomaly Detection</div>
                      <div className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">AutoEncoders</div>
                      <div className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">Lightweight Deep Learning</div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="My Skills" subtitle="Technologies I work with" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            <SkillBadge name="Python" level={95} />
            <SkillBadge name="Machine Learning" level={90} />
            <SkillBadge name="Deep Learning" level={88} />
            <SkillBadge name="NLP" level={85} />
            <SkillBadge name="RAG Systems" level={92} />
            <SkillBadge name="LLMs" level={90} />
            <SkillBadge name="PyTorch" level={85} />
            <SkillBadge name="LangChain" level={88} />
            <SkillBadge name="Pandas" level={90} />
            <SkillBadge name="Scikit-learn" level={85} />
            <SkillBadge name="Django" level={82} />
            <SkillBadge name="Streamlit" level={85} />
            <SkillBadge name="Pinecone" level={88} />
            <SkillBadge name="FAISS" level={85} />
            <SkillBadge name="SQL" level={80} />
            <SkillBadge name="HTML/CSS" level={80} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

          <div className="mt-16 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium">nithilan.am@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">LinkedIn</div>
                    <div className="font-medium">www.linkedin.com/in/nithilanm23</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Github className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">GitHub</div>
                    <div className="font-medium">https://github.com/NithilanM23</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Available for AI/ML internships and research collaborations</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">Nithilan</span>
              <span className="text-white">M</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2">
              © {new Date().getFullYear()} Nithilan M. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/NithilanM23" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="www.linkedin.com/in/nithilanm23" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:nithilan.am@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
