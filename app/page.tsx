"use client";

import Image from "next/image";
import { useEffect } from "react";
import Navbar from "../Component/Navbar";
import Link from "next/link";

export default function Home() {
  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Magnetic Button Effect (Basic Implementation)
    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e: any) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        (btn as HTMLElement).style.transform =
          `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        (btn as HTMLElement).style.transform = `translate(0px, 0px)`;
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main className="scroll-smooth pt-16">
        {/* ===== HERO SECTION ===== */}
        <section
          id="hero"
          className="min-h-screen flex items-center pt-24 px-6 sm:px-10 max-w-[1280px] mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-8">
              {/* glow-pulse: A custom keyframe animation in globals.css that pulses a box-shadow to simulate a glowing light. */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm glow-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                👋 Hello, I'm
              </div>

              <h1 className="font-sans text-5xl md:text-[64px] font-black tracking-tighter leading-none text-on-surface">
                Alif <span className="text-primary">Al Sufian</span>
              </h1>

              <p className="font-sans text-2xl md:text-[32px] font-bold tracking-tight text-on-surface-variant max-w-xl leading-tight">
                Full-Stack Engineer & AI Research Enthusiast.
              </p>

              <p className="font-sans text-lg text-on-surface-variant max-w-lg leading-relaxed">
                Building high-performance digital experiences and exploring the
                frontiers of machine learning to create intelligent,
                user-centric solutions.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* magnetic-btn: JS script at the top calculates mouse position and slightly translates the button towards the cursor. */}
                <button className="magnetic-btn px-8 py-4 bg-primary text-on-primary font-bold rounded-lg shadow-[0_0_30px_rgba(78,222,163,0.3)] transition-all">
                  View Projects
                </button>
                <a
                  href="https://drive.google.com/file/d/1-aOlV16-jrzH3Izqy03EsaZnQXlUzOsj/view?usp=drive_link"
                  target="_blank"
                  className="px-8 py-4 border border-white/10 hover:border-primary/50 text-on-surface font-bold rounded-lg backdrop-blur-sm transition-all"
                >
                  Download Resume
                </a>
              </div>

              <div className="flex gap-6 pt-4">
                <a
                  href="https://github.com/Alif2411"
                  target="_blank"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">code</span>
                </a>
                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">public</span>
                </a>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full"></div>
              {/* glass-card: Uses backdrop-filter: blur() and rgba background to create a frosted glass effect */}
              <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <span className="material-symbols-outlined text-9xl">
                    auto_awesome
                  </span>
                </div>
                <div className="space-y-4 font-mono text-sm relative z-10">
                  <div className="flex gap-2 text-primary/60">
                    <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
                  </div>
                  <div className="text-on-surface-variant leading-relaxed">
                    <span className="text-secondary">const</span> portfolio ={" "}
                    {"{"}
                    <br />
                    &nbsp;&nbsp;name:{" "}
                    <span className="text-tertiary">"Alif Al Sufian"</span>,
                    <br />
                    &nbsp;&nbsp;role:{" "}
                    <span className="text-tertiary">"Full Stack Dev"</span>,
                    <br />
                    &nbsp;&nbsp;focus: [
                    <span className="text-tertiary">"AI"</span>,{" "}
                    <span className="text-tertiary">"Web3"</span>,{" "}
                    <span className="text-tertiary">"UX"</span>],
                    <br />
                    &nbsp;&nbsp;status:{" "}
                    <span className="text-tertiary">"Building the future"</span>
                    <br />
                    {"};"}
                  </div>
                </div>
                <div className="mt-8 w-full h-64 rounded-xl relative overflow-hidden">
                  <Image
                    src="/abstract_3d.png"
                    alt="Abstract 3D Shape"
                    fill
                    className="object-cover mix-blend-screen opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        {/* reveal: Opacity 0 and translate-Y down initially. When scrolled into view, IntersectionObserver adds .active class which resets opacity to 1 and translateY to 0. */}
        <section
          id="about"
          className="py-32 px-6 sm:px-10 max-w-[1280px] mx-auto reveal"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative rounded-2xl overflow-hidden bg-surface-container aspect-square">
                <Image
                  src="/Alif Photo.png"
                  alt="Alif Al Sufian"
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="font-sans text-[32px] font-bold text-primary">
                About Me
              </h2>
              <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
                Final-year BSc student in Computer Science and Engineering with
                hands-on experience in modern web development technologies.
                Proficient in Next.js, React, Tailwind CSS, NestJS, and
                PostgreSQL, with a strong focus on building scalable and
                high-performance web applications. Seeking a Web Developer role
                to apply technical skills in real-world projects and contribute
                to a dynamic development team.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-xl text-center">
                  <span className="block font-sans text-[32px] font-bold text-primary">
                    3.95
                  </span>
                  <span className="font-mono text-on-surface-variant uppercase tracking-widest text-xs">
                    Current CGPA
                  </span>
                </div>
                <div className="glass-card p-6 rounded-xl text-center">
                  <span className="block font-sans text-[32px] font-bold text-primary">
                    10+
                  </span>
                  <span className="font-mono text-on-surface-variant uppercase tracking-widest text-xs">
                    Projects Built
                  </span>
                </div>
                <div className="glass-card p-6 rounded-xl text-center">
                  <span className="block font-sans text-[32px] font-bold text-primary">
                    3+
                  </span>
                  <span className="font-mono text-on-surface-variant uppercase tracking-widest text-xs">
                    Years Learning
                  </span>
                </div>
                <div className="glass-card p-6 rounded-xl text-center">
                  <span className="block font-sans text-[32px] font-bold text-primary">
                    20+
                  </span>
                  <span className="font-mono text-on-surface-variant uppercase tracking-widest text-xs">
                    Tech Stack
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS SECTION ===== */}
        <section
          id="skills"
          className="py-32 px-6 sm:px-10 max-w-[1280px] mx-auto reveal"
        >
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-sans text-[32px] font-bold text-primary">
              Technical Arsenal
            </h2>
            <p className="text-on-surface-variant font-sans text-lg">
              Mastering the tools of modern creation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Frontend */}
            <div className="md:col-span-2 lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">
                  responsive_layout
                </span>
                <h3 className="font-sans text-xl font-bold">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React.js", "Tailwind CSS", "TypeScript"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-xs font-mono text-primary"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Backend */}
            <div className="md:col-span-2 lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">dns</span>
                <h3 className="font-sans text-xl font-bold">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["NestJS", "Node.js", ".NET", "PostgreSQL", "MongoDB"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-xs font-mono text-primary"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* AI & ML */}
            <div className="md:col-span-4 lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col gap-4 border-primary/30 shadow-[0_0_20px_rgba(78,222,163,0.1)]">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">psychology</span>
                <h3 className="font-sans text-xl font-bold">AI & ML</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Python", "Machine Learning", "Neural Networks"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-xs font-mono text-primary"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROJECTS SECTION ===== */}
        <section
          id="projects"
          className="py-32 px-6 sm:px-10 max-w-[1280px] mx-auto reveal"
        >
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <h2 className="font-sans text-[32px] font-bold text-primary">
                Featured Projects
              </h2>
              <p className="text-on-surface-variant font-sans text-lg">
                Tangible results of digital engineering.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Project 1 */}
            <div className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative h-64 overflow-hidden bg-surface-container-high flex items-center justify-center">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    NestJS
                  </span>
                  <span className="px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    PostgreSQL
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-sans text-2xl font-bold">ExhibitPro</h3>
                <p className="text-on-surface-variant font-sans text-base line-clamp-2">
                  Exhibition & Event Management Platform (Admin Section) with
                  user approval, venue management, and dashboard analytics.
                </p>
                <div className="flex gap-4 pt-4">
                  <a
                    href="https://github.com/nafizahamed1/frontend/tree/alif"
                    target="_blank"
                    className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      code
                    </span>{" "}
                    Frontend
                  </a>
                  <a
                    href="https://github.com/CodePoint-46615/exhibitPro-backend/tree/alif"
                    target="_blank"
                    className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      code
                    </span>{" "}
                    Backend
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative h-64 overflow-hidden bg-surface-container-high flex items-center justify-center">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    Nestjs
                  </span>
                  <span className="px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    PostgreSQL
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-sans text-2xl font-bold">Beehive</h3>
                <p className="text-on-surface-variant font-sans text-base line-clamp-2">
                  Halal home ownership web application designed on a Rent-to-Own
                  model with credit verification and admin dashboard.
                </p>
                <div className="flex gap-4 pt-4">
                  <span className="flex items-center gap-2 text-primary/50 font-bold">
                    <span className="material-symbols-outlined text-sm">
                      lock
                    </span>{" "}
                    Private Repo
                  </span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative h-64 overflow-hidden bg-surface-container-high flex items-center justify-center">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    .NET
                  </span>
                  <span className="px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    SQL
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-sans text-2xl font-bold">TaskLink</h3>
                <p className="text-on-surface-variant font-sans text-base max-w-3xl">
                  A Freelance and Client Collaboration Platform integrating chat
                  capabilities and task management directly into the core
                  workflow, built with a robust ASP.NET backend.
                </p>
                <div className="flex gap-4 pt-4">
                  <a
                    href="https://github.com/Alif2411/TaskLink"
                    target="_blank"
                    className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      code
                    </span>{" "}
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== EDUCATION SECTION ===== */}
        <section
          id="education"
          className="py-32 px-6 sm:px-10 max-w-[1280px] mx-auto reveal"
        >
          <div className="space-y-12 max-w-3xl mx-auto">
            <h2 className="font-sans text-[32px] font-bold text-primary text-center mb-16">
              Education
            </h2>
            <div className="space-y-6">
              {/* Education 1 */}
              <div className="glass-card p-8 rounded-2xl border-secondary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="material-symbols-outlined text-9xl">
                    school
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 relative z-10 gap-4">
                  <div>
                    <h3 className="font-sans text-xl font-bold">BSc in CSE</h3>
                    <p className="text-on-surface-variant font-mono text-sm mt-1">
                      American University Bangladesh
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-secondary/10 text-on-surface-variant rounded-full font-mono text-sm border border-secondary/20">
                      2022 - 2026
                    </span>
                  </div>
                </div>
                <p className="text-on-surface-variant text-base relative z-10">
                  <strong className="text-on-surface">CGPA: 3.95</strong> <br />
                  Final-year student focusing on Algorithms, Data Structures,
                  and Software Engineering.
                </p>
              </div>

              {/* Education 2 */}
              <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="material-symbols-outlined text-9xl">
                    history_edu
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 relative z-10 gap-4">
                  <div>
                    <h3 className="font-sans text-xl font-bold">A-levels</h3>
                    <p className="text-on-surface-variant font-mono text-sm mt-1">
                      Yale International School
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-white/5 text-on-surface-variant rounded-full font-mono text-sm border border-white/10">
                      2019 - 2020
                    </span>
                  </div>
                </div>
                <p className="text-on-surface-variant text-base relative z-10">
                  <strong className="text-on-surface">Grades:</strong> 1 A*, 3
                  A, 1 B
                </p>
              </div>

              {/* Education 3 */}
              <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="material-symbols-outlined text-9xl">
                    history_edu
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 relative z-10 gap-4">
                  <div>
                    <h3 className="font-sans text-xl font-bold">O-levels</h3>
                    <p className="text-on-surface-variant font-mono text-sm mt-1">
                      Yale International School
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-white/5 text-on-surface-variant rounded-full font-mono text-sm border border-white/10">
                      2018
                    </span>
                  </div>
                </div>
                <p className="text-on-surface-variant text-base relative z-10">
                  <strong className="text-on-surface">Grades:</strong> 5 A*, 3 A
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT CTA ===== */}
        <section
          id="contact"
          className="py-32 px-6 sm:px-10 max-w-[1280px] mx-auto reveal mb-24"
        >
          <div className="glass-card p-12 md:p-24 rounded-3xl text-center relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full group-hover:bg-secondary/20 transition-all duration-700"></div>

            <div className="relative z-10 space-y-8">
              <h2 className="font-sans text-4xl md:text-[64px] font-black tracking-tighter leading-none max-w-4xl mx-auto">
                Let's Build Something{" "}
                <span className="text-primary">Amazing</span>
              </h2>
              <p className="font-sans text-lg text-on-surface-variant max-w-2xl mx-auto">
                Currently open to new projects and research collaborations. If
                you have an idea or are looking for a dedicated Web Developer,
                let's turn it into reality.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:alifal241101@gmail.com"
                  className="px-10 py-5 bg-primary text-on-primary font-bold rounded-xl shadow-[0_0_40px_rgba(78,222,163,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined">mail</span>
                  Say Hello
                </a>
                <a
                  href="https://github.com/Alif2411"
                  target="_blank"
                  className="px-10 py-5 border border-white/10 hover:border-primary/50 text-on-surface font-bold rounded-xl backdrop-blur-md transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined">code</span>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface w-full py-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-10 gap-6 max-w-[1280px] mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-sans text-base font-bold text-on-surface">
              ALIF.DEV
            </span>
            <p className="font-mono text-sm text-on-surface-variant">
              © {new Date().getFullYear()} Alif Al Sufian. Built with technical
              elegance.
            </p>
          </div>
          <div className="flex gap-8">
            <a
              href="https://github.com/Alif2411"
              className="font-mono text-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/"
              className="font-mono text-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
