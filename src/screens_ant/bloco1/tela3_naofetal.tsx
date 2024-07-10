import React, { useEffect, useState } from "react";
import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import FormsAnt from "../forms";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Section4Styles } from "./styles";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import dayjs from "dayjs";
import DatePickerComponent from "../datepicker";
import Checkbox from "antd/es/checkbox/Checkbox";
import axios from "axios";
import { useSession } from "../session";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});

function contemApenasNumeros(input: string): boolean {
  return /^[0-9]+$/.test(input);
}

function Tela3_nf() {
  const location = useLocation();
  const { setUserData, userData } = useSession();
  const dataObito = userData?.data_obito;
  const formData = userData;
  const navigateToPage = useNavigate();
  const [nome, setNome] = useState<string>("");
  const [nomeError, setNomeError] = useState<[boolean, string]>([false, ""]);
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [cartaoSus, setCartaoSus] = useState<string>("");
  const [ignorarCartaoSus, setIgnorarCartaoSus] = useState<boolean>(false);
  const [susError, setSusError] = useState<[boolean, string]>([false, ""]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/bloco1/${userData.bloco1}`
        );
        const data = response.data;
        setNome(data.nome_falecido);
        setCartaoSus(data.cartao_sus);
        setDataNascimento(data.data_nascimento);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco1]);

  const handleDataChange = (
    novaData: dayjs.Dayjs | null,
    dateString: string
  ) => {
    const diaMesAno = dayjs(novaData).format("YYYY-MM-DD");
    setDataNascimento(diaMesAno);
  };

  function definirCartaoSus(valor: boolean) {
    if (!valor) {
      setCartaoSus("Ignorado");
      setIgnorarCartaoSus(valor);
    }
  }
  function validacoes(nome: string, numsus: string): string {
    if (nome == "") {
      setNomeError([true, "Nome está vazio"]);
      return "Erro: campo vazio";
    }
    if (contemApenasNumeros(nome)) {
      setNomeError([true, "Nome apenas numérico"]);
      return "Erro: Nome númerico";
    }
    if (!ignorarCartaoSus) {
      if (numsus == "") {
        setSusError([true, "Número do SUS vazio"]);
        setNomeError([false, ""]);
        return "Erro: num vazio";
      }
      if (numsus.length != 15) {
        setSusError([true, "Número do SUS não contém 15 digitos"]);
        return "Erro: num nao contem 15 digitos";
      }
    }
    return "OK";
  }
  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={0} tituloDoBloco="Identificação do Falecido">
          <Formik
            initialValues={{}}
            onSubmit={async () => {
              const valid = validacoes(nome, cartaoSus);
              if (valid == "OK") {
                const apiUrl = "http://127.0.0.1:5000/bloco1"; // Substitua pelo URL da sua API
                const idade = dayjs(dataObito).diff(
                  dayjs(dataNascimento),
                  "day"
                );
                // const diff = dayjs(dataObito, 'YYYY-MM-DD').diff(dayjs(dataNascimento, 'YYYY-MM-DD'), 'day');

                const anos = Math.floor(idade / 365);
                const meses = Math.floor((idade % 365) / 30); // Considerando 30 dias por mês
                const dias = idade % 30;

                let idadeFormatada = "";
                if (anos > 0) {
                  idadeFormatada += `${anos} ano${anos > 1 ? "s" : ""}`;
                  if (meses > 0) {
                    idadeFormatada += `, ${meses} mês${meses > 1 ? "es" : ""}`;
                  }
                  if (dias > 0) {
                    idadeFormatada += `, ${dias} dia${dias > 1 ? "s" : ""}`;
                  }
                } else if (meses > 0) {
                  idadeFormatada += `${meses} mês${meses > 1 ? "es" : ""}`;
                  if (dias > 0) {
                    idadeFormatada += `, ${dias} dia${dias > 1 ? "s" : ""}`;
                  }
                } else {
                  idadeFormatada += `${dias} dia${dias > 1 ? "s" : ""}`;
                }

                console.log("idade");
                console.log(idadeFormatada);
                const dataToSend = {
                  bloco1_id: formData.bloco1,
                  nome_falecido: nome,
                  cartao_sus: cartaoSus,
                  data_nascimento: dataNascimento,
                  idade: idadeFormatada,
                };

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
                  idade_falecido:idadeFormatada
                };
                setUserData(newSession);

                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela_escol", { state: formData });
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion question="Nome do Falecido"></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={nome}
                    disabled_val={false}
                    title="Nome do falecido conforme documento. Ex: José da Silva."
                    onChange={setNome}
                    hasError={nomeError[0]}
                    errorMsg={nomeError[1]}
                  />
                )}

                <InputQuestion question="Qual a data de nascimento do falecido?"></InputQuestion>
                {!loading && (
                  <DatePickerComponent
                    style={{ width: "300px" }}
                    onChange={handleDataChange}
                    defaultValue={
                      dataNascimento ? dayjs(dataNascimento) : undefined
                    }
                    defaultPickerValue={
                      dataNascimento ? dayjs(dataNascimento) : undefined
                    }
                  ></DatePickerComponent>
                )}

                <div style={{ marginBottom: "15px" }}></div>

                <InputQuestion question="Cartão do SUS"></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={cartaoSus}
                    disabled_val={cartaoSus === "Ignorado"}
                    title="Número do Cartão do SUS do falecido. Caso não exista, selecione 'Ignorar'"
                    onChange={setCartaoSus}
                    hasError={susError[0]}
                    errorMsg={susError[1]}
                  />
                )}
                <Checkbox
                  checked={cartaoSus === "Ignorado" ? true : false}
                  onChange={(e) => {
                    setIgnorarCartaoSus(e.target.checked);
                    if (e.target.checked) {
                      setCartaoSus("Ignorado");
                    } else {
                      setCartaoSus("");
                    }
                  }}
                >
                  Ignorar
                </Checkbox>

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela2"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela3_nf;
