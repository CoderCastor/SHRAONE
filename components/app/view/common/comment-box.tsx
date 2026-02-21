import { useAppDispatch } from "@/lib/hooks";
import {
  api,
  useGetCommentsByMonologueIdQuery,
  usePostCommentOnMonologueMutation,
} from "@/lib/services/apiSlice";
import { IconMessagePlus, IconSend2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "motion/react";

export const CommentBox = ({ monologueId }: { monologueId: string }) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const [commentText, setCommentText] = useState<string>("");
  const [showComment, setShowComment] = useState<boolean>(false);

  const { data, isSuccess: getNewCommentIsSuccess } =
    useGetCommentsByMonologueIdQuery(monologueId);
  const [postComment, { isSuccess }] = usePostCommentOnMonologueMutation();

  const handleCommentSubmit = () => {
    setCommentText("");
    setShowComment(false);
    postComment({ comment: commentText, id: monologueId });
  };

  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleMakeComment = () => {
    setShowComment(true);
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    dispatch(api.util.invalidateTags([{ type: "Comments" }]));
  }, [isSuccess, dispatch]);

  console.log("commentsData : ", data);
  return (
    <div className="flex min-h-0 flex-1 flex-col pb-2">
      <div className="flex items-center justify-between pr-2">
        <h3 className="mt-2 text-[16px] font-bold text-red-800">Comments </h3>
        {showComment ? (
          <div
            onClick={() => {
              setShowComment(false);
              setCommentText("");
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-2 py-1 text-[10px] text-red-800 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.8)_inset] ring ring-red-500/20 text-shadow-sm text-shadow-white/10"
          >
            <IconX stroke={2} size={12} />
          </div>
        ) : (
          <div
            onClick={handleMakeComment}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-2 py-1 text-[10px] text-red-800 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.8)_inset] ring ring-red-500/20 text-shadow-sm text-shadow-white/10"
          >
            <IconMessagePlus stroke={2} size={12} />
          </div>
        )}
      </div>
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-scroll">
        <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto border mask-y-from-90% px-2 pt-2.5 pb-4">
          <AnimatePresence>
            {showComment && (
              <motion.div
        
                initial={{
                  opacity: 0,
                  filter: "blur(2px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  filter: "blur(2px)",
                }}
                transition={{
                  duration: 0.1,
                }}
                key={1}
                className="min-h-10 shrink-0 rounded-lg border border-zinc-200/50 bg-zinc-50 px-2 py-1"
              >
                <div className="relative flex items-center gap-1.5">
                  <div className="relative size-4 overflow-hidden rounded-full">
                    <Image
                      fill
                      src={session?.user?.image as string}
                      alt="profile-image"
                    />
                  </div>
                  <p className="text-[8px]">{session?.user?.name}</p>
                  <p className="absolute right-0 text-[8px] text-zinc-400">
                    {new Date().toISOString().split("T")[0]}
                  </p>
                </div>
                <textarea
                  ref={commentInputRef}
                  name=""
                  className="mt-2 h-5 w-full shrink-0 rounded-md px-1 py-0.5 text-[10px] outline-1 outline-zinc-200"
                  id=""
                  placeholder="Comment here..."
                  rows={2}
                  value={commentText}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setCommentText(e.target.value)
                  }
                ></textarea>
                <div className="my-1 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setShowComment(false);
                      setCommentText("");
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-purple-50 px-2 py-1 text-[8px] text-purple-950 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.2)_inset] ring ring-purple-900/20 text-shadow-purple-50/10 text-shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCommentSubmit}
                    className="flex items-center justify-center gap-2 rounded-lg bg-purple-800 px-2 py-1 text-[8px] text-zinc-100 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.8)_inset] ring ring-purple-500/20 text-shadow-sm text-shadow-white/10"
                  >
                    Comment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {data?.data.map((item) => (
            <motion.div
              key={item.id}
              className="min-h-10 shrink-0 rounded-lg border border-zinc-200/50 bg-zinc-50 px-2 py-1"
            >
              <div className="relative flex items-center gap-1.5">
                <div className="relative size-4 overflow-hidden rounded-full">
                  <Image fill src={item.user.image} alt="profile-image" />
                </div>
                <p className="text-[8px]">{item.user.name}</p>
                <p className="absolute right-0 text-[8px] text-zinc-400">
                  {item.createdAt.split("T")[0]}
                </p>
              </div>
              <p className="mt-1 text-[10px] text-zinc-600">{item.comment}</p>
            </motion.div>
          ))}
        </div>
        {/* <div className="flex h-10 items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-0.5">
          <input
            type="text"
            value={commentText}
            className="h-full flex-1 px-2 text-xs text-zinc-800 caret-red-500 outline-0"
            placeholder="Comment here"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCommentText(e.target.value)
            }
          />
          <button
            onClick={handleCommentSubmit}
            className="flex size-8.5 items-center justify-center rounded-full bg-purple-800"
          >
            <IconSend2 color="white" stroke={1.5} size={15} />
          </button>
        </div> */}
      </div>
    </div>
  );
};
