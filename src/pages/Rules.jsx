import React from "react";
import MainLayout from "../Components/MainLayout";

const RulesPage = () => {
  // Array of rules
  const rules = [
    "Rule 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Rule 2: Nulla facilisi. Donec vel ante in nunc commodo congue.",
    "Rule 3: Aliquam erat volutpat. Ut placerat libero non quam finibus tristique.",
    // Add more rules as needed
  ];

  return (
    <MainLayout>
      <div className="rules-page h-screen mt-24 bg-white">
        <h1 className="text-3xl font-bold ">Rules</h1>
        <div className="rules-list">
          {rules.map((rule, index) => (
            <div key={index} className="rule-item">
              {rule}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default RulesPage;
