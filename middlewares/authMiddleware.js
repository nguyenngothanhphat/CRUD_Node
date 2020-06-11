const jwt = require("jsonwebtoken");

const isEmpty = (obj) => {
  if (Object.keys(obj).length === 0) return true;
  return false;
};

const verifyToken = (token) => {
  jwt.verify(token, "MySuperSecretPassPhrase", (err, decoded) => {
    if (err) {
      return res.status(403);
    } else {
      return decoded;
    }
  });
};

const newToken = (data) => {
  jwt.sign(
    {
      body: data,
      algorithm: "HS256",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    "MySuperSecretPassPhrase"
  );
};

const auth = (req, res, next) => {
  const { headers } = req;
  if (isEmpty(headers)) {
    return res.status(400).json({ message: "Missing headers" });
  }
  const { authorization: token } = headers;
  if (!!token === false) {
    return res.status(400).json({ message: "Missing token" });
  }
  if (token) {
    const parts = token.split(" ");
    if (parts[0] !== "Bearer") {
      return res.status(400).json({ message: "Invalid token" });
    }
  }
  const nativeToken = token.split(" ")[1];
  const decoded = verifyToken(nativeToken);
  if ((decoded && decoded.exp, decoded.data, decoded.iat)) {
    return next();
  } else {
    return res.status(400).json({ message: "Token expires" });
  }
};

module.exports = {
  verifyToken,
  newToken,
  auth,
};
