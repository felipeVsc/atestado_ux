import React, { useEffect, useState } from "react";

import "./tela2.css";
import { Section4Styles } from "../bloco1/styles";
import FormsAnt from "../forms";
import InputQuestion from "../question";
import SelectDropdown from "../selectdropdown";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { useNavigate } from "react-router-dom";
import { useSession } from "../session";
import axios from "axios";

// Descricao e Tipo de local
function Tela27() {
  const navigateToPage = useNavigate();
  const [tipoLocal, setTipoLocal] = useState<string>("");
  const [descricaoEvento, setDescricaoEvento] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(true);
  const { userData} = useSession();
  const formData = userData;
  // estados de erros

  const [tipoLocalErro, setTipoLocalErro] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [descricaoEventoErro, setDescricaoEventoErro] = useState<
    [boolean, string]
  >([false, ""]);


  const handleOptionSelect = (selectedValue: string) => {
    setTipoLocal(selectedValue);
  };
  const fetchInitialValues = () => {
    console.log(userData);
    if (userData.paciente_id) {
      try{

      
      axios
        .get(`http://127.0.0.1:5000/bloco7/${userData.bloco7}`)
        .then((response) => {
          const receivedData = response.data;
          console.log("DATA: ", receivedData);
          setTipoLocal(receivedData.tipo_local || "");
          setDescricaoEvento(receivedData.descricao_evento || "");
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


  function validacoes(tipoLocal: string, descricaoEvento: string) {
    if (tipoLocal == "") {
      setTipoLocalErro([true, "Tipo do Local está vazio"]);
      return "Erro: campo vazio";
    }
    if (descricaoEvento == "" && tipoLocal!="Ignorado") {
      setDescricaoEventoErro([true, "Descrição do evento está vazio"]);
      return "Erro: campo vazio";
    }

    return "OK";
  }

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={5} tituloDoBloco="Condições do Óbito">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(tipoLocal, descricaoEvento);
              if (valid == "OK") {
                const apiUrl = "http://127.0.0.1:5000/bloco7"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco7_id: formData.bloco7,
                  tipo_local:tipoLocal,
                  descricao_evento:descricaoEvento
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela29");
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Tipo de Local
          "
                ></InputQuestion>

                <div style={{}}>
                  <SelectDropdown
                    options={[
                      "Via Pública",
                      "Endereço de Residência",
                      "Outro domicilio",
                      "Estabelecimento comercial",
                      "Outros",
                      "Ignorado",
                    ]}
                    values={[
                      "Via Pública",
                      "Endereço de Residência",
                      "Outro domicilio",
                      "Estabelecimento comercial",
                      "Outros",
                      "Ignorado",
                    ]}
                    tooltipTitle="Tipo do local"
                    onChange={setTipoLocal}
                    hasError={tipoLocalErro[0]}
                    errorMsg={tipoLocalErro[1]}
                  />
                </div>

                <InputQuestion
                  question="
          Descrição Sumária do Evento
          "
                ></InputQuestion>
{!loading && (
                <FormsAnt
                  defaultValue={descricaoEvento}
                  disabled_val={false}
                  title="Descrição do Evento."
                  onChange={setDescricaoEvento}
                  hasError={descricaoEventoErro[0]}
                  errorMsg={descricaoEventoErro[1]}
                />)}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela26"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela27;
