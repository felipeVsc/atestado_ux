import React, { useEffect, useState } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SelectDropdown from "../selectdropdown";
import { Section4Styles } from "../bloco1/styles";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../session";
import SelectWithSearchCid from "../../components/SelectSearchCid";
import axios from "axios";
import FormsAnt from "../forms";

// bairro e municipio
function Tela23() {
  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const [causaAdicional1, setCausaAdicional1] = useState<string>("");
  const [causaAdicional2, setCausaAdicional2] = useState<string>("");

  const [tempoAproximadoAdicional1, setTempoAproximadoAdicional1] =
    useState<string>("");
  const [tempoAproximadoAdicional2, setTempoAproximadoAdicional2] =
    useState<string>("");

  const [causaAdicional1Erro, setCausaAdicional1Erro] = useState<
    [boolean, string]
  >([false, ""]);
  const [causaAdicional2Erro, setCausaAdicional2Erro] = useState<
    [boolean, string]
  >([false, ""]);


  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://157.245.80.223:5000/causa_morte/${userData.bloco5}`
        );
        const data = response.data;
        console.log(data);
        setCausaAdicional1(data.causa_morte_e);
        setCausaAdicional2(data.causa_morte_f);
        setTempoAproximadoAdicional1(data.tempo_morte_e);
        setTempoAproximadoAdicional2(data.tempo_morte_f);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }
    getValues();
  }, [userData.bloco3]);

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={4} tituloDoBloco="Causas da morte">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {

              const apiUrl = "http://157.245.80.223:5000/causa_morte"; // Substitua pelo URL da sua API

              const dataToSend = {
                bloco5_id: formData.bloco5,
                cid_morte_e: causaAdicional1,
                tempo_morte_e: tempoAproximadoAdicional1,
                cid_morte_f: causaAdicional2,
                tempo_morte_f: tempoAproximadoAdicional2,
              };
              axios
                .post(apiUrl, dataToSend)
                .then((response) => console.log(response))
                .catch((error) =>
                  console.error("Erro ao enviar a requisição:", error)
                );
              navigateToPage("/tela25", { state: formData });
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Causas adicionais | A
          "
                ></InputQuestion>

                {/* <SelectDropdown
                  options={["Vaginal", "Cesáreo", "Ignorado"]}
                  values={["Vaginal", "Cesáreo", "Ignorado"]}
                  tooltipTitle="Qual consequência/causa adicional da morte? Ex: Covid-19"
                  onChange={setCausaAdicional1}
                  hasError={causaAdicional1Erro[0]}
                  errorMsg={causaAdicional1Erro[1]}
                /> */}

                <SelectWithSearchCid
                  tooltipTitle="Qual consequência/causa adicional da morte? Ex: Covid-19"
                  onChange={setCausaAdicional1}
                  hasError={causaAdicional1Erro[0]}
                  errorMsg={causaAdicional1Erro[1]}
                ></SelectWithSearchCid>

                <InputQuestion
                  question="
                  Tempo aproximado (X anos, Y dias)
          "
                ></InputQuestion>
                <FormsAnt
                  defaultValue={""}
                  disabled_val={false}
                  title="Tempo aproximado do inicio. Ex: 1 dia"
                  onChange={setTempoAproximadoAdicional1}
                  hasError={false}
                  errorMsg=""
                ></FormsAnt>

                <InputQuestion
                  question="
          Causas adicionais | B
          "
                ></InputQuestion>
                {/* <SelectDropdown
                  options={["Vaginal", "Cesáreo", "Ignorado"]}
                  values={["Vaginal", "Cesáreo", "Ignorado"]}
                  tooltipTitle="Qual consequência/causa adicional da morte?. Ex: Covid-19"
                  onChange={setCausaAdicional2}
                  hasError={causaAdicional2Erro[0]}
                  errorMsg={causaAdicional2Erro[1]}
                /> */}

                <SelectWithSearchCid
                  tooltipTitle="Qual consequência/causa adicional da morte?. Ex: Covid-19"
                  onChange={setCausaAdicional2}
                  hasError={causaAdicional2Erro[0]}
                  errorMsg={causaAdicional2Erro[1]}
                ></SelectWithSearchCid>

                <InputQuestion
                  question="
          Tempo aproximado (X anos, Y dias)
          "
                ></InputQuestion>
                <FormsAnt
                  defaultValue={""}
                  disabled_val={false}
                  title="Tempo aproximado do inicio. Ex: 1 dia"
                  onChange={setTempoAproximadoAdicional2}
                  hasError={false}
                  errorMsg=""
                ></FormsAnt>

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela22"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela23;
