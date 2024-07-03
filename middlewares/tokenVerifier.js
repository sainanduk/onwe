// const { clerkClient } = require('@clerk/clerk-sdk-node');
// const dotenv = require('dotenv');
// dotenv.config();
// // Initialize Clerk client with your API key
// const clerk = new clerkClient({
//   apiKey: process.env.CLERK_API_KEY
// });

const { verifyJwt } = require("@clerk/backend/jwt");

// // Middleware to verify Clerk authentication
// const clerkAuthMiddleware = async (req, res, next) =>{
//   const authHeader = req.headers['authorization'];

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   const token = authHeader.substring(7); // Remove 'Bearer ' prefix

//   try {
//     const user = await clerk.getUser(token);
//     req.user = user; // Attach user object to request
//     next();
//   } catch (error) {
//     console.error('Clerk authentication error:', error);
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// module.exports = clerkAuthMiddleware;

// const { clerkClient, verifyToken } = require("@clerk/clerk-sdk-node");
// const dotenv = require("dotenv");
// dotenv.config();

// // const clerk = new clerkClient({
// //   apiKey: process.env.CLERK_API_KEY,
// // });
// const verifiedToken = async (req, res, next) => {
//   const { token } = req.body; // Extract token from request body

//   if (!token) {
//     return res.status(400).json({ message: "Token is missing" });
//   }

//   try {
//     // Verify the token
//     const verifiedToken = await verifyToken(token, {
//       jwtKey:  `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAupVC/SlO34bTd5qiACt9
//       fiU4w9ekNONxSjHQg2/VGmFZHMQyJ83C8bqJq+pRVn08hODxjHcAqoMkitjafoIO
//       XUHV4mlEkg0/41TddzAgbv2w/kZhuwHI1f8K/L65eyqhH0xyRE9mhVgBfOAfxzGX
//       E8X/HgmiTDExU7fIdAMcYlJpvkRX1T2SjbCmATCmDYqqIx4IzQ2wreKHFp7yiL4x
//       o8TDhIoCvV/cQvkQf05IyZ7Was1kf1lOS/0ZFrKBYo1Eszy0Peslo78lfGOV7QV5
//       j8ELm9Lcsf1peGIFCat2M3zK+eagVuHdD5iXB9aIZD4awmNROFofaz0HSlT4g6d6
//       lwIDAQAB`,
//     });
//     // Call next to proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token", error: error.message });
//   }
// };

// module.exports = { verifiedToken };

// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();
// // Replace with your Clerk public key from the Clerk dashboard
// const publicKey = process.env.CLERK_PUBLISHABLE_KEY;

// const verifyTokenMiddleware = (req, res, next) => {
//   const token = req.body || req.headers["authorization"].split(" ")[1];

//   console.log("got token" + token);

//   const secretkey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAupVC/SlO34bTd5qiACt9
// fiU4w9ekNONxSjHQg2/VGmFZHMQyJ83C8bqJq+pRVn08hODxjHcAqoMkitjafoIO
// XUHV4mlEkg0/41TddzAgbv2w/kZhuwHI1f8K/L65eyqhH0xyRE9mhVgBfOAfxzGX
// E8X/HgmiTDExU7fIdAMcYlJpvkRX1T2SjbCmATCmDYqqIx4IzQ2wreKHFp7yiL4x
// o8TDhIoCvV/cQvkQf05IyZ7Was1kf1lOS/0ZFrKBYo1Eszy0Peslo78lfGOV7QV5
// j8ELm9Lcsf1peGIFCat2M3zK+eagVuHdD5iXB9aIZD4awmNROFofaz0HSlT4g6d6
// lwIDAQAB`;
//   try {
//     const { result, error } = verifyJwt(token, {
//       key: secretkey,
//     });
//     if (error) {
//       throw new Error(error);
//     } else {
//       console.log("Token verified");
//       next();
//     }
//   } catch (err) {
//     console.error("Invalid Clerk token:", err.message);
//   }
// };

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token is used
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { result, error } = await verifyJwt(token, {
      issuer: "https://wondrous-ghoul-76.clerk.accounts.dev",
      authorizedParties: ['http://localhost:3000', 'https://example.com']
    });

    if (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Token is valid, proceed with your logic
    req.user = result.payload; // Store the decoded payload for further use if needed
    next();
  } catch (err) {
    console.error("JWT verification exception:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { verifyTokenMiddleware };

// const { verifyToken } = require('@clerk/backend');
// const dotenv = require('dotenv');
// dotenv.config();

// const verifyTokenMiddleware = async (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader ? authHeader.split(' ')[1] : null;

//   if (!token) {
//     return res.status(401).json({ error: 'Token not found. User must sign in.' });
//   }

//   try {
//     const verifiedToken = await verifyToken(token, {
//       jwtKey: process.env.CLERK_JWT_KEY,
//     });

//     // Check if the token is expired or not yet valid
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (verifiedToken.exp < currentTime || verifiedToken.nbf > currentTime) {
//       throw new Error('Token is expired or not yet valid');
//     }

//     // Check if the token is issued by a permitted origin
//     const permittedOrigins = ['http://localhost:3000', 'https://example.com']; // Replace with your permitted origins
//     if (verifiedToken.azp && !permittedOrigins.includes(verifiedToken.azp)) {
//       throw new Error("Invalid 'azp' claim");
//     }

//     // Attach verified token to request
//     req.user = verifiedToken;

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({ error: 'Token not verified.' });
//   }
// };

// module.exports = { verifyTokenMiddleware };
