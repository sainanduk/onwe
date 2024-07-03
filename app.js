const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const postsRoutes = require("./Routes/Post_route.js");
const userRoutes = require("./Routes/userRoutes.js");
const commentsRoutes = require("./Routes/Comments_route.js");
const usernameRoutes = require("./Routes/username_route.js");
const authRoutes = require("./Routes/authroutes.js");

const { sequelize, testConnection } = require("./Config/database");
const { auth } = require("./middlewares/middleware.js");
const {verifyTokenMiddleware, verifiedToken} = require("./middlewares/tokenVerifier.js");

const Admins = require("./models/Admins");
const Clubs = require("./models/Clubs");
const Comments = require("./models/Comments");
const Event = require("./models/Event");
const Magazines = require("./models/Magazines");
const Posts = require("./models/Posts");
const Users = require("./models/Users");

const app = express();
app.use(bodyParser.json());

// Token validation route

// Authentication routes
app.use(authRoutes);

// API routes with token verification
// app.use("/hi", verifiedToken);

app.get("/api", verifyTokenMiddleware, postsRoutes);
// app.use("/api/posts", postsRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/comments", commentsRoutes);

// app.use(postsRoutes);
// app.use( userRoutes);
// app.use( commentsRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

// Define associations
Comments.belongsTo(Posts, { foreignKey: "postId" });
Comments.belongsTo(Users, { foreignKey: "userId" });
Clubs.belongsTo(Users, { foreignKey: "admin" });
Magazines.belongsTo(Admins, { foreignKey: "owner" });
Posts.belongsTo(Users, { foreignKey: "authorId" });

Posts.hasMany(Comments, { foreignKey: "postId", as: "postComments" });
Users.hasMany(Comments, { foreignKey: "userId", as: "userComments" });
Users.hasMany(Clubs, { foreignKey: "admin", as: "adminClubs" });
Admins.hasMany(Magazines, { foreignKey: "owner", as: "ownedMagazines" });
Users.hasMany(Posts, { foreignKey: "authorId", as: "userPosts" });

// Test database connection and sync models
const initializeDatabase = async () => {
  try {
    await testConnection();
    console.log("Connection to the database has been established successfully.");

    await sequelize.sync(); // safer method for production
    console.log("Database and tables have been synced successfully.");
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
};

initializeDatabase();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
