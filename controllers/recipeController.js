module.exports = function (db) {
  return {
    getRecipes: (req, res) => {
      db.User.sync().then(() => {
        return db.Recipe.findAll().then((req) => {
          res.status(200).json({ result: req });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    saveRecipe: (req, res) => {
      if (!req.body.name) {
        return res.json({ message: 'Name required!' });
      }

      db.Recipe.sync().then(() => {
        const newRecipe = {
          name: req.body.name,
          instructions: "   ",
          isPublic: 1,
          servingSize: req.body.size || 1,
          mediaLink: req.body.image || "https://",
          summarySection: req.body.additional_information || "information",
        };

        return db.Recipe.create(newRecipe).then((req) => {
          return res.redirect('/dashboard');
          // res.status(200).json({ message: 'Created successfully.' });
          // recipeId = req.dataValues.id;
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    // saveIngredient: (req, res) => {
    //   db.Ingredients.sync().then(() => {
    //     const newIngredients = {
    //       qual: req.body.email,
    //       password: req.body.password,
    //       firstName: req.body.firstName,
    //       lastName: req.body.lastName
    //     };

    //     return db.User.create(newUser).then(() => {
    //       res.status(200).json({ message: 'Registered successfully.' });
    //     });
    //   }).catch((err) => {
    //     console.log(err);
    //     res.status(403).json({ error: 'Email already exists!' });
    //   });
    // }
  };
};
