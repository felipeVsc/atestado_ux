import React, { useEffect, useState } from "react";

import "./tela2.css";
import { Section4Styles } from "../bloco1/styles";
import { Link, useNavigate } from "react-router-dom";
import InputQuestion from "../question";

import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import CheckboxesGroup from "../../checkbox";
import { useSession } from "../session";
import axios from "axios";

// Acidente de Trabalho?
function Tela26() {
  const navigateToPage = useNavigate();
  const { userData} = useSession();
  const formData = userData;
  const [acidenteTrabalho, setAcidenteTrab] = useState<string>("");

  const handleOptionSelect = (selectedValue: string) => {
    setAcidenteTrab(selectedValue);
  };


  const fetchInitialValues = () => {
    console.log(userData);
    if (userData.paciente_id) {
      axios
        .get(`http://127.0.0.1:5000/bloco7/${userData.bloco7}`)
        .then((response) => {
          const receivedData = response.data;
          console.log("DATA: ", receivedData);
          setAcidenteTrab(receivedData.acidente_trabalho || "");
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
              const apiUrl = "http://127.0.0.1:5000/bloco7"; // Substitua pelo URL da sua API

              const dataToSend = {
                bloco7_id: formData.bloco7,
                acidente_trabalho:acidenteTrabalho
              };
              axios
                .post(apiUrl, dataToSend)
                .then((response) => console.log(response))
                .catch((error) =>
                  console.error("Erro ao enviar a requisição:", error)
                );
              navigateToPage("/tela27");
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Acidente de Trabalho
          "
                ></InputQuestion>

                <div style={{ paddingLeft: "100px" }}>
                  <CheckboxesGroup
                    options={["Sim", "Não"]}
                    labels={["Sim", "Não"]}
                    onOptionSelect={handleOptionSelect}
                    selectedOption={acidenteTrabalho}
                  ></CheckboxesGroup>
                </div>

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela25"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela26;
