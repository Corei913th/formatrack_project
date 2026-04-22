import React from "react";
import { Link } from "react-router-dom";

export interface MobileLinkProps {
  to: string;
  label: React.ReactNode;
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
