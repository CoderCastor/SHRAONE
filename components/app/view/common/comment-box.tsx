import { IconSend2 } from "@tabler/icons-react"
import Image from "next/image"

export const CommentBox = () => {
    return <div className="flex min-h-0 flex-1 flex-col pb-2">
              <h3 className="mt-2 text-[16px] font-bold text-red-800">
                Comments{" "}
              </h3>
              <div className="flex h-full min-h-0 flex-1 flex-col overflow-scroll">
                <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto border mask-y-from-90% px-2 pt-2.5 pb-2">
                  <div className="min-h-20 overflow-scroll rounded-lg bg-zinc-50 px-2 py-1">
                    <div className="relative flex items-center gap-1.5">
                      <div className="relative size-4 overflow-hidden rounded-full">
                        <Image
                          fill
                          src={
                            "https://lh3.googleusercontent.com/a/ACg8ocKqMq4Z4r6e2EUbMPY9BXU8FwbLm7aaQm4OqEY_eWKJUEkYGL1x=s576-c-no"
                          }
                          alt="profile-image"
                        />
                      </div>
                      <p className="text-[8px]">Tejas Shinde</p>
                      <p className="absolute right-0 text-[8px] text-zinc-400">
                        12-02-2026
                      </p>
                    </div>
                    <p className="mt-1 text-[10px] text-zinc-600">
                      Hello Lorem ipsum, dolor sit amet consectetur adipisicing
                      elit. Esse architecto consequuntur voluptate rem porro
                      libero explicabo aliquid unde facere distinctio iure
                      commodi, accusantium officia mollitia, eveniet possimus
                      eius tenetur nostrum.
                    </p>
                  </div>
                  
                </div>
                <div className="flex h-10 items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-0.5">
                  <input
                    type="text"
                    className="h-full flex-1 px-2 text-xs caret-red-500 outline-0"
                    placeholder="Comment here"
                  />
                  <button className="flex size-8.5 items-center justify-center rounded-full bg-purple-800">
                    <IconSend2 color="white" stroke={1.5} size={15} />
                  </button>
                </div>
              </div>
            </div>
}