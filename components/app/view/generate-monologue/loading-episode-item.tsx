import { motion } from "motion/react";
export const LoadingMonologueItem = ({
  loadingNumber,
  number,
}: {
  loadingNumber: number;
  number: number;
}) => {
  const listItem = {
    hidden: { y: -10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const loadingTitles = [
    { id: 0, title: "Generating" },
    { id: 1, title: "Crafting Your Story" },
    { id: 2, title: "Crafting Your Story" },
    { id: 3, title: "Writing The Script" },
    { id: 4, title: "Writing The Script" },
    { id: 5, title: "Enhancing Audio Quality" },
    { id: 6, title: "Adding Finishing Touches" },
    { id: 7, title: "Adding Finishing Touches" },
    { id: 8, title: "Almost Ready Now" },
    { id: 9, title: "Preparing For Playback" },
    { id: 10, title: "Done!" },
  ];
  return (
    <li
      // variants={listItem}
      className="flex items-center justify-start gap-2 rounded-2xl bg-emerald-50 px-2 py-2 text-[12px] hover:bg-emerald-100"
    >
      <div className="flex h-6 w-7 items-center justify-center rounded-full bg-emerald-300 text-emerald-800">
        {number}
      </div>
      <div className="flex w-full flex-col justify-center gap-0.5">
        <div className="flex justify-between text-[10px] text-emerald-900">
          <p className="animate-pulse transition-all duration-300">
            {
              loadingTitles[
                loadingNumber < 10
                  ? 0
                  : loadingNumber == 100
                    ? 10
                    : Number(loadingNumber.toString().split("")[0])
              ].title
            }
          </p>{" "}
          <div>{loadingNumber}%</div>
        </div>
        <motion.div
          style={{
            width: `${loadingNumber}%`,
          }}
          className="generating-line h-[3px] w-full rounded-lg bg-emerald-600 transition-all duration-500"
        ></motion.div>
      </div>
    </li>
  );
};
