import React, { useState, useEffect } from "react";

import "./tela2.css";
import SelectDropdown from "../selectdropdown";
import { Section4Styles } from "../bloco1/styles";
import { useLocation, useNavigate } from "react-router-dom";
import FormsAnt from "../forms";
import InputQuestion from "../question";

import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import axios from "axios";
import { useSession } from "../session";
import SelectWithSearch from "../../components/SelectSearch";

function isNotNumeric(input: string): boolean {
  return !/^\d+$/.test(input);
}

function Tela15() {
  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;

  const [idadeMaeFalecido, setIdadeMaeFalecido] = useState<string>("");
  const [escolaridadeMaeFalecido, setEscolaridadeMaeFalecido] =
    useState<string>("");
  const [ocupacaoMaeFalecido, setOcupacaoMaeFalecido] = useState<string>("");

  const [idadeMaeFalecidoErro, setIdadeMaeFalecidoErro] = useState<
    [boolean, string]
  >([false, ""]);
  const [escolaridadeMaeFalecidoErro, setEscolaridadeMaeFalecidoErro] =
    useState<[boolean, string]>([false, ""]);
  const [ocupacaoMaeFalecidoErro, setOcupacaoMaeFalecidoErro] = useState<
    [boolean, string]
  >([false, ""]);

  const [serieMae, setSerieMae] = useState<string>("");

  const [serieMaeErro, setserieMaeErro] = useState<[boolean, string]>([
    false,
    "",
  ]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://206.189.235.2:5000/bloco4/${userData.bloco4}`
        );
        const data = response.data;
        console.log(data);
        setIdadeMaeFalecido(data.idade_mae);
        setEscolaridadeMaeFalecido(data.escolaridade_mae);
        setSerieMae(data.serie_mae);
        setOcupacaoMaeFalecido(data.ocupacao_mae);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco4]);

  function validacoes(
    idademae: string,
    escolaridademae: string,
    ocupacaomae: string
  ) {
    if (idademae == "") {
      setIdadeMaeFalecidoErro([true, "Idade da mãe está vazio"]);
      return "Erro: campo vazio";
    }
    if (isNotNumeric(idademae)) {
      setIdadeMaeFalecidoErro([true, "Idade da mãe não é um número"]);
      return "Erro: campo nao numerico";
    }
    if (escolaridademae == "") {
      setEscolaridadeMaeFalecidoErro([true, "Escolaridade da mãe está vazio"]);

      setIdadeMaeFalecidoErro([false, ""]);
      return "Erro: campo vazio";
    }
    if (ocupacaomae == "") {
      setOcupacaoMaeFalecidoErro([true, "Ocupação da mãe está vazio"]);

      setEscolaridadeMaeFalecidoErro([false, ""]);
      setIdadeMaeFalecidoErro([false, ""]);
      return "Erro: campo vazio";
    }

    return "OK";
  }

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv
          selectedSection={3}
          tituloDoBloco="Fetal ou menor que 1 ano | Informações sobre a mãe"
        >
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(
                idadeMaeFalecido,
                escolaridadeMaeFalecido,
                ocupacaoMaeFalecido
              );
              if (valid == "OK") {
                const apiUrl = "http://206.189.235.2:5000/bloco4"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco4_id: formData.bloco4,
                  idade_mae: idadeMaeFalecido,
                  escolaridade_mae: escolaridadeMaeFalecido,
                  serie_mae: serieMae,
                  codigo_cbo_mae: ocupacaoMaeFalecido
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela16", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Idade da mãe
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={idadeMaeFalecido}
                    disabled_val={false}
                    title="Idade da mãe do falecido em números. Ex: 47"
                    onChange={setIdadeMaeFalecido}
                    hasError={idadeMaeFalecidoErro[0]}
                    errorMsg={idadeMaeFalecidoErro[1]}
                  ></FormsAnt>
                )}
                <InputQuestion
                  question="
          Escolaridade da mãe
          "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    defaultValue={escolaridadeMaeFalecido}
                    tooltipTitle="Nível de escolaridade da mãe do falecido. Ex: Fundamental 1"
                    options={[
                      "Ignorado",
                      "Sem escolaridade",
                      "Fundamental 1 (1 a 4 série)",
                      "Fundamental 2 (5 a 8 série)",
                      "Ensino Médio",
                      "Ensino Superior Incompleto",
                      "Ensino Superior Completo",
                    ]}
                    values={[
                      "Ignorado",
                      "Sem escolaridade",
                      "Fundamental 1 (1 a 4 série)",
                      "Fundamental 2 (5 a 8 série)",
                      "Ensino Médio",
                      "Ensino Superior Incompleto",
                      "Ensino Superior Completo",
                    ]}
                    onChange={setEscolaridadeMaeFalecido}
                    hasError={escolaridadeMaeFalecidoErro[0]}
                    errorMsg={escolaridadeMaeFalecidoErro[1]}
                  />
                )}

                <InputQuestion
                  question="
                  Qual a série escolar?
                  "
                ></InputQuestion>

                {!loading && (
                  <FormsAnt
                    defaultValue={serieMae}
                    disabled_val={
                      escolaridadeMaeFalecido == "Ignorado" ||
                      escolaridadeMaeFalecido == "Sem escolaridade" || escolaridadeMaeFalecido == "Ensino Superior Completo" || escolaridadeMaeFalecido == "Ensino Superior Incompleto"
                        ? true
                        : false
                    }
                    title="Série escolar do falecido em numeral. Ex: 8."
                    onChange={setSerieMae}
                    hasError={serieMaeErro[0]}
                    errorMsg={serieMaeErro[1]}
                  />
                )}

                <InputQuestion
                  question="
          Ocupação Habitual
          "
                ></InputQuestion>

                {!loading && (
                  <SelectWithSearch
                    defaultValue={ocupacaoMaeFalecido}
                    onChange={setOcupacaoMaeFalecido}
                    tooltipTitle="Ocupação Habitual de acordo com o Código de Ocupações Brasileiras (CBO) da mãe do Falecido. Ex: Advogada"
                    type={1}
                    hasError={ocupacaoMaeFalecidoErro[0]}
                    errorMsg={ocupacaoMaeFalecidoErro[1]}
                  ></SelectWithSearch>
                )}
                <>
                
                </>
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela14"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela15;
