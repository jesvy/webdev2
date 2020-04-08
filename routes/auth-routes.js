const router = require ('express').router();
const passport = require('passport');
router.get('/login', (req,res)=>{
    res.render('login');
})
router.get('/google',(req,res)=>{
    res.send('logging in with google');
});
router.get('/logout',(req,res)=>{
    res.send('logging out');
});
router.get('/google/callback',passport.authenticate('google'),(req, res)=>{
    res.send('you reached the callback URI');
});
module.exports = router;