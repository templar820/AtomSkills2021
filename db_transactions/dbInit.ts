import points from "./data/points.json";
import users from "./data/users.json";
import organisations from "./data/organisations.json";
import responsible from "./data/responsible.json";
import applications from "./data/applications.json";
import goods from "./data/goods.json";
import {Points, User, Organisations, Responsible, Application, Goods} from "./backend/src/models/DbModel"
import db from "./backend/src/config/db"
import bcrypt from 'bcrypt';

async function getPassword (password) {
  return await bcrypt.hash(password, 5)
}

function getPointById(id: string){
  const product = products.find(el => el.ID === id);
  if (product){
    return {id: product.ID, name: product.NAME};
  }
  return null;
}
async function createTransaction() {
  const t = await db.transaction();
  
  try {
    for await (let point of points) {
      await Points.create(point, {
        transaction: t,
      })
    }

    for await (let user of users) {
      const password = await getPassword(user.password)
      await User.create({...user, password}, {
        transaction: t,
      })
    }

    for await (let organisation of organisations) {
      await Organisations.create(organisation, {
        transaction: t,
      })
    }

    for await (let resp of responsible) {
      await Responsible.create(resp, {
        transaction: t,
      })
    }

    for await (let application of applications) {
      await Application.create(application, {
        transaction: t,
      })
    }

    for await (let good of goods) {
      await Goods.create(good, {
        transaction: t,
      })
    }

    await t.commit();

    await db.query("SELECT setval('applications_id_seq', (SELECT MAX(id) FROM applications))");
    await db.query("SELECT setval('goods_id_seq', (SELECT MAX(id) FROM goods))");
    await db.query("SELECT setval('organisations_id_seq', (SELECT MAX(id) FROM organisations))");
    await db.query("SELECT setval('points_id_seq', (SELECT MAX(id) FROM points))");
    await db.query("SELECT setval('responsibles_id_seq', (SELECT MAX(id) FROM responsibles))");
    await db.query("SELECT setval('route_sheets_id_seq', (SELECT MAX(id) FROM route_sheets))");
    await db.query("SELECT setval('routes_id_seq', (SELECT MAX(id) FROM routes))");
    await db.query("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");

  } catch (error) {
    
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    console.log(error);
    await t.rollback();
    
  }
}

createTransaction();







