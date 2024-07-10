from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import update, inspect
from sqlalchemy.orm import class_mapper
import pytz
from dataclasses import dataclass
from datetime import datetime



# PostgreSQL

load_dotenv()

DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')


# conn = psycopg2.connect(
#             host=DB_HOST,
#             port=DB_PORT,
#             database=DB_NAME,
#             user=DB_USER,
#             password=DB_PASSWORD
#         )

# cursor = conn.cursor()


# Flask 
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

class Medico(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    crm = db.Column(db.String(100))
    email = db.Column(db.String(100))
    senha = db.Column(db.String(100))
    nome = db.Column(db.String(100))
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
    
@dataclass
class Bloco1(db.Model):

    id:str = db.Column(db.Integer, primary_key=True)
    data_do_obito:str = db.Column(db.String(100))
    hora_do_obito:str = db.Column(db.String(100))
    hora_obito_v1:str = db.Column(db.String(100))
    cartao_sus:str = db.Column(db.String(100))
    naturalidade:str = db.Column(db.String(100))
    nome_falecido:str = db.Column(db.String(100))
    nome_pai_falecido:str = db.Column(db.String(100))
    nome_mae_falecido:str = db.Column(db.String(100))
    data_nascimento:str = db.Column(db.String(100))
    idade:int = db.Column(db.Integer)
    sexo:str = db.Column(db.String(100))
    raca:str = db.Column(db.String(100))
    estado_civil:str = db.Column(db.String(100))
    escolaridade:str = db.Column(db.String(100))
    serie_escolaridade:str = db.Column(db.String(100))
    codigo_cbo:str = db.Column(db.String(100))
    ocupacao:str = db.Column(db.String(100))
    unidade_idade:str = db.Column(db.String(100))
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
    paciente_id = db.relationship('Paciente', lazy=True)

@dataclass
class Bloco2(db.Model):
    id:str = db.Column(db.Integer, primary_key=True)
    cep_residencia:str = db.Column(db.String(100))
    logradouro_residencia:str = db.Column(db.String(100))
    numero_residencia:str = db.Column(db.String(100))
    complemento_residencia:str = db.Column(db.String(100))
    bairro_residencia:str = db.Column(db.String(100))
    codigo_bairro_residencia:str = db.Column(db.String(100))
    municipio_residencia:str = db.Column(db.String(100))
    codigo_mun_residencia:str = db.Column(db.String(100))
    uf_residencia:str = db.Column(db.String(100))
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
    paciente_id = db.relationship('Paciente', lazy=True)
@dataclass
class Bloco3(db.Model):
    id:str = db.Column(db.Integer, primary_key=True)
    local_ocorrencia:str = db.Column(db.String(100))
    estabelecimento_ocorrencia:str = db.Column(db.String(200))
    codigo_cnes_estabelecimento:str = db.Column(db.String(100))
    cep_ocorrencia:str = db.Column(db.String(100))
    logradouro_ocorrencia:str = db.Column(db.String(100))
    numero_ocorrencia:str = db.Column(db.String(100))
    complemento_ocorrencia:str = db.Column(db.String(100))
    bairro_ocorrencia:str = db.Column(db.String(100))
    codigo_bairro_ocorrencia:str = db.Column(db.String(100))
    municipio_ocorrencia:str = db.Column(db.String(100))
    codigo_mun_ocorrencia:str = db.Column(db.String(100))
    uf_ocorrencia:str = db.Column(db.String(100))
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
    paciente_id = db.relationship('Paciente', lazy=True)

@dataclass
class Bloco4(db.Model):
    __allow_unmapped__ = True
    id:str = db.Column(db.Integer, primary_key=True)
    idade_mae:str = db.Column(db.Integer)
    escolaridade_mae:str = db.Column(db.String(100))
    serie_mae:str = db.Column(db.String(100))
    codigo_cbo_mae:str = db.Column(db.String(100))
    num_filhos_tidos:str = db.Column(db.Integer)
    num_semanas_gestacao:str = db.Column(db.Integer)
    tipo_gravidez:str = db.Column(db.String(100))
    tipo_parto:str = db.Column(db.String(100))
    ocupacao_mae:str = db.Column(db.String(100))
    morte_parto:str = db.Column(db.String(100))
    peso_ao_nascer:str = db.Column(db.String(100))
    num_declaracao_nascido_vivo:str = db.Column(db.Integer)
    relacao_morte_parto:str = db.Column(db.String(100))
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
    paciente_id:int = db.relationship('Paciente', lazy=True)


@dataclass
class Causa_morte(db.Model):
    id:str = db.Column(db.Integer, primary_key=True)
    causa_morte_a:str = db.Column(db.String(100))
    tempo_morte_a:str = db.Column(db.String(100))
    cid_morte_a:str = db.Column(db.String(100))
    causa_morte_b:str = db.Column(db.String(100))
    tempo_morte_b:str = db.Column(db.String(100))
    cid_morte_b:str = db.Column(db.String(100))
    causa_morte_c:str = db.Column(db.String(100))
    tempo_morte_c:str = db.Column(db.String(100))
    cid_morte_c:str = db.Column(db.String(100))
    causa_morte_d:str = db.Column(db.String(100))
    tempo_morte_d:str = db.Column(db.String(100))
    cid_morte_d:str = db.Column(db.String(100))
    causa_morte_e:str = db.Column(db.String(100))
    tempo_morte_e:str = db.Column(db.String(100))
    cid_morte_e:str = db.Column(db.String(100))
    causa_morte_f:str = db.Column(db.String(100))
    tempo_morte_f:str = db.Column(db.String(100))
    cid_morte_f:str = db.Column(db.String(100))
    # bloco5_id = db.relationship('Bloco5', lazy=True)
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
    bloco5_id = db.Column(db.Integer, db.ForeignKey('bloco5.id'), nullable=True)
@dataclass
class Bloco5(db.Model):
    id:str = db.Column(db.Integer, primary_key=True)
    morte_mulher_fertil:str = db.Column(db.String(100))
    assistencia_medica:str = db.Column(db.String(100))
    diagnostico_confirmado:str = db.Column(db.String(100))
    causas_morte_id:str = db.Column(db.Integer, db.ForeignKey('causa_morte.id'), nullable=True)
    #causa_morte_id = db.relationship('Causa_Morte', lazy=True)
    paciente_id = db.relationship('Paciente', lazy=True)
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
@dataclass
class Bloco6(db.Model):
    __allow_unmapped__ = True
    id:str = db.Column(db.Integer, primary_key=True)
    medico_id:str = db.Column(db.Integer, db.ForeignKey('medico.id'), nullable=True)
    obito_atestado:str = db.Column(db.String(100))
    municipio_atestado:str = db.Column(db.String(100))
    uf_atestado:str = db.Column(db.String(100))
    paciente_id:int = db.relationship('Paciente', lazy=True)
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
@dataclass
class Bloco7(db.Model):
    __allow_unmapped__ = True
    id:str = db.Column(db.Integer, primary_key=True)
    morte_nao_natural:str = db.Column(db.String(100))
    acidente_trabalho:str = db.Column(db.String(100))
    fonte_informacao:str = db.Column(db.String(100))
    num_ocorrencia_policial:str = db.Column(db.String(100))
    descricao_evento:str = db.Column(db.String(100))
    tipo_local:str = db.Column(db.String(100))
    endereco_local:str = db.Column(db.String(100))
    numero_local:str = db.Column(db.String(100))
    bairro_local:str = db.Column(db.String(100))
    municipio_local:str = db.Column(db.String(100))
    logradouro_local:str = db.Column(db.String(100))
    uf_local:str = db.Column(db.String(100))
    paciente_id:int = db.relationship('Paciente', lazy=True)
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)

