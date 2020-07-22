// entity = algo q vai ser salvo no banco de dados
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

// podemos ter propriedades dentro da classe que não são campos da tabela
// devemos informar o código, o q é o que não é coluna
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // muitos agendamento para 1 usuário
  // () => User = indica qual model deve ser usado
  @ManyToOne(() => User)
  // aqui estou dizendo qual campo relaciona
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
