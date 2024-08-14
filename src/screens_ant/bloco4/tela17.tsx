import React, { useState, useEffect } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SelectDropdown from "../selectdropdown";
import { Section4Styles } from "../bloco1/styles";
import { useLocation, useNavigate } from "react-router-dom";
import FormsAnt from "../forms";
import Checkbox from "antd/es/checkbox/Checkbox";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import isNotNumeric from "../../utils/isnumeric";
import axios from "axios";
import { useSession } from "../session";

function Tela17() {
  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [numeroSemanasGestacao, setNumeroSemanasGestacao] =
    useState<string>("");
  const [tipoGravidezMaeFalecido, setTipoGravidezMaeFalecido] =
    useState<string>("");
    const [ignorarNumeroSemanas, setIgnorarNumeroSemanas] = useState<boolean>(false);

  // estados de erro

  const [numeroSemanasGestacaoErro, setNumeroSemanasGestacaoErro] = useState<
    [boolean, string]
  >([false, ""]);
  const [tipoGravidezMaeFalecidoErro, setTipoGravidezMaeFalecidoErro] =
    useState<[boolean, string]>([false, ""]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco4/${userData.bloco4}`
        );
        const data = response.data;
        setNumeroSemanasGestacao(data.num_semanas_gestacao);
        setTipoGravidezMaeFalecido(data.tipo_gravidez);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco4]);

  function validacoes(numeroSemanasGestacao: string, tipogravidez: string) {
    if (!componentDisabled) {
      if (numeroSemanasGestacao == "") {
        setNumeroSemanasGestacaoErro([
          true,
          "Número de Semanas de Gestação vazio",
        ]);
        return "Erro: campo vazio";
      }
      if (isNotNumeric(numeroSemanasGestacao)) {
        setNumeroSemanasGestacaoErro([
          true,
          "Número de Semanas de Gestação não é númerico",
        ]);
        return "Erro: campo nao numerico";
      }
      if (tipogravidez == "") {
        setTipoGravidezMaeFalecidoErro([true, "Tipo de gravidez vazio"]);
        return "Erro: campo vazio";
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
                numeroSemanasGestacao,
                tipoGravidezMaeFalecido
              );
              if (valid == "OK") {
                const apiUrl = "http://143.198.163.134:5000/bloco4"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco4_id: formData.bloco4,
                  num_semanas_gestacao: numeroSemanasGestacao,
                  tipo_gravidez: tipoGravidezMaeFalecido,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela18", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Número de semanas de gestação
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={numeroSemanasGestacao}
                    disabled_val={numeroSemanasGestacao === "000"}
                    title="Número de semanas de gestação da mãe do falecido. Ex: 2. Caso não se aplique, selecione 'Ignorar'"
                    onChange={setNumeroSemanasGestacao}
                    hasError={numeroSemanasGestacaoErro[0]}
                    errorMsg={numeroSemanasGestacaoErro[1]}
                  ></FormsAnt>
                )}
                <Checkbox
                   checked={numeroSemanasGestacao === "000" ? true : false}
                   onChange={(e) => {
                     setIgnorarNumeroSemanas(e.target.checked);
                     if (e.target.checked) {
                       setNumeroSemanasGestacao("000");
                     } else {
                      setNumeroSemanasGestacao("");
                     }
                   }}
                >
                  Ignorar
                </Checkbox>
                <InputQuestion
                  question="
          Tipo de Gravidez
          "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    defaultValue={tipoGravidezMaeFalecido}
                    tooltipTitle="Tipo de Gravidez da mãe do Falecido. Ex: Única"
                    options={["Única", "Dupla", "Tripla e mais", "Ignorada"]}
                    values={["Única", "Dupla", "Tripla e mais", "Ignorada"]}
                    onChange={setTipoGravidezMaeFalecido}
                    hasError={tipoGravidezMaeFalecidoErro[0]}
                    errorMsg={tipoGravidezMaeFalecidoErro[1]}
                  />
                )}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela16"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela17;
