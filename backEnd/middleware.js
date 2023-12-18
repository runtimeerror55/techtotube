const jwt = require("jsonwebtoken");
module.exports.isLoggedIn = async (request, response, next) => {
      try {
            const token = request.headers.authorization.split(" ")[1];

            if (!token) {
                  response.json({ status: "error", message: "please login" });
            } else {
                  const decodedToken = jwt.verify(token, "secret");

                  if (!decodedToken) {
                        response.status(500).json({
                              status: "error",
                              message: "not a valid token",
                        });
                  } else {
                        request.user = decodedToken;
                        next();
                  }
            }
      } catch (error) {
            response.status(500).json({
                  status: "error",
                  message: error.message + ", please login again",
            });
      }
};
