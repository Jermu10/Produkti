"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ReviewCard: React.FC<ReviewListProps> = ({ review }) => {
  const pathname = usePathname();

  return (
    <Card className="max-w-[300px] m-2 ">
      <Link href={`${pathname}/${review.slug}`}>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-4xl">{review.drink}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{review.introduction}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex h-5 items-center  space-x-4 text-xl ">
            <p>{review.rating}</p>
            <Divider orientation="vertical" />

            <p>{review.creator}</p>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ReviewCard;
