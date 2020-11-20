import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText
} from './styles';

interface RouteParams {
  date: number;
}
const AppointmentCreated: React.FC = () => {
  /**
   * reset = quando chega na tela, o react não
   * permite que o usuário use o botão nativo
   * "voltar" do celular
   */
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    /**
     * Aqui eu indico a unica rota que vai
     * permanecer, ou seja, quando o usuario
     * chamar essa função será levado para
     * a pagina do dashboard.
     */
    reset({
      routes: [
        {
          name: 'Dashboard',
        }
      ],
      index: 0,
    })
  }, [reset])

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR });
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>OK</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
