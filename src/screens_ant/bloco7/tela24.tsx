import React, { useEffect, useState } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Section4Styles } from "../bloco1/styles";
import { useNavigate } from "react-router-dom";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import CheckboxesGroup from "../../checkbox";
import { useSession } from "../session";
import axios from "axios";

// Causas externas
function Tela24() {
  const navigateToPage = useNavigate();
  const { userData} = useSession();
  const formData = userData;
  const [tipoMorte, setTipoMorte] = useState<string>("");

  const handleOptionSelect = (selectedValue: string) => {
    setTipoMorte(selectedValue);
  };
  const fetchInitialValues = () => {
    console.log(userData);
    if (userData.paciente_id) {
      axios
        .get(`http://206.189.235.2:5000/bloco7/${userData.bloco7}`)
        .then((response) => {
          const receivedData = response.data;
          console.log("DATA: ", receivedData);
          setTipoMorte(receivedData.morte_nao_natural || "");
        })
        .catch((error) => {
          console.error("Erro ao obter dados do bloco1:", error);
        });
    } else {
      console.error("ID do paciente está vazio, indefinido ou já foi gerado.");
    }
  };

  useEffect(() => {
    fetchInitialValues();
  }, [userData.paciente_id]);


  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={5} tituloDoBloco="Condições do Óbito">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {

              const apiUrl = "http://206.189.235.2:5000/bloco7"; // Substitua pelo URL da sua API

              const dataToSend = {
                bloco7_id: formData.bloco7,
                morte_nao_natural:tipoMorte
              };
              axios
                .post(apiUrl, dataToSend)
                .then((response) => console.log(response))
                .catch((error) =>
                  console.error("Erro ao enviar a requisição:", error)
                );
              navigateToPage("/tela25");
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Tipo de Morte
          "
                ></InputQuestion>
                <div style={{ paddingLeft: "100px" }}>
                  <CheckboxesGroup
                    options={["Acidente", "Suicídio", "Homicídio", "Outros", "Ignorar"]}
                    labels={[
                      "Acidente",
                      "Suicidio",
                      "Homicidio",
                      "Outros",
                      "Ignorar",
                    ]}
                    onOptionSelect={handleOptionSelect}
                    selectedOption={tipoMorte}
                  ></CheckboxesGroup>
                </div>
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela23"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela24;
