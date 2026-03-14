"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    period: "2023 — 2026",
    degree: "M.Sc. Machine Learning",
    school: "University of Tübingen",
    status: "In Progress",
    description:
      "Master's thesis on Spatial Reasoning for Human Motion Diffusion. Coursework in deep learning, probabilistic machine learning, statistical machine learning, reinforcement learning, computer vision, and Real Virtual Humans.",
  },
  {
    period: "2019 — 2023",
    degree: "B.Sc. Computer Science",
    school: "HHU Düsseldorf",
    description:
      "Strong foundation in algorithms, software engineering, and theoretical computer science. Thesis on Computational Cell Biology.",
  },
  {
    period: "2021 — 2022",
    degree: "Erasmus Semester Abroad",
    school: "TU Dublin",
    description:
      "Exchange semester under Erasmus scholarship. Expanded perspective through international coursework and collaboration.",
  },
];

export function Education() {
  return (
    <section className="py-24 px-6 lg:px-12" id="education">
      <div className="max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-12"
        >
          Education
        </motion.h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="grid md:grid-cols-[180px_1fr] gap-4">
                <span className="text-sm text-muted-foreground font-mono">
                  {edu.period}
                </span>
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg border border-border bg-card h-fit">
                    <GraduationCap className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground flex items-center gap-3">
                      {edu.degree}
                      {edu.status && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full border border-border bg-card text-muted-foreground">
                          {edu.status}
                        </span>
                      )}
                    </h3>
                    <p className="text-muted-foreground">{edu.school}</p>
                    <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
