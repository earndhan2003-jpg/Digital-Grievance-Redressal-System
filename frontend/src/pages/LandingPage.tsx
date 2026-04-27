import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, FileText, Search, MessageSquare, Brain, BarChart3,
  Clock, CheckCircle, Users, Lock, Send, Eye, Zap, Phone,
  Mail, HelpCircle, ChevronRight, Star, ArrowRight,
  ClipboardList, Ticket, UserCheck, ThumbsUp
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ── Animated counter ── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.max(1, Math.floor(end / 60));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(start);
          }, 20);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* ═══ NAVBAR ═══ */}
      <nav className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="font-heading text-lg font-bold text-primary">GrievancePortal</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a>
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <Link to="/login">
            <Button size="sm">Login / Register</Button>
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
              Government of India Initiative
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Digital Grievance<br />
              <span className="text-primary">Redressal System</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Submit, track, and resolve complaints seamlessly. A transparent bridge between citizens and administration powered by AI.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/login">
                <Button size="lg" className="gap-2">
                  <Send className="h-4 w-4" /> Register Complaint
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="gap-2">
                  <Search className="h-4 w-4" /> Track Complaint
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center animate-fade-in">
            <div className="relative w-80 h-80 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-secondary/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <div className="text-center space-y-3">
                <Users className="h-16 w-16 text-primary mx-auto" />
                <p className="text-sm font-semibold text-muted-foreground">Citizen Support<br/>System</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">About the System</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            The Digital Grievance Redressal System empowers citizens to raise issues, track progress, and receive timely resolutions — all through a single, unified digital platform.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 pt-6">
            {[
              { icon: Eye, title: "Transparency", desc: "Every complaint is tracked with full visibility." },
              { icon: Zap, title: "Faster Resolution", desc: "AI-powered priority routing cuts response time." },
              { icon: BarChart3, title: "Digital Governance", desc: "Data-driven insights for better administration." },
            ].map((item) => (
              <Card key={item.title} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, icon: ClipboardList, title: "Submit Complaint", desc: "Fill out the complaint form with details and attachments." },
              { step: 2, icon: Ticket, title: "Ticket Generated", desc: "Receive a unique tracking ID instantly." },
              { step: 3, icon: UserCheck, title: "Admin Review", desc: "Administrators review, classify, and assign priority." },
              { step: 4, icon: ThumbsUp, title: "Resolution & Feedback", desc: "Get notified upon resolution and share feedback." },
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-primary/70" />
                  <h3 className="font-heading font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">{item.desc}</p>
                </div>
                {item.step < 4 && (
                  <ChevronRight className="hidden lg:block absolute top-8 -right-4 h-6 w-6 text-muted-foreground/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEY FEATURES ═══ */}
      <section id="features" className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: "Anonymous Submission", desc: "Submit complaints without revealing your identity." },
              { icon: Ticket, title: "Unique Ticket ID", desc: "Every complaint receives a trackable ticket number." },
              { icon: Clock, title: "Real-Time Tracking", desc: "Monitor status updates as they happen." },
              { icon: MessageSquare, title: "User ↔ Admin Chat", desc: "Communicate directly with administrators." },
              { icon: Brain, title: "AI Classification", desc: "Automatic category assignment using AI models." },
              { icon: BarChart3, title: "Priority Prediction", desc: "AI predicts urgency level for faster routing." },
            ].map((f) => (
              <Card key={f.title} className="text-left hover:shadow-lg transition-shadow border-l-4 border-l-primary/40">
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATISTICS ═══ */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 12480, label: "Total Complaints", suffix: "+" },
              { value: 10250, label: "Resolved Cases", suffix: "+" },
              { value: 1830, label: "Active Tickets", suffix: "" },
              { value: 94, label: "User Satisfaction", suffix: "%" },
            ].map((s) => (
              <div key={s.label} className="space-y-2">
                <p className="text-3xl md:text-4xl font-heading font-bold">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm opacity-80 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CITIZEN BENEFITS ═══ */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Citizen Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Send, title: "Easy Access", desc: "Submit from anywhere, anytime via web." },
              { icon: Eye, title: "Transparent System", desc: "Full visibility into complaint lifecycle." },
              { icon: Zap, title: "Fast Communication", desc: "Direct messaging with assigned officers." },
              { icon: Shield, title: "Secure Platform", desc: "End-to-end encryption and data privacy." },
            ].map((b) => (
              <Card key={b.title} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <b.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">What Citizens Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Priya Sharma", role: "Delhi", text: "My complaint was resolved within 48 hours. The tracking system kept me updated at every step!" },
              { name: "Amit Patel", role: "Mumbai", text: "Finally a government portal that's actually easy to use. Submitted my complaint in under 5 minutes." },
              { name: "Sunita Devi", role: "Jaipur", text: "The anonymous complaint feature gave me the confidence to report an issue in my locality." },
            ].map((t) => (
              <Card key={t.name} className="text-left">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />)}
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / HELP ═══ */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Need Help?</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Mail, title: "Email Us", desc: "support@grievanceportal.gov.in" },
              { icon: HelpCircle, title: "Help Center", desc: "Browse FAQs and guides" },
              { icon: Phone, title: "Helpline", desc: "1800-XXX-XXXX (Toll Free)" },
            ].map((c) => (
              <Card key={c.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <c.icon className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-bold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="font-heading text-3xl font-bold">Ready to Raise Your Voice?</h2>
          <p className="opacity-90 max-w-lg mx-auto">Join thousands of citizens who have successfully resolved their grievances through our platform.</p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-foreground text-background/70 py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-secondary" />
                <span className="font-heading font-bold text-background">GrievancePortal</span>
              </div>
              <p className="text-sm">A Government of India initiative for transparent digital governance.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-background">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-secondary transition-colors">About</a></li>
                <li><a href="#how-it-works" className="hover:text-secondary transition-colors">How It Works</a></li>
                <li><a href="#features" className="hover:text-secondary transition-colors">Features</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-background">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Accessibility</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-background">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>support@grievanceportal.gov.in</li>
                <li>1800-XXX-XXXX</li>
                <li>New Delhi, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/10 pt-6 text-center text-xs">
            © {new Date().getFullYear()} Digital Grievance Redressal System — Government of India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
