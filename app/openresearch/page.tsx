"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CursorGlow } from "@/components/cursor-glow";

const projects = [
  {
    slug: "project0",
    title: "project0",
    kicker: "Scene-aware ActionPlan",
    description:
      "Place HumanML3D-272 locomotion into TRUMANS rooms, render head-camera ego, and encode the scene with VGGT-Ω.",
    status: "Placement smoke",
    href: "/openresearch/project0",
  },
];

export default function OpenResearchPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CursorGlow />
      <header className="px-6 lg:px-12 py-6">
        <div className="max-w-4xl flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-foreground hover:text-primary transition-colors"
          >
            EN
          </Link>
          <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
            Open research
          </span>
        </div>
      </header>

      <section className="px-6 lg:px-12 pb-24 pt-8">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-sm tracking-wider text-muted-foreground"
          >
            Notes
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-3 text-4xl font-bold text-balance sm:text-5xl"
          >
            Open research
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-xl text-muted-foreground leading-relaxed"
          >
            Unlisted working notes. Not linked from the public site.
          </motion.p>

          <div className="mt-12 grid gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
              >
                <Link
                  href={project.href}
                  className="group block rounded-xl border border-border bg-card p-6 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                          {project.kicker}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full border border-border text-muted-foreground">
                          {project.status}
                        </span>
                      </div>
                      <h2 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
