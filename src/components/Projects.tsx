import { Github, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { motion, Variants } from "framer-motion";

const projects = [
  {
    title: "Service Management App",
    description:
      "Customer Service Management System with JWT authentication, geofencing, and automated ticket workflows. Built with modern UI/UX patterns.",
    tech: ["Kotlin", "Jetpack Compose", "Django REST", "PostgreSQL"],
    github: "https://github.com/hareesh08/servicemanagerportal",
    period: "Jan 2025 - Mar 2025",
    type: "Internship",
    featured: true,
  },
  {
    title: "ERP WebView Android App",
    description:
      "Advanced JSON API parser using Retrofit and OkHttp to efficiently process and display dynamic data in a WebView application.",
    tech: ["Kotlin", "Jetpack Compose", "Retrofit", "OkHttp"],
    github: "https://github.com/hareesh08/EECFate1",
    period: "Nov 2024 - Dec 2024",
    type: "Work",
    featured: true,
  },
  {
    title: "Offline License Management System",
    description:
      "Secure licensing system using JWT, AES encryption, and HWID binding. Features offline validation, tamper-proofing, and automated expiry checks.",
    tech: ["C#", "Native AOT", "JWT", "AES Encryption"],
    github: "https://github.com/hareesh08/ButterAuth-1",
    period: "May 2025 - Jun 2025",
    type: "System Design",
  },
  {
    title: "Report Automation Tool",
    description:
      "Python-based system for automating the distribution of internal assessment marks via email using Excel data with a custom GUI.",
    tech: ["Python", "Pandas", "GUI", "Email Automation"],
    github: "https://github.com/hareesh08/MailSender_Web-ui_Raw",
    period: "Nov 2023 - Feb 2024",
    type: "College Work",
  },
  {
    title: "Lead Generator Text Tool",
    description:
      "Text-based manipulation tool built in C# with Native AOT optimization for performance-critical text processing operations.",
    tech: ["C#", "Native AOT", "Text Processing"],
    github: "https://github.com/hareesh08/FixcomboV3",
    period: "May 2024 - Aug 2024",
    type: "Tools",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-gradient-hero relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-lg font-semibold tracking-wide uppercase mb-3">Projects</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A collection of projects showcasing my expertise in Android development, security, and automation
            </p>
          </motion.div>

          {/* Featured projects */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-6 mb-12"
          >
            {projects.filter(p => p.featured).map((project) => (
              <motion.article
                key={project.title}
                variants={itemVariants}
                className="group relative h-full rounded-xl border border-border overflow-hidden bg-gradient-to-br from-card via-card to-card/50 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Glowing border on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  boxShadow: 'inset 0 0 20px rgba(174, 194, 248, 0.2)'
                }} />

                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1.5 text-xs font-semibold bg-primary/20 text-primary rounded-lg border border-primary/30 uppercase tracking-wider">
                      {project.type}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {project.period}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-5 flex-1 leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-md border border-primary/20 hover:border-primary/50 hover:bg-primary/20 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all duration-300 w-full justify-center group/link"
                  >
                    <Github className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                    View Code
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Other projects */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-3 gap-4"
          >
            {projects.filter(p => !p.featured).map((project) => (
              <motion.article
                key={project.title}
                variants={itemVariants}
                className="group p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col hover:bg-card/80"
                whileHover={{ scale: 1.03, y: -3 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded">
                    {project.type}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{project.period}</span>
                </div>

                <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-xs mb-3 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 2 && (
                    <span className="px-2 py-0.5 text-xs text-muted-foreground">
                      +{project.tech.length - 2}
                    </span>
                  )}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
                >
                  <Github className="w-3 h-3" />
                  View
                </a>
              </motion.article>
            ))}
          </motion.div>

          {/* View all button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              asChild
            >
              <a href="https://github.com/hareesh08" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View All Projects on GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
