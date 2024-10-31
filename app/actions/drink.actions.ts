import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function getAllUserDrinks() {
  const drinks = await prisma.drink.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (drinks == null) return notFound();
  return drinks;
}

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

export async function createDrink(formData: FormData) {
  try {
    await prisma.drink.create({
      data: {
        name: formData.get("name") as string,
        slug: (formData.get("name") as string)
          .toLowerCase()
          .replace(/ä/g, "a")
          .replace(/ö/g, "o")
          .replace(/\s+/g, "-"),
        category: formData.get("category") as string,
        ingredients: JSON.parse(formData.get("ingredients") as string),
        instructions: formData.get("instructions") as string,
      },
    });
    redirect("/admin/drinkit");
  } catch (error) {
    console.error("Failed to create drink:", error);
  }
}

export async function editDrink(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await prisma.drink.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        slug: (formData.get("name") as string)
          .toLowerCase()
          .replace(/ä/g, "a")
          .replace(/ö/g, "o")
          .replace(/\s+/g, "-"),
        category: formData.get("category") as string,
        ingredients: JSON.parse(formData.get("ingredients") as string),
        instructions: formData.get("instructions") as string,
      },
    });
  } catch (error) {
    console.error("Failed to update drink:", error);
  }
}

export async function deleteDrink(id: string) {
  try {
    await prisma.drink.delete({ where: { id } });
    revalidatePath("/admin/drinkit");
  } catch (error) {
    console.error("Failed to delete drink:", error);
  }
}
