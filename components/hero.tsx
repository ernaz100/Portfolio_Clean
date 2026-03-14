"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/ernaz100", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/eric-nazarenus-34898718a/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:me@ericnazarenus.de", label: "Email" },
];

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background"
    >
      {/* Cursor gradient spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, oklch(0.75 0.15 185 / 0.08), transparent 40%)`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.3_0.02_240/0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.3_0.02_240/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="animate-in fade-in slide-in-from-bottom-4 font-mono text-sm tracking-wider text-primary duration-500">
                Hi, my name is
              </p>
              <h1 className="animate-in fade-in slide-in-from-bottom-4 text-5xl font-bold text-foreground duration-500 sm:text-6xl lg:text-7xl [animation-delay:100ms] [animation-fill-mode:both]">
                <span className="text-balance">Eric Nazarenus.</span>
              </h1>
              <h2 className="animate-in fade-in slide-in-from-bottom-4 text-3xl font-bold text-muted-foreground duration-500 sm:text-4xl lg:text-5xl [animation-delay:200ms] [animation-fill-mode:both]">
                <span className="text-balance">
                  Machine Learning & Software Engineering
                </span>
              </h2>
            </div>

            <p className="animate-in fade-in slide-in-from-bottom-4 max-w-lg text-lg leading-relaxed text-muted-foreground duration-500 [animation-delay:300ms] [animation-fill-mode:both]">
              Working student at the AI Core Team in R&D at Mercedes-Benz.
              Finishing my Master&apos;s in Machine Learning at University of
              Tübingen with a thesis on Spatial Reasoning for Human Motion
              Diffusion.
            </p>

            {/* Social links */}
            <div className="animate-in fade-in slide-in-from-bottom-4 flex gap-6 duration-500 [animation-delay:400ms] [animation-fill-mode:both]">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={label}
                  className="text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Photo with orbiting elements */}
          <div className="relative hidden items-start justify-end lg:flex -translate-y-50 translate-x-15">
            <div className="relative">
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-4 left-1/2 h-3 w-3 rounded-full bg-primary/60" />
                <div className="absolute top-1/2 -right-4 h-2 w-2 rounded-full bg-primary/40" />
                <div className="absolute -bottom-4 left-1/4 h-4 w-4 rounded-full bg-primary/30" />
              </div>

              <div className="absolute inset-0 animate-spin-slower">
                <div className="absolute top-1/4 -left-6 h-2 w-2 rounded-full bg-primary/50" />
                <div className="absolute -bottom-6 right-1/4 h-3 w-3 rounded-full bg-primary/40" />
              </div>

              {/* Photo - grayscale by default, full color on hover */}
              <div className="group relative size-[16rem] overflow-hidden rounded-2xl border-2 border-border bg-card cursor-default">
                <Image
                  src="/IMG_2867.jpeg"
                  alt="Eric Nazarenus"
                  fill
                  className="object-cover object-center grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
}
