import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export default class Task {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        length: 250,
    })
    public name!: string;

    @Column()
    public state!: number;
}