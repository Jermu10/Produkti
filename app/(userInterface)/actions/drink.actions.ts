import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function getUserDrink(slug: string) {
  const drink = await prisma.drink.findUnique({
    where: {
      slug: slug,
    },
  });
  if (drink == null) return notFound();
  return drink;
}

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
