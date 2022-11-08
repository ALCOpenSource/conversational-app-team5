const config = require("../config");
const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();


const ValidateToken = async (req, res, next) => {
  const defaultAuth = admin.auth();
  const body = req.body;

  console.log(body)

  // idToken comes from the client app
  defaultAuth.verifyIdToken(body.token, true)
    .then((decodedToken) => {
      console.log(decodedToken)

      res.send(decodedToken);
    })
    .catch((error) => {
      console.log(error)
      if (error.code == 'auth/id-token-revoked') {
        // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
      } else {
        // Token is invalid.
      }
      next(error);
    });
}

router.post('/', ValidateToken);

module.exports = router;