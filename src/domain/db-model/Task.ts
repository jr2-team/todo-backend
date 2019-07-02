import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tasks')
export default class Task {
    @PrimaryGeneratedColumn()
    public id!: number
    @Column({ length: 250 })
    public name!: string
    /*@Column({ length: 1000 })
    public description?: string
    @Column({ name: 'completion_date', nullable: true })
    public completionDate?: Date
    @Column({ name: 'creation_date', readonly: true })
    public creationDate!: Date*/
    @Column()
    public status!: number
}