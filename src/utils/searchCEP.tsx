import { useState } from "react";
import axios from "axios";

const useAddressInfo = () => {
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    uf: "",
  });

  const fetchAddressInfo = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      setAddress({
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        uf: data.uf,
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleCepChange = (event: any) => {
    const cep = event.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      fetchAddressInfo(cep);
    }
  };

  return { address, handleCepChange };
};

export default useAddressInfo;