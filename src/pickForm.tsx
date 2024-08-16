import React, { useEffect } from "react";
import { Form, Button, Card } from "antd";
import { Typography } from "antd";
import axios from "axios";
import { useSession } from "./screens_ant/session";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const PickForm = () => {
  const { userData, setUserData } = useSession();
  const navigateToPage = useNavigate();
  console.log(userData);
  function handlePacienteId(response: any, version: string) {
    
    const data = {
      bloco1: response.data.bloco1,
      bloco2: response.data.bloco2,
      bloco3: response.data.bloco3,
      bloco4: response.data.bloco4,
      bloco5: response.data.bloco5,
      bloco6: response.data.bloco6,
      bloco7: response.data.bloco7,
      medico_id:userData.medico_id,
      paciente_id: response.data.paciente_id
    };

    setUserData(data);
  
    if (version==="ux"){
      navigateToPage(`/tela1`, { state:response.data });
    }
  };

  function createPaciente(version: string) {

    const apiUrl = "http://143.198.163.134:5000/paciente";

    axios
      .post(apiUrl,{tipo_morte:""})
      .then((response) => handlePacienteId(response, version))
      .catch((error) =>
        console.error("Erro ao enviar a requisição:", error.message)
      );
  };
  
  function populateBloco6(id: string){
    const apiUrl = "http://143.198.163.134:5000/bloco6";
    // TODO

    // pegar info dos médicos aqui e só jogar lá com as infos dos outros blocos

    const data = {
      municipio_atestado:userData.dados_endereco_hospital.municipio,
      uf_atestado:userData.dados_endereco_hospital.uf,
    }
    axios
      .post(apiUrl,data)
      .then((response) => console.log(response))
      .catch((error) =>
        console.error("Erro ao enviar a requisição:", error.message)
      );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "91vh",
      }}
    >
      <Card style={{ width: 420 }}>
        <div style={{ display: "flex", justifyContent: "center",paddingBottom: "20px" }}>
          <Title level={3}>Qual versão você deseja acessar? </Title>
        </div>
        <Form
          name="pick_form"
          className="pick-form"
          initialValues={{ remember: true }}
        >
          <Form.Item>
          <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                // href="/tela1" //Colocar rota da versão do felipe
                onClick={() => createPaciente("ux")} 
              >
                Versão UX
              </Button>

            
            <div style={{ paddingTop: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              href="http://143.198.163.134:4000/" //Colocar rota da versão do Pedro
            >
              Simulador de DO original
            </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PickForm;
function navigateToPage(arg0: string, arg1: { state: any[]; }) {
  throw new Error("Function not implemented.");
}

