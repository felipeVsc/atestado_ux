import React, { useState, useEffect } from "react";

import "./tela2.css";
import { Section4Styles } from "../bloco1/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckboxesGroup from "../../checkbox";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import isCampoVazio from "../../utils/checkcampo";
import MessageError from "../error_msg";
import axios from "axios";
import { useSession } from "../session";

// bairro e municipio
function Tela10() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const navigateToPage = useNavigate();
  const [localObito, setLocalObito] = useState<string>("");
  const handleOptionSelect = (selectedValue: string) => {
    setLocalObito(selectedValue);
  };

  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://206.189.235.2:5000/bloco3/${userData.bloco3}`
        );
        const data = response.data;
        setLocalObito(data.local_ocorrencia);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco3]);
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
        <AppDiv
          selectedSection={2}
          tituloDoBloco="Local de Ocorrência do Óbito"
        >
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              if (!isCampoVazio(localObito)) {
                const apiUrl = "http://206.189.235.2:5000/bloco3"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco3_id: formData.bloco3,
                  local_ocorrencia: localObito,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela11", { state: formData });
              } else {
                setHasError(true);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
        Onde ocorreu o óbito?
        "
                ></InputQuestion>
                <div style={{ paddingLeft: "100px" }}>
                  {!loading && (
                    <CheckboxesGroup
                      defaultValue={localObito}
                      options={[
                        "domicilio",
                        "outroEstab",
                        "viapublica",
                        "aldeia",
                        "outros",
                      ]}
                      labels={[
                        "Domicílio",
                        "Outro estab. saúde",
                        "Via pública",
                        "Aldeia indígena",
                        "Outros",
                      ]}
                      onOptionSelect={setLocalObito}
                    ></CheckboxesGroup>
                  )}
                </div>
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela9"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
      {hasError ? (
        <MessageError error_msg="Você deve escolher uma opção!" />
      ) : (
        ""
      )}
    </div>
  );
}

export default Tela10;
