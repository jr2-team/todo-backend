import { DataTypes, Model } from 'sequelize';
import sequelize from '../../Data/Database/dataBase';

export class Task extends Model {
    public id!: number;
    public name!: string;
    public state!: number;
}

Task.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: new DataTypes.STRING(250),
    },
    state: {
        allowNull: false,
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    tableName: 'tasks',
    timestamps: false,
});
