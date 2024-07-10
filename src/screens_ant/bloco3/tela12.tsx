import React, { useState, useEffect } from "react";

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
function Tela12() {
  let [cep, setCEP] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    uf: "",
  });

  // estados para os erros

  const [cepError, setCepError] = useState<[boolean, string]>([false, ""]);

  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData, setUserData } = useSession();
  const formData = userData;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/bloco3/${userData.bloco3}`
        );
        const data = response.data;
        setCEP(data.cep_ocorrencia);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco3]);

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
      dados_endereco_paciente: userData.dados_endereco_paciente,
      dados_endereco_hosp: data,
    };
    setUserData(newSession);
    console.log("sessao nova");
    console.log(userData);
    return data.logradouro;
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
              cep = cep.replace("-", "");
              completeCEP(cep);
              if (validacoes(cep) == "OK") {
                // tem que passar o estado das coisas pelo visto do outro
                // mas é bom ter que passar tudo em uma estrutura (como o pedro fez) e nao varios
                const response = await axios.get(
                  `https://viacep.com.br/ws/${cep}/json/`
                );
                const data = response.data;

                const apiUrl = "http://127.0.0.1:5000/bloco3"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco3_id: formData.bloco3,
                  cep_ocorrencia: cep,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );

                navigateToPage("/tela13", { state: [data, formData] });
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
                    title="CEP (Código Postal) do local de ocorrência do óbito. Ex: 57845-123"
                    onChange={setCEP}
                    defaultValue={cep}
                    hasError={cepError[0]}
                    errorMsg={cepError[1]}
                  ></FormsAnt>
                )}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela11"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela12;
