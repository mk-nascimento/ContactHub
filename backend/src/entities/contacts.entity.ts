import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 90 })
  full_name: string;

  @Column({ type: 'varchar', length: 45 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  cellphone: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date | string;

  @ManyToOne(() => User, (user) => user.contacts, { onDelete: 'CASCADE' })
  user: User;
}
