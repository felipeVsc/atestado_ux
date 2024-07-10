import React, { CSSProperties, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { PreviewStyles } from "./styles";
import PreviewTextOutput from "../../components/PreviewTextOutput";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useSession } from "../session";
import { Button } from "antd";

export default function Preview() {
  const location = useLocation();
  const navigateToPage = useNavigate();
  const { userData } = useSession();
  const formData = userData;
  const [dadosPaciente, setDadosPaciente] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log(userData);
  //       const response = await axios.get(
  //         `http://159.223.108.189:5000/paciente/all/${userData.paciente_id}`
  //       );
  //       console.log(response.data);
  //       setDadosPaciente(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar dados do paciente:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  
  useEffect(() => {
    async function getValues() {
      console.log("entrei");
      console.log(userData);
      try {
        const response = await axios.get(
          `http://159.223.108.189:5000/paciente/all/${userData.paciente_id}`
        );
        const data = response.data;
        console.log("Data Resposta");
        console.log(data);
        setDadosPaciente(data);
      } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getValues();
  }, []);

  if (isLoading) {
    // Pode exibir um indicador de carregamento aqui
    return <div>Carregando...</div>;
  }
  console.log("dadosPaciente");
  console.log(dadosPaciente);
  function rowOf(width: string) {
    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      width: width ? width : "100%",
    } as CSSProperties;
  }

  

  return (
    
    <div style={PreviewStyles.main}>
      <div style={{paddingTop: '10px'}}>
       <Button type="primary" onClick={() => navigateToPage('/')}> Página Inicial </Button>

      </div>
           <div style={PreviewStyles.sectionBox}>
        <div style={PreviewStyles.sectionTitle}>
          <h3>Identificação</h3>
        </div>
        <div style={PreviewStyles.column}>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("60%")}>
              <PreviewTextOutput
                formIndex="7"
                title="Tipo de óbito"
                content={dadosPaciente.paciente.tipo_morte === "nao_fetal" ? "Não Fetal" : "Fetal"}
                last={true}
              />
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="8"
                title="Óbito - Data"
                width="100%"
                content={dadosPaciente.bloco1.data_do_obito}
              />
              <PreviewTextOutput
                title="Hora"
                content={dadosPaciente.bloco1.hora_do_obito}
                width="50%"
                last={true}
              />
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="9"
                title="Cartão SUS"
                content={dadosPaciente.bloco1.cartao_sus}
                last={true}
              />
            </div>
            <div style={rowOf("80%")}>
              <PreviewTextOutput
                formIndex="10"
                title="Naturalidade"
                content={dadosPaciente.bloco1.naturalidade}
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <PreviewTextOutput
              formIndex="11"
              title="Nome do Falecido"
              content={dadosPaciente.bloco1.nome_falecido}
              last={true}
            />
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <PreviewTextOutput
              formIndex="12"
              title="Nome do Pai"
              content={dadosPaciente.bloco1.nome_pai_falecido}
              last={true}
            />
            <PreviewTextOutput
              formIndex="13"
              title="Nome da Mãe"
              content={dadosPaciente.bloco1.nome_mae_falecido}
              last={true}
            />
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("80%")}>
              <PreviewTextOutput
                formIndex="14"
                title="Data de Nascimento"
                content={dadosPaciente.bloco1.data_nascimento}
                last={true}
              />
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="15"
                title="Idade"
                content={dadosPaciente.bloco1.idade}
                last={true}
              />
            </div>
            <div style={rowOf("60%")}>
              <PreviewTextOutput
                formIndex="16"
                title="Sexo"
                content={dadosPaciente.bloco1.sexo}
                last={true}
              />
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="17"
                title="Raça/cor"
                content={dadosPaciente.bloco1.raca}
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("80%")}>
              <PreviewTextOutput
                formIndex="18"
                title="Estado Civil"
                content={dadosPaciente.bloco1.estado_civil}
                last={true}
              />
            </div>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex="19"
                title="Escolaridade"
                content={dadosPaciente.bloco1.escolaridade === null ? "Ignorado" : dadosPaciente.bloco1.escolaridade}
                last={true}
              />
            </div>

            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex="19"
                title="Serie"
                content={dadosPaciente.bloco1.serie_escolaridade === null ? "Ignorado" : dadosPaciente.bloco1.serie_escolaridade}
                last={true}
              />
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="20"
                title="Ocupação Habitual"
                content={dadosPaciente.bloco1.ocupacao === null ? "Ignorado" : dadosPaciente.bloco1.ocupacao} // TODO mudar isso
              />
              <PreviewTextOutput
                title="Código"
                content={dadosPaciente.bloco1.codigo_cbo === null ? "Ignorado" : dadosPaciente.bloco1.codigo_cbo}
                last={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={PreviewStyles.sectionBox}>
        <div style={PreviewStyles.sectionTitle}>
          <h3>Residência</h3>
        </div>
        <div style={PreviewStyles.column}>
          <div style={rowOf("100%")}>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="21"
                title="Logradouro"
                content={dadosPaciente.bloco2.logradouro_residencia}
              />
            </div>
            <div style={rowOf("50%")}>
              <PreviewTextOutput
                title="Código"
                content={dadosPaciente.bloco2.codigo_bairro_residencia === null ? "Ignorado" : dadosPaciente.bloco2.codigo_bairro_residencia}
              />
            </div>
            <div style={rowOf("35%")}>
              <PreviewTextOutput
                title="Número"
                content={dadosPaciente.bloco2.numero_residencia}
              />
            </div>
            <div style={rowOf("35%")}>
              <PreviewTextOutput
                title="Complemento"
                content={dadosPaciente.bloco2.complemento_residencia}
              />
            </div>
            <div style={rowOf("80%")}>
              <PreviewTextOutput
                title="CEP"
                content={dadosPaciente.bloco2.cep_residencia}
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex="23"
                title="Bairro/Distrito"
                content={dadosPaciente.bloco2.bairro_residencia}
              />
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  title="Código"
                  // content={dadosPaciente.bloco2.codigo_bairro_residencia}
                  content={dadosPaciente.bloco2.codigo_bairro_residencia === null ? "Ignorado" :dadosPaciente.bloco2.codigo_bairro_residencia }
                  
                  last={true}
                />
              </div>
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="24"
                title="Município de residência"
                content={dadosPaciente.bloco2.municipio_residencia}
              />
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  title="Código"
                  content={dadosPaciente.bloco2.codigo_mun_residencia}
                  last={true}
                />
              </div>
            </div>
            <div style={rowOf("20%")}>
              <PreviewTextOutput
                formIndex="25"
                title="UF"
                content={dadosPaciente.bloco2.uf_residencia}
                last={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={PreviewStyles.sectionBox}>
        <div style={PreviewStyles.sectionTitle}>
          <h3>Ocorrência</h3>
        </div>
        <div style={PreviewStyles.column}>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("60%")}>
              <PreviewTextOutput
                formIndex="26"
                title="Local da Ocorrência"
                content={dadosPaciente.bloco3.local_ocorrencia}
                last={true}
              />
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="27"
                title="Estabelecimento"
                content={dadosPaciente.bloco3.estabelecimento_ocorrencia}
              />
              <div style={rowOf("30%")}>
                <PreviewTextOutput title="Código" content={dadosPaciente.bloco3.codigo_cnes_estabelecimento} last={true} />
              </div>
            </div>
          </div>
          <div style={rowOf("100%")}>
            <div style={rowOf("150%")}>
              <PreviewTextOutput
                formIndex="28"
                title="Endereço da Ocorrência"
                content={dadosPaciente.bloco3.local_ocorrencia}
              />
            </div>
            <div style={rowOf("35%")}>
              <PreviewTextOutput
                title="Número"
                content={dadosPaciente.bloco3.numero_ocorrencia}
              />
            </div>
            <div style={rowOf("35%")}>
              <PreviewTextOutput
                title="Complemento"
                content={dadosPaciente.bloco3.complemento_ocorrencia}
              />
            </div>
            <div style={rowOf("80%")}>
              <PreviewTextOutput
                title="CEP"
                formIndex="29"
                content={dadosPaciente.bloco3.cep_ocorrencia}
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex="30"
                title="Bairro/Distrito"
                content={dadosPaciente.bloco3.bairro_ocorrencia}
              />
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  title="Código"
                  content={dadosPaciente.bloco3.codigo_bairro_ocorrencia === null ? "Ignorado" : dadosPaciente.bloco3.codigo_bairro_ocorrencia }
                  last={true}
                />
              </div>
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="31"
                title="Município da ocorrência"
                content={dadosPaciente.bloco3.municipio_ocorrencia}
              />
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  title="Código"
                  content={dadosPaciente.bloco3.codigo_mun_ocorrencia}
                  last={true}
                />
              </div>
            </div>
            <div style={rowOf("20%")}>
              <PreviewTextOutput
                formIndex="32"
                title="UF"
                content={dadosPaciente.bloco3.uf_ocorrencia}
                last={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={PreviewStyles.sectionBox}>
        <div style={PreviewStyles.sectionTitle}>
          <h3>Fetal ou menor que 1 ano</h3>
        </div>
        <div style={PreviewStyles.column}>
          <div style={rowOf("100%")}>
            <div style={rowOf("100%")}>
              <div style={rowOf("35%")}>
                <PreviewTextOutput
                  formIndex="27"
                  title="Idade"
                  content={dadosPaciente.bloco4.idade_mae === null ? "Ignorado" : dadosPaciente.bloco4.idade_mae }
                />
              </div>
              <div style={rowOf("70%")}>
                <PreviewTextOutput
                  formIndex="28"
                  title="Escolaridade"
                  content={dadosPaciente.bloco4.escolaridade_mae === null ? "Ignorado" : dadosPaciente.bloco4.escolaridade_mae}
                />
              </div>
            </div>
            <div style={rowOf("50%")}>
              <PreviewTextOutput
                title="Série"
                content={dadosPaciente.bloco4.serie_mae === null ? "Ignorado" : dadosPaciente.bloco4.serie_mae}
              />
            </div>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex="29"
                title="Ocupação Habitual"
                content={dadosPaciente.bloco4.ocupacao_mae === null ? "Ignorado" : dadosPaciente.bloco4.ocupacao_mae}
              />
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  title="Código CBO"
                  content={dadosPaciente.bloco4.codigo_cbo_mae === null ? "Ignorado" : dadosPaciente.bloco4.codigo_cbo_mae}
                  last={true}
                />
              </div>
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("100%")}>
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  formIndex="30"
                  title="Filhos Tidos Vivos"
                  content={dadosPaciente.bloco4.num_filhos_tidos === null ? "Ignorado" :dadosPaciente.bloco4.num_filhos_tidos}
                  last={true}
                />
              </div>
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  formIndex="30"
                  title="Filhos Perdas Fetais/Aborto"
                  content={dadosPaciente.bloco4.morte_parto === null ? "Ignorado" :dadosPaciente.bloco4.morte_parto}
                  last={true}
                />
              </div>
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  formIndex="31"
                  title="Nº Semanas Gestação"
                  content={dadosPaciente.bloco4.num_semanas_gestacao === null ? "Ignorado" :dadosPaciente.bloco4.num_semanas_gestacao}
                  last={true}
                />
              </div>
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  formIndex="32"
                  title="Tipo de Gravidez"
                  content={dadosPaciente.bloco4.tipo_gravidez === null ? "Ignorado" :dadosPaciente.bloco4.tipo_gravidez}
                  last={true}
                />
              </div>
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  formIndex="33"
                  title="Tipo de Parto"
                  content={dadosPaciente.bloco4.tipo_parto === null ? "Ignorado" :dadosPaciente.bloco4.tipo_parto}
                  last={true}
                />
              </div>
              <div style={rowOf("50%")}>
                <PreviewTextOutput
                  formIndex="34"
                  title="Morte em Relação ao Parto"
                  content={dadosPaciente.bloco4.relacao_morte_parto === null ? "Ignorado" :dadosPaciente.bloco4.relacao_morte_parto}
                  last={true}
                />
              </div>
              <div style={rowOf("30%")}>
                <PreviewTextOutput
                  formIndex="35"
                  title="Peso ao Nascer"
                  content={dadosPaciente.bloco4.peso_ao_nascer === null ? "Ignorado" : dadosPaciente.bloco4.peso_ao_nascer}
                  last={true}
                />
              </div>
            </div>
            <div style={rowOf("40%")}>
              <PreviewTextOutput
                formIndex="36"
                title="Nº de Declaração Nascido Vivo"
                content={dadosPaciente.bloco4.num_declaracao_nascido_vivo === null ? "Ignorado" :dadosPaciente.bloco4.num_declaracao_nascido_vivo}
                last={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={PreviewStyles.sectionBox}>
        <div style={PreviewStyles.sectionTitle}>
          <h3>Condições e causas do obito</h3>
        </div>
        <div style={PreviewStyles.column}>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="37"
                title="Óbito de mulher em idade fértil | A morte ocorreu"
                width="100%"
                content={dadosPaciente.bloco5.morte_mulher_fertil === null ? "Ignorado" :dadosPaciente.bloco5.morte_mulher_fertil}
              />
            </div>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="38"
                title="Recebeu assistência médica durante a doença?"
                content={dadosPaciente.bloco5.assistencia_medica}
                last={true}
              />
            </div>

            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="39"
                title="Diagnóstico confirmado por necrópsia?"
                content={dadosPaciente.bloco5.diagnostico_confirmado}
                last={true}
              />
            </div>
          </div>

          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex="a"
                title="Devido ou como consequência de:"
                content={dadosPaciente.causa_morte.causa_morte_a === null ? "Ignorado" : dadosPaciente.causa_morte.causa_morte_a } 
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="Tempo aproximado"
                content={dadosPaciente.causa_morte.tempo_morte_a === null ? "Ignorado" : dadosPaciente.causa_morte.tempo_morte_a}
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="CID"
                content={dadosPaciente.causa_morte.cid_morte_a === null ? "Ignorado" : dadosPaciente.causa_morte.cid_morte_a }
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex="b"
                title="Devido ou como consequência de:"
                content={dadosPaciente.causa_morte.causa_morte_b === null ? "Ignorado" : dadosPaciente.causa_morte.causa_morte_b}
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="Tempo aproximado"
                content={dadosPaciente.causa_morte.tempo_morte_b === null ? "Ignorado" : dadosPaciente.causa_morte.tempo_morte_b }
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="CID"
                content={dadosPaciente.causa_morte.cid_morte_b === null ? "Ignorado" : dadosPaciente.causa_morte.cid_morte_b }
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex="c"
                title="Devido ou como consequência de:"
                content={dadosPaciente.causa_morte.causa_morte_c === null ? "Ignorado" : dadosPaciente.causa_morte.causa_morte_c}
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="Tempo aproximado"
                content={dadosPaciente.causa_morte.tempo_morte_c === null ? "Ignorado" : dadosPaciente.causa_morte.tempo_morte_c}
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="CID"
                content={dadosPaciente.causa_morte.cid_morte_c === null ? "Ignorado" : dadosPaciente.causa_morte.cid_morte_c }
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex="12"
                title="Devido ou como consequência de:"
                content={dadosPaciente.causa_morte.causa_morte_d === null ? "Ignorado" : dadosPaciente.causa_morte.causa_morte_d}
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="Tempo aproximado"
                content={dadosPaciente.causa_morte.tempo_morte_d === null ? "Ignorado" : dadosPaciente.causa_morte.tempo_morte_d}
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="CID"
                content={dadosPaciente.causa_morte.cid_morte_d === null ? "Ignorado" : dadosPaciente.causa_morte.cid_morte_d}
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex=""
                title="Devido ou como consequência de:"
                content={dadosPaciente.causa_morte.causa_morte_e === null ? "Ignorado" : dadosPaciente.causa_morte.causa_morte_e}
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="Tempo aproximado"
                content={dadosPaciente.causa_morte.tempo_morte_e === null ? "Ignorado" : dadosPaciente.causa_morte.tempo_morte_e }
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="CID"
                content={dadosPaciente.causa_morte.cid_morte_e === null ? "Ignorado" : dadosPaciente.causa_morte.cid_morte_e} 
                last={true}
              />
            </div>
          </div>

          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("70%")}>
              <PreviewTextOutput
                formIndex=""
                title="Devido ou como consequência de:"
                content={dadosPaciente.causa_morte.causa_morte_f === null ? "Ignorado" : dadosPaciente.causa_morte.causa_morte_f }
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="Tempo aproximado"
                content={dadosPaciente.causa_morte.tempo_morte_f === null ? "Ignorado" : dadosPaciente.causa_morte.tempo_morte_f}
                last={true}
              />
            </div>
            <div style={rowOf("30%")}>
              <PreviewTextOutput
                formIndex=""
                title="CID"
                content={dadosPaciente.causa_morte.cid_morte_f === null ? "Ignorado" : dadosPaciente.causa_morte.cid_morte_f} 
                last={true}
              />
            </div>
          </div>
          
        </div>
      </div>

      <div style={PreviewStyles.sectionBox}>
        <div style={PreviewStyles.sectionTitle}>
          <h3>Médico</h3>
        </div>
        <div style={PreviewStyles.column}>
          <div style={rowOf("100%")}>
            <div style={rowOf("100%")}>
              <PreviewTextOutput
                formIndex="50"
                title="Nome do médico"
                content=""
              />
            </div>
            <div style={rowOf("35%")}>
              <PreviewTextOutput formIndex="51" title="CRM" content="" />
            </div>
            <div style={rowOf("35%")}>
              <PreviewTextOutput
                formIndex="52"
                title="Atendeu ao falecido?"
                content="IML"
                last={true}
              />
            </div>
          </div>
          <div style={PreviewStyles.rowWithSpacing}>
            <div style={rowOf("35%")}>
              <PreviewTextOutput
                formIndex="53"
                title="Meio de contato"
                content="+55 82 9 9999-9999"
                last={true}
              />
            </div>
            <div style={rowOf("65%")}>
              <div style={rowOf("20%")}>
                <PreviewTextOutput
                  formIndex="54"
                  title="Data do atestado"
                  content="00/00/0000"
                />
              </div>
              <div style={rowOf("80%")}>
                <PreviewTextOutput title="Assinatura" content="" last={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
