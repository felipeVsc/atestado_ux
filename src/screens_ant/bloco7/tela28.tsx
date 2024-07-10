import React, { useState } from "react";

import "./tela2.css";
import { Section4Styles } from "../bloco1/styles";
import FormsAnt from "../forms";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";

const componentDisabled = false;
// Endereço
function Tela28() {
  const [ufEvento, setUFEvento] = useState<string>("");
  const [munEvento, setMunEvento] = useState<string>("");
  const [bairroEvento, setBairroEvento] = useState<string>("");
  const [logradouroEvento, setLogradouroEvento] = useState<string>("");
  const [numEvento, setNumEvento] = useState<string>("");

  return (
    <div style={Section4Styles.main}>
      {/* <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={5} tituloDoBloco="Condições do Óbito">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              // alert(JSON.stringify(values.picked, null, 2));
              // navigateToPage("/tela2", { state: values.picked });
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Logradouro
          "
                ></InputQuestion>

                <FormsAnt
                  defaultValue={""}
                  disabled_val={componentDisabled}
                  title="Nome do pai do falecido. Ex: José da Silva. Caso não exista, selecione 'Ignorar'"
                  onChange={setLogradouroEvento}
                />

                <InputQuestion
                  question="
          Numero
          "
                ></InputQuestion>

                <FormsAnt
                  defaultValue={""}
                  disabled_val={componentDisabled}
                  title="Nome do pai do falecido. Ex: José da Silva. Caso não exista, selecione 'Ignorar'"
                  onChange={setNumEvento}
                />

                <InputQuestion
                  question="
          Bairro
          "
                ></InputQuestion>

                <FormsAnt
                  defaultValue={""}
                  disabled_val={componentDisabled}
                  title="Nome do pai do falecido. Ex: José da Silva. Caso não exista, selecione 'Ignorar'"
                  onChange={setBairroEvento}
                />

                <InputQuestion
                  question="
          UF
          "
                ></InputQuestion>

                <InputQuestion
                  question="
          Municipio
          "
                ></InputQuestion>

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela1"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div> */}
    </div>
  );
}

export default Tela28;
