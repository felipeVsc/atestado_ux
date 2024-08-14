import React, { useState, useEffect } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import FormsAnt from "../forms";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HorizontalBar from "../../components/horizontalBar";
import MenuAppBar from "../../components/AppBar";
import { Section4Styles } from "../bloco1/styles";
import Checkbox from "antd/es/checkbox/Checkbox";
import InputQuestion from "../question";
import { Typography } from "@mui/material";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { useSession } from "../session";
import axios from "axios";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

function estaVazioCampo(campo: string) {
  return campo == "";
}

// logradouro e numero
function Tela13() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const addressData = userData.dados_endereco_hosp;

  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [nomeLogradouro, setNomeLogradouro] = useState<string>(
    addressData.logradouro ?? ""
  );
  const [numeroLogradouro, setNumeroLogradouro] = useState<string>("");
  const [ignorarNumero, setIgnorarNumero] = useState<boolean>(false);
  const navigateToPage = useNavigate();

  // estados de erros

  const [logradouroErro, setLogradouroError] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [numeroErro, setnumeroError] = useState<[boolean, string]>([false, ""]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco3/${userData.bloco3}`
        );
        const data = response.data;
        if (addressData.logradouro===null){
          setNumeroLogradouro(data.numero_ocorrencia);
          setNomeLogradouro(data.logradouro_ocorrencia);

        }
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco3]);

  function validacoes(nome: string, numero: string): string {
    if (estaVazioCampo(nome)) {
      setLogradouroError([true, "Logradouro está vazio"]);
      return "Erro: Logradouro está vazio";
    }
    if (estaVazioCampo(numero) && componentDisabled == false) {
      setnumeroError([true, "Número do logradouro está vazio"]);

      setLogradouroError([false, ""]);
      return "Erro: Numero está vazio";
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
              const valid = validacoes(nomeLogradouro, numeroLogradouro);
              if (valid == "OK") {
                const apiUrl = "http://143.198.163.134:5000/bloco3"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco3_id: formData.bloco3,
                  logradouro_ocorrencia: nomeLogradouro === null
                  ? addressData.logradouro
                  : nomeLogradouro,
                  numero_ocorrencia: numeroLogradouro,
                  codigo_mun_ocorrencia:addressData.ibge
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );

                navigateToPage("/tela14", { state: [addressData, formData] });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Qual o logradouro?
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    disabled_val={false}
                    title="Nome da rua, avenida, travessa de residência de ocorrência do óbito. Ex: Avenida Fernandes Lima"
                    onChange={setNomeLogradouro}
                    defaultValue={ nomeLogradouro === null
                      ? addressData.logradouro
                      : nomeLogradouro}
                    hasError={logradouroErro[0]}
                    errorMsg={logradouroErro[1]}
                  ></FormsAnt>
                )}
                <InputQuestion
                  question="
          Qual o número?
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={numeroLogradouro}
                    disabled_val={numeroLogradouro === "Sem número"}
                    title="Número da residência de ocorrência do óbito. Ex: 40. Caso não exista, selecione a caixinha 'Sem número'"
                    onChange={setNumeroLogradouro}
                    hasError={numeroErro[0]}
                    errorMsg={numeroErro[1]}
                  ></FormsAnt>
                )}
               <Checkbox
                  checked={numeroLogradouro === "Sem número" ? true : false}
                  onChange={(e) => {
                    setIgnorarNumero(e.target.checked);
                    if (e.target.checked) {
                      setNumeroLogradouro("Sem número");
                    } else {
                      setNumeroLogradouro("");
                    }
                  }}
                >
                  Sem número
                </Checkbox>
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela12"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela13;
