import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  /**
   * O from é opcional pois vamos definir um e-mail de envio padrão,
   * mas o email from pode ser enviado
   */
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
