"use client";
import { GenerateMonologueInputBox } from "@/components/app/view/generate-monologue/input-box-generate";
import { ViewLayout } from "@/components/layout/view";
import {
  api,
  useGenerateNewMonologueMutation,
  useGetMonologueByIdQuery,
  useGetMonologueEpisodeStatusQuery,
} from "@/lib/services/apiSlice";
import { AnimatePresence, motion, useAnimate } from "motion/react";

import { startTransition, useCallback, useEffect, useState } from "react";
import { ConfirmationPopUp } from "@/components/app/view/common/confirmation-popup";
import { MonologueCard } from "@/components/app/view/generate-monologue/monologue-card";
import { MainTitle } from "@/components/app/view/generate-monologue/main-title";
import { LoadingMonologueItem } from "@/components/app/view/generate-monologue/loading-episode-item";
import { EpisodeStackUL } from "@/components/app/view/generate-monologue/episodes-stack";
import { EpisodeItem } from "@/components/app/view/generate-monologue/episode-item";
import { ScriptTextBox } from "@/components/app/view/generate-monologue/script-text-box";
import { SrciptTextGenerationAnimation } from "@/components/app/view/generate-monologue/script-text-generation-animation";
import { useAppDispatch } from "@/lib/hooks";

export default function Page() {
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [pollingIntervalAndEpisodeId, setPollingIntervalAndEpisodeId] =
    useState<{ number: number; id: string } | null>(null);
  const [loadingNumber, setLoadingNumber] = useState<number>(0);
  const [loadingNumberSpeed, setLoadingNumberSpeed] = useState<number>(400);
  const [generating, setGenerating] = useState(false);
  const [scope, animate] = useAnimate();
  const [input, setInput] = useState<string>("");
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
  const [episodeText, setEpisodeText] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  //Mutation
  const [
    generateMonologueMutation,
    {
      data: monologueDataFromGenerateNewMonologueMutation,
      isSuccess: isGenerateMonologueMutationSuccess,
    },
  ] = useGenerateNewMonologueMutation();

  //Query
  const {
    data: statusData,
    error,
    isFetching,
  } = useGetMonologueEpisodeStatusQuery(
    pollingIntervalAndEpisodeId?.id as string,
    {
      pollingInterval: pollingIntervalAndEpisodeId ? 2000 : 0,
      skip: pollingIntervalAndEpisodeId ? false : true,
    },
  );

  //LazyQuery for monologue
  const [
    getMonologue,
    {
      data: GetMonologueByIdQueryData,
      isSuccess: isGetMonologueByIdQuerySuccess,
    },
  ] = api.useLazyGetMonologueByIdQuery();

  useEffect(() => {
    if (statusData?.data.status == "PENDING") {
      setLoadingNumberSpeed((state) => state + 10);
    }
    if (statusData?.data.status == "GENERATING_AUDIO") {
      setLoadingNumberSpeed((state) => state - 50);
    }

    if (statusData?.data.script) {
      setEpisodeText(statusData?.data.script);
    }
  }, [isFetching]);

  useEffect(() => {
    if (monologueDataFromGenerateNewMonologueMutation?.success) {
      getMonologue(monologueDataFromGenerateNewMonologueMutation.res.id);
      console.log("Calling getMonologueDatawithID");
    } else {
      animate(".loader", {
        display: "none",
      });
      console.log(monologueDataFromGenerateNewMonologueMutation?.error);
    }
  }, [
    isGenerateMonologueMutationSuccess,
    getMonologue,
    monologueDataFromGenerateNewMonologueMutation?.res?.id,
    monologueDataFromGenerateNewMonologueMutation?.success,
    monologueDataFromGenerateNewMonologueMutation?.error,
    animate,
  ]);

  const StartPageTransitionAnimations = useCallback(async () => {
    animate(
      ".page-1",
      { opacity: 0, y: -10, filter: "blur(10px)" },
      { delay: 1 },
    );
    await animate(".page-1", { display: "none" }, { delay: 1.1 });
    animate(
      ".generator-container",
      { opacity: 1, filter: "blur(0px)", y: 5 },
      { duration: 0.4 },
    );
  }, [animate]);

  useEffect(() => {
    if (GetMonologueByIdQueryData?.success) {
      StartPageTransitionAnimations();
      const pendingEpisode = GetMonologueByIdQueryData.data.episodes.filter(
        (item) => item.status == "PENDING",
      );
      if (pendingEpisode.length == 1) {
        startTransition(() => {
          setPollingIntervalAndEpisodeId({
            id: pendingEpisode[0].id,
            number: pendingEpisode[0].number,
          });
          setLoadingNumber(0);
          setGenerating(true);
        });
      }

      console.log(
        "getMonologueDatawithID Data : ",
        GetMonologueByIdQueryData.data,
        "And Episode Polling Started",
      );
    } else {
      console.log("Failed to process");
    }
  }, [
    isGetMonologueByIdQuerySuccess,
    GetMonologueByIdQueryData,
    StartPageTransitionAnimations,
  ]);

  const body = { idea: input };

  console.log("GetMonologueByIdQueryData : ", GetMonologueByIdQueryData?.data);

  useEffect(() => {
    if (statusData?.data.status == "READY") {
      setPollingIntervalAndEpisodeId(null);
      setLoadingNumberSpeed(50);
    }
    if (statusData?.data.monologue.thumbnailUrl != "PENDING") {
      setThumbnailURL(statusData?.data.monologue.thumbnailUrl as string);
    }
  }, [
    statusData?.data.status,
    statusData?.data.monologue.thumbnailUrl,
  ]);

  useEffect(() => {
    if (loadingNumber == 100) {
      setTimeout(()=>{
        dispatch(
        api.util.invalidateTags([
          {
            type: "Monologue",
            id: monologueDataFromGenerateNewMonologueMutation?.res?.id,
          },
        ]),
      );
      },1000)
    }
  }, [loadingNumber,monologueDataFromGenerateNewMonologueMutation?.res?.id,dispatch]);

  const handleGenerateApprove = async () => {
    await animate(".ai-icon", {
      display: "none",
    });
    await animate(".loader", {
      display: "block",
    });
    StartPageTransitionAnimations();
    generateMonologueMutation(body);
  };

  const episodes = [
    {
      number: 1,
      title: "Hello 1",
    },
  ];

  useEffect(() => {
    if (!generating) return;

    const interval = setInterval(() => {
      setLoadingNumber((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, loadingNumberSpeed);

    return () => clearInterval(interval);
  }, [generating, loadingNumberSpeed]);

  useEffect(() => {
    if (loadingNumber >= 100 && generating) {
      setGenerating(false);
    }
  }, [loadingNumber, generating]);

  console.log("pollingIntervalAndEpisodeId :", pollingIntervalAndEpisodeId);

  return (
    <ViewLayout showLayoutHeader={false}>
      <AnimatePresence>
        {showConfirmationPopup && (
          <ConfirmationPopUp
            showConfirmationPopup={showConfirmationPopup}
            setShowConfirmationPopup={setShowConfirmationPopup}
            handleGenerateApprove={handleGenerateApprove}
          />
        )}
      </AnimatePresence>
      <motion.div
        ref={scope}
        className="relative flex h-full w-full flex-col items-center justify-center gap-y-10 bg-zinc-100"
      >
        <MainTitle />
        <GenerateMonologueInputBox
          input={input}
          setInput={setInput}
          setShowConfirmationPopup={setShowConfirmationPopup}
        />

        <motion.div
          style={{ opacity: 0, filter: "blur(10px)", y: 0 }}
          className="generator-container absolute inset-0 flex flex-col"
        >
          <div className="mt-2 ml-2 flex gap-2 px-2">
            {/* <motion.button
              initial={{}}
              onClick={() => {}}
              className="flex size-8 items-center justify-center gap-2 rounded-lg text-xs text-red-500 shadow-[0px_0px_2px_1px_rgba(255,255,255,0.2)_inset] ring ring-white/20 text-shadow-sm text-shadow-white/10"
            >
              <IconCashBanknoteMoveBack stroke={2} size={15} />
            </motion.button> */}
            <div className="flex w-full flex-col justify-center">
              <h2 className="tracking w-full text-sm font-bold text-red-700 text-shadow-md text-shadow-red-500/10">
                Generate your own story with live voices
              </h2>
              <p className="-translate-y-1 text-[10px] text-red-700/70">
                Power by ShraoneAI
              </p>
            </div>
          </div>
          <div className="flex min-h-0 w-full flex-1 flex-col">
            <div className="flex w-full gap-8 px-2">
              {/* card */}
              <MonologueCard
                monologueData={GetMonologueByIdQueryData}
                thumbnailURL={thumbnailURL}
                // startGenerating={startGenerating}
              />
              {/* episode */}
              <EpisodeStackUL generating={generating}>
                {GetMonologueByIdQueryData?.success &&
                  GetMonologueByIdQueryData.data.episodes
                    .filter((item) => item.status != "PENDING")
                    .map((item) => (
                      <EpisodeItem
                        key={item.id}
                        number={item.number}
                        title={item.title}
                      />
                    ))}
                {pollingIntervalAndEpisodeId && (
                  <LoadingMonologueItem
                    loadingNumber={loadingNumber}
                    number={
                      pollingIntervalAndEpisodeId?.number
                        ? pollingIntervalAndEpisodeId.number
                        : 1
                    }
                  />
                )}
              </EpisodeStackUL>
            </div>
            <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-scroll">
              <ScriptTextBox loading={episodeText ? false : true}>
                {episodeText != null && (
                  <SrciptTextGenerationAnimation text={episodeText} />
                )}
              </ScriptTextBox>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </ViewLayout>
  );
}
