import { DNA } from "react-loader-spinner";

export const ScriptTextBox = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <div className="m-3 mb-5 flex h-full min-h-0 flex-col overflow-scroll rounded-md border border-zinc-200 bg-zinc-100 p-2 text-zinc-900">
      <p className="tracking w-full text-[12px] font-bold text-red-800 text-shadow-md text-shadow-zinc-400/10 px-1">Story Blueprint</p>
      {loading ? (
        <div className="flex flex-1 items-center justify-center flex-col">
            <DNA
              visible={true}
              height="30"
              width="30"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
              dnaColorOne="#ff2a2a"
              dnaColorTwo="#0033ff"
            />
          <p className="animate-pulse text-[10px] text-purple-950">
            
            Crafting your script
          </p>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-scroll mask-y-from-90% py-3">
          {children}
        </div>
      )}
    </div>
  );
};
