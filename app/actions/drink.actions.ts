"use server";
import prisma from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

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

export async function createDrink(formData: FormData): Promise<DrinkResult> {
  const nameValue = formData.get("name") as string;
  const categoryValue = formData.get("category") as string;
  const ingredientsValue = JSON.parse(formData.get("ingredients") as string);
  const instructionsValue = formData.get("instructions") as string;

  if (!nameValue || !categoryValue || !ingredientsValue || !instructionsValue) {
    return { error: "All fields are required" };
  }

  const name: string = nameValue.toString();
  const slug: string = name
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-");
  const category: string = categoryValue.toString();
  const ingredients: string = JSON.parse(formData.get("ingredients") as string);
  const instructions: string = instructionsValue.toString();

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
    await prisma.drink.create({
      data: {
        name,
        slug,
        category,
        ingredients,
        instructions,
      },
    });
    revalidatePath(`/drinkit`);
    revalidatePath(`/admin/drinkit`);

    return { success: "Drink added" };
  } catch (error) {
    return { error: "Failed to create drink" };
  }
}

export async function updateDrink(
  id: string,
  formData: FormData
): Promise<UpdatedDrinkResult> {
  const nameValue = formData.get("name") as string;
  const categoryValue = formData.get("category") as string;
  const ingredientsValue = JSON.parse(formData.get("ingredients") as string);
  const instructionsValue = formData.get("instructions") as string;

  if (!nameValue || !categoryValue || !ingredientsValue || !instructionsValue) {
    return { error: "All fields are required" };
  }

  const name: string = nameValue.toString();
  const slug: string = name
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-");
  const category: string = categoryValue.toString();
  const ingredients: string = JSON.parse(formData.get("ingredients") as string);
  const instructions: string = instructionsValue.toString();

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
    revalidatePath(`/drinkit`);
    revalidatePath(`/admin/drinkit`);

    return { data: updatedDrink };
  } catch (error) {
    return { error: "Failed to create drink" };
  }
}

export async function deleteDrink(id: string) {
  try {
    const deletedDrink = await prisma.drink.delete({
      where: { id },
    });

    revalidatePath(`/drinkit`);
    revalidatePath(`/drinkit/${deletedDrink.slug}`);
    revalidatePath(`/admin/drinkit`);
    revalidatePath(`/admin/drinkit/${deletedDrink.slug}`);

    return { success: "Drink deleted!" };
  } catch (error: any) {
    return { error: error.message };
  }
}
