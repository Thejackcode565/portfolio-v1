import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import ProtectedData from "./ProtectedData";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20 pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-cyan-500/20 rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            {/* Avatar with AI glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-50" />
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-cyan-500/50 relative bg-slate-900">
                <img 
                  src="./profile.png" 
                  alt="Hareesh Ragavendra" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                Hareesh Ragavendra
              </h1>
              <p className="text-cyan-400 font-semibold mb-3 text-lg">
                AI & Full-Stack Engineer
              </p>
              
              {/* Location */}
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300 text-sm mb-4">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <ProtectedData value="Chennai, Tamil Nadu, India" masked="Location hidden" />
              </div>

              {/* Status with AI theme */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-300 text-sm font-medium">Available for work</span>
              </div>
            </div>

            {/* Stats with AI cards */}
            <div className="flex md:flex-col gap-4">
              <div className="backdrop-blur-sm bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-3 text-center">
                <p className="text-2xl font-bold text-cyan-400">5+</p>
                <p className="text-xs text-gray-400">Projects</p>
              </div>
              <div className="backdrop-blur-sm bg-purple-500/10 border border-purple-500/30 rounded-lg px-4 py-3 text-center">
                <p className="text-2xl font-bold text-purple-400">3+</p>
                <p className="text-xs text-gray-400">Years</p>
              </div>
              <div className="backdrop-blur-sm bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-4 py-3 text-center">
                <p className="text-2xl font-bold text-cyan-400">15+</p>
                <p className="text-xs text-gray-400">Skills</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-300 leading-relaxed mb-8 text-center md:text-left">
            Passionate about leveraging 
            <span className="text-cyan-400 font-semibold"> AI/ML technologies</span> and building innovative solutions with 
            <span className="text-blue-400 font-semibold"> Kotlin</span>, 
            <span className="text-purple-400 font-semibold"> React</span>, and 
            <span className="text-cyan-400 font-semibold"> Django</span>. Experienced in full-stack development with modern architectures.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="mailto:hareeshworksoffcial@gmail.com"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3 backdrop-blur-sm bg-white/5 hover:bg-cyan-500/20 border border-cyan-500/50 text-white font-semibold rounded-lg transition-all duration-300 text-center"
            >
              View Projects
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-3 mt-8 pt-6 border-t border-cyan-500/20">
            <a
              href="https://github.com/hareesh08"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 backdrop-blur-sm bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/hareesh-d-50147727b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 backdrop-blur-sm bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hareeshworksoffcial@gmail.com"
              className="w-10 h-10 backdrop-blur-sm bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
