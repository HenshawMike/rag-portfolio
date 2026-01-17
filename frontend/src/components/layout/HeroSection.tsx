const HeroSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Full-Stack Developer & AI Enthusiast
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
            Ask me anything about my work, projects, and experience. I'm here to help!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
