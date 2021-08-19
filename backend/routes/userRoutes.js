import express from 'express';
import {
  authUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').post(registerUser).get(protect, admin, getAllUsers);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
