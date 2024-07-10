import React from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Section4Styles } from "../bloco1/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import { useSession } from "../session";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

// bairro e municipio
function Tela29() {

  const location = useLocation();
  const { userData} = useSession();
  const formData = userData;
  const navigateToPage = useNavigate();

  function goToPreview(): any{
    navigateToPage("/preview",{state: formData})
  }
  return (
    <div style={Section4Styles.main}>
    <div style={Section4Styles.mainContainer}>
      <AppDiv selectedSection={5} tituloDoBloco="Declaração de Óbito">
      <div>
            <p>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                Você concluiu o preenchimento, clique para ver uma preview:
              </Typography>
            </p>
          </div>

          <div style={{ paddingBottom: "30%", paddingTop: "20px" }}>
            <div>
              <Button onClick={goToPreview} variant="contained">
                Clique aqui
              </Button>
            </div>
            <div style={{ paddingTop: "20px", paddingLeft: "10px" }}>
              <Button variant="outlined" href="/tela27">
                Voltar
              </Button>
            </div>  
          </div>
      </AppDiv>
    </div>
  </div>

    );
}

export default Tela29;
