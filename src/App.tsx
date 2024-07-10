import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tela1 from './screens_ant/bloco1/tela1';
import Tela2 from './screens_ant/bloco1/tela2';
import Tela3 from './screens_ant/bloco1/tela3';
import Tela4 from './screens_ant/bloco1/tela4';
import Tela6 from './screens_ant/bloco2/tela6';
import Tela7 from './screens_ant/bloco2/tela7';
import Tela8 from './screens_ant/bloco2/tela8';
import Tela9 from './screens_ant/bloco3/tela9';
import Tela10 from './screens_ant/bloco3/tela10';
import Tela11 from './screens_ant/bloco3/tela11';
import Tela12 from './screens_ant/bloco3/tela12';
import Tela13 from './screens_ant/bloco3/tela13';
import Tela14 from './screens_ant/bloco3/tela14';
import Tela15 from './screens_ant/bloco4/tela15';
import Tela16 from './screens_ant/bloco4/tela16';
import Tela17 from './screens_ant/bloco4/tela17';
import Tela18 from './screens_ant/bloco4/tela18';
import Tela19 from './screens_ant/bloco5/tela19';
import Tela20 from './screens_ant/bloco5/tela20';
import Tela21 from './screens_ant/bloco5/tela21';
import Tela22 from './screens_ant/bloco5/tela22';
import Tela23 from './screens_ant/bloco5/tela23';
import Tela24 from './screens_ant/bloco7/tela24';
import Tela25 from './screens_ant/bloco7/tela25';
import Tela26 from './screens_ant/bloco7/tela26';
import Tela27 from './screens_ant/bloco7/tela27';
import Tela28 from './screens_ant/bloco7/tela28';
import Tela29 from './screens_ant/bloco7/tela29';

import TelaFinal from './screens_ant/final/finalizacao';
import TelaEscolaridade from './screens_ant/bloco1/tela_escolaridade';
import Tela3_nf from './screens_ant/bloco1/tela3_naofetal';
import Login from './login_screen';
import Preview from './screens_ant/preview';
import SectionRating from './screens_ant/rating';
import TelaListagem from './screens_ant/listagem';
import PreviewTeste from './screens_ant/final/preview';
import { SessionProvider } from './screens_ant/session';

import MenuAppBar from './components/AppBar';
import { AppStyles } from './styles';
import PickForm from './pickForm';



const App: React.FC = () => {
  return (
    <SessionProvider>
    <div style={AppStyles.main}>
    <Router>
      <MenuAppBar></MenuAppBar>
      <div>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/tela1" element={<Tela1 />} />
          <Route path="/tela2" element={<Tela2 />} />
          <Route path="/tela3" element={<Tela3 />} />
          <Route path="/tela4" element={<Tela4 />} />
          <Route path="/tela6" element={<Tela6 />} />
          <Route path="/tela7" element={<Tela7 />} />
          <Route path="/tela8" element={<Tela8 />} />
          <Route path="/tela9" element={<Tela9 />} />
          <Route path="/tela10" element={<Tela10 />} />
          <Route path="/tela11" element={<Tela11 />} />
          <Route path="/tela12" element={<Tela12 />} />
          <Route path="/tela13" element={<Tela13 />} />
          <Route path="/tela14" element={<Tela14 />} />
          <Route path="/tela15" element={<Tela15 />} />
          <Route path="/tela16" element={<Tela16 />} />
          <Route path="/tela17" element={<Tela17 />} />
          <Route path="/tela18" element={<Tela18 />} />
          <Route path="/tela19" element={<Tela19 />} />
          <Route path="/tela20" element={<Tela20 />} />
          <Route path="/tela21" element={<Tela21 />} />
          <Route path="/tela22" element={<Tela22 />} />
          <Route path="/tela23" element={<Tela23 />} />
          <Route path="/tela24" element={<Tela24 />} />
          <Route path="/tela25" element={<Tela25 />} />
          <Route path="/tela26" element={<Tela26 />} />
          <Route path="/tela27" element={<Tela27 />} />
          <Route path="/tela28" element={<Tela28 />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/telafinal" element={<TelaFinal />} />
          <Route path="/tela_escol" element={<TelaEscolaridade />} />
          <Route path="/tela3_nf" element={<Tela3_nf />} />
          <Route path="/tela29" element={<Tela29 />} />

          <Route path="/listagem" element={<TelaListagem />} />
          <Route path="/tela_form" element={<PickForm />} />
          <Route path="/likert" element={<SectionRating />} />

          {/* <Route path="/preview2" element={<PreviewTeste />} /> */}
          
        </Routes>
      </div>
    </Router>
    </div>
    </SessionProvider>
  );
};

export default App;