@dataclass
class Paciente(db.Model):
    id:str = db.Column(db.Integer, primary_key=True)
    tipo_morte:str = db.Column(db.String(100))
    timestamp:str = db.Column(db.DateTime, default=datetime.utcnow)
    bloco1:str = db.Column(db.Integer, db.ForeignKey('bloco1.id'), nullable=True)
    bloco2:str = db.Column(db.Integer, db.ForeignKey('bloco2.id'), nullable=True)
    bloco3:str = db.Column(db.Integer, db.ForeignKey('bloco3.id'), nullable=True)
    bloco4:str = db.Column(db.Integer, db.ForeignKey('bloco4.id'), nullable=True)
    bloco5:str = db.Column(db.Integer, db.ForeignKey('bloco5.id'), nullable=True)
    bloco6:str = db.Column(db.Integer, db.ForeignKey('bloco6.id'), nullable=True)
    bloco7:str = db.Column(db.Integer, db.ForeignKey('bloco7.id'), nullable=True)
    medico_id:str = db.Column(db.Integer, db.ForeignKey('medico.id'), nullable=True)

@dataclass
class Likert(db.Model):
    id:str = db.Column(db.Integer, primary_key=True)
    paciente_id:str = db.Column(db.Integer, db.ForeignKey('paciente.id'), nullable=True)
    pontos_positivos:str = db.Column(db.String(500))
    pontos_negativos:str = db.Column(db.String(500))
    feedback:str = db.Column(db.String(500))
    q1:str = db.Column(db.String(50))
    q2:str = db.Column(db.String(50))
    q3:str = db.Column(db.String(50))
    q4:str = db.Column(db.String(50))
    q5:str = db.Column(db.String(50))
    q6:str = db.Column(db.String(50))
    q7:str = db.Column(db.String(50))
    q8:str = db.Column(db.String(50))
    q9:str = db.Column(db.String(50))
    q10:str = db.Column(db.String(50))
    q11:str = db.Column(db.String(50))

