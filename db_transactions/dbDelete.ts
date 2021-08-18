import {Points, User, Organisations, Responsible, Application, Goods} from './backend/src/models/DbModel'
import es from "./backend/src/config/es";







async function createTransaction() {
  
  try {
    
    Points.destroy({
      where: {},
      cascade: true,
      truncate: true
    })

    User.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })

    Responsible.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })

    Organisations.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })

    Goods.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })

    Application.destroy({
      where: {},
      truncate: true,
      cascade: true,
    })


    // await es.indices.delete({
    //   index: "a",
    // });
  

    
  } catch (error) {
    console.log(error);
  }
}

createTransaction();
