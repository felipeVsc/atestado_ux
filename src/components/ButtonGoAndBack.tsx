import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface CustomButtonProps {
  backHref?: string;
  onClickContinue?: () => void; // Função para lidar com o clique no botão "Continuar"
  hideBackButton?: boolean;
  formData?: string;
}



const ButtonGoAndBack: React.FC<CustomButtonProps> = ({
  onClickContinue,
  backHref = "/",
  hideBackButton = false,
  formData = ""
}) => {
  const navigateToPage = useNavigate();
  function goBackNavigate(backHref: string, formData: any){
    navigateToPage(backHref, {state: formData});
    
  }
  return (
    <div style={{ paddingBottom: "30%", paddingTop: "20px" }}>
      <div>
        <Button
          variant="contained"
          onClick={onClickContinue} // Chame a função de clique fornecida
        >
          Continuar
        </Button>
      </div>
      {!hideBackButton && (
        <div style={{ paddingTop: "20px", paddingLeft: "10px" }}>
          <Button variant="outlined" onClick={() => goBackNavigate(backHref,formData)}>
            Voltar
          </Button>
        </div>
      )}
    </div>
  );
};

export default ButtonGoAndBack;
