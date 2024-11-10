import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";
import { formatCardIngredients } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import defaultImage from "@/lib/images/defaultImage.jpg";

const DrinkCard: React.FC<DrinkItemProps> = ({ drink }) => {
  const isDrinkki = drink.category === "drinkki";
  const borderColor = isDrinkki ? "border-customOrange" : "border-customGreen";
  const textColor = isDrinkki ? "text-customOrange" : "text-customGreen";

  const pathname = usePathname();
  const basePath =
    pathname === "/" ? (isDrinkki ? "/drinkit" : "/mocktailit") : pathname;

  return (
    <Card className={` m-2 items-center border-5 w-72 h-72 ${borderColor}`}>
      <Link href={`${basePath}/${drink.slug}`}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className={` text-3xl ${textColor}`}>{drink.name}</p>
          <Divider />
          <p className={`text-xl ${textColor}`}>
            {formatCardIngredients(drink.ingredients)}
          </p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={defaultImage.src}
            width={250}
            height={150}
          />
        </CardBody>
      </Link>
    </Card>
  );
};

export default DrinkCard;
