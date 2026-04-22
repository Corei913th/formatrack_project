import { useEffect, useState } from "react";

export interface NavLinkItem {
  name: string;
  href: string; // "#section"
}

export function useActiveSection(navLinks: NavLinkItem[]) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const current = sections.find((section) => {
        if (section === "") return window.scrollY < 100;

        const el = document.getElementById(section);
        if (!el) return false;

        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  return activeSection;
}
