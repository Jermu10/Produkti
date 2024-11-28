"use server";
import prisma from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function getUserDrinks() {
  const drinks = await prisma.drink.findMany({
    where: {
      category: "drinkki",
    },
  });
  if (drinks == null) return notFound();

  return drinks;
}

export async function getUserMoctails() {
  const moctails = await prisma.drink.findMany({
    where: {
      category: "mocktail",
    },
  });
  if (moctails == null) return notFound();
  return moctails;
}

export async function getDrink(slug: string) {
  const drink = await prisma.drink.findUnique({
    where: {
      slug: slug,
    },
  });
  if (drink == null) return notFound();
  return drink;
}

export async function getDrinks() {
  const drinks = await prisma.drink.findMany();
  if (drinks == null) return notFound();
  return drinks;
}

export const getNewestDrinks = async (limit: number) => {
  return await prisma.drink.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
};

export async function createDrink(formData: FormData): Promise<CreatingResult> {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const instructions = formData.get("instructions") as string;

  const ingredientsData = formData.get("ingredients") as string;
  const ingredients = JSON.parse(ingredientsData);

  if (!name || !category || !ingredients || !instructions) {
    return { error: "Täytä kaikki kohdat dumbass" };
  }

  const slug: string = name
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-");

  const { userId } = auth();

  let creatorName = "unknown";

  if (userId) {
    const user = await clerkClient.users.getUser(userId);
    if (user?.firstName) {
      creatorName = user.firstName;
    }
  }

  try {
    await prisma.drink.create({
      data: {
        name,
        slug,
        category,
        ingredients,
        instructions,
        creator: creatorName,
      },
    });
    await Promise.all([
      revalidatePath(`/moctailit`),
      revalidatePath(`/drinkit`),
      revalidatePath(`/admin/drinkit`),
      revalidatePath(`/admin/mocktailit`),
      revalidatePath(`/drinkit/${slug}`),
      revalidatePath(`/mocktailit/${slug}`),
      revalidatePath(`/admin/drinkit/${slug}`),
      revalidatePath(`/admin/mocktailit/${slug}`),
      revalidatePath(`/`),
      revalidatePath(`/admin`),
    ]);

    return { success: "Drinkki lisätty" };
  } catch (err: any) {
    console.error("Virhe drinkkiä lisättäessä:", err);
    return { error: err.message || "Drinkin lisäys epäonnistui." };
  }
}

export async function updateDrink(
  id: string,
  formData: FormData
): Promise<UpdatedDrinkResult> {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const instructions = formData.get("instructions") as string;

  const ingredientsData = formData.get("ingredients") as string;
  const ingredients = JSON.parse(ingredientsData);

  if (!name || !category || !ingredientsData || !instructions) {
    return { error: "Kaikki kentät ovat pakollisia." };
  }

  const slug: string = name
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-");

  try {
    const updatedDrink = await prisma.drink.update({
      where: { id },
      data: {
        name,
        slug,
        category,
        ingredients,
        instructions,
      },
    });
    await Promise.all([
      revalidatePath(`/drinkit`),
      revalidatePath(`/admin/drinkit`),
      revalidatePath(`/drinkit/${slug}`),
      revalidatePath(`/admin/drinkit/${slug}`),
      revalidatePath(`/`),
      revalidatePath(`/admin`),
      revalidatePath(`/drinkit/${slug}`),
      revalidatePath(`/mocktailit/${slug}`),
      revalidatePath(`/admin/drinkit/${slug}`),
      revalidatePath(`/admin/mocktailit/${slug}`),
    ]);

    return { data: updatedDrink };
  } catch (err: any) {
    console.error("Virhe drinkkiä päivittäessä:", err);
    return { error: err.message || "Drinkin päivitys epäonnistui." };
  }
}

export async function deleteDrink(id: string) {
  try {
    const deletedDrink = await prisma.drink.delete({
      where: { id },
    });
    await Promise.all([
      revalidatePath(`/drinkit`),
      revalidatePath(`/moctailit`),
      revalidatePath(`/admin/drinkit`),
      revalidatePath(`/admin/mocktailit`),
      revalidatePath(`/`),
      revalidatePath(`/admin`),
    ]);
    return { success: "Drinkki poistettu!" };
  } catch (err: any) {
    console.error("Virhe drinkkiä lisättäessä:", err);
    return { error: err.message || "Drinkin poisto epäonnistui." };
  }
}
