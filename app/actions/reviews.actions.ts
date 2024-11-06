"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

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

  if (!drinkValue || !ratingValue || !introductionValue || !reviewValue) {
    return { error: "All fields are required" };
  }

  const drink: string = drinkValue.toString();
  const slug: string = drink
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-");
  const rating: string = ratingValue.toString();
  const introduction: string = introductionValue.toString();
  const review: string = reviewValue.toString();

  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

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
    revalidatePath(`/arvostelut`);
    revalidatePath(`/admin/arvostelut`);

    return { success: "Review added" };
  } catch (error) {
    return { error: "Review not added" };
  }
}

export async function getReview(slug: string) {
  const review = await prisma.review.findUnique({
    where: {
      slug: slug,
    },
  });
  if (review == null) return notFound();
  return review;
}
export async function updateReview(
  id: string,
  formData: FormData
): Promise<UpdatedReviewResult> {
  const drink = formData.get("drink") as string;
  const slug: string = drink
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-");
  const rating = formData.get("rating") as string;
  const introduction = formData.get("introduction") as string;
  const review = formData.get("review") as string;

  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        drink,
        slug,
        rating,
        introduction,
        review,
      },
    });

    return { data: updatedReview };
  } catch (error) {
    console.error("Failed to update review:", error);
    return { error: "Failed to update review" };
  }
}

export async function deleteReview(id: string) {
  try {
    const deletedReview = await prisma.review.delete({
      where: { id },
    });

    revalidatePath(`/arvostelut`);
    revalidatePath(`/arvostelut/${deletedReview.slug}`);
    revalidatePath(`/admin/arvostelut`);
    revalidatePath(`/admin/arvostelut/${deletedReview.slug}`);

    return { success: "Review deleted!" };
  } catch (error: any) {
    return { error: error.message };
  }
}
