"use client";

import React from "react";

type CaseCardProps = {
  title: string;
  description: string;
  onClick: () => void;
};

const CaseCard: React.FC<CaseCardProps> = ({ title, description, onClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-700 mb-2">{description}</p>
      <p
        className="text-right text-xs text-gray-400 mt-4 cursor-pointer hover:underline"
        onClick={onClick}
      >
        続きを読む
      </p>
    </div>
  );
};

export default CaseCard;
