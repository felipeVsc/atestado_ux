import React, { useState, useEffect } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Section4Styles } from "../bloco1/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormsAnt from "../forms";
import Checkbox from "antd/es/checkbox/Checkbox";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import axios from "axios";
import { useSession } from "../session";

function isNotNumeric(input: string): boolean {
  // Use a regular expression to match non-numeric characters
  return !/^\d+$/.test(input);
}

function Tela16() {
  const [ignorarFilhosVivos, setignorarFilhosVivos] = useState<boolean>(false);
  const [ignorarFilhosMortos, setignorarFilhosMortos] =
    useState<boolean>(false);

  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;

  const [filhosVivosMaeFalecido, setFilhosVivosMaeFalecido] =
    useState<string>("");
  const [filhosMortosMaeFalecido, setFilhosMortosMaeFalecido] =
    useState<string>("");

  const [filhosVivosMaeFalecidoErro, setFilhosVivosMaeFalecidoErro] = useState<
    [boolean, string]
  >([false, ""]);
  const [filhosMortosMaeFalecidoErro, setFilhosMortosMaeFalecidoErro] =
    useState<[boolean, string]>([false, ""]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco4/${userData.bloco4}`
        );
        const data = response.data;
        setFilhosMortosMaeFalecido(data.morte_parto);
        setFilhosVivosMaeFalecido(data.num_filhos_tidos);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco4]);

  function validacoes(filhosvivos: string, filhosmortos: string) {
    if (!ignorarFilhosVivos) {
      if (filhosvivos == "" && !ignorarFilhosVivos) {
        setFilhosVivosMaeFalecidoErro([
          true,
          "Número de Filhos Vivos está vazio",
        ]);
        return "Erro: campo vazio";
      }
      if (isNotNumeric(filhosvivos)) {
        setFilhosVivosMaeFalecidoErro([
          true,
          "Número de Filhos Vivos não é númerico",
        ]);
        return "Erro: campo nao numerico";
      }
    }

    if (!ignorarFilhosMortos) {
      if (filhosmortos == "") {
        setFilhosMortosMaeFalecidoErro([
          true,
          "Número de Filhos Mortos está vazio",
        ]);
        return "Erro: campo vazio";
      }
      if (isNotNumeric(filhosmortos)) {
        setFilhosMortosMaeFalecidoErro([
          true,
          "Número de Filhos Mortos está vazio",
        ]);
        return "Erro: campo nao numerico";
      }
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
                filhosVivosMaeFalecido,
                filhosMortosMaeFalecido
              );
              if (valid == "OK") {
                const apiUrl = "http://143.198.163.134:5000/bloco4"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco4_id: formData.bloco4,
                  num_filhos_tidos: filhosVivosMaeFalecido,
                  morte_parto: filhosMortosMaeFalecido,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela17", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Número de filhos - Nascidos vivos
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={filhosVivosMaeFalecido}
                    disabled_val={filhosVivosMaeFalecido === "Ignorado"}
                    title="Número de filhos que a mãe teve e que nasceram vivos. Ex: 2. Caso não exista, selecione 'Ignorar'"
                    onChange={setFilhosVivosMaeFalecido}
                    hasError={filhosVivosMaeFalecidoErro[0]}
                    errorMsg={filhosVivosMaeFalecidoErro[1]}
                  ></FormsAnt>
                )}
                <Checkbox
                  checked={filhosVivosMaeFalecido === "Ignorado" ? true : false}
                  onChange={(e) => {
                    setignorarFilhosVivos(e.target.checked);
                    if (e.target.checked) {
                      setFilhosVivosMaeFalecido("Ignorado");
                    } else {
                      setFilhosVivosMaeFalecido("");
                    }
                  }}
                >
                  Ignorar
                </Checkbox>
                <InputQuestion
                  question="
          Número de filhos - Mortes Fetais/Abortos 
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={filhosMortosMaeFalecido}
                    disabled_val={filhosMortosMaeFalecido === "Ignorado"}
                    title="Número de filhos que a mãe teve e que foram mortes fetais ou abortos. Ex: 0. Caso não exista, selecione 'Ignorar'"
                    onChange={setFilhosMortosMaeFalecido}
                    hasError={filhosMortosMaeFalecidoErro[0]}
                    errorMsg={filhosMortosMaeFalecidoErro[1]}
                  ></FormsAnt>
                )}
                <Checkbox
                  checked={
                    filhosMortosMaeFalecido === "Ignorado" ? true : false
                  }
                  onChange={(e) => {
                    setignorarFilhosMortos(e.target.checked);
                    if (e.target.checked) {
                      setFilhosMortosMaeFalecido("Ignorado");
                    } else {
                      setFilhosMortosMaeFalecido("");
                    }
                  }}
                >
                  Ignorar
                </Checkbox>
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela15"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela16;
