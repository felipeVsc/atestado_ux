import React, { useState } from "react";
import { HorizontalBarStyles } from "./styles";
import 'bootstrap/dist/css/bootstrap.min.css';
interface ProgressProps {
  sections: string[];
  selectedSection: number;
}

const HorizontalBar: React.FC<ProgressProps> = ({
  sections,
  selectedSection,
}) => {
  const limitedSections = sections.slice(0, 7);
  const effectiveSelectedSection = selectedSection % limitedSections.length;

  const [redirect, setRedirect] = useState<boolean>(false);

  const handleClick = () => {
    setRedirect(true);
  };

  if (redirect) {
    // Redirect to Google if the state is true
    window.location.href = 'https://www.google.com';
  }

  return (
    <div style={HorizontalBarStyles.container}>
      {limitedSections.map((section, index) => {
        const isCompleted = index < effectiveSelectedSection;
        const isSelected = index === effectiveSelectedSection;

        return (
          <div key={index}>
            <div
              style={HorizontalBarStyles.box}
              id="box_div"
              onClick={handleClick} // Add the click event handler
            >
              <div style={HorizontalBarStyles.text}>{section}</div>
              <div
                className={`section ${isCompleted ? "completed" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                style={{
                  ...HorizontalBarStyles.section,
                  ...(isCompleted
                    ? HorizontalBarStyles.completedSection
                    : {}),
                  ...(isSelected ? HorizontalBarStyles.selectedSection : {}),
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalBar;
