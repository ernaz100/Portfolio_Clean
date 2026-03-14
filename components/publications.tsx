"use client";

import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";

const publications = [
  // {
  //   type: "First Author",
  //   venue: "2025",
  //   title:
  //     "ActionPlan: Future-Aware Streaming Motion Synthesis via Frame-Level Action Planning",
  //   url: "#",
  // },
  {
    type: "Co-Author",
    venue: "JMIR 2025",
    title:
      "The Potential of GPT-4 to Transform Discharge Letters Into Patient-Centered Letters to Enhance Patient Safety",
    url: "https://www.jmir.org/2025/1/e67143",
  },
  {
    type: "Acknowledgement",
    venue: "JMIR Medical Education 2024",
    title:
      "A Generative Pretrained Transformer (GPT)–Powered Chatbot as a Simulated Patient to Practice History Taking",
    url: "https://mededu.jmir.org/2024/1/e53961",
  },
  {
    type: "Acknowledgement",
    venue: "JMIR Medical Education 2024",
    title:
      "A Language Model–Powered Simulated Patient With Automated Feedback for History Taking",
    url: "https://mededu.jmir.org/2024/1/e59213/",
  },
];

export function Publications() {
  return (
    <section className="py-24 px-6 lg:px-12" id="publications">
      <div className="max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-12"
        >
          Publications
        </motion.h2>

        <div className="space-y-4">
          {publications.map((pub, index) => (
            <motion.a
              key={pub.title}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className="group block p-6 rounded-xl border border-border bg-card hover:bg-secondary transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg border border-border bg-card shrink-0">
                  <FileText className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        pub.type === "First Author"
                          ? "bg-foreground text-background"
                          : "border border-border bg-card text-muted-foreground"
                      }`}
                    >
                      {pub.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {pub.venue}
                    </span>
                  </div>
                  <p className="text-foreground font-medium leading-relaxed group-hover:text-primary transition-colors">
                    {pub.title}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
