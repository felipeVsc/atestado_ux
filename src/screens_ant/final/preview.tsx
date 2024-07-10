import React from "react";

import "./tela2.css";
import Button from "@mui/material/Button";
import HorizontalBar from "../../components/horizontalBar";
import { Section4Styles } from "../bloco1/styles";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import PreviewCampo from "./respostacomp";

import axios from "axios";
import { useSession } from "../session";

async function fetchData(): Promise<string> {
  try {
    const response = await axios.get("http://localhost:5000/all/id");
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return ""; // Retorna uma string vazia em caso de erro
  }
}
// bairro e municipio
function PreviewTeste() {

  const location = useLocation();
  const { userData} = useSession();
  const formData = userData;
  console.log("Oi");
  console.log(userData);
   
  // const response = await axios.get(`http://localhost:5000/paciente/all/${formData}`);
  // console.log(response.data);
  // return response.data;
  
  return (
    
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <div style={Section4Styles.titleContainer}></div>
        <HorizontalBar
          sections={[
            "Bloco 1",
            "Bloco 2",
            "Bloco 3",
            "Bloco 4",
            "Bloco 5",
            "Bloco 6",
            "Preview",
          ]}
          selectedSection={6}
        ></HorizontalBar>
        <div style={Section4Styles.titleContainer}>
          <p style={Section4Styles.titleText}>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Declaração de Óbito
            </Typography>
          </p>
        </div>

        <div>
          <div style={{ textAlign: "center" }} className="background-square">
            <div style={Section4Styles.titleContainer}>
              <p style={Section4Styles.titleText}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Bloco 1
                </Typography>
              </p>
            </div>
            <PreviewCampo
              campo="Qual o tipo de morte?"
              resposta="testes"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual a data do óbito?"
              resposta="10/04/2022"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual a hora do óbito?"
              resposta="15:20"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual a naturalidade?"
              resposta="Brasil"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual o sexo?"
              resposta="Masculino"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual o nome do pai?"
              resposta="Joao Santos"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual o nome da mãe?"
              resposta="Maria Aparecida"
            ></PreviewCampo>
            <div style={{ paddingBottom: "10%", paddingTop: "20px" }}>
              <Button href="/tela1" variant="contained">
                Editar
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div style={{ textAlign: "center" }} className="background-square">
            <div style={Section4Styles.titleContainer}>
              <p style={Section4Styles.titleText}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Bloco 2
                </Typography>
              </p>
            </div>
            <PreviewCampo
              campo="Qual o CEP?"
              resposta="12345678"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual o logradouro?"
              resposta="Rua Fernandes Lima"
            ></PreviewCampo>
            <PreviewCampo campo="Qual o número?" resposta="23"></PreviewCampo>
            <PreviewCampo
              campo="Qual a unidade federativa - UF?"
              resposta="Alagoas"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual o município?"
              resposta="Maceió"
            ></PreviewCampo>
            <PreviewCampo
              campo="Qual o bairro?"
              resposta="Centro"
            ></PreviewCampo>
            <div style={{ paddingBottom: "10%", paddingTop: "20px" }}>
              <Button href="/tela6" variant="contained">
                Editar
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div style={{ textAlign: "center" }} className="background-square">
            <div style={Section4Styles.titleContainer}>
              <p style={Section4Styles.titleText}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Bloco 3
                </Typography>
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <PreviewCampo
                campo="Onde ocorreu o óbito?"
                resposta="Hospital"
              ></PreviewCampo>
              <PreviewCampo
                campo="Estabelecimento"
                resposta="Hospital Universitário"
              ></PreviewCampo>
              <PreviewCampo
                campo="Qual o CEP?"
                resposta="12345678"
              ></PreviewCampo>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
              }}
            >
              <PreviewCampo
                campo="Qual o logradouro?"
                resposta="Rua Cidade Universitaria"
              ></PreviewCampo>
              <PreviewCampo campo="Qual o número?" resposta="45"></PreviewCampo>
              <PreviewCampo
                campo="Qual a unidade federativa - UF?"
                resposta="Alagoas"
              ></PreviewCampo>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
              }}
            >
              <PreviewCampo
                campo="Qual o município?"
                resposta="Maceió"
              ></PreviewCampo>
              <PreviewCampo
                campo="Qual o bairro?"
                resposta="Cidade Universitária"
              ></PreviewCampo>
            </div>

            <div style={{ paddingBottom: "10%" }}>
              <Button href="/tela9" variant="contained">
                Editar
              </Button>
            </div>
          </div>
        </div>

        <div>
  <div style={{ textAlign: "center" }} className="background-square">
    <div style={Section4Styles.titleContainer}>
      <p style={Section4Styles.titleText}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Bloco 4
        </Typography>
      </p>
    </div>

    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><PreviewCampo campo="Idade da mãe" resposta="47 anos"></PreviewCampo></td>
          <td>
            <Button href="/tela15" variant="contained">
              Editar
            </Button>
          </td>
        </tr>
        <tr>
          <td><PreviewCampo campo="Ocupação Habitual" resposta="Advogada"></PreviewCampo></td>
          <td>
            <Button href="/tela15" variant="contained">
              Editar
            </Button>
          </td>
        </tr>
        <tr>
          <td><PreviewCampo campo="Número de filhos - Nascidos vivos" resposta="0 filhos"></PreviewCampo></td>
          <td>
            <Button href="/tela16" variant="contained">
              Editar
            </Button>
          </td>
        </tr>
        <tr>
          <td><PreviewCampo campo="Tipo de Gravidez" resposta="Ignorado"></PreviewCampo></td>
          <td>
            <Button href="/tela16" variant="contained">
              Editar
            </Button>
          </td>
        </tr>
        <tr>
          <td><PreviewCampo campo="Tipo de parto" resposta="Ignorado"></PreviewCampo></td>
          <td>
            <Button href="/tela17" variant="contained">
              Editar
            </Button>
          </td>
        </tr>
        <tr>
          <td><PreviewCampo campo="Morte em relação ao parto" resposta="Ignorado"></PreviewCampo></td>
          <td>
            <Button href="/tela18" variant="contained">
              Editar
            </Button>
          </td>
        </tr>
        <tr>
          <td><PreviewCampo campo="Peso ao nascer" resposta="Ignorado"></PreviewCampo></td>
          <td>
            <Button href="/tela18" variant="contained">
              Editar
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


        <div>
          <div style={{ textAlign: "center" }} className="background-square">
            <div style={Section4Styles.titleContainer}>
              <p style={Section4Styles.titleText}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Bloco 5
                </Typography>
              </p>
            </div>
            <PreviewCampo campo="Teste" resposta="Teste2"></PreviewCampo>
            <PreviewCampo campo="Teste" resposta="Teste2"></PreviewCampo>
            <PreviewCampo campo="Teste" resposta="Teste2"></PreviewCampo>
            <PreviewCampo campo="Teste" resposta="Teste2"></PreviewCampo>
            <div style={{ paddingBottom: "10%", paddingTop: "20px" }}>
              <Button href="/tela19" variant="contained">
                Editar
              </Button>
            </div>
          </div>
        </div>

        <div style={{ paddingBottom: "30%", paddingTop: "20px" }}>
          <div>
            <Button href="/telafinal" variant="contained">
              Finalizar
            </Button>
          </div>
          <div style={{ paddingTop: "20px", paddingLeft: "10px" }}>
            <Button variant="outlined" href="/tela22">
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewTeste;
