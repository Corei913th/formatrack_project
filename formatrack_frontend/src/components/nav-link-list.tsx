import { NavLinkItem } from "@/hooks/use-active-section";
import { Link } from "react-router-dom";

interface Props {
  navLinks: NavLinkItem[];
  activeSection: string;
  className?: string;
  onNavigate?: (href: string) => void;
  linkClassName?: string;
  activeLinkClassName?: string;
}

export default function NavLinksList({
  navLinks,
  activeSection,
  className = "",
  onNavigate,
  linkClassName,
  activeLinkClassName,
}: Props) {
  return (
    <div className={className}>
      {navLinks.map((link) => {
        const isActive =
          activeSection === link.href.replace("#", "") ||
          (link.href === "#" && activeSection === "");
        const baseClass =
          linkClassName ||
          "font-medium transition-all duration-200 relative text-gray-800 hover:text-blue-600";
        const activeClass = activeLinkClassName || "text-blue-600";

        return (
          <Link
            key={link.name}
            to={link.href}
            className={`${baseClass} ${isActive ? activeClass : ""}`}
            onClick={(e) => {
              if (onNavigate && link.href.startsWith("#")) {
                e.preventDefault();
                onNavigate(link.href);
              }
            }}
          >
            {link.name}

            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-50" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
