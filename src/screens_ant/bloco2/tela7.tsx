import React, { useEffect, useState } from "react";

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
import axios from "axios";
import { useSession } from "../session";
import { boolean } from "yup";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

function estaVazioCampo(campo: string) {
  return campo == "";
}

// logradouro e numero
function Tela7() {
  const location = useLocation();
  const locationData = location.state;
  const { userData } = useSession();
  const addressData = userData.dados_endereco_paciente;
  const formData = userData;
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  console.log(addressData)  ;
  const [nomeLogradouro, setNomeLogradouro] = useState<string>(addressData.logradouro ?? "");
  const [ignorarNumero, setIgnorarNumero] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco2/${userData.bloco2}`
        );
        const data = response.data;
        if (addressData.logradouro === null){
          setNumeroLogradouro(data.numero_residencia);
          setNomeLogradouro(data.logradouro_residencia);
        }

      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false); // Marca o carregamento como concluído
      }
    }

    getValues();
  }, [userData.bloco2]); // Adicione userData.bloco2 à lista de dependências para que a função seja chamada sempre que o bloco2 for alterado

  const [numeroLogradouro, setNumeroLogradouro] = useState<string>("");
  const navigateToPage = useNavigate();

  // estados de erros

  const [logradouroErro, setLogradouroError] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [numeroErro, setnumeroError] = useState<[boolean, string]>([false, ""]);

  function validacoes(nome: string, numero: string): string {
    if (estaVazioCampo(nome)) {
      setLogradouroError([true, "Logradouro está vazio"]);
      return "Erro: Logradouro está vazio";
    }
    if (estaVazioCampo(numero) && componentDisabled == false) {
      setnumeroError([true, "Número do logradouro está vazio"]);

      // cleaning states
      setLogradouroError([false, ""]);

      return "Erro: Numero está vazio";
    }
    return "OK";
  }
  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={1} tituloDoBloco="Residência do Falecido">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(nomeLogradouro, numeroLogradouro);
              if (valid == "OK") {
                const apiUrl = "http://143.198.163.134:5000/bloco2"; // Substitua pelo URL da sua API
                
                const dataToSend = {
                  bloco2_id: formData.bloco2,
                  logradouro_residencia: nomeLogradouro === null
                  ? addressData.logradouro
                  : nomeLogradouro,
                  numero_residencia: numeroLogradouro,
                  codigo_mun_residencia: addressData.ibge
                };

                axios
                  .post(apiUrl, dataToSend)
                  .then((response) =>
                    console.log("Resposta da API:", response.data)
                  )
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error.message)
                  );

                navigateToPage("/tela8", { state: [addressData, formData] });
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
                    title="Nome da rua, avenida, travessa de residência do falecido. Ex: Avenida Fernandes Lima"
                    onChange={setNomeLogradouro}
                    defaultValue={
                      nomeLogradouro === null
                        ? addressData.logradouro
                        : nomeLogradouro
                    }
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
                    title="Número da residência do falecido. Ex: 40. Caso não exista, selecione a caixinha 'Sem número'"
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
                  backHref="/tela6"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela7;
