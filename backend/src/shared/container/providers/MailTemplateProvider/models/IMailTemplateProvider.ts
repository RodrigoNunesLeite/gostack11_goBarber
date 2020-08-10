import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  /**
   * Sempre que tiver algo na interface que recebe uma
   * informação composta, nós criamos um DTO
   */
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
