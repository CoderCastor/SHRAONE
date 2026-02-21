import { cn, shadow1 } from "@/lib/utils";

export const OptionBar = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <div
      className={cn("flex items-center justify-center rounded-2xl  px-4 text-zinc-800", classname)}
    >
      {children}
    </div>
  );
};
