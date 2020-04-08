const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

passport.use(
    new GoogleStrategy({
        
        callbackURL: '/auth/google/callback',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done)=>{
     
        console.log('##########################');
        console.log(profile);
        console.log(profile.id)
        console.log(profile.displayName)
        console.log(profile.photos[0].value)
    })
);