import React, { useState, useEffect } from "react";
import "./tela2.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SelectDropdown from "../selectdropdown";
import { Section4Styles } from "../bloco1/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormsAnt from "../forms";
import Checkbox from "antd/es/checkbox/Checkbox";
import InputQuestion from "../question";
import { Formik, Form } from "formik";
import AppDiv from "../../components/AppDiv";
import ButtonGoAndBack from "../../components/ButtonGoAndBack";
import isNotNumeric from "../../utils/isnumeric";
import axios from "axios";
import { useSession } from "../session";

function Tela18() {
  const location = useLocation();
  const { userData } = useSession();
  const formData = userData;
  const [ignorarPesoFalecido, setignorarPesoFalecido] =
    useState<boolean>(false); // pesoFalecido
  const [ignorarNumDeclaracao, setignorarNumDeclaracao] = useState<boolean>(
    formData.tipo_morte === "fetal"
  ); // numDeclaracao
  const navigateToPage = useNavigate();
  const [tipoPartoMaeFalecido, setTipoPartoMaeFalecido] = useState<string>("");
  const [correlacaoPartoMaeFalecido, setCorrelacaoPartoMaeFalecido] =
    useState<string>("");
  const [pesoFalecidoAoNascer, setPesoFalecidoAoNascer] = useState<string>("");
  const [numDeclaracaoNascidoVivo, setNumDeclaracaoNascidoVivo] =
    useState<string>("");
  const [ignorarNumero, setIgnorarNumero] = useState<boolean>(false);

  // estados de erro
  const [tipoPartoMaeFalecidoErro, setTipoPartoMaeFalecidoErro] = useState<
    [boolean, string]
  >([false, ""]);
  const [correlacaoPartoMaeFalecidoErro, setCorrelacaoPartoMaeFalecidoErro] =
    useState<[boolean, string]>([false, ""]);
  const [pesoFalecidoAoNascerErro, setPesoFalecidoAoNascerErro] = useState<
    [boolean, string]
  >([false, ""]);
  const [numDeclaracaoNascidoVivoErro, setNumDeclaracaoNascidoVivoErro] =
    useState<[boolean, string]>([false, ""]);

  useEffect(() => {
    if (formData.tipo_morte === "fetal") {
      setignorarNumDeclaracao(true);
    }
  }, [formData.tipo_morte]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getValues() {
      try {
        const response = await axios.get(
          `http://157.245.80.223:5000/bloco4/${userData.bloco4}`
        );
        const data = response.data;
        console.log(data);
        setCorrelacaoPartoMaeFalecido(data.relacao_morte_parto);
        setNumDeclaracaoNascidoVivo(data.num_declaracao_nascido_vivo);
        setPesoFalecidoAoNascer(data.peso_ao_nascer);
        setTipoPartoMaeFalecido(data.tipo_parto);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setLoading(false);
      }
    }

    getValues();
  }, [userData.bloco4]);

  function validacoes(
    tipoPartoMaeFalecido: string,
    correlacaoPartoMaeFalecido: string,
    pesoFalecidoAoNascer: string,
    numDeclaracaoNascidoVivo: string
  ) {
    if (tipoPartoMaeFalecido === "") {
      setTipoPartoMaeFalecidoErro([true, "Tipo de Parto está vazio"]);
      return "Erro: campo vazio";
    }
    if (correlacaoPartoMaeFalecido === "") {
      setCorrelacaoPartoMaeFalecidoErro([
        true,
        "Correlação da morte está vazio",
      ]);
      return "Erro: campo vazio";
    }
    if (pesoFalecidoAoNascer === "") {
      setPesoFalecidoAoNascerErro([true, "Peso do falecido está vazio"]);
      return "Erro: campo vazio";
    }
    if (isNotNumeric(pesoFalecidoAoNascer)) {
      setPesoFalecidoAoNascerErro([true, "Peso do falecido não é númerico"]);
    }
    if (numDeclaracaoNascidoVivo === "" && ignorarNumDeclaracao === false) {
      setNumDeclaracaoNascidoVivoErro([
        true,
        "Número de declaração está vazio",
      ]);
      return "Erro: campo vazio";
    }
    if (
      isNotNumeric(numDeclaracaoNascidoVivo) &&
      ignorarNumDeclaracao === false
    ) {
      setNumDeclaracaoNascidoVivoErro([
        true,
        "Número de declaração não é númerico",
      ]);
      return "Erro: campo nao numerico";
    }

    return "OK";
  }

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDiv
          selectedSection={3}
          tituloDoBloco="Fetal ou menor que 1 ano | Informações sobre a mãe"
        >
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const valid = validacoes(
                tipoPartoMaeFalecido,
                correlacaoPartoMaeFalecido,
                pesoFalecidoAoNascer,
                numDeclaracaoNascidoVivo
              );
              if (valid === "OK") {
                const apiUrl = "http://157.245.80.223:5000/bloco4"; // Substitua pelo URL da sua API

                const dataToSend = {
                  bloco4_id: formData.bloco4,
                  tipo_parto: tipoPartoMaeFalecido,
                  relacao_morte_parto: correlacaoPartoMaeFalecido,
                  peso_ao_nascer: pesoFalecidoAoNascer,
                  num_declaracao_nascido_vivo: numDeclaracaoNascidoVivo,
                };
                axios
                  .post(apiUrl, dataToSend)
                  .then((response) => console.log(response))
                  .catch((error) =>
                    console.error("Erro ao enviar a requisição:", error)
                  );
                if (formData.tipo_morte === "fetal") {
                  navigateToPage("/tela20", { state: formData });
                } else {
                  navigateToPage("/tela19", { state: formData });
                }
              } else {
                console.log(valid);
              }
            }}
          >
            {({ submitForm }) => (
              <Form>
                <InputQuestion
                  question="
          Tipo de parto
          "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    defaultValue={tipoPartoMaeFalecido}
                    tooltipTitle="Tipo do Parto da mãe do falecido. Ex: Cesáreo"
                    options={["Vaginal", "Cesáreo", "Ignorado"]}
                    values={["Vaginal", "Cesáreo", "Ignorado"]}
                    onChange={setTipoPartoMaeFalecido}
                    hasError={tipoPartoMaeFalecidoErro[0]}
                    errorMsg={tipoPartoMaeFalecidoErro[1]}
                  />
                )}
                <InputQuestion
                  question="
          Morte em relação ao parto
          "
                ></InputQuestion>
                {!loading && (
                  <SelectDropdown
                    defaultValue={correlacaoPartoMaeFalecido}
                    tooltipTitle="Qual a correlação entre morte e o parto? Ex: Foi anterior?"
                    options={
                      formData.tipo_morte === "fetal"
                        ? ["Antes", "Durante", "Ignorado"]
                        : ["Antes", "Durante", "Depois", "Ignorado"]
                    }
                    values={
                      formData.tipo_morte === "fetal"
                        ? ["Antes", "Durante", "Ignorado"]
                        : ["Antes", "Durante", "Depois", "Ignorado"]
                    }
                    onChange={setCorrelacaoPartoMaeFalecido}
                    hasError={correlacaoPartoMaeFalecidoErro[0]}
                    errorMsg={correlacaoPartoMaeFalecidoErro[1]}
                  />
                )}
                <InputQuestion
                  question="
          Peso ao nascer em gramas
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={pesoFalecidoAoNascer}
                    disabled_val={pesoFalecidoAoNascer === "000"}
                    title="Peso do falecido ao nascer em gramas. Ex: 1000. Caso não se aplique, selecione 'Ignorar'"
                    onChange={setPesoFalecidoAoNascer}
                    hasError={pesoFalecidoAoNascerErro[0]}


                    errorMsg={pesoFalecidoAoNascerErro[1]}
                  ></FormsAnt>
                )}
                <Checkbox
                  checked={pesoFalecidoAoNascer === "000" ? true : false}
                  onChange={(e) => {
                    setIgnorarNumero(e.target.checked);
                    if (e.target.checked) {
                      setPesoFalecidoAoNascer("000");
                    } else {
                      setPesoFalecidoAoNascer("");
                    }
                  }}
                >
                  Ignorar
                </Checkbox>
                <InputQuestion
                  question="
          Número de declaração de nascido vivo.
          "
                ></InputQuestion>
                {!loading && (
                  <FormsAnt
                    defaultValue={numDeclaracaoNascidoVivo}
                    disabled_val={ignorarNumDeclaracao}
                    title="Número da declaração de nascido vivo do falecido. Caso não se aplique, selecione 'Ignorar'"
                    onChange={setNumDeclaracaoNascidoVivo}
                    hasError={numDeclaracaoNascidoVivoErro[0]}
                    errorMsg={numDeclaracaoNascidoVivoErro[1]}
                  ></FormsAnt>
                )}
                <ButtonGoAndBack
                  onClickContinue={submitForm}
                  hideBackButton={false}
                  backHref="/tela17"
                />
              </Form>
            )}
          </Formik>
        </AppDiv>
      </div>
    </div>
  );
}

export default Tela18;
