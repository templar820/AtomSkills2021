import { DataTypes, Sequelize } from 'sequelize';
import db from '../config/db';
import es from '../config/es';

const saveDocument = (instance: any, name) => {
  // return es.create({
  //   index: name,
  //   type: name,
  //   id: instance.dataValues.id,
  //   body: { name: instance.dataValues.name },
  // });
};

const updateDocument = (instance: any, name:string) => {
  // return es.update({
  //   id: instance.dataValues.id,
  //   index: name,
  //   body: { doc: { name: instance.dataValues.name } },
  // });
};

const deleteDocument = (instance: any, name) => {
  // return es.delete({
  //   index: name,
  //   type: name,
  //   id: instance.dataValues.id,
  // });
};

const User = db.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  first_name: { type: DataTypes.STRING },
  patronymic: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'MANAGER' },
  disabled: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Points = db.define('points', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  address: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  x: { type: DataTypes.DECIMAL },
  y: { type: DataTypes.DECIMAL },
  disabled: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Organisations = db.define('organisations', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  inn: { type: DataTypes.STRING },
  disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Responsible = db.define('responsible', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FIO: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  disabled: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Application = db.define('applications', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE },
  current_status: { type: DataTypes.STRING, defaultValue: 'NEW' },
  dispatch_date: { type: DataTypes.DATE },
  arrival_date: { type: DataTypes.DATE },
  price: { type: DataTypes.INTEGER },
  appl_return_id: { type: DataTypes.INTEGER },
});

const ApplicationHistory = db.define('application_histories', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING, defaultValue: 'NEW' },
  commit: { type: DataTypes.STRING },
});

const Goods = db.define('goods', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  count: { type: DataTypes.INTEGER, defaultValue: 1 },
  weight: { type: DataTypes.DECIMAL, defaultValue: 1 },
  volume: { type: DataTypes.DECIMAL, defaultValue: 1 },
  requirements: { type: DataTypes.STRING },
});

const RouteSheet = db.define('route_sheets', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING },
});

const Route = db.define('routes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING },
  order: { type: DataTypes.INTEGER },
  plan_date_from: { type: DataTypes.DATE },
  fact_date_from: { type: DataTypes.DATE },
  plan_date_to: { type: DataTypes.DATE },
  fact_date_to: { type: DataTypes.DATE },
}, {
  indexes: [
    {
      unique: true,
      fields: ['route_sheets_id', 'order']
    }
  ]
});

// const Product = db.define('products', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING },
// }, {
//   hooks: {
//     afterCreate: saveDocument,
//     afterDestroy: deleteDocument,
//     afterUpdate: updateDocument,
//   }
// });
//
// const Substance = db.define('substance', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING },
//   code: { type: DataTypes.STRING },
// });

// const Car = db.define('car', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING },
// });
//
// const Oil = db.define('oil', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.INTEGER },
// });
//
// const Car_Oil = db.define('Car_Oil', {
//   selfGranted: DataTypes.BOOLEAN
// }, { timestamps: false });
//
// Car.belongsToMany(Oil, { through: Car_Oil });
// Oil.belongsToMany(Car, { through: Car_Oil });
//
// Substance.hasMany(Product);
// Product.belongsTo(Substance, { as: 'substance' });

User.belongsTo(Points, { as: Points.name, foreignKey: 'point_id', targetKey: 'id' });
Points.hasMany(User, { as: User.name, foreignKey: 'point_id' });

User.hasMany(RouteSheet, { as: RouteSheet.name, foreignKey: 'courier_id' });
RouteSheet.belongsTo(User, { as: User.name, foreignKey: 'courier_id', targetKey: 'id' });

Route.belongsTo(RouteSheet, { as: RouteSheet.name, foreignKey: 'route_sheets_id', targetKey: 'id' });
RouteSheet.hasMany(Route, { as: Route.name, foreignKey: 'route_sheets_id' });

Route.belongsTo(Points, { as: 'relation_point_from_id', foreignKey: 'point_from_id', targetKey: 'id' });
Points.hasMany(Route, { as: 'relation_point_from_id', foreignKey: 'point_from_id' });

Route.belongsTo(Points, { as: 'relation_point_to_id', foreignKey: 'point_to_id', targetKey: 'id' });
Points.hasMany(Route, { as: 'relation_point_to_id', foreignKey: 'point_to_id' });
Route.hasMany(Application, { as: Application.name, foreignKey: 'route_id' });
Application.belongsTo(Route, { as: Route.name, foreignKey: 'route_id' });

//Application.belongsTo(Application, { as: 'appl_return', foreignKey: 'appl_return_id', targetKey: 'id' });
//Application.hasMany(Application, { as: 'appl_return', foreignKey: 'appl_return_id' });

Application.belongsTo(Organisations, { as: 'sender', foreignKey: 'sender_id', targetKey: 'id' });
Organisations.hasMany(Application, { as: 'sender', foreignKey: 'sender_id' });

Application.belongsTo(Organisations, { as: 'recipient', foreignKey: 'recipient_id', targetKey: 'id' });
Organisations.hasMany(Application, { as: 'recipient', foreignKey: 'recipient_id' });

Points.hasMany(Application, { as: 'point_from', foreignKey: 'point_from_id' });
Application.belongsTo(Points, { as: 'point_from', foreignKey: 'point_from_id', targetKey: 'id' });
Points.hasMany(Application, { as: 'point_to', foreignKey: 'point_to_id' });
Application.belongsTo(Points, { as: 'point_to', foreignKey: 'point_to_id', targetKey: 'id' });

Application.belongsTo(Responsible, { as: 'sender_responsible', targetKey: 'id' });
Application.belongsTo(Responsible, { as: 'recipient_responsible', targetKey: 'id' });

Application.hasMany(Goods, { as: Goods.name, foreignKey: 'application_id' });
Goods.belongsTo(Application, { as: Application.name, foreignKey: 'application_id', targetKey: 'id' });

Organisations.hasMany(Responsible, { as: Responsible.name, foreignKey: 'organisations_id' });
Responsible.belongsTo(Organisations, { as: Organisations.name, foreignKey: 'organisations_id' });

Application.hasMany(ApplicationHistory, { as: ApplicationHistory.name, foreignKey: 'applications_id' });
ApplicationHistory.belongsTo(Application, { as: Application.name, foreignKey: 'applications_id' });

// User.hasOne(UserDetails, {as: 'user_details'});
// User.belongsTo(UserDetails, { as: 'user_details' });
export interface JWTUser {
  email: string;
  id: number;
  role: string;
}

export {
  User,
  Route,
  Points,
  Application,
  ApplicationHistory,
  Organisations,
  Responsible,
  Goods,
  RouteSheet
};
