const router = require('express').Router();
const { User, Pair } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll({ raw: true });
    res.render('index', { allUsers });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// router.get('/user/:id', (req, res) => {
//   res.render('randomUser');
// });

router.post('/new', async (req, res) => {
  console.log(req.body);
  const { firstVal, secondVal } = req.body;
  try {
    const temp = await Pair.create({ firstVal, secondVal, user_id: req.session.userid });
    console.log(temp);
    return res.json({
      firstVal, secondVal, user: req.session.name, id: temp.dataValues.id,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.get('/chart', (req, res) => {
  res.render('chart');
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Pair.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/getall', async (req, res) => {
  try {
    const allStats = await Pair.findAll({ where: { user_id: req.session.userid } });
    allStats.map((e) => e.dataValues.name = req.session.name);
    console.log(allStats);
    res.json(allStats);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
