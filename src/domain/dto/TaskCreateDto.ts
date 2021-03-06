import { IsIn, IsInt, IsString } from 'class-validator'

export default class TaskCreateDto {
    @IsString()
    public name!: string
    @IsInt()
    @IsIn([ 0, 1, 2 ])
    public status!: number
    public description?: string
    public completionDate?: Date
    public creationDate?: Date
}