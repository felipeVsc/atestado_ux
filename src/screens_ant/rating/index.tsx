import React, { useState } from "react";

import { SectionRatingStyles } from "./styles";
import LikertRating from "../../components/LikertRating";
import { Box, Button, Typography } from "@mui/material";
import { Input } from "antd";
import Sentiment1 from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import Sentiment2 from "@mui/icons-material/SentimentVeryDissatisfied";
import Sentiment3 from "@mui/icons-material/SentimentNeutral";
import Sentiment4 from "@mui/icons-material/SentimentSatisfiedAlt";
import Sentiment5 from "@mui/icons-material/SentimentVerySatisfied";
import { useSession } from "../session";
import axios from "axios";

export default function SectionRating({
  isCurrentSection,
  onSubmit,
  onPrevious,
}: any) {
  // if (!isCurrentSection) {
  //   // Se não for a seção atual, retorne null (não renderize nada)
  //   return null;
  // }
  const { TextArea } = Input;
  const questions = [
    "Eu gostei de poder navegar livremente entre as etapas do preenchimento.",
    "Eu acho que gostaria de usar esse sistema com frequência.",
    "Eu acho o sistema desnecessariamente complexo.",
    "Eu achei o sistema fácil de usar.",
    "Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema.",
    "Eu acho que as várias funções do sistema estão muito bem integradas.",
    "Eu acho que o sistema apresenta muita inconsistência.",
    "Eu imagino que as pessoas aprenderão como usar esse sistema rapidamente.",
    "Eu achei o sistema atrapalhado de usar.",
    "Eu me senti confiante ao usar o sistema.",
    "Eu precisei aprender várias coisas novas antes de conseguir usar o sistema.",
  ];
  const styles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px", // Espaçamento entre os ícones e os textos
  };
  const { userData } = useSession();
  const [responses, setResponses] = useState(Array(questions.length).fill(11));
  const [positivePoints, setPositivePoints] = useState("");
  const [negativePoints, setNegativePoints] = useState("");
  const [generalFeedback, setGeneralFeedback] = useState("");

  const handleRatingChange = (value: number, index: number) => {
    const newResponses = [...responses];
    newResponses[index] = value; 
    setResponses(newResponses); 
    console.log(positivePoints);
  };

  // Funções para lidar com a mudança de texto
  const handlePositivePointsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPositivePoints(event.target.value);
  };

  const handleNegativePointsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNegativePoints(event.target.value);
  };

  const handleGeneralFeedbackChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setGeneralFeedback(event.target.value);
  };

  function sendData() {
    // axios para enviar os dados e pegar o userid pela sessao
    const apiUrl = "http://206.189.235.2:5000/likert"; // Substitua pelo URL da sua API

    const dataToSend = {
      paciente_id: userData.paciente_id,
      q1:responses[0],
      q2:responses[1],
      q3:responses[2],
      q4:responses[3],
      q5:responses[4],
      q6:responses[5],
      q7:responses[6],
      q8:responses[7],
      q9:responses[8],
      q10:responses[9],
      q11:responses[10],
      pontos_positivos:positivePoints,
      pontos_negativos:negativePoints,

    };
    axios
      .post(apiUrl, dataToSend)
      .then((response) => console.log(response))
      .catch((error) => console.error("Erro ao enviar a requisição:", error));
  }

  return (
    <div style={{ paddingLeft: "30%", paddingTop: "5%", paddingBottom: "5%" }}>
      <div style={SectionRatingStyles.main}>
        <div style={SectionRatingStyles.mainContainer}>
          <div style={SectionRatingStyles.titleContainer}>
            <p style={SectionRatingStyles.titleText}>Avalie</p>
          </div>

          <div style={SectionRatingStyles.inputsContainer}>
            <p>
              Gostaríamos de sua avaliação de uso do sistema, seguindo a escala
              Likert:
            </p>

            <Box style={styles}>
              <Typography variant="caption">
                <Sentiment1 htmlColor="#E53935" /> Muito Insatisfeito
              </Typography>
              <Typography variant="caption">
                <Sentiment2 htmlColor="#E57373" /> Insatisfeito
              </Typography>
              <Typography variant="caption">
                <Sentiment3 htmlColor="#eedc68" /> Neutro
              </Typography>
              <Typography variant="caption">
                <Sentiment4 htmlColor="#81C784" /> Satisfeito
              </Typography>
              <Typography variant="caption">
                <Sentiment5 htmlColor="#43A047" /> Muito Satisfeito
              </Typography>
            </Box>
            <br></br>

            {questions.map((question, index) => {
              return (
                <div style={SectionRatingStyles.ratingBox}>
                  <div style={SectionRatingStyles.subtitleBox}>{question}</div>
                  <div style={SectionRatingStyles.inputsRowWithSubTitle}>
                    <LikertRating
                      value={3}
                      onChange={(value: number) =>
                        handleRatingChange(value, index)
                      }
                    />
                  </div>
                </div>
              );
            })}

            <p>Quais os pontos positivos do sistema?</p>
            <TextArea
              rows={4}
              value={positivePoints}
              onChange={handlePositivePointsChange}
            />
            <br></br>
            <p>Quais os pontos negativos do sistema?</p>
            <TextArea
              rows={4}
              value={negativePoints}
              onChange={handleNegativePointsChange}
            />
            <br></br>
            <p>Deixe seu feedback!</p>
            <TextArea
              rows={4}
              value={generalFeedback}
              onChange={handleGeneralFeedbackChange}
            />
          </div>

          <div></div>
        </div>
        <div style={SectionRatingStyles.buttonBox}>
          <Button variant="outlined" type="submit" onClick={onPrevious}>
            Voltar
          </Button>
          <Button
            variant="contained"
            type="submit"
            style={{ marginLeft: "10px" }}
            onClick={onPrevious}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
