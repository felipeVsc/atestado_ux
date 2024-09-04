import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSession } from "./screens_ant/session";

const { Title } = Typography;

const Login = () => {
  const { setUserData } = useSession();
  const [loading, setLoading] = useState(false);
  const navigateToPage = useNavigate();
  const onFinish = async (values: { cpf: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post("http://157.245.80.223:5000/login", {
        cpf: values.cpf,
        password: values.password
      });

      const data = {
        medico_id: response.data.medico_id
      };
  
      setUserData(data);
      
      
      if (response.data.medico_id==1 || response.data.medico_id==2){
        message.success("Login bem-sucedido!");

        navigateToPage("/listagem", { state: response.data});
      }
      else{
        message.error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      message.error("Erro ao fazer login. Por favor, tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Card style={{ width: 400 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>Bem vindo! </Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="cpf"
            rules={[{ required: true, message: "Por favor, insira seu CPF!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="CPF"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
              block
            >
              Entrar
            </Button>
          </Form.Item>
          <div style={{ paddingTop: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Entrar com GOV.BR
            </Button>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Registrar
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
