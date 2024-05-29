'use server';
import dbConnect from '@/app/config/dbConnect';
import Movie from '@/app/models/movie';
import { NextRequest } from 'next/server';
import { saveFile } from '@/app/utils/storage';
import { pagyParams, pagyRes } from '@/app/utils/pagination';
import { successResponse, errorResponse } from '@/app/utils/response';
import { authenticateToken } from '@/app/utils/auth';
import { revalidatePath, unstable_noStore } from 'next/cache';

export async function GET(request: NextRequest) {
  unstable_noStore()
  await dbConnect()
  // const { error } = await authenticateToken(
  //   request.headers.get("Authorization")
  // );

  // if (error) {
  //   return errorResponse("Unauthorized", error);
  // }

  const searchParams = request.nextUrl.searchParams
  const { page, perPage } = pagyParams(
    searchParams.get('page'),
    searchParams.get('perPage')
  )

  const movies = await Movie.find({})
    .select({ title: 1, publishingYear: 1, poster: 1 })
    .sort({ title: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean()
    .exec()

  const count = await Movie.countDocuments({})

  const totalPages = Math.ceil(Number(count) / 12);

  const pagyMovies = pagyRes(movies, count, page, perPage);

  revalidatePath('/en/movies');
  revalidatePath('/fr/movies');

  return successResponse('Movies List', { movies: pagyMovies, totalPages });
}

export async function POST(request: any) {
  unstable_noStore()
  await dbConnect()
  // const { error } = await authenticateToken(
  //   request.headers.get('Authorization')
  // );

  // if (error) {
  //   return errorResponse('Unauthorized', error);
  // }

  const formData = await request.formData()
  const title = formData.get('title')
  const publishingYear = formData.get('publishingYear')
  const posterFile = formData.get('poster')
  const poster = await saveFile(posterFile, 'posters')

  const movie = new Movie({
    title,
    publishingYear,
    poster,
  })

  try {
    await movie.save()
    revalidatePath('/en/movies')
    revalidatePath('/fr/movies')

    return successResponse('Movie saved successfully', { movie })
  } catch (error: any) {
    return errorResponse('Failed to save movie', error.errors)
  }
}
