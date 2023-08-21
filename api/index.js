import express from "express";
import dotenv from "dotenv";
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import booksRoute from './routes/booksRoute.js'
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute);
app.use('/api/books',booksRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  res.status(errorStatus).send(errorMessage);
});


app.get("/", (req, res) => {
  res.send("server running successfully");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
