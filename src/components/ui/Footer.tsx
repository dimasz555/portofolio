export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Dimas Zaidan Alif
        </p>
      </div>
    </footer>
  );
}
