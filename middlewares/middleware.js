const idAndName = (req, res, next) => {
  res.locals.name = req.session?.name;
  res.locals.userid = req.session?.userid;
  console.log('RES LOCALS ============> ', res.locals);
  console.log('REQ SESSION ============> ', req.session);
  next();
};

module.exports = { idAndName };
