"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="py-24 px-6 lg:px-12 border-t border-border">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
            Let's build something together.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            I'm always open to discussing new projects, research
            collaborations, or opportunities in machine learning and software
            engineering.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <a
              href="mailto:me@ericnazarenus.de"
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2 group"
            >
              <Mail className="w-5 h-5" />
              <span>Get in touch</span>
            </a>
            <a
              href="https://github.com/ernaz100"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/eric-nazarenus-34898718a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
