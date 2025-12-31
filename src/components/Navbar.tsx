import { useState, useEffect } from "react";
import { Menu, X, Download, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { isAuthorized, checkPassword } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!isAuthorized) {
      e.preventDefault();
      setShowPasswordModal(true);
      setError(false);
      setPassword("");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(password)) {
      setShowPasswordModal(false);
      // Trigger download after auth
      window.open("./Hareesh_Ragavendra_Resume.pdf", "_blank");
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="text-xl font-bold text-gradient group-hover:opacity-80 transition-opacity">Hareesh</span>
            <span className="hidden sm:inline text-muted-foreground font-mono text-sm group-hover:text-foreground transition-colors">/ developer</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary" 
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Resume Button */}
          <motion.div className="hidden md:block" whileHover={{ scale: 1.05 }}>
            <Button
              variant="outline"
              size="sm"
              className="border-primary/50 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <a 
                href="./Hareesh_Ragavendra_Resume.pdf" 
                download={isAuthorized}
                onClick={handleResumeClick}
              >
                {isAuthorized ? <Download className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                Resume
              </a>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-primary/50 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  asChild
                >
                  <a 
                    href="./Hareesh_Ragavendra_Resume.pdf" 
                    download={isAuthorized}
                    onClick={handleResumeClick}
                  >
                    {isAuthorized ? <Download className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                    Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Password Modal for Resume */}
      {showPasswordModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPasswordModal(false)}
        >
          <div 
            className="relative w-full max-w-sm mx-4 p-6 rounded-2xl bg-card border border-border shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Download Resume</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Enter password to access resume
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter password"
                  autoFocus
                  className={`w-full px-4 py-3 pr-10 rounded-xl bg-secondary/50 border ${
                    error ? "border-red-500" : "border-border"
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  Incorrect password. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </form>

            <p className="text-xs text-muted-foreground/60 text-center mt-4">
              Contact me for access credentials
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