@dataclass
class Cbo(db.Model):
    id:str = db.Column(db.Integer, primary_key=True)
    codigo:str = db.Column(db.String(500))
    ocupacao:str = db.Column(db.String(500))

@dataclass
class Cid_doenca(db.Model):
    subcat:str = db.Column(db.String(500), primary_key=True)
    descricao:str = db.Column(db.String(500))

@app.route("/", methods=['POST','GET'])
def hello_world():
    return "It's me, Hi!"

# SQL Alchemy

fuso_horario_brasil = pytz.timezone('America/Sao_Paulo')

def model_to_dict(model):
    mapper = inspect(model.__class__)
    return {col.key: getattr(model, col.key) for col in mapper.attrs}

@app.route('/login',methods=['POST'])
def login_user():
    dados_requisicao = request.json
    cpf = dados_requisicao['cpf']
    senha = dados_requisicao['password']

    if cpf == "000" and senha=="123":
        return jsonify({'medico_id':1}), 200
    elif cpf=="999" and senha=="123":
        return jsonify({'medico_id':2}), 200
    else:
        return jsonify({'medico_id': 'erro'}), 200
    

@app.route('/paciente/all/<paciente_id>',methods=['GET'])
def retrieve_all_from_paciente(paciente_id):
    # pegar todas as infos de todos os blocos e juntar num json só
    try:
        paciente = db.session.get(Paciente,paciente_id)
        bloco1 = db.session.get(Bloco1,paciente.bloco1)
        bloco2 = db.session.get(Bloco2,paciente.bloco2)
        bloco3 = db.session.get(Bloco3,paciente.bloco3)
        bloco4 = db.session.get(Bloco4,paciente.bloco4)
        bloco5 = db.session.get(Bloco5,paciente.bloco5)
        bloco6 = db.session.get(Bloco6,paciente.bloco6)
        bloco7 = db.session.get(Bloco7,paciente.bloco7)
        causa_morte = db.session.query(Causa_morte).filter_by(bloco5_id=bloco5.id).first()
        print("passou1")
        # teste = {bloco1, bloco2}
        # return jsonify(teste)
        # bloco1 = db.session.get(Bloco1,paciente.bloco1_id)

        paciente_dict = model_to_dict(paciente)
        bloco1.data_do_obito = bloco1.data_do_obito.strftime("%Y-%m-%d") 
        bloco1.hora_do_obito = bloco1.hora_do_obito
        try:
            bloco1.data_nascimento = bloco1.data_nascimento.strftime("%Y-%m-%d") 
        except:
            pass
        print(bloco1)
        bloco1_dict = model_to_dict(bloco1)
        bloco2_dict = model_to_dict(bloco2)
        bloco3_dict = model_to_dict(bloco3)
        bloco4_dict = model_to_dict(bloco4)
        bloco5_dict = model_to_dict(bloco5)
        bloco6_dict = model_to_dict(bloco6)
        bloco7_dict = model_to_dict(bloco7)
        causa_morte_dict = model_to_dict(causa_morte)
        print("passou2")
        # Criando o dicionário final
        dados_paciente = {
            'paciente': paciente_dict,
            'bloco1': bloco1_dict,
            'bloco2': bloco2_dict,
            'bloco3': bloco3_dict,
            'bloco4': bloco4_dict,
            'bloco5': bloco5_dict,
            'bloco6': bloco6_dict,
            'bloco7': bloco7_dict,
            'causa_morte': causa_morte_dict
        }

        return jsonify(dados_paciente)
    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    

