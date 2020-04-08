  
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done)=>{
    done(null, user.id); 
});

passport.deserializeUser((id, done)=>{
  
    User.query(`SELECT "oauth".findById(${id})`,(err,res)=>{
        if(err){
            console.log(err);
        }else{
            console.log(res.rows[0]);
            done(null, user); 
        }        
    });
});

passport.use(
    new GoogleStrategy({
        
        callbackURL: '/auth/google/callback',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done)=>{
        
        console.log('##########################');
        console.log(profile);
        
       

        User.query(`CALL "oauth".insert_when_unique(${profile.id},
                                                    '${profile.displayName}',
                                                    '${profile.photos[0].value}');`,
                    (err,res)=>{
                        console.log(">>>>>>>>>>>>>>>>>>>>>>");
                        const _user = {
                            id: profile.id,
                            name: profile.displayName,                                
                            picture: profile.photos[0].value
                        };

                        if(err){
                           
                            const currentUser = _user;
                            console.log('User is ', JSON.stringify(currentUser));
                            done(null, currentUser);
                        
                        }else{
                           
                            const newUser = _user;
                            console.log('New User created: ' + JSON.stringify(newUser));
                            done(null, newUser);
                          
                        }
                    });


    })
);