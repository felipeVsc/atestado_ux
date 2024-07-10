import React, { useEffect, useState } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import FormsAnt from "../forms";
import { Section4Styles } from "../bloco1/styles";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { boolean, string } from "yup";
import { useSession } from "../session";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

function contemApenasNumeros(input: string): boolean {
  return /^[0-9]+$/.test(input);
}

// Cep
function Tela6() {
  const { userData } = useSession();
  const { setUserData } = useSession();
  const formData = userData;
  

  let [cep, setCEP] = useState<string>(
    userData.dados_endereco_paciente
      ? userData.dados_endereco_paciente.cep || ""
      : ""
  );
  const [logradouro, setLogradouro] = useState<string>(
    userData.dados_endereco_paciente
      ? userData.dados_endereco_paciente.cep || ""
      : ""
  );
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    uf: "",
  });
  const location = useLocation();

  // estados para os erros

  const [cepError, setCepError] = useState<[boolean, string]>([false, ""]);

  const navigateToPage = useNavigate();

  function validacoes(cep: string): string {
    if (cep == "") {
      setCepError([true, "CEP está vazio."]);
      return "Erro: campo vazio";
    }
    if (!contemApenasNumeros(cep)) {
      setCepError([true, "CEP não é númerico."]);
      return "Erro: CEP não númerico";
    }
    if (cep.length < 8) {
      setCepError([true, "CEP não tem 8 dígitos."]);
      return "Erro: CEP nao corresponde a 8 digitos";
    }

    return "OK";
  }

  async function completeCEP(cep: string) {
    setCEP(cep);
    // pegar os dados e preencher com as infos do cep
    // change value of form
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;
    setLogradouro(data.logradouro);
    setAddress(data);

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
      idade_falecido: userData.idade_falecido,
      dados_endereco_paciente: data,
    };
    setUserData(newSession);
    return data.logradouro;
  }

  async function enviarDados(data: any) {
    const apiUrl = "http://159.223.108.189:5000/bloco2"; // Substitua pelo URL da sua API
    const dataToSend = {
      bloco2_id: formData.bloco2,
      cep_residencia: cep,
    };

    axios
      .post(apiUrl, dataToSend)
      .then((response) => console.log("Resposta da API:", response.data))
      .catch((error) =>
        console.error("Erro ao enviar a requisição:", error.message)
      );
  }

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://159.223.108.189:5000/bloco2/${userData.bloco2}`
        );
        const data = response.data;
        setCEP(data.cep_residencia);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco2]);
  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={1} tituloDoBloco="Residência do Falecido">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              cep = cep.replace("-", "");
              completeCEP(cep);
              if (validacoes(cep) == "OK") {
                const response = await axios.get(
                  `https://viacep.com.br/ws/${cep}/json/`
                );
                const data = response.data;

                enviarDados(data);

                navigateToPage("/tela7", { state: [data, formData] });
              } else {
                console.log(validacoes(cep));
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Qual o CEP?
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    disabled_val={false}
                    title="CEP (Código Postal) da Residência do Falecido. Ex: 57845-123"
                    onChange={setCEP}
                    defaultValue={cep}
                    hasError={cepError[0]}
                    errorMsg={cepError[1]}
                  ></FormsAnt>
                )}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela4"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela6;
