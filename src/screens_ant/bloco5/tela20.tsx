import React, { useState, useEffect } from "react";

import "./tela2.css";
import { Section4Styles } from "../bloco1/styles";
import CheckboxesGroup from "../../checkbox";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { useLocation, useNavigate } from "react-router-dom";
import MessageError from "../error_msg";
import axios from "axios";
import { useSession } from "../session";

function Tela20() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const navigateToPage = useNavigate();
  const [assistenciaMedica, setAssistenciaMedica] = useState<string>("");
  const handleOptionSelect = (selectedValue: string) => {
    setAssistenciaMedica(selectedValue);
  };

  const [hasError, setHasError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://157.245.80.223:5000/bloco5/${userData.bloco5}`
        );
        const data = response.data;
        setAssistenciaMedica(data.assistencia_medica);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco5]);

  function validacoes(valor: string) {
    if (valor == "") {
      setHasError(true);
      return "Erro: Opção não escolhida";
    }

    return "OK";
  }

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={4} tituloDoBloco="Condições do Óbito">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(assistenciaMedica);
              if (valid == "OK") {
                const apiUrl = "http://157.245.80.223:5000/bloco5"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco5_id: formData.bloco5,
                  assistencia_medica: assistenciaMedica,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela21", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Recebeu assistência médica durante a doença?
          "
                ></InputQuestion>
                <div style={{ paddingLeft: "100px" }}>
                  {!loading && (
                    <CheckboxesGroup
                      defaultValue={assistenciaMedica}
                      options={["Sim", "Não", "Ignorado"]}
                      labels={["Sim", "Não", "Ignorado"]}
                      onOptionSelect={handleOptionSelect}
                    ></CheckboxesGroup>
                  )}
                </div>
                {hasError ? (
                  <MessageError error_msg="Você deve escolher uma opção!" />
                ) : (
                  ""
                )}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela19"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela20;
