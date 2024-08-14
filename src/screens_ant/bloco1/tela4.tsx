import React, { useState, useEffect } from "react";
import "./tela2.css";
import { styled } from "@mui/material/styles";
import { Checkbox } from "antd";
import Button from "@mui/material/Button";
import InputQuestion from "../question";
import { Formik, Form, Field, useFormikContext, FieldProps } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import FormsAnt from "../forms";
import { Section4Styles } from "./styles";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSession } from "../session";

const BootstrapButton = styled(Button)({
  backgroundColor: "#F7F2FA",
});
interface FormValues {
  nomePai: string;
  nomeMae: string;
  ignorePai: boolean;
  ignoreMae: boolean;
  desconhecidoPai: boolean;
}

function contemApenasNumeros(input: string): boolean {
  return /^[0-9]+$/.test(input);
}

function estaVazioCampoPai(nomePai: string, ignorePai: boolean): boolean {
  return nomePai == "" && !ignorePai;
}

function estaVazioCampoMae(nomeMae: string, ignoreMae: boolean): boolean {
  return nomeMae == "" && !ignoreMae;
}

function Tela4() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const initialValues: FormValues = {
    nomePai: "",
    nomeMae: "",
    ignorePai: false,
    ignoreMae: false,
    desconhecidoPai: false,
  };

  const navigateToPage = useNavigate();

  const [nomePai, setNomePai] = useState<string>("");
  const [nomeMae, setNomeMae] = useState<string>("");
  const [ignorarPai, setIgnorarPai] = useState<boolean>(false);
  const [desconhecidoPai, setDesconhecidoPai] = useState<boolean>(false);
  const [ignorarMãe, setIgnorarMãe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [nomePaiErro, setNomePaiErro] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [nomeMaeErro, setNomeMaeErro] = useState<[boolean, string]>([
    false,
    "",
  ]);

  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://143.198.163.134:5000/bloco1/${userData.bloco1}`
        );
        const data = response.data;
        setNomeMae(data.nome_mae_falecido);
        setNomePai(data.nome_pai_falecido);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco1]);

  function validacoes(values: any[]): string {
    // Testar se os nomes são apenas numericos
    // Values: nomePai, nomeMae, ignorePai, ignoreMae

    if (contemApenasNumeros(values[0])) {
      setNomePaiErro([true, "Nome do pai apenas númerico"]);
      return "Erro: Nome do Pai";
    }
    if (estaVazioCampoPai(values[0], values[3])) {
      setNomePaiErro([true, "Nome do pai está vazio"]);
      return "Erro: Nome do Pai vazio";
    }
    if (contemApenasNumeros(values[1])) {
      setNomeMaeErro([true, "Nome da mãe apenas númerico"]);

      setNomePaiErro([false, ""]);
      return "Erro: Nome da Mae";
    }
    if (estaVazioCampoMae(values[1], values[4])) {
      setNomeMaeErro([true, "Nome da mãe está vazio"]);

      setNomePaiErro([false, ""]);
      return "Erro: Nome da Mae vazio";
    }

    return "OK";
  }

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv selectedSection={0} tituloDoBloco="Identificação do Falecido">
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              initialValues.nomeMae = nomeMae;
              initialValues.nomePai = nomePai;

              const valores = [
                initialValues.nomePai,
                initialValues.nomeMae,
                initialValues.ignorePai,
                initialValues.ignoreMae,
                initialValues.desconhecidoPai,
              ];

              const validacao = validacoes(valores);
              if (validacao == "OK") {
                const apiUrl = "http://143.198.163.134:5000/bloco1"; // Substitua pelo URL da sua API

                // TODO substituir isso aqui
                const dataToSend = {
                  bloco1_id: formData.bloco1,
                  nome_pai_falecido: initialValues.nomePai,
                  nome_mae_falecido: initialValues.nomeMae,
                };

                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                navigateToPage("/tela6", { state: formData });
              } else {
                console.log(validacao);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <Field name="nomePai">
                  {({ field, form }: FieldProps<FormValues>) => (
                    <>
                      <InputQuestion question="Qual o nome do pai?"></InputQuestion>
                      {!loading && (
                        <FormsAnt
                          defaultValue={nomePai}
                          disabled_val={nomePai === "Ignorado"}

                          onChange={setNomePai}
                          title="Nome do pai do falecido. Ex: José da Silva. Caso não exista, selecione 'Ignorar'"
                          hasError={nomePaiErro[0]}
                          errorMsg={nomePaiErro[1]}
                        />
                      )}
                      <Checkbox
                        checked={nomePai === "Ignorado" ? true : false}
                        onChange={(e) => {
                          setIgnorarPai(e.target.checked);
                          if (e.target.checked) {
                            setNomePai("Ignorado");
                          } else {
                            setNomePai("");
                          }
                        }}
                      >
                        Ignorar
                      </Checkbox>

                     
                    </>
                  )}
                </Field>
                <div style={{ marginBottom: "15px" }}></div>

                <Field name="nomeMae">
                  {({ field, form }: FieldProps<FormValues>) => (
                    <>
                      <InputQuestion question="Qual o nome da mãe?"></InputQuestion>
                      {!loading && (
                        <FormsAnt
                          defaultValue={nomeMae}
                          disabled_val={nomeMae === "Ignorado"}
                          title="Nome da mãe do falecido. Ex: Maria da Silva. Caso não exista, selecione 'Ignorar'"
                          onChange={setNomeMae}
                          hasError={nomeMaeErro[0]}
                          errorMsg={nomeMaeErro[1]}
                        />
                      )}
                      <Checkbox
                        checked={nomeMae=== "Ignorado" ? true : false}
                        onChange={(e) => {
                          setIgnorarMãe(e.target.checked);
                          if (e.target.checked) {
                            setNomeMae("Ignorado");
                          } else {
                            setNomeMae("");
                          }
                        }}
                      >
                        Ignorar
                      </Checkbox>
                    </>
                  )}
                </Field>

                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela3"
                  formData={formData[1]}
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}
export default Tela4;
