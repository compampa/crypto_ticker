const router = require('express').Router();
const { User, Pair } = require('../db/models');

router.get('/', (req, res) => {
  res.render('user');
});

router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { login: req.body.login, password: req.body.password },
    });
    if (user) {
      req.session.name = req.body.login;
      req.session.userid = user.dataValues.id;
      res.sendStatus(200);
    } else res.sendStatus(500);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.get('/registration', (req, res) => {
  res.render('registration');
});
router.post('/registration', async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.name = req.body.login;
    req.session.userid = user.dataValues.id;
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie();
  res.redirect('/');
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const allCharts = await Pair.findAll({ where: { user_id: id } });
    res.render('randomUser', { allCharts });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.post('/:id', async (req, res) => {
  try {
    const allStats = await Pair.findAll({ where: { user_id: +req.params.id } });
    const user = await User.findOne({ where: { id: +req.params.id } });
    allStats.map((e) => e.dataValues.name = user.dataValues.login);
    console.log(allStats);
    res.json(allStats);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
module.exports = router;




