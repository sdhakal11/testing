// pages/api/someProtectedRoute.js
import { auth } from '../../middlewares/auth';

const someProtectedHandler = (req, res) => {
  // Your protected route logic
};

export default auth(someProtectedHandler);
