import axios from 'axios';

async function updateResourceField<T>(
  url: string,
  fieldToUpdate: keyof T,
  updatedValue: any
): Promise<void> {
  try {
    // Fazer um pedido GET para obter os dados atuais
    const response = await axios.get<T>(url);
    const currentData = response.data;

    // Atualizar apenas o campo desejado
    currentData[fieldToUpdate] = updatedValue;

    // Fazer um pedido PUT para atualizar o recurso com os dados modificados
    await axios.put(url, currentData);
  } catch (error) {
    throw new Error('Erro ao atualizar o campo: ');
  }
}

export default updateResourceField;