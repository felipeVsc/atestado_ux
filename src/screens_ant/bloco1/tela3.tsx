import React, { useState, useEffect } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SelectDropdown from "../selectdropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Section4Styles } from "./styles";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { setLocale } from "yup";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useSession } from "../session";

function isCampoVazio(input: string): boolean {
  return input == "";
}

// naturalidade e sexo
function Tela3() {
  const location = useLocation();
  const { userData, setUserData } = useSession();
  const formData = userData;
  // let formulario = formData;
  // if (Object.keys(formData).length == 2) {
  //   formulario = formData[1];
  // }

  const navigateToPage = useNavigate();
  const [localNascimentoFalecido, setLocalNascimentoFalecido] =
    useState<string>(formData.naturalidade);
  const [sexoFalecido, setSexoFalecido] = useState<string>(formData.sexo);
  const [racaFalecido, setRacaFalecido] = useState<string>(formData.raca);
  const [estadoCivilFalecido, setEstadoCivilFalecido] = useState<string>(
    formData.estado_civil
  );

  // estados de erros

  const [localError, setLocalError] = useState<[boolean, string]>([false, ""]);
  const [sexoError, setSexoError] = useState<[boolean, string]>([false, ""]);
  const [racaError, setRacaError] = useState<[boolean, string]>([false, ""]);
  const [estadoCivilError, setEstadoCivilError] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco1/${userData.bloco1}`
        );
        const data = response.data;
        setEstadoCivilFalecido(data.estado_civil);
        setLocalNascimentoFalecido(data.naturalidade);
        setRacaFalecido(data.raca);
        setSexoFalecido(data.sexo);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco1]);

  function validacoes(
    local: string,
    sexo: string,
    raca: string,
    estadocivil: string,
    formData: string
  ): string {
    if (formData == "nao_fetal") {
      if (isCampoVazio(estadocivil)) {
        setEstadoCivilError([true, "Estado Civil está vazio"]);
        return "Erro: Estado Civil vazio";
      }
      if (isCampoVazio(raca)) {
        setRacaError([true, "Raça/Cor está vazio"]);

        setEstadoCivilError([false, ""]);
        return "Erro: Raca vazio";
      }
    }

    if (isCampoVazio(local)) {
      setLocalError([true, "Local de Nascimento está vazio"]);

      setRacaError([false, ""]);
      setEstadoCivilError([false, ""]);

      return "Erro: Local de nascimento vazio";
    }
    if (isCampoVazio(sexo)) {
      setSexoError([true, "Sexo/Gênero está vazio"]);

      setLocalError([false, ""]);
      setRacaError([false, ""]);
      setEstadoCivilError([false, ""]);
      return "Erro: Sexo vazio";
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
              await new Promise((r) => setTimeout(r, 500));

              const valid = validacoes(
                localNascimentoFalecido,
                sexoFalecido,
                racaFalecido,
                estadoCivilFalecido,
                formData.tipo_morte
              );
              if (valid == "OK") {
                const apiUrl = "http://143.198.163.134:5000/bloco1"; // Substitua pelo URL da sua API

                let dataToSend;
                if (formData.tipo_morte === "nao_fetal") {
                  dataToSend = {
                    bloco1_id: formData.bloco1,
                    naturalidade: localNascimentoFalecido,
                    raca: racaFalecido,
                    sexo: sexoFalecido,
                    estado_civil: estadoCivilFalecido,
                  };
                } else {
                  dataToSend = {
                    bloco1_id: formData.bloco1,
                    nome_falecido: "Natimorto",
                    idade: "0",
                    naturalidade: localNascimentoFalecido,
                    raca: "Não se aplica",
                    sexo: sexoFalecido,
                    data_nascimento: dayjs(new Date()).format("YYYY-MM-DD"),
                    cartao_sus: "000000000000000",
                    estado_civil: "Não se aplica",
                  };
                }

                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );

                  if (userData.tipo_morte=="fetal"){
                    const newSession = {
                      bloco1: userData.bloco1,
                      bloco2: userData.bloco2,
                      bloco3: userData.bloco3,
                      bloco4: userData.bloco4,
                      bloco5: userData.bloco5,
                      bloco6: userData.bloco6,
                      bloco7: userData.bloco7,
                      paciente_id: userData.paciente_id,
                      tipo_morte: userData.tipo_morte,
                      data_obito: userData.data_obito,
                      idade_falecido:"0"
                    };
                    setUserData(newSession);
                  }

                navigateToPage("/tela4", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Qual a naturalidade?
        "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    defaultValue={localNascimentoFalecido}
                    tooltipTitle="Estado de Nascimento do Falecido. Ex: Alagoas. Caso não exista, selecione 'Ignorar'"
                    options={[
                      "Ignorado",
                      "Acre",
                      "Alagoas",
                      "Amapá",
                      "Amazonas",
                      "Bahia",
                      "Ceará",
                      "Distrito Federal",
                      "Goiás",
                      "Espirito Santo",
                      "Maranhão",
                      "Mato Grosso",
                      "Mato Grosso do Sul",
                      "Minas Gerais",
                      "Pará",
                      "Paraíba",
                      "Paraná",
                      "Pernambuco",
                      "Piauí",
                      "Rio de Janeiro",
                      "Rio Grande do Norte",
                      "Rio Grande do Sul",
                      "Rondônia",
                      "Roraima",
                      "São Paulo",
                      "Santa Catarina",
                      "Sergipe",
                      "Tocantins"
                    ]}
                    values={[
                      "Ignorado",
                      "Acre",
                      "Alagoas",
                      "Amapá",
                      "Amazonas",
                      "Bahia",
                      "Ceará",
                      "Distrito Federal",
                      "Goiás",
                      "Espirito Santo",
                      "Maranhão",
                      "Mato Grosso",
                      "Mato Grosso do Sul",
                      "Minas Gerais",
                      "Pará",
                      "Paraíba",
                      "Paraná",
                      "Pernambuco",
                      "Piauí",
                      "Rio de Janeiro",
                      "Rio Grande do Norte",
                      "Rio Grande do Sul",
                      "Rondônia",
                      "Roraima",
                      "São Paulo",
                      "Santa Catarina",
                      "Sergipe",
                      "Tocantins"
                    ]}
                    onChange={setLocalNascimentoFalecido}
                    hasError={localError[0]}
                    errorMsg={localError[1]}
                  />
                )}

                <InputQuestion
                  question="
          Qual o sexo biológico? 
        "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    defaultValue={sexoFalecido}
                    tooltipTitle="Sexo Biológico do Falecido. Ex: Masculino"
                    options={["Ignorado", "Feminino", "Masculino"]}
                    values={["Ignorado", "Feminino", "Masculino"]}
                    onChange={setSexoFalecido}
                    hasError={sexoError[0]}
                    errorMsg={sexoError[1]}
                  />
                )}

                {/* A partir daqui é nao fetal */}
                {formData.tipo_morte === "nao_fetal" && (
                  <>
                    <InputQuestion question="Qual a raça/cor? " />
                    {!loading && (
                      <SelectDropdown
                        defaultValue={racaFalecido}
                        tooltipTitle="Raça/Cor do Falecido. Ex: Pardo. Caso não exista, selecione 'Ignorar'"
                        options={["Preto", "Indígena", "Branca", "Amarelo", "Pardo"]}
                        values={["Preto", "Indígena", "Branca", "Amarelo", "Pardo"]}
                        onChange={setRacaFalecido}
                        hasError={racaError[0]}
                        errorMsg={racaError[1]}
                      />
                    )}

                    <InputQuestion question="Qual o estado civil?" />
                    {!loading && (
                      <SelectDropdown
                        defaultValue={estadoCivilFalecido}
                        tooltipTitle="Estado Civil do Falecido conforme documento. Ex: Solteiro. Caso não exista, selecione 'Ignorar'"
                        options={["Solteiro", "Casado", "Divorciado", "Viúvo"]}
                        values={["Solteiro", "Casado", "Divorciado", "Viúvo"]}
                        onChange={setEstadoCivilFalecido}
                        hasError={estadoCivilError[0]}
                        errorMsg={estadoCivilError[1]}
                      />
                    )}
                  </>
                )}

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref={formData.tipo_morte === "nao_fetal" ? "/tela_escol" : "tela2"}
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela3;
