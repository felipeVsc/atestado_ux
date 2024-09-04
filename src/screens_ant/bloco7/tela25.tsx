import React, { useEffect, useState } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Section4Styles } from "../bloco1/styles";
import { useNavigate } from "react-router-dom";
import FormsAnt from "../forms";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import CheckboxesGroup from "../../checkbox";
import isNotNumeric from "../../utils/isnumeric";
import { useSession } from "../session";
import axios from "axios";

// Fonte de informação
function Tela25() {
  const navigateToPage = useNavigate();
  const [numOcorrencia, setNumOcorrencia] = useState<string>("");
  const { userData} = useSession();
  const formData = userData;
  const [fonteInfo, setFonteInfo] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(true);
  const handleOptionSelect = (selectedValue: string) => {
    setFonteInfo(selectedValue);
  };
  // estado dos erros

  const [numOcorrenciaErro, setNumOcorrenciaErro] = useState<[boolean, string]>(
    [false, ""]
  );

  const fetchInitialValues = () => {
    console.log(userData);
    if (userData.paciente_id) {
      try{

        axios
          .get(`http://157.245.80.223:5000/bloco7/${userData.bloco7}`)
          .then((response) => {
            const receivedData = response.data;
            console.log("DATA: ", receivedData);
            setFonteInfo(receivedData.fonte_informacao || "");
            setNumOcorrencia(receivedData.num_ocorrencia_policial || "");
          })
          .catch((error) => {
            console.error("Erro ao obter dados do bloco1:", error);
          });
        } catch (error) {
          console.error("Erro ao buscar dados do banco:", error);
        } finally {
          setLoading(false); // Marca o carregamento como concluído
        }
      
    } else {
      console.error("ID do paciente está vazio, indefinido ou já foi gerado.");
    }
    
  };

  useEffect(() => {
    fetchInitialValues();
  }, [userData.paciente_id]);

  function validacoes(numOcorrencia: string) {
    if( fonteInfo=="Ocorrência Policial"){

      if (numOcorrencia == "") {
        setNumOcorrenciaErro([true, "Número de ocorrência está vazio"]);
        return "Erro: campo vazio";
      }
      if (isNotNumeric(numOcorrencia)) {
        setNumOcorrenciaErro([true, "Número de ocorrência não é numérico"]);
        return "Erro: campo nao numerico";
      }
    }
    return "OK";
  };
  

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={5} tituloDoBloco="Condições do Óbito">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(numOcorrencia);
              if (valid == "OK") {
                const apiUrl = "http://157.245.80.223:5000/bloco7"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco7_id: formData.bloco7,
                  fonte_informacao:fonteInfo
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela26");
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Qual a fonte de informação?
          "
                ></InputQuestion>

                <div style={{ paddingLeft: "100px" }}>
                  <CheckboxesGroup
                    options={["Ocorrência Policial", "Hospital", "Família", "Outros", "Ignorar"]}
                    labels={[
                      "Ocorrência Policial",
                      "Hospital",
                      "Família",
                      "Outros",
                      "Ignorar",
                    ]}
                    onOptionSelect={handleOptionSelect}
                    selectedOption={fonteInfo}
                  ></CheckboxesGroup>
                </div>
                {fonteInfo=="Ocorrência Policial" && !loading && (
                  
                <FormsAnt
                  defaultValue={numOcorrencia}
                  disabled_val={false}
                  title="Número da Ocorrência Policial"
                  onChange={handleOptionSelect}
                  hasError={numOcorrenciaErro[0]}
                  errorMsg={numOcorrenciaErro[1]}
                />)}

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela24"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela25;
