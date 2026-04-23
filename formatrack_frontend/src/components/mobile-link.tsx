import { Link } from "react-router-dom";
import React from "react";

interface MobileLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
}

const MobileLink: React.FC<MobileLinkProps> = ({ to, label, onClick }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-primary-600 transition"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default MobileLink;
