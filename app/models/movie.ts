import mongoose from "mongoose";

export interface Movies extends mongoose.Document {
  title: string;
  publishingYear: number;
  poster: string;
}

const MovieSchema = new mongoose.Schema<Movies>({
  title: {
    type: String,
    required: [true, "Please provide a title for the movie"],
  },
  publishingYear: {
    type: Number,
    required: [true, "Please provide the publishing year of the movie"],
  },
  poster: {
    type: String,
    required: [true, "Please provide the poster of the movie"],
  },
});

export default mongoose.models.Movie ||
  mongoose.model<Movies>("Movie", MovieSchema);
