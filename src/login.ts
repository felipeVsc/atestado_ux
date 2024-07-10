// styles.ts

interface Styles {
  cardContainer: React.CSSProperties;
  inputContainer: React.CSSProperties;
  testeContainer: React.CSSProperties;
}

const styles: Styles = {
  cardContainer: {
    width: "300px",
    margin: "auto",
    borderRadius: "15px",
    padding: "20px",
    backgroundColor: "white", // Cor de fundo estendida até o final da página
    
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px", // Espaço entre "Bem-vindo" e os inputs
  },
  testeContainer:{
    backgroundColor: "#f8f9fa", // Cor de fundo estendida até o final da página
    minHeight: "90vh",
    paddingTop: '100px'
  },
};

export default styles;
