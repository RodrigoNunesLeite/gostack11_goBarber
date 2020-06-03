import path from 'path';
// crypto serve para criar hash
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  /**
   * multer.diskStorage = armazena os arquivos na propria aplicação
   * mas o ideal para criar algo grande é ter um local no servidor
   * dedicado pra isso
   */
  storage: multer.diskStorage({
    // destination = onde vamos colocar os arquivos
    // '..', '..' = volto 2 pastas até a pasta tmp
    destination: tmpFolder,
    /* filename = nome que o arquivo vai receber, para evitar
    que o usuário suba arquivos repetidos
    Recebe o request, file e qualquer função callback
    */
    filename(request, file, callback) {
      // randomBytes(10) = gera 10 bytes de texto aleatorio
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;
      /**
       * callback = aceita 2 parametros, um erro e o nome do arquivo
       */
      return callback(null, fileName);
    },
  }),
};