@app.route('/paciente/<paciente_id>', methods=['GET'])
def retrieve_paciente(paciente_id):
    try:
        paciente = db.session.get(Paciente,paciente_id)
        return jsonify(paciente)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400

@app.route('/paciente/medico/<medico_id>',methods=['GET'])
def get_all_pacientes(medico_id):
    try:
        
        paciente = Paciente.query.filter_by(medico_id=medico_id).all()
        return jsonify(paciente)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


#paciente_na_sessao = None

@app.route('/paciente/tipo', methods=["POST"])
def add_tipo_morte():
    try:
        dados_requisicao = request.json
        paciente_id = dados_requisicao['paciente_id']
        del dados_requisicao['paciente_id']

        stmt = (update(Paciente).where(Paciente.id == paciente_id).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)  
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


@app.route('/paciente', methods=['POST'])
def add_paciente():
    try:
        dados_requisicao = request.json

        bloco1 = Bloco1()
        bloco2=Bloco2()
        bloco3=Bloco3()
        bloco4=Bloco4()
        
        bloco5=Bloco5()
        bloco6=Bloco6()
        bloco7=Bloco7()

        db.session.add_all([bloco1,bloco2,bloco3,bloco4,bloco5,bloco6,bloco7])
        db.session.commit()

        paciente = Paciente(
            tipo_morte=dados_requisicao['tipo_morte'],
            timestamp=datetime.now(fuso_horario_brasil),
            bloco1=bloco1.id,
            bloco2=bloco2.id,
            bloco3=bloco3.id,
            bloco4=bloco4.id,
            bloco5=bloco5.id,
            bloco6=bloco6.id,
            bloco7=bloco7.id,
        )
        print("hi")
        causa_morte = Causa_morte(bloco5_id=bloco5.id)
        print("gerou id ")
        print(causa_morte.id)
        db.session.add_all([paciente,causa_morte])
        db.session.commit()
        print("oi")
        paciente_data = {
        'paciente_id':paciente.id,
        'tipo_morte': paciente.tipo_morte,
        'timestamp': paciente.timestamp.isoformat(),
        'bloco1': paciente.bloco1,
        'bloco2': paciente.bloco2,
        'bloco3': paciente.bloco3,
        'bloco4': paciente.bloco4,
        'bloco5': paciente.bloco5,
        'bloco6': paciente.bloco6,
        'bloco7': paciente.bloco7,
    }
        return jsonify(paciente_data)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400

@app.route('/medico', methods=['POST'])
def medico():
    try:
        dados_requisicao = request.json
        pessoa = Medico(**dados_requisicao)
        db.session.add(pessoa)
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


@app.route('/medico', methods=['GET'])
def obter_medico():
    try:
        
        dados_requisicao = request.json
        crm = dados_requisicao['crm']
        # cursor.execute(f"SELECT * FROM public.medico WHERE crm='{crm}'")
        # data = cursor.fetchall()
        
        return jsonify({'medico':crm})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
def getCboFromCode(cbo_code):
    ocupacao = Cbo.query.filter(Cbo.codigo==str(cbo_code)).first()
    return ocupacao.ocupacao

@app.route('/bloco1', methods=['POST'])
def bloco1():
    try:
        dados_requisicao = request.json
        #db.session.execute(update(Bloco1).where(Bloco1.id==dados_requisicao['bloco1_id']),[dados_requisicao])

        bloco1_id = dados_requisicao['bloco1_id']
        del dados_requisicao['bloco1_id']

        if 'codigo_cbo' in dados_requisicao.keys():
            dados_requisicao['ocupacao'] = getCboFromCode(dados_requisicao['codigo_cbo'])

        stmt = (update(Bloco1).where(Bloco1.id == bloco1_id).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)  
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400



