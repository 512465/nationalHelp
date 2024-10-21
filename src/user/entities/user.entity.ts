import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  appId: number;

  @Column()
  displayName: string;

  @Column({ default: '' })
  loginId: string;

  @Column({ default: false })
  logined: boolean;

  @Column()
  code: string;
}
