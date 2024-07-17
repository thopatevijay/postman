import React, { useState } from "react";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Generate Letter");

  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-center space-x-4 border-b-2 border-secondary">
        <button
          onClick={() => setActiveTab("Generate Letter")}
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === "Generate Letter"
              ? "border-b-4 border-primary text-primary"
              : "text-secondary"
          }`}
        >
          Generate Letter
        </button>
        <button
          onClick={() => setActiveTab("Sent Letter")}
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === "Sent Letter"
              ? "border-b-4 border-primary text-primary"
              : "text-secondary"
          }`}
        >
          Sent Letter
        </button>
      </div>
      <div className="mt-4 p-4 bg-white rounded shadow-md">
        {activeTab === "Generate Letter" && (
          <div>Generate Letter Content</div>
        )}
        {activeTab === "Sent Letter" && <div>Sent Letter Content</div>}
      </div>
    </div>
  );
};

export default Tabs;
