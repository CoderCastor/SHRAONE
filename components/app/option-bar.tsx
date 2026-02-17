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
      className={cn("flex h-8 items-center justify-center rounded-2xl bg-zinc-50 px-4 text-zinc-800", shadow1, classname)}
    >
      {children}
    </div>
  );
};
