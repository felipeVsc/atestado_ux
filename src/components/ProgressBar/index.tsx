import React from "react";
import { HorizontalBarStyles } from "./styles";

interface ProgressProps {
  sections: string[];
  selectedSection: number;
  onSectionClick: (index: number) => void; // New prop for handling section clicks
}

const ProgressBar: React.FC<ProgressProps> = ({
  sections,
  selectedSection,
  onSectionClick,
}) => {
  const limitedSections = sections.slice(0, 8);
  const effectiveSelectedSection = selectedSection % limitedSections.length;

  return (
    <div style={HorizontalBarStyles.container}>
      {limitedSections.map((section, index) => {
        const isCompleted = index < effectiveSelectedSection;
        const isSelected = index === effectiveSelectedSection;

        return (
          <div key={index}>
            <div style={HorizontalBarStyles.box}>
              <div style={HorizontalBarStyles.text}>{section}</div>
              <button
                className={`section ${isCompleted ? "completed" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                style={{
                  ...HorizontalBarStyles.section,
                  ...(isCompleted ? HorizontalBarStyles.completedSection : {}),
                  ...(isSelected ? HorizontalBarStyles.selectedSection : {}),
                }}
                onClick={() => onSectionClick(index)} // Handle section click
              ></button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;