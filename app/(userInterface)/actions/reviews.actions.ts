"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

interface ReviewData {
  drink: string;
  slug: string;
  rating: string;
  introduction: string;
  review: string;
}

interface ReviewResult {
  data?: ReviewData;
  error?: string;
}

export async function getAllReviews() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (reviews == null) return notFound();
  return reviews;
}

export async function createReview(formData: FormData): Promise<ReviewResult> {
  const drinkValue = formData.get("drink");
  const ratingValue = formData.get("rating");
  const introductionValue = formData.get("introduction");
  const reviewValue = formData.get("review");

  // Check for input values
  if (!drinkValue || !ratingValue || !introductionValue || !reviewValue) {
    return { error: "All fields are required" };
  }

  const drink: string = drinkValue.toString();
  const slug: string = drink.toLowerCase().replace(/\s+/g, "-");
  const rating: string = ratingValue.toString();
  const introduction: string = introductionValue.toString();
  const review: string = reviewValue.toString();

  // Get logged in user
  const { userId } = auth();

  // Check for user
  if (!userId) {
    return { error: "User not found" };
  }

  // Fetch user details
  const user = await clerkClient.users.getUser(userId);
  const firstName = user?.firstName;

  if (!firstName) {
    return { error: "User not found" };
  }

  try {
    const reviewData: ReviewData = await prisma.review.create({
      data: {
        drink,
        slug,
        rating,
        introduction,
        review,
        creator: firstName,
      },
    });
    revalidatePath("/");

    return { data: reviewData };
  } catch (error) {
    return { error: "Review not added" };
  }
}
