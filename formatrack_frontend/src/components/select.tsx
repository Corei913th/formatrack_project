import React, { forwardRef } from "react";
import type { IconType } from "../types/common.type";

interface SelectOption {
  id?: string | number;
  value?: string | number;
  libelle?: string;
  nom?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: IconType;
  error?: boolean | string;
  options?: SelectOption[];
  placeholder?: string;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      icon: Icon,
      error,
      options = [],
      placeholder = "Sélectionnez une option",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          )}
          <select
            ref={ref}
            className={`
              input
              bg-white
              text-gray-700 px-3 py-2.5 text-sm
              border-primary
              focus:ring-2 focus:ring-primary focus:border-primary
              ${Icon ? "pl-10 pr-10" : "px-3"} py-2 appearance-none
              ${error
                ? "border-destructive focus:ring-destructive focus:border-destructive"
                : ""
              }
              ${className}
            `}
            {...props}
          >
            <option value="">{placeholder}</option>
            {Array.isArray(options) && options.length > 0 ? (
              options.map((option, idx) => (
                <option
                  key={option.id ?? option.value ?? idx}
                  value={option.id ?? option.value ?? ""}
                >
                  {option.libelle ||
                    option.nom ||
                    option.value ||
                    `Option ${idx + 1}`}
                </option>
              ))
            ) : (
              <option value="">Aucune donnée</option>
            )}
          </select>
          {/* Flèche personnalisée */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-1">
            {typeof error === "string" ? error : "Erreur"}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
