import { useState, useEffect } from "react";
import "./bloco1/tela2.css";
import { useNavigate } from "react-router-dom";
import { Section4Styles } from "./bloco1/styles";
import AppDivClean from "../components/AppDivClean";
import axios from "axios";
import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button } from 'antd';
import { useSession } from "./session";


function TelaListagem() {
  const { userData, setUserData } = useSession();
  const navigateToPage = useNavigate();
  const formData = userData;
  console.log(formData);
  const [pacienteInfo, setPacienteInfo] = useState<any>()
  interface DataType {
    key: string;
    id: string;
    timestamp: string;
  }


  function handlePacienteId(id_usuario: any) {
    console.log("HandlePaciente");
    
    const data = {
      paciente_id: id_usuario,
      medico_id:userData.medico_id
    };

    setUserData(data);
    console.log(userData);
  };

  // function getPacienteInfo(id_usuario: string) {

  //   const apiUrl = `http://206.189.235.2:5000/paciente/${id_usuario}`;

  //   axios
  //     .get(apiUrl)
  //     .then((response) => handlePacienteId(response))
  //     .catch((error) =>
  //       console.error("Erro ao enviar a requisição:", error.message)
  //     );
  // };

  function editarConteudo(id_usuario: string){
    handlePacienteId(id_usuario);
    navigateToPage('/tela1',{state: id_usuario});
  }

  function navegarProxPagina(id_usuario: string){
    handlePacienteId(id_usuario);
    console.log("navegar");
    console.log(userData);
    navigateToPage('/preview',{state: id_usuario});
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Declaração",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Data de criação",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navegarProxPagina(record.id)}>Visualizar</Button>
          <Button onClick={() => editarConteudo(record.id)}>Editar</Button>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState<DataType[]>([]);
  function mapearRespostaParaData(resposta: any[]): DataType[] {
    return resposta.map((item) => {
      return {
        key: item.id.toString(), // Utilize o campo adequado para a chave
        id: item.id.toString(), // Utilize o campo adequado para o ID
        timestamp: item.timestamp, // Utilize o campo adequado para o timestamp
      };
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://206.189.235.2:5000/paciente/medico/${formData.medico_id}`);
        const mappedData = mapearRespostaParaData(response.data);
        setData(mappedData);
      } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={Section4Styles.main}>
      <div style={Section4Styles.mainContainer}>
        <AppDivClean tituloDoBloco="Sistema de Declaração de Óbito">
          <br></br>
          <p style={{fontSize: "1.2rem"}}>Bem vindo(a) ao sistema informatizado de preenchimento de Declaração de Óbito!</p>
          <p style={{fontSize: "1.2rem"}}>Clique no botão a seguir e escolha qual das versões você deseja utilizar</p>
          <Button type="primary" onClick={() => navigateToPage('/tela_form')}  style={{marginBottom: '2rem', marginTop: "1rem"}}> Criar declaração</Button>
        </AppDivClean>
      </div>
    </div>
  );
}

export default TelaListagem;
