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
import axios from "axios";
import { useSession } from "../session";
import FormsAnt from "../forms";

function isCampoVazio(input: string): boolean {
  return input == "";
}

// bairro e municipio
function Tela8() {
  const navigateToPage = useNavigate();
  const location = useLocation();
  const locationData = location.state;
  const { userData } = useSession();
  const addressData = userData.dados_endereco_paciente;
  const formData = userData;
  const [ufFalecido, setUFFalecido] = useState<string>(addressData.uf ?? "");
  const [munFalecido, setMunFalecido] = useState<string>(addressData.localidade ?? "");
  const [bairroFalecido, setBairroFalecido] = useState<string>(
    addressData.bairro
  );

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
          `http://159.223.108.189:5000/bloco2/${userData.bloco2}`
        );
        const data = response.data;
        if (addressData.uf === null){
          setBairroFalecido(data.bairro_residencia);
          setMunFalecido(data.municipio_residencia);
          setUFFalecido(data.uf_residencia);

        }
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false); // Marca o carregamento como concluído
      }
    }

    getValues();
  }, [userData.bloco2]);

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
        <AppDiv selectedSection={1} tituloDoBloco="Residência do Falecido">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(ufFalecido, munFalecido, bairroFalecido);
              if (valid == "OK") {
                const apiUrl = "http://159.223.108.189:5000/bloco2"; // Substitua pelo URL da sua API
                const dataToSend = {
                  bloco2_id: formData.bloco2,
                  uf_residencia: ufFalecido,
                  municipio_residencia: munFalecido,
                  bairro_residencia: bairroFalecido,
                };

                axios
                  .post(apiUrl, dataToSend)
                  .then((response) =>
                    console.log("Resposta da API:", response.data)
                  )
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error.message)
                  );

                navigateToPage("/tela9", { state: formData });
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
                    tooltipTitle="Estado de Residência do Falecido. Ex: São Paulo"
                    defaultValue={
                      ufFalecido === null
                        ? addressData.uf_residencia
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
                    tooltipTitle="Cidade de Residência do Falecido. Ex: Manaus"
                    defaultValue={
                      munFalecido === null
                        ? addressData.localidade
                        : munFalecido
                    }
                    options={[
                      munFalecido === null
                        ? addressData.localidade
                        : munFalecido,
                      "Maceió",
                      "Rio Largo",
                      "Atalaia",
                      "Barra de São Miguel",
                    ]}
                    values={[
                      munFalecido === null
                        ? addressData.localidade
                        : munFalecido,
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
                    defaultValue={
                      bairroFalecido === null
                        ? addressData.bairro_residencia
                        : bairroFalecido
                    }
                    title="Bairro de Residência do Falecido. Ex: Centro"
                    onChange={setBairroFalecido}
                    hasError={bairroFalecidoErro[0]}
                    errorMsg={bairroFalecidoErro[1]}
                  ></FormsAnt>
                )}

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela7"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela8;
