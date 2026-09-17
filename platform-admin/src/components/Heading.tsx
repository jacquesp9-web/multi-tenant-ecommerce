import { cn } from "@/lib/utils";
import React from "react";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

type THeading = {
  title: string;
  subTitle?: string;
  classNameTitle?: string;
  classNameSubTitle?: string;
  className?: string;
};
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const TitleHeading = ({
  title,
  subTitle,
  classNameTitle,
  classNameSubTitle,
  className,
}: THeading) => {
  return (
    <div className={cn(className, classNameSubTitle, classNameTitle)}>
      <h1 className={cn("text-xl font-bold", classNameTitle)}>{title}</h1>
      <p
        className={cn(
          "mt-0.5 text=sm text-muted-foreground",
          classNameSubTitle,
        )}
      >
        {subTitle}
      </p>
    </div>
  );
};

export default TitleHeading;
