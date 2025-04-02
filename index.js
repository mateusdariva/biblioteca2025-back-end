import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('biblioteca2025', 'postgres', '1234', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres', 
    define:{
        timestamps: false,
        freezeTableName: true
    }
  });

  //mapeamento da model Editora
  const Editora = sequelize.define(
    'editora',
    {
      // Model attributes are defined here
      ideditora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
      },
      nomeeditora: {
        type: DataTypes.STRING(60),
        allowNull: false
        // allowNull defaults to true
      },
    cnpj: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    endereco: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    }
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const app = express ();
app.use (express.json());

app.get('/teste', (req, res)=>{res.send('Teste ok')});

//rotas crud da tabela editora
app.get('/editora', (req, res)=>{
    const respostaBanco = await Editora.findAll ();
    res.json(respostaBanco);
});

app.get('/editora/:id', (req, res)=>{
    const id = req.params.id = await Editora.findByPk(id);
    res.json(respostaBanco);
});



app.listen(3000, ()=>{console.log('Servidor rodando.')});
