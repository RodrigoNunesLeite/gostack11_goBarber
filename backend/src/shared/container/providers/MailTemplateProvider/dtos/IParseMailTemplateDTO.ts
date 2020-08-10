interface ITemplateVariables {
  /**
   * Aqui estou dizendo que a chave do objeto precisa ser
   * uma string, agora qual é a key não importa
   */
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
