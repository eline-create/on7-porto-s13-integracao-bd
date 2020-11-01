//Model criado 
const tarefas = require("../models/tarefas");


const getAll = (req, res) => {
  console.log(req.url);
  tarefas.find(function(err, tarefas){
    res.status(200).send(tarefas);
  })
 };

const getById = (req, res) => {
  const id = req.params.id;
  //Find sempre retorna uma lista - Comando Mongo
  //FindOne retorna um unico documento
  tarefas.find( { id }, function(err, tarefas) {
    res.status(200).send(tarefas)
  })  
};

const postTarefa = (req, res) => {
  console.log(req.body)
  
  let tarefa = new tarefas(req.body)

  tarefa.save(function(err) {
    if(err) { 
      res.status(500).send({ message: err.message })
    }
    res.status(201).send(tarefa.toJSON())
  })
  
};

  //deleteMany remove mais de um registro ou delete on sem filtro, deleta tudo
  //deleteOne remove apenas um registro
  
  const deleteTarefa = (req, res) => {
    const id = req.params.id;
  
    tarefas.find({ id }, (err, tarefa) => {
      if (tarefa.length > 0) {
        tarefas.deleteMany({ id }, err => { 
             if(err) { 
            res.status(500).send({ 
              message: err.message, 
              status: "FAIL" 
             })
          }
          res.status(200).send({ 
            message: 'Tarefa removida com sucesso', 
            status: "SUCCESS" 
          })
        })
      }else{
        res.status(200).send({ 
          message: 'Não há tafera para ser removida', 
          status: "EMPTY" 
        })
      }
    })
  
  };
 


const deleteTarefaConcluida = (req, res) => {
  //Deleta quando concluído = true
  //const concluido = req.params.concluido;
  tarefas.find({ concluido: true }, (err, tarefa) => {
    if (tarefa.length > 0) {
      tarefas.deleteMany({ concluido: true }, err => { 
           if(err) { 
          res.status(500).send({ 
            message: err.message, 
            status: "Não rolou" 
           })
        }
        res.status(200).send({ 
          message: "Tarefa removida com sucesso", 
          status: "Uhuuuu!!!" 
        })
      })
    }else{
      res.status(200).send({ 
        message: "Não há tafera para ser removida", 
        status: "Vazio" 
      })
    }
  })
};


// const putTarefa = (req, res) => {
//   const id = req.params.id;
// // faz a atualização para o id escolhido
// //set significa valores que serão atualizados
//   tarefas.update({ id }, { $set : req.body }, (err) => {
//     if (err) {
//       res.status(500).send({ message: err.message })
//     }
//     res.status(200).send({message: "Registro alterado"})
//   })
// };

const putTarefa = (req, res) => {
  const id = req.params.id;

  tarefas.find({ id }, function(err, tarefa){
    if(tarefa.length> 0){
      //faz o update apenas para quem respeitar o id passado no parametro
      // set são os valores que serão atualizados
      tarefas.updateMany({ id }, { $set : req.body }, function (err) {
        if (err) {
          res.status(500).send({ message: err.message })
        }
        res.status(200).send({ message: "Registro alterado com sucesso"})
      })
    }else {
      res.status(200).send({ message: "Não há registros para serem atualizados com esse id"})
    }
  })

}


module.exports = {
  getAll,
  getById,
  postTarefa,
  deleteTarefa,
  deleteTarefaConcluida,
  putTarefa
};
