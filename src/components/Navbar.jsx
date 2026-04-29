export default function Navbar() {
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="site-header">
      <button
        className="logo-shell"
        onClick={() => scrollToSection("#home")}
        aria-label="Go to home"
      >
        <span className="brand-mark">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className="menu-shell">
        <button
          className="menu-pill"
          onClick={() => scrollToSection("#services")}
        >
          MENU
        </button>

        <button
          className="hamburger"
          onClick={() => scrollToSection("#services")}
          aria-label="Open menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
