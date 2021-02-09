import express from 'express';
import usersRouter from './server';
const app = express();

app.use(express.json());
app.use('/users', usersRouter);
app.listen(3000, () => {
  console.log('Server started');
});
