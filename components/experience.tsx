"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    period: "2025 — Present",
    title: "Working Student, AI Core Team",
    company: "Mercedes-Benz",
    description:
      "Research & Development in Stuttgart. Building ML systems for automotive AI applications such as digitalizing physical sensors.",
    tags: ["Python", "PyTorch", "Deep Learning", "MLOps"],
  },
  {
    period: "2023 — 2025",
    title: "Research Assistant",
    company: "TIME Innovation Hub",
    description:
      "Tübingen Institute for Medical Education. Conducted studies and implemented AI solutions for medical education, leading to peer-reviewed publications.",
    tags: ["Python", "NLP", "LLMs", "Medical AI"],
  },
  {
    period: "May — Nov 2022",
    title: "Software Engineering Intern",
    company: "Amazon",
    description:
      "Global Transportation Technology Services team. Built infrastructure tooling with an estimated annual cost savings of $13M USD.",
    tags: ["TypeScript", "React", "Node.js", "AWS"],
  },
  {
    period: "2019 — 2022",
    title: "Programming Tutor",
    company: "HHU Düsseldorf",
    description:
      "Assisted students in computer science fundamentals, algorithms, and data structures during undergraduate studies.",
    tags: ["Teaching", "Java", "Algorithms", "Data Structures"],
  },
];

export function Experience() {
  return (
    <section className="py-24 px-6 lg:px-12" id="experience">
      <div className="max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-12"
        >
          Experience
        </motion.h2>

        <div className="space-y-2">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="group block p-6 rounded-xl hover:bg-secondary transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="grid md:grid-cols-[180px_1fr] gap-4">
                  <span className="text-sm text-muted-foreground font-mono">
                    {exp.period}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {exp.title} · {exp.company}
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-card text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
