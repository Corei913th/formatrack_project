import React from "react";

interface SubmittingProps {
  title: string;
}

const Submitting: React.FC<SubmittingProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
      {title}
    </div>
  );
};

export default Submitting;
