const router = require('express').Router();
const axios = require('axios');


module.exports = (db) => {
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('landing', user);
    } else {
      res.render('landing');
    }
  });

  router.get('/recipe', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('recipe', user);
    } else {
      res.render('recipe');
    }
  });

  // router.get('/createRecipe', (req, res) => {
  //   if (req.isAuthenticated()) {
  //     const user = {
  //       user: req.session.passport.user,
  //       isloggedin: req.isAuthenticated()
  //     };
  //     res.render('createRecipe', user);
  //   } else {
  //     res.render('createRecipe');
  //   }
  // });

// router.get('/dashboard', async (req, res) => {
router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      $.ajax({
        type: 'GET',
        url: '/api/recipe/getRecipes',
      }).then((result) => {
        console.log(result);
        // res.render('dashboard', user);
      });
    } else {
      // $.ajax({
      //   type: 'GET',
      //   url: '/api/recipe/getRecipes',
      // }).then((result) => {
      //   console.log(result);
      //   // res.render('dashboard', user);
      // });
      // recipes = await Promise.all(new Promise ( ( resolve, reject) => { axios.get(req.protocol + "://" + req.get('host') + '/api/recipe/getRecipes').then((result) => {
      //   resolve(result);
      // })}));
      // console.log(result);
      // res.render('dashboard', result);
      res.render('dashboard');
    }
  });

  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', {
        path: '/'
      });
      res.redirect('/');
    });
  });

  return router;
};
