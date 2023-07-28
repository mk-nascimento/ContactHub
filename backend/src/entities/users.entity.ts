import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { getRounds, hashSync } from 'bcryptjs';

enum UserRole {
  ADMIN = 'admin',
  USER = 'client',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date | string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const rounds: number = getRounds(this.password);

    if (!rounds) this.password = hashSync(this.password);
  }
}
