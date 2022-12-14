// process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099'

const admin = require('firebase-admin');

const serviceAccount = require("../key/sdkf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// admin.initializeApp();

const ValidateToken = async (req, res, next) => {
  const defaultAuth = admin.auth();
  const token = req.body.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'];

  if (token === null || token === undefined || token.length === 0) {
    // there is no token
    return res.status(403).send({ message: 'No token provided.' });
  }

  defaultAuth.verifyIdToken(token, true)
    .then((decodedToken) => {
      // everything is good, save to request for use in other routes
      req.decoded = decodedToken;
      next();
    })
    .catch((error) => {
      if (error.code == 'auth/id-token-revoked') {
        // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
        return res.json({ message: 'Token has been revoked.' });
      } else {
        return res.json({ message: 'Token is invalid.' });
      }
    });
};


module.exports = ValidateToken;