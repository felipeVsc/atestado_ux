import React, { useState, useEffect } from "react";

import "./tela2.css";
import { styled } from "@mui/material/styles";
import SelectDropdown from "../selectdropdown";
import HorizontalBar from "../../components/horizontalBar";
import MenuAppBar from "../../components/AppBar";
import { Section4Styles } from "../bloco1/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormsAnt from "../forms";
import Checkbox from "antd/es/checkbox/Checkbox";
import TimePickerComponent from "../timepicker";
import InputQuestion from "../question";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import axios from "axios";
import { useSession } from "../session";
import SelectWithSearchCid from "../../components/SelectSearchCid";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

// bairro e municipio
function Tela22() {
  const navigateToPage = useNavigate();
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const [openModal, setOpenModal] = useState(true);
  const [causaMorte1, setCausaMorte1] = useState<string>("");
  const [tempoAproximado1, setTempoAproximado1] = useState<string>("");
  const [causaMorte2, setCausaMorte2] = useState<string>("");
  const [tempoAproximado2, setTempoAproximado2] = useState<string>("");
  const [causaMorte3, setCausaMorte3] = useState<string>("");
  const [tempoAproximado3, setTempoAproximado3] = useState<string>("");
  const [causaMorte4, setCausaMorte4] = useState<string>("");
  const [tempoAproximado4, setTempoAproximado4] = useState<string>("");

  // estados de erros
  const [causaMorte1Erro, setCausaMorte1Erro] = useState<[boolean, string]>([
    false,
    "",
  ]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/causa_morte/${userData.bloco5}`
        );
        const data = response.data;
        setCausaMorte1(data.causa_morte_a);
        setCausaMorte2(data.causa_morte_b);
        setCausaMorte3(data.causa_morte_c);
        setCausaMorte4(data.causa_morte_d);
        setTempoAproximado1(data.tempo_morte_a);
        setTempoAproximado2(data.tempo_morte_b);
        setTempoAproximado3(data.tempo_morte_c);
        setTempoAproximado4(data.tempo_morte_d);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }
    getValues();
  }, [userData.bloco3]);
  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={4} tituloDoBloco="Causas da morte">
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const apiUrl = "http://127.0.0.1:5000/causa_morte"; // Substitua pelo URL da sua API

              const dataToSend = {
                bloco5_id: formData.bloco5,

                cid_morte_a:causaMorte1,
                tempo_morte_a:tempoAproximado1,
                cid_morte_b:causaMorte2,
                tempo_morte_b:tempoAproximado2,
                cid_morte_c:causaMorte3,
                tempo_morte_c:tempoAproximado3,
                cid_morte_d:causaMorte4,
                tempo_morte_d:tempoAproximado4,
              };
              axios
                .post(apiUrl, dataToSend)
                .then((response) => console.log(response))
                .catch((error) =>
                  console.error("Erro ao enviar a requisição:", error)
                );
              navigateToPage("/tela23", { state: formData });
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion question="A | Devido ou como consequência de:"></InputQuestion>
                {!loading && (
                  <SelectWithSearchCid
                    tooltipTitle="Qual a primeira consequência/causa da morte? Ex: Edema cerebral"
                    defaultValue={causaMorte1}
                    onChange={setCausaMorte1}
                    hasError={causaMorte1Erro[0]}
                    errorMsg={causaMorte1Erro[1]}
                  ></SelectWithSearchCid>
                )}
                <InputQuestion
                  question="
          Tempo aproximado (X anos, Y dias)
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                  defaultValue={tempoAproximado1}
                    disabled_val={false}
                    title="Tempo aproximado do inicio. Ex: 1 dia"
                    onChange={setTempoAproximado1}
                    hasError={false}
                    errorMsg=""
                  ></FormsAnt>
                )}

                <InputQuestion
                  question="
          B | Devido ou como consequência de:
          "
                ></InputQuestion>
                {!loading && (
                  <SelectWithSearchCid
                    tooltipTitle="Qual a segunda consequência/causa da morte? Ex: Traumatismo cranioencefálico."
                    defaultValue={causaMorte2}
                    onChange={setCausaMorte2}
                    hasError={false}
                    errorMsg=""
                  ></SelectWithSearchCid>
                )}
                <InputQuestion
                  question="
                  Tempo aproximado (X anos, Y dias)
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={tempoAproximado2}
                    disabled_val={false}
                    title="Tempo aproximado do inicio. Ex: 2 dias"
                    onChange={setTempoAproximado2}
                    hasError={false}
                    errorMsg=""
                  ></FormsAnt>
                )}

                <InputQuestion
                  question="
          C | Devido ou como consequência de:
          "
                ></InputQuestion>
                {!loading && (
                  <SelectWithSearchCid
                    tooltipTitle="Qual a terceira consequência/causa da morte?. Ex: Queda por escorregão em casa"
                    defaultValue={causaMorte3}
                    onChange={setCausaMorte3}
                    hasError={false}
                    errorMsg=""
                  ></SelectWithSearchCid>
                )}
                <InputQuestion
                  question="
                  Tempo aproximado (X anos, Y dias)
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={tempoAproximado3}
                    disabled_val={false}
                    title="Tempo aproximado do inicio. Ex: 10 dias"
                    onChange={setTempoAproximado3}
                    hasError={false}
                    errorMsg=""
                  ></FormsAnt>
                )}

                <InputQuestion
                  question="
          D | Devido ou como consequência de:
          "
                ></InputQuestion>
                {!loading && (
                  <SelectWithSearchCid
                    tooltipTitle="Qual a quarta consequência/causa da morte?"
                    defaultValue={causaMorte4}
                    onChange={setCausaMorte4}
                    hasError={false}
                    errorMsg=""
                  ></SelectWithSearchCid>
                )}
                <InputQuestion
                  question="
                  Tempo aproximado (X anos, Y dias)
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={tempoAproximado4}
                    onChange={setTempoAproximado4}
                    disabled_val={false}
                    title="Tempo aproximado do inicio"
                    hasError={false}
                    errorMsg=""
                  ></FormsAnt>
                )}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela21"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Bloco 6 - Causas de Morte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              Este é o Bloco 6, responsável pelas informações da causa de morte.
              Aqui segue um exemplo de preenchimento, de acordo com o Ministério
              da Saúde:
            </p>
            <p>
              Homem, 75 anos, cumprindo quarentena domiciliar após diagnóstico
              confirmado para covid-19 e com sintomas típicos da doença, sofreu
              queda por escorregão dentro do banheiro. Foi recolhido pelo
              serviço de resgate e encaminhado ao hospital, onde fez cirurgia em
              virtude de traumatismo cranioencefálico. Morreu após dois dias.
              <br></br>
              <br></br>
              Causa A: Edema cerebral. Tempo: 1 dia
              <br></br>
              Causa B: Traumatismo cranioencefálico. Tempo: 2 dias
              <br></br>
              Causa C: Queda por escorregão em casa. Tempo: 2 dias
              <br></br>
              Causa adicionais: Covid-19. Tempo: 10 dias
              <br></br>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Entendi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Tela22;
