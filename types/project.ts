export interface Project {
  title: string
  description: string
  tags: string[]
  demoUrl: string
  repoUrl: string
  /** Paths under /public — e.g. "/projects/f1/hero.png". Add images when ready. */
  images?: string[]
}