def getDoencaFromCid(cid_code):
    cid = Cid_doenca.query.filter(Cid_doenca.subcat==cid_code).first()
    return cid.descricao


@app.route('/bloco1/<bloco_id>', methods=['GET'])
def retrieve_bloco1(bloco_id):
    try:
        bloco1 = db.session.get(Bloco1,bloco_id)
        bloco1.data_do_obito = bloco1.data_do_obito.strftime("%Y-%m-%d") 
        bloco1.hora_do_obito = bloco1.hora_do_obito.strftime("%H:%M:%S") 
        try:
            bloco1.data_nascimento = bloco1.data_nascimento.strftime("%Y-%m-%d") 
        except:
            pass

        try:
            bloco1.ocupacao = getCboFromCode(bloco1.codigo_cbo)
        except:
            pass

        print(bloco1)
        return jsonify(bloco1)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


@app.route('/bloco2', methods=['POST'])
def bloco2():
    try:
        dados_requisicao = request.json
        #db.session.execute(update(Bloco2).where(Bloco2.id==dados_requisicao['bloco2_id']),[dados_requisicao])

        bloco2_id = dados_requisicao['bloco2_id']
        del dados_requisicao['bloco2_id']

        stmt = (update(Bloco2).where(Bloco2.id == bloco2_id).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
@app.route('/bloco2/<bloco_id>', methods=['GET'])
def retrieve_bloco2(bloco_id):
    try:
        bloco2 = db.session.get(Bloco2,bloco_id)
        return jsonify(bloco2)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


@app.route('/bloco3', methods=['POST'])
def bloco3():
    try:
        dados_requisicao = request.json
        #db.session.execute(update(Bloco3).where(Bloco3.id==dados_requisicao['bloco3_id']),[dados_requisicao])
        #db.session.commit()

        bloco3_id = dados_requisicao['bloco3_id']
        del dados_requisicao['bloco3_id']

        stmt = (update(Bloco3).where(Bloco3.id == bloco3_id).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)  
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
@app.route('/bloco3/<bloco_id>', methods=['GET'])
def retrieve_bloco3(bloco_id):
    try:
        bloco3 = db.session.get(Bloco3,bloco_id)
        return jsonify(bloco3)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


@app.route('/bloco4', methods=['POST'])
def bloco4():
    try:
        dados_requisicao = request.json
        #db.session.execute(update(Bloco4).where(Bloco4.id==dados_requisicao['bloco4_id']),[dados_requisicao])
        #db.session.commit()

        bloco4_id = dados_requisicao['bloco4_id']
        del dados_requisicao['bloco4_id']
        if 'codigo_cbo_mae' in dados_requisicao.keys():
            dados_requisicao['ocupacao_mae'] = getCboFromCode(str(dados_requisicao['codigo_cbo_mae']))
        
        print(dados_requisicao)

        stmt = (update(Bloco4).where(Bloco4.id == bloco4_id).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)  
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
@app.route('/bloco4/<bloco_id>', methods=['GET'])
def retrieve_bloco4(bloco_id):
    try:
        bloco4 = db.session.get(Bloco4,bloco_id)
        print(bloco4)
        return jsonify(bloco4)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


@app.route('/causa_morte', methods=['POST'])
def add_causa_morte():
    try:
        dados_requisicao = request.json
        # dados_requisicao['bloco5_id'] = [db.session.get(Bloco5,dados_requisicao['bloco5_id'])]

        # causas_morte = Causa_morte(**dados_requisicao)
        # db.session.add(causas_morte)
        # db.session.commit()

        dados_requisicao['causa_morte_a'] = getDoencaFromCid(dados_requisicao['cid_morte_a'])
        dados_requisicao['causa_morte_b'] = getDoencaFromCid(dados_requisicao['cid_morte_b'])
        dados_requisicao['causa_morte_c'] = getDoencaFromCid(dados_requisicao['cid_morte_c'])
        dados_requisicao['causa_morte_d'] = getDoencaFromCid(dados_requisicao['cid_morte_d'])

        if "causa_morte_e" in dados_requisicao.keys():
            dados_requisicao['causa_morte_e'] = getDoencaFromCid(dados_requisicao['cid_morte_e'])
            dados_requisicao['causa_morte_f'] = getDoencaFromCid(dados_requisicao['cid_morte_f'])

        stmt = (update(Causa_morte).where(Causa_morte.bloco5_id == dados_requisicao['bloco5_id']).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)
        db.session.commit()
        
        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
@app.route('/causa_morte/<int:bloco5id>',methods=['GET'])
def get_causa_morte(bloco5id):
    try:
        causa_morte_resultado = db.session.query(Causa_morte).filter_by(bloco5_id=bloco5id).first()
        # causa_morte_resultado.causa_morte_a_descricao = getDoencaFromCid(causa_morte_resultado.causa_morte_a)
        # causa_morte_resultado.causa_morte_b_descricao = getDoencaFromCid(causa_morte_resultado.causa_morte_b)
        # causa_morte_resultado.causa_morte_c_descricao = getDoencaFromCid(causa_morte_resultado.causa_morte_c)
        # causa_morte_resultado.causa_morte_d_descricao = getDoencaFromCid(causa_morte_resultado.causa_morte_d)
        # causa_morte_resultado.causa_morte_e_descricao = getDoencaFromCid(causa_morte_resultado.causa_morte_e)
        # causa_morte_resultado.causa_morte_f_descricao = getDoencaFromCid(causa_morte_resultado.causa_morte_f)
        return jsonify(causa_morte_resultado)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
@app.route('/bloco5', methods=['POST'])
def bloco5():
    try:
        dados_requisicao = request.json
        #db.session.execute(update(Bloco5).where(Bloco5.id==dados_requisicao['bloco5_id']),[dados_requisicao])
        bloco5_id = dados_requisicao['bloco5_id']
        del dados_requisicao['bloco5_id']

        stmt = (update(Bloco5).where(Bloco5.id == bloco5_id).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
@app.route('/bloco5/<bloco_id>', methods=['GET'])
def retrieve_bloco5(bloco_id):
    try:
        bloco5 = db.session.get(Bloco5,bloco_id)
        return jsonify(bloco5)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400



@app.route('/bloco6', methods=['POST'])
def bloco6():
    try:
        dados_requisicao = request.json
        #db.session.execute(update(Bloco6).where(Bloco6.id==dados_requisicao['bloco6_id']),[dados_requisicao])
        bloco6_id = dados_requisicao['bloco6_id']
        del dados_requisicao['bloco6_id']

        stmt = (update(Bloco6).where(Bloco6.id == bloco6_id).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
@app.route('/bloco6/<bloco_id>', methods=['GET'])
def retrieve_bloco6(bloco_id):
    try:
        bloco6 = db.session.get(Bloco6,bloco_id)
        return jsonify(bloco6)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


@app.route('/bloco7', methods=['POST'])
def bloco7():
    try:
        dados_requisicao = request.json
        #db.session.execute(update(Bloco7).where(Bloco7.id==dados_requisicao['bloco7_id']),[dados_requisicao])
        bloco7_id = dados_requisicao['bloco7_id']
        del dados_requisicao['bloco7_id']

        stmt = (update(Bloco7).where(Bloco7.id == bloco7_id).values(dados_requisicao).execution_options(synchronize_session=False))
        db.session.execute(stmt)
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400

@app.route('/bloco7/<bloco_id>', methods=['GET'])
def retrieve_bloco7(bloco_id):
    try:
        bloco7 = db.session.get(Bloco7,bloco_id)
        return jsonify(bloco7)

    except Exception as e:
        return jsonify({'erro': str(e)}), 400

@app.route('/likert', methods=['POST'])
def likert():
    try:
        dados_requisicao = request.json
        paciente_id = dados_requisicao['paciente_id']
        novo_likert = Likert(**dados_requisicao)
        
        # Adiciona o novo objeto à sessão e comete a transação
        db.session.add(novo_likert)
        db.session.commit()

        return jsonify({'mensagem': 'Dados inseridos com sucesso!'})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True)


# Models
