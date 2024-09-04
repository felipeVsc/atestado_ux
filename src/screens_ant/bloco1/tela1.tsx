import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Section4Styles } from "./styles";
import CheckboxesGroup from "../../checkbox";
import InputQuestion from "../question";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import { Formik, Form } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useIsIdsSections } from "../../utils/context";
import { SectionPacienteForm } from "../../types";
import { useSession } from "../session";


function Tela1() {
  const [picked, setPicked] = useState("");
  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData, setUserData } = useSession();
  const [ medicoId, setMedicoId] = useState<number>(0);
  const handleOptionSelect = (selectedValue: string) => {
    setPicked(selectedValue);
  };

  const {
    setPacienteValue,
    pacienteValue,
    setSection1Value,
    setSection2Value,
    setSection3Value,
    setSection4Value,
    setSection5Value,
    setSection6Value,
    setSection7Value,
  } = useIsIdsSections();


  const [initialValues, setInitialValues] = useState<SectionPacienteForm>({
    selectedOptionFetal: "",
  });

  const fetchInitialValues = () => {
    if (userData.paciente_id) {
      axios
        .get(`http://157.245.80.223:5000/paciente/${userData.paciente_id}`)
        .then((response) => {
          const receivedData = response.data;
          const initialValuesFromPaciente: SectionPacienteForm = {
            selectedOptionFetal: userData.tipo_morte || "",
          };
          console.log("DATA: ", receivedData);
          setInitialValues(initialValuesFromPaciente);
        })
        .catch((error) => {
          console.error("Erro ao obter dados do bloco1:", error);
        });
    } else {
      console.error("ID do paciente está vazio, indefinido ou já foi gerado.");
    }
  };

  useEffect(() => {
    fetchInitialValues();
  }, [pacienteValue]);

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={0} tituloDoBloco="Declaração de Óbito">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (values) => {
              values.selectedOptionFetal = picked;
              console.log(userData);
              const medico = userData.medico_id;
              const data = {
                bloco1: userData.bloco1,
                bloco2: userData.bloco2,
                bloco3: userData.bloco3,
                bloco4: userData.bloco4,
                bloco5: userData.bloco5,
                bloco6: userData.bloco6,
                bloco7: userData.bloco7,
                paciente_id: userData.paciente_id,
                medico_id: userData.medico_id,
                tipo_morte:picked,
              };
          
              setUserData(data);
              console.log("changing");
              console.log(userData);

              const bloco1ApiURL = "http://157.245.80.223:5000/paciente/tipo";

              axios
                .post(bloco1ApiURL,{paciente_id:userData.paciente_id, tipo_morte: picked,medico_id:medico})
                .then((response) => console.log(response))
                .catch((error) =>
                  console.error("Erro ao enviar a requisição:", error.message)
                );

                const bloco6ApiURL = "http://157.245.80.223:5000/bloco6";

                axios
                  .post(bloco6ApiURL,{bloco6_id:userData.bloco6, paciente_id: userData.paciente_id, medico_id: userData.medico_id})
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error.message)
                  );
              navigateToPage("/tela2")
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion question="Qual o tipo de morte?" />
                <div style={{ paddingLeft: "100px" }}>
                  <CheckboxesGroup
                    options={["fetal", "nao_fetal"]}
                    labels={["Fetal", "Não Fetal"]}
                    onOptionSelect={handleOptionSelect}
                    selectedOption={initialValues.selectedOptionFetal}
                  />
                </div>
                <>
                {console.log("Teste: ", initialValues.selectedOptionFetal)}
                </>
                {/* <div>{initialValues.selectedOptionFetal}</div> */}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={true}
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela1;
