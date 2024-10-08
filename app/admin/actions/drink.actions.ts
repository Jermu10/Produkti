"use server";

import prisma from "@/lib/db";

export async function createDrink(formData: FormData) {
  await prisma.drink.create({
    data: {
      name: formData.get("name") as string,
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-"),
      category: formData.get("category") as string,
      ingredients: JSON.parse(formData.get("ingredients") as string),
      instructions: formData.get("instructions") as string,
    },
  });
}
