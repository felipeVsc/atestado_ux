import React, { ReactNode, useState } from 'react';

type UserData = {
    bloco1?: string;
    bloco2?: string;
    bloco3?: string;
    bloco4?: string;
    bloco5?: string;
    bloco6?: string;
    bloco7?: string;
    paciente_id?: string;
    tipo_morte?: string;
    data_obito?: string;
    dados_endereco_paciente?: any | null;
    dados_endereco_hosp?: any | null;
    medico_id?: string;
    idade_falecido?:string;
};

type SessionContextType = {
  userData: UserData | any;
  setUserData: (data: UserData | null) => void;
};

const SessionContext = React.createContext<SessionContextType>({
  userData: null,
  setUserData: () => {},
});

export const useSession = () => React.useContext(SessionContext);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <SessionContext.Provider value={{ userData, setUserData }}>
      {children}
    </SessionContext.Provider>
  );
};
