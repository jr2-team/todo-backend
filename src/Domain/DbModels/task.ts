import { Model, DataTypes } from 'sequelize';
import sequelize from '../../Data/Database/dataBase';

export class Task extends Model {
    public id!: number;
    public name!: string;
    public state!: number;
}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING(250),
        allowNull: false
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'tasks',
    timestamps: false,
});
