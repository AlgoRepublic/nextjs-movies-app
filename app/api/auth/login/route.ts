import * as bcrypt from 'bcrypt';
import dbConnect from '@/app/config/dbConnect';
import User from '@/app/models/user';
import { successResponse, errorResponse } from '@/app/utils/response';
import { signIn } from '../../../../auth';
import { revalidatePath } from 'next/cache';

export async function POST(request: any) {
  await dbConnect();

  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (!email) {
    return errorResponse('Invalid params', {
      errors: { email: { message: 'Please provide an email' } },
    });
  }

  if (!password) {
    return errorResponse('Invalid params', {
      errors: { password: { message: 'Please provide a password' } },
    });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return errorResponse('User not found', {
      errors: { user: { message: 'User not found' } },
    });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return errorResponse('Invalid Credentials', {
      errors: {
        email: { message: 'Invalid email' },
        password: { message: 'Invalid password' },
      },
    });
  }

  const token = user.generateAuthToken();

  const fd = new FormData();
  fd.append('email', email);
  fd.append('password', password);
  fd.append('token', token);
  fd.append('redirectTo', '/movies');
  fd.append('redirect', 'true');
  try {
    await signIn('credentials', fd);
  } catch (error) {
    console.log('error', error);
  }

  revalidatePath('/en/movies');
  revalidatePath('/fr/movies');

  return successResponse('User logged in successfully', {
    user: {
      email: user.email,
      token,
    },
  });
}
