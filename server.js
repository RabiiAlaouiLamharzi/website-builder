import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import uiRoute from './ui/ui.route'
import pageRoute from './page/page.route';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/resources', express.static(path.join(__dirname, 'public')));
app.use('views', express.static(path.join(__dirname, 'views')));

const mongoUri = 'mongodb+srv://builder:pass@cluster0.jcbgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.set('view engine', 'hbs')

app.use('/pages', pageRoute);
app.use('/', uiRoute);

const PORT =  process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(PORT);
})