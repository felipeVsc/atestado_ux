import React, { ReactNode, CSSProperties } from "react";
import { Typography } from "@mui/material";
import HorizontalBar from "./horizontalBar";
import { Section4Styles } from "../screens_ant/bloco1/styles";
import ProgressBar from "./ProgressBar";
interface SectionProps {
  children: ReactNode;
  tituloDoBloco: string;
  }

const AppDivClean: React.FC<SectionProps> = ({
  children,
  tituloDoBloco
}) => {
  return (
    <div style={styles.container}>
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
    width: "80rem"
  },
  centeredContainer: {
    textAlign: "center",
  },
};

export default AppDivClean;
