import React, { useEffect, useState } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import FormsAnt from "../forms";
import SelectDropdown from "../selectdropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Section4Styles } from "./styles";
import HorizontalBar from "../../components/horizontalBar";
import InputQuestion from "../question";
import { Typography } from "@mui/material";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import axios, { AxiosResponse } from "axios";
import { useSession } from "../session";
import SelectWithSearch from "../../components/SelectSearch";
// import * as fs from 'fs';

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

type Option = {
  value: string;
  label: string;
};

// validacoes

function isCampoVazio(input: string): boolean {
  return input == "";
}

// naturalidade e sexo
function TelaEscolaridade() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const navigateToPage = useNavigate();
  const [escolaridadeFalecido, setEscolaridadeFalecido] = useState<string>("");
  const [serieFalecido, setSerieFalecido] = useState<string>("");
  const [ocupacaoFalecido, setOcupacaoFalecido] = useState<string>("");
  const [escolaridadeFalecidoErro, setEscolaridadeFalecidoErro] = useState<
    [boolean, string]
  >([false, ""]);
  const [serieFalecidoErro, setSerieFalecidoErro] = useState<[boolean, string]>(
    [false, ""]
  );
  const [ocupacaoFalecidoErro, setOcupacaoFalecidoErro] = useState<
    [boolean, string]
  >([false, ""]);

  const [loading, setLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/bloco1/${userData.bloco1}`
        );
        const data = response.data;
        setEscolaridadeFalecido(data.escolaridade);
        setSerieFalecido(data.serie_escolaridade);
        setOcupacaoFalecido(data.ocupacao);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco1]);

  function validacoes(
    escolaridade: string,
    serie: string,
    ocupacao: string
  ): string {
    if (isCampoVazio(escolaridade)) {
      setEscolaridadeFalecidoErro([true, "Escolaridade está vazio"]);
      return "Erro: Escolaridade vazio";
    }
    if (
      isCampoVazio(serie) &&
      escolaridade != "Ignorado" &&
      escolaridade != "Sem escolaridade" &&
      escolaridade != "Ensino Superior" &&
      escolaridade != "Ensino Superior Incompleto"
    ) {
      setSerieFalecidoErro([true, "Série está vazio"]);
      return "Erro: Serie vazio";
    }
    if (isCampoVazio(ocupacao)) {
      setOcupacaoFalecidoErro([true, "Ocupação está vazio"]);
      return "Erro: Ocupacao vazio";
    }
    return "OK";
  }

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={0} tituloDoBloco="Identificação do Falecido">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(
                escolaridadeFalecido,
                serieFalecido,
                ocupacaoFalecido
              );
              if (valid == "OK") {
                const apiUrl = "http://127.0.0.1:5000/bloco1"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco1_id: formData.bloco1,
                  escolaridade: escolaridadeFalecido,
                  serie_escolaridade: serieFalecido,
                  codigo_cbo: ocupacaoFalecido
                };

                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela3", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Qual a escolaridade do falecido?
        "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    defaultValue={escolaridadeFalecido}
                    tooltipTitle="Local de Nascimento do Falecido. Ex: Brasil"
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
                    onChange={setEscolaridadeFalecido}
                    hasError={escolaridadeFalecidoErro[0]}
                    errorMsg={escolaridadeFalecidoErro[1]}
                  />
                )}

                <InputQuestion
                  question="
          Qual a série escolar?
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={serieFalecido}
                    disabled_val={
                      escolaridadeFalecido === "Ignorado" ||
                      escolaridadeFalecido === "Sem escolaridade" ||
                      escolaridadeFalecido === "Ensino Superior Completo" || escolaridadeFalecido === "Ensino Superior Incompleto"
                        ? true
                        : false
                    }
                    title="Série escolar do falecido em numeral. Ex: 8."
                    onChange={setSerieFalecido}
                    hasError={serieFalecidoErro[0]}
                    errorMsg={serieFalecidoErro[1]}
                  />
                )}
                <InputQuestion
                  question="
          Qual a ocupação habitual do falecido?
        "
                ></InputQuestion>

                {!loading && (
                  <SelectWithSearch
                    tooltipTitle="Ocupação Habitual de acordo com o Código de Ocupações Brasileiras (CBO). Ex: Advogada"
                    type={1}
                    defaultValue={ocupacaoFalecido}
                    onChange={setOcupacaoFalecido}
                    hasError={ocupacaoFalecidoErro[0]}
                    errorMsg={ocupacaoFalecidoErro[1]}
                  ></SelectWithSearch>
                )}

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela3_nf"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default TelaEscolaridade;
