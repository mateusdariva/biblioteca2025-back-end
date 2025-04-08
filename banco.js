import { Sequelize } from "sequelize";

//configuração da conexão com o banco de dados
const sequelize = new Sequelize('biblioteca2025', 'postgres', '1234', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default sequelize;