"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function getDrink(id: string) {
  const drink = await prisma.drink.findUnique({
    where: {
      id: id,
    },
  });
  if (drink == null) return notFound();
  return drink;
}

export async function getDrinks() {
  const drinks = await prisma.drink.findMany();
  return drinks;
}

export async function createDrink(formData: FormData) {
  try {
    await prisma.drink.create({
      data: {
        name: formData.get("name") as string,
        slug: (formData.get("name") as string)
          .toLowerCase()
          .replace(/\s+/g, "-"),
        category: formData.get("category") as string,
        ingredients: JSON.parse(formData.get("ingredients") as string),
        instructions: formData.get("instructions") as string,
      },
    });
    redirect("/admin/drinks");
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
    revalidatePath("/admin/drinks");
  } catch (error) {
    console.error("Failed to delete drink:", error);
  }
}
