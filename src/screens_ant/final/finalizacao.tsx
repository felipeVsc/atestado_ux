import React from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SelectDropdown from "../selectdropdown";
import HorizontalBar from "../../components/horizontalBar";
import MenuAppBar from "../../components/AppBar";
import { Section4Styles } from "../bloco1/styles";
import { Link } from "react-router-dom";
import FormsAnt from "../forms";
import Checkbox from "antd/es/checkbox/Checkbox";
import InputQuestion from "../question";
import { Typography } from "@mui/material";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

// bairro e municipio
function TelaFinal() {
  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <div style={Section4Styles.titleContainer}></div>
        <HorizontalBar
          sections={[
            "Bloco 1",
            "Bloco 2",
            "Bloco 3",
            "Bloco 4",
            "Bloco 5",
            "Bloco 6",
            "Bloco 7",
          ]}
          selectedSection={5}
        ></HorizontalBar>
        <div style={{ textAlign: "center" }} className="background-square">
          <div style={Section4Styles.titleContainer}>
            <p style={Section4Styles.titleText}>
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                Declaração de Óbito
              </Typography>
            </p>
          </div>

          <div>
            <p>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                Deseja confirmar o envio da Declaração de Óbito?
              </Typography>
            </p>
          </div>

          <div style={{ paddingBottom: "30%", paddingTop: "20px" }}>
            <div>
              <Button href="/preview" variant="contained">
                Sim
              </Button>
            </div>
            <div style={{ paddingTop: "20px", paddingLeft: "10px" }}>
              <Button variant="outlined" href="/tela22">
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaFinal;
