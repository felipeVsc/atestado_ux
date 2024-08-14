import React, { useEffect, useState } from "react";
import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DatePickerComponent from "../datepicker";
import TimePickerComponent from "../timepicker";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Section4Styles } from "./styles";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import dayjs from "dayjs";
import axios from "axios";
import { useIsIdsSections } from "../../utils/context";
import { Screen2Form } from "../../types";
import { useSession } from "../session";
import Typography from "@mui/material/Typography";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

function estaVazioCampo(campo: string) {
  return campo == "";
}

function Tela2() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const navigateToPage = useNavigate();
  const { section1Value } = useIsIdsSections();

  const [dataObito, setDataObito] = useState<string>("");
  const [horaObito, setHoraObito] = useState<string>("");
  const [dataObitoErro, setDataObitoErro] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [horaObitoErro, setHoraObitoErro] = useState<[boolean, string]>([
    false,
    "",
  ]);

  const handleDataChange = (
    novaData: dayjs.Dayjs | null,
  ) => {
    const diaMesAno = dayjs(novaData).format("YYYY-MM-DD");
    setDataObito(diaMesAno);
  };

  const handleHoraChange = (novaHora: any) => {
    const horaMinutos = dayjs(novaHora).format("HH:mm");
    setHoraObito(horaMinutos);
  };

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco1/${userData.bloco1}`
        );
        const data = response.data;
        
        setDataObito(data.data_do_obito);
        setHoraObito(data.hora_do_obito);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco1]);

  function validacoes(dataObito: string, horaObito: string): boolean {
    let valid = true;

    if (estaVazioCampo(dataObito)) {
      setDataObitoErro([true, "Data de óbito está vazia"]);
      valid = false;
    } else {
      setDataObitoErro([false, ""]);
    }

    if (estaVazioCampo(horaObito)) {
      setHoraObitoErro([true, "Hora de óbito está vazia"]);
      valid = false;
    } else {
      setHoraObitoErro([false, ""]);
    }

    return valid;
  }

  

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={0} tituloDoBloco="Identificação do Falecido">
          <Formik
            initialValues={{}}
            enableReinitialize
            onSubmit={async () => {
              const valid = validacoes(dataObito, horaObito);

              if (valid) {
                const apiUrl = "http://143.198.163.134:5000/bloco1";
                const dataToSend = {
                  bloco1_id: userData.bloco1,
                  data_do_obito: dataObito,
                  hora_do_obito: horaObito,
                };

                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );

                const newData = {
                  data_do_obito: dataObito,
                  hora_do_obito: horaObito,
                };

                if (userData.tipo_morte === "nao_fetal") {
                  navigateToPage("/tela3_nf", { state: newData });
                } else {
                  navigateToPage("/tela3", { state: newData });
                }
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion question="Qual a data do óbito?"></InputQuestion>
                {!loading && (
                  <DatePickerComponent
                    style={{ width: "200px" }}
                    onChange={handleDataChange}
                    defaultValue={dataObito ? dayjs(dataObito) : undefined}
                    defaultPickerValue={dataObito ? dayjs(dataObito) : undefined}
                  ></DatePickerComponent>
                )}

                <InputQuestion question="Qual a hora do óbito?"></InputQuestion>
                {!loading && (
                  <TimePickerComponent
                    onChange={handleHoraChange}
                    defaultValue={`2024-02-02 ${horaObito}:00` ? dayjs(`2024-02-02 ${horaObito}:00`)  : undefined}
                    defaultPickerValue={`2024-02-02 ${horaObito}:00` ? dayjs(`2024-02-02 ${horaObito}:00`)  : undefined}
                  ></TimePickerComponent>
                )}
                
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela1"
                />

                {/* Exibir erros */}
                {dataObitoErro[0] && (
                  <Typography variant="body2" color="error">
                    {dataObitoErro[1]}
                  </Typography>
                )}
                {horaObitoErro[0] && (
                  <Typography variant="body2" color="error">
                    {horaObitoErro[1]}
                  </Typography>
                )}
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela2;
