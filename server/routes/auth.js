const router = require('express').Router();
const { User } = require('../db').models;
const axios = require('axios');
const jwt = require('jwt-simple');
const queryString = require('querystring');


router.get('/github', (req, res, next) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`;
    res.redirect(url);
})

router.get('/github/callback', async(req, res, next) => {
    try{
        let response = await axios.post('https://github.com/login/oauth/access_token', {
            code: req.query.code,
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: process.env.GITHUB_REDIRECT_URI
        })
        const parsed = queryString.parse(response.data);
        const { error, access_token } = parsed;
        if(error) {
            throw({ message: error });
        }
        response = await axios.get(`http://api.github.com/user?access_token=${access_token}`)
        const { id, login } = response.data;
        const attr = {
            githubUserId: id
        }
        let user = await User.findOne({ where: attr });
        if(!user) {
            attr.name = `github: ${login}`;
            user = await User.create(attr);
        }
        const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET)
        res.redirect(`/?token=${token}`)
    }
    catch(ex) { next(ex); }
})


module.exports = router;