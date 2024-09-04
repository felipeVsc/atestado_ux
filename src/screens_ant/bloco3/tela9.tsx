import React, { useEffect, useState } from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Section4Styles } from "../bloco1/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckboxesGroup from "../../checkbox";
import InputQuestion from "../question";
import { Typography } from "@mui/material";

import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import MessageError from "../error_msg";
import { useSession } from "../session";
import axios from "axios";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});


// bairro e municipio
function Tela9() {
  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const [obitoNesteHospital, setObitoNesteHospital] = useState<string>("");
  
  const handleOptionSelect = (selectedValue: string) => {
    setObitoNesteHospital(selectedValue);
  };

  const [hasError, setHasError] = useState<boolean>(false);

  function validacoes(valor: string) {
    if (valor == "") {

      setHasError(true);
      return "Erro: Opção não escolhida";
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
              const valid = validacoes(obitoNesteHospital);
              if (valid == "OK") {
                console.log(valid);
                if (obitoNesteHospital == "sim") {
                  // aqui vai pro banco as infos prontas ja
                const apiUrl = 'http://157.245.80.223:5000/bloco3'; 
                
                const dataToSend = {
                  bloco3_id:formData.bloco3,
                  cep_ocorrencia:"57072900",
                  logradouro_ocorrencia:"Lourival Melo Mota",
                  numero_ocorrencia:"S/N",
                  bairro_ocorrencia:"Cidade Universitaria",
                  municipio_ocorrencia:"Maceio",
                  uf_ocorrencia:"Alagoas",
                  estabelecimento_ocorrencia:"Hospital Universitário Professor Alberto Antunes",
                  local_ocorrencia: "Hospital",
                  codigo_cnes_estabelecimento:"2006197",
                  codigo_mun_ocorrencia:"2704302"
                };
                axios.post(apiUrl, dataToSend)
                .then((response) => console.log(response))
                .catch((error) => console.error('Erro ao enviar a requisição:', error));
                console.log(userData);
                  if(userData.idade_falecido.includes("ano") && userData.tipo_morte=="nao_fetal"){
                    navigateToPage("/tela19", { state: ["sim",formData] });  
                  }
                  else{
                    navigateToPage("/tela15", { state: ["sim",formData] });
                  }
                } else {
                  navigateToPage("/tela10",{state:formData});
                }
              }
              console.log(valid);
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          O óbito ocorreu neste hospital?
          "
                ></InputQuestion>
                <div style={{ paddingLeft: "100px" }}>
                  <CheckboxesGroup
                    options={["sim", "nao"]}
                    labels={["Sim", "Não"]}
                    onOptionSelect={handleOptionSelect}
                    ></CheckboxesGroup>
                </div>
                {hasError ? <MessageError error_msg="Você deve escolher uma opção!" /> : ''}  
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela8"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>

    </div>
  );
}

export default Tela9;
