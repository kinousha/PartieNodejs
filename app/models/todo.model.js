module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    label: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    etat: {
      type: Sequelize.INTEGER
    }
  });
  
  return Todo;
};
