import React, { useState, useEffect } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Section4Styles } from "../bloco1/styles";
import CheckboxesGroup from "../../checkbox";
import InputQuestion from "../question";

import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSession } from "../session";

function Tela21() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const navigateToPage = useNavigate();

  const [diagnosticoConfirmado, setDiagnosticoConfirmado] =
    useState<string>("");
  const handleOptionSelect = (selectedValue: string) => {
    setDiagnosticoConfirmado(selectedValue);
  };

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco5/${userData.bloco5}`
        );
        const data = response.data;
        setDiagnosticoConfirmado(data.diagnostico_confirmado);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco5]);

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={4} tituloDoBloco="Condições do Óbito">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const apiUrl = "http://143.198.163.134:5000/bloco5"; // Substitua pelo URL da sua API

              const dataToSend = {
                bloco5_id: formData.bloco5,
                diagnostico_confirmado: diagnosticoConfirmado,
              };
              axios
                .post(apiUrl, dataToSend)
                .then((response) => console.log(response))
                .catch((error) =>
                  console.error("Erro ao enviar a requisição:", error)
                );
              navigateToPage("/tela22", { state: formData });
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Diagnóstico confirmado por necrópsia?
          "
                ></InputQuestion>
                <div style={{ paddingLeft: "100px" }}>
                  {!loading && (
                    <CheckboxesGroup
                      defaultValue={diagnosticoConfirmado}
                      options={["Sim", "Não", "Ignorado"]}
                      labels={["Sim", "Não", "Ignorado"]}
                      onOptionSelect={handleOptionSelect}
                    ></CheckboxesGroup>
                  )}
                </div>
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela20"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela21;
