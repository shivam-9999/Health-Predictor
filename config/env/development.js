//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
    db: 'mongodb://127.0.0.1:27017/students',
    sessionSecret: 'developmentSessionSecret',
    secretKey: 'real_secret'
};
