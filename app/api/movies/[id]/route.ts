import dbConnect from '@/app/config/dbConnect';
import Movie from '@/app/models/movie';
import { errorResponse, successResponse } from '@/app/utils/response';
import { saveFile } from '@/app/utils/storage';
import { authenticateToken } from '@/app/utils/auth';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  // const { error } = await authenticateToken(
  //   request.headers.get('Authorization')
  // );

  // if (error) {
  //   return errorResponse('Unauthorized', error);
  // }

  const id = params.id;

  const movie = await Movie.findById(id)
    .select({ title: 1, publishingYear: 1, poster: 1 })
    .lean()
    .exec();

  if (!movie) {
    return errorResponse('Movie not found');
  }

  return successResponse('Movie Details', { movie });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  // const { error } = await authenticateToken(
  //   request.headers.get('Authorization')
  // );

  // if (error) {
  //   return errorResponse('Unauthorized', error);
  // }

  const id = params.id;
  const movie = await Movie.findById(id);

  if (!movie) {
    return errorResponse('Movie not found');
  }

  const formData = await request.formData();

  if (formData.has('title')) {
    movie.title = formData.get('title');
  }

  if (formData.has('publishingYear')) {
    movie.publishingYear = formData.get('publishingYear');
  }

  if (formData.has('poster')) {
    const posterFile = formData.get('poster');
    movie.poster = await saveFile(posterFile, 'posters');
  }

  try {
    await movie.save();

    revalidatePath('/en/movies');
    revalidatePath('/fr/movies');

    return successResponse('Movie updated successfully', {
      title: movie.title,
      publishingYear: movie.publishingYear,
      poster: movie.poster,
    });
  } catch (error: any) {
    return errorResponse('Failed to update movie', error.errors);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  // const { error } = await authenticateToken(
  //   request.headers.get('Authorization')
  // );

  // if (error) {
  //   return errorResponse('Unauthorized', error);
  // }

  const id = params.id;
  const movie = await Movie.findById(id);

  if (!movie) {
    return errorResponse('Movie not found');
  }

  await movie.deleteOne();

  revalidatePath('/en/movies');
  revalidatePath('/fr/movies');

  return successResponse('Movie deleted successfully');
}
