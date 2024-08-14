import React, { useState, useEffect } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SelectDropdown from "../selectdropdown";
import { Section4Styles } from "../bloco1/styles";
import { useLocation, useNavigate } from "react-router-dom";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import axios from "axios";
import { useSession } from "../session";

// bairro e municipio
function Tela19() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const navigateToPage = useNavigate();
  const [condicaoObitoMulherFertil, setCondicaoObitoMulherFertil] =
    useState<string>("");

  // estados de erro

  const [condicaoObitoMulherFertilErro, setCondicaoObitoMulherFertilErro] =
    useState<[boolean, string]>([false, ""]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco5/${userData.bloco5}`
        );
        const data = response.data;
        setCondicaoObitoMulherFertil(data.morte_mulher_fertil);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco5]);

  function validacoes(condicaoObitoMulherFertil: string) {
    if (condicaoObitoMulherFertil == "") {
      setCondicaoObitoMulherFertilErro([true, "Condição de Óbito está vazio"]);
      return "Erro: campo vazio";
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
              const valid = validacoes(condicaoObitoMulherFertil);
              if (valid == "OK") {
                const apiUrl = "http://143.198.163.134:5000/bloco5"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco5_id: formData.bloco5,
                  morte_mulher_fertil: condicaoObitoMulherFertil,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela20", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Óbito de mulher em idade fertil
          "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    tooltipTitle="Qual a condição de óbito da mulher enquanto ela esteve em idade fértil?. Ex: Na Gravidez"
                    defaultValue={condicaoObitoMulherFertil}
                    onChange={setCondicaoObitoMulherFertil}
                    options={[
                      "Na gravidez",
                      "No parto",
                      "No Abortamento",
                      "Até 42 dias",
                      "Não ocorreu",
                      "Ignorado",
                    ]}
                    values={[
                      "Na gravidez",
                      "No parto",
                      "No Abortamento",
                      "Até 42 dias",
                      "Não ocorreu",
                      "Ignorado",
                    ]}
                    hasError={condicaoObitoMulherFertilErro[0]}
                    errorMsg={condicaoObitoMulherFertilErro[1]}
                  />
                )}

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela18"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela19;
