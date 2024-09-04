import React, { useState, useEffect } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SelectDropdownComplete from "../selectdropdown_complete";
import HorizontalBar from "../../components/horizontalBar";
import MenuAppBar from "../../components/AppBar";
import { Section4Styles } from "../bloco1/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputQuestion from "../question";
import { Typography } from "@mui/material";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { useSession } from "../session";
import axios from "axios";
import FormsAnt from "../forms";

function isCampoVazio(input: string): boolean {
  return input == "";
}

// bairro e municipio
function Tela14() {
  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData } = useSession();
  const addressData = userData.dados_endereco_hosp;
  const formData = userData;

  const [ufFalecido, setUFFalecido] = useState<string>(addressData.uf ?? "");
  const [munFalecido, setMunFalecido] = useState<string>(addressData.municipio ?? "");
  const [bairroFalecido, setBairroFalecido] = useState<string>(
    addressData.bairro
  );

  // Pegar a idade pelo formData.bloco1.idade e ver se 
  console.log(formData);
  console.log("bloco1");
  console.log(formData.bloco1);


  // estados de erro

  const [ufFalecidoErro, setUFFalecidoErro] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [munFalecidoErro, setMunFalecidoErro] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [bairroFalecidoErro, setBairroFalecidoErro] = useState<
    [boolean, string]
  >([false, ""]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://157.245.80.223:5000/bloco3/${userData.bloco3}`
        );
        const data = response.data;
        if(addressData.logradouro===null){
          setBairroFalecido(data.bairro_ocorrencia);
          setMunFalecido(data.municipio_ocorrencia);
          setUFFalecido(data.uf_ocorrencia);

        }
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco3]);

  function validacoes(uf: string, mun: string, bairro: string): string {
    if (isCampoVazio(uf)) {
      setUFFalecidoErro([true, "Unidade Federativa está vazio"]);
      return "Erro: UF vazio";
    }
    if (isCampoVazio(mun)) {
      setMunFalecidoErro([true, "Município está vazio"]);

      setUFFalecidoErro([false, ""]);
      return "Erro: Municipio vazio";
    }
    if (isCampoVazio(bairro)) {
      setBairroFalecidoErro([true, "Bairro está vazio"]);

      setUFFalecidoErro([false, ""]);
      setMunFalecidoErro([false, ""]);
      return "Erro: Bairro vazio";
    }
    return "OK";
  }

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv
          selectedSection={2}
          tituloDoBloco="Local de ocorrência do óbito"
        >
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(ufFalecido, munFalecido, bairroFalecido);
              if (valid == "OK") {
                // TODO PREENCHER ISSO

                const apiUrl = "http://157.245.80.223:5000/bloco3"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco3_id: formData.bloco3,
                  uf_ocorrencia: ufFalecido,
                  municipio_ocorrencia: munFalecido,
                  bairro_ocorrencia: bairroFalecido,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );

                  if(userData.idade_falecido.includes("ano") && userData.tipo_morte=="nao_fetal"){
                    navigateToPage("/tela19", { state: formData });  
                  }
                  else{
                    navigateToPage("/tela15", { state: formData });
                  }
                navigateToPage("/tela15", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Qual a unidade federativa - UF?
          "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdownComplete
                    tooltipTitle="Estado de local de ocorrência do óbito. Ex: São Paulo"
                    defaultValue={
                      ufFalecido === null
                        ? addressData.uf_ocorrencia
                        : ufFalecido
                    }
                    options={[
                      addressData.uf,
                      "Alagoas",
                      "Pernambuco",
                      "São Paulo",
                      "Rio de Janeiro",
                    ]}
                    values={[
                      addressData.uf,
                      "Alagoas",
                      "Pernambuco",
                      "São Paulo",
                      "Rio de Janeiro",
                    ]}
                    onChange={setUFFalecido}
                    hasError={ufFalecidoErro[0]}
                    errorMsg={ufFalecidoErro[1]}
                  />
                )}
                <InputQuestion
                  question="
          Qual o município?
          "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdownComplete
                    tooltipTitle="Cidade de local de ocorrência do óbito. Ex: Manaus"
                    defaultValue={
                      munFalecido === null
                        ? addressData.municipio_ocorrencia
                        : munFalecido
                    }
                    options={[
                      munFalecido,
                      "Maceió",
                      "Rio Largo",
                      "Atalaia",
                      "Barra de São Miguel",
                    ]}
                    values={[
                      munFalecido,
                      "Maceió",
                      "Rio Largo",
                      "Atalaia",
                      "Barra de São Miguel",
                    ]}
                    onChange={setMunFalecido}
                    hasError={munFalecidoErro[0]}
                    errorMsg={munFalecidoErro[1]}
                  />
                )}

                <InputQuestion
                  question="
          Qual o bairro?
          "
                ></InputQuestion>

                {!loading && (
                  <FormsAnt
                    defaultValue={bairroFalecido}
                    title="Bairro de local de ocorrência do óbito. Ex: Centro"
                    onChange={setBairroFalecido}
                    hasError={bairroFalecidoErro[0]}
                    errorMsg={bairroFalecidoErro[1]}
                  ></FormsAnt>
                )}

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela13"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela14;
