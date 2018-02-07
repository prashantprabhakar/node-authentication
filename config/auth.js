// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '524069079139-sotv9i6ivvst43ip6upvh8keuidh758f.apps.googleusercontent.com',
        'clientSecret'  : 'xENG2SbYCR9Nf53NBnPTiq9g',
        'callbackURL'   : 'http://localhost:4000/auth/google/callback'
    }

};
