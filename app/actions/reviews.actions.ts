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

export async function createReview(
  formData: FormData
): Promise<CreatingResult> {
  const drink = formData.get("drink") as string;

  const rating = formData.get("rating") as string;
  const introduction = formData.get("introduction") as string;
  const review = formData.get("review") as string;

  const slug: string = drink
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-");

  if (!drink || !rating || !introduction || !review) {
    return { error: "All fields are required" };
  }

  const { userId } = auth();

  let creatorName = "unknown";

  if (userId) {
    const user = await clerkClient.users.getUser(userId);
    if (user?.firstName) {
      creatorName = user.firstName;
    }
  }

  try {
    const reviewData: ReviewData = await prisma.review.create({
      data: {
        drink,
        slug,
        rating,
        introduction,
        review,
        creator: creatorName,
      },
    });
    await Promise.all([
      revalidatePath(`/arvostelut`),
      revalidatePath(`/admin/arvostelut`),
      revalidatePath(`/`),
      revalidatePath(`/admin/`),
    ]);

    return { success: "Arvostelu lisätty!" };
  } catch (err: any) {
    console.error("Arvostelun luominen epäonnistui:", err);
    return { error: err.message || "Arvostelun luominen epäonnistui" };
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

export const getLatestReviews = async (limit: number) => {
  return await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
};
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

  if (!drink || !rating || !introduction || !review) {
    return { error: "All fields are required" };
  }

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
    await Promise.all([
      revalidatePath(`/arvostelut/${slug}`),
      revalidatePath(`/admin/arvostelut/${slug}`),
      revalidatePath(`/arvostelut`),
      revalidatePath(`/admin/arvostelut`),
      revalidatePath(`/`),
      revalidatePath(`/admin/`),
    ]);

    return { data: updatedReview };
  } catch (error: any) {
    console.error("Virhe arvostelua päivitettäessä:", error);
    return { error: error.message || "Arvostelun päivittäminen epäonnistui." };
  }
}

export async function deleteReview(id: string) {
  try {
    const deletedReview = await prisma.review.delete({
      where: { id },
    });

    await Promise.all([
      revalidatePath(`/arvostelut`),
      revalidatePath(`/admin/arvostelut`),
      revalidatePath(`/`),
      revalidatePath(`/admin/`),
    ]);

    return { success: "Arvostelu poistettu" };
  } catch (error: any) {
    console.error("Virhe poistaessa arvostelua: ", error);
    return { error: error.message || "Arvostelun poistaminen epäonnistui." };
  }
}
