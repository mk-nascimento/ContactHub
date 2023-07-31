import app from './app';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
