import { GridCardHeaderAndLayoutButtons } from "@/components/layout/view/header-and-layout-buttons";
import { cn, shadow1 } from "@/lib/utils";

export const ViewLayout = ({
  children,
  showLayoutHeader = true,
  header
}: {
  children: React.ReactNode;
  showLayoutHeader?: boolean;
  header? : string
}) => {
  return (
    <div
      className={cn(
        "m-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-zinc-50 px-2 py-2",
        shadow1,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl relative">
        {showLayoutHeader && <GridCardHeaderAndLayoutButtons header={header} />}
        {children}
      </div>
    </div>
  );
};
