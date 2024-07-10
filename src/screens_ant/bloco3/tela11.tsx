import React, { useState, useEffect } from "react";

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
import isCampoVazio from "../../utils/checkcampo";
import { useSession } from "../session";
import axios from "axios";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

// bairro e municipio
function Tela11() {
  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const [estabelecimentoObito, setEstabelecimentoObito] = useState<string>(
    "Hospital Universitário"
  );
  const [estabelecimentoObitoErro, setEstabelecimentoObitoErro] = useState<
    [boolean, string]
  >([false, ""]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/bloco3/${userData.bloco3}`
        );
        const data = response.data;
        setEstabelecimentoObito(data.estabelecimento_ocorrencia);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco3]);
  function validacoes(estabelecimento: string) {
    if (isCampoVazio(estabelecimentoObito)) {
      setEstabelecimentoObitoErro([true, "Estabelecimento vazio"]);
      return "Erro: campo vazio";
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
              const valid = validacoes(estabelecimentoObito);
              if (valid == "OK") {
                const apiUrl = "http://127.0.0.1:5000/bloco3"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco3_id: formData.bloco3,
                  estabelecimento_ocorrencia: estabelecimentoObito,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );

                navigateToPage("/tela12", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Estabelecimento
          "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    defaultValue={estabelecimentoObito}
                    tooltipTitle="Estabelecimento de Saúde onde ocorreu o óbito. Ex: Hospital Universitário"
                    options={[
                      "Hospital Universitário",
                      "UPA Jacintinho",
                      "Hospital Arthur Ramos",
                    ]}
                    values={[
                      "Hospital Universitário",
                      "UPA Jacintinho",
                      "Hospital Arthur Ramos",
                    ]}
                    onChange={setEstabelecimentoObito}
                    hasError={estabelecimentoObitoErro[0]}
                    errorMsg={estabelecimentoObitoErro[1]}
                  />
                )}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela10"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela11;
