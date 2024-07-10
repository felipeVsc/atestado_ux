import React, { ReactNode, CSSProperties } from "react";
import { Typography } from "@mui/material";
import HorizontalBar from "./horizontalBar";
import { Section4Styles } from "../screens_ant/bloco1/styles";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
interface SectionProps {
  children: ReactNode;
  selectedSection: number;
  tituloDoBloco: string;
}


function goToPage(bloco: number): string {
  // TODO add aqui as paginas dos blocos
  switch (bloco){
    case 0:
      return "/tela1";
    case 1:
      return "/tela6";
    case 2:
      return "/tela9";  
    case 3:
      return "/tela15";
    case 4:
      return "/tela19";
    case 5:
      return "/tela25";
    case 6:
      return "/tela1";
    case 7:
      return "/likert";
    default:
      return "/tela1";
      
  }
}
const AppDiv: React.FC<SectionProps> = ({
  children,
  selectedSection,
  tituloDoBloco,
}) => {
  const navigateToPage = useNavigate();
  return (
    <div style={styles.container}>
      <div style={Section4Styles.titleContainer}>
        {/* <HorizontalBar
          sections={[
            "Bloco 1",
            "Bloco 2",
            "Bloco 3",
            "Bloco 4",
            "Bloco 5",
            "Bloco 6",
            "Bloco 7",
          ]}
          selectedSection={selectedSection}
        /> */}
        <ProgressBar sections={[
            "Bloco 1",
            "Bloco 2",
            "Bloco 3",
            "Bloco 4",
            "Bloco 5",
            "Bloco 7",
          ]} selectedSection={selectedSection} onSectionClick={(index: number) => console.log(index)}></ProgressBar>
          {/* (index: number) => navigateToPage(goToPage(index)) */}
      </div>
      <div style={styles.centeredContainer} className="background-square">
        <div style={Section4Styles.titleContainer}>
          <p style={Section4Styles.titleText}>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              {tituloDoBloco}
            </Typography>
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  centeredContainer: {
    textAlign: "center",
  },
};

export default AppDiv;
