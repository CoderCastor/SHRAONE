"use client";
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";

export const SrciptTextGenerationAnimation = ({text}:{text : string}) => {
    const [scope, animate] = useAnimate();

    const startAnimating = () => {
        //we can add any type of selector here class , ID or tag
        animate(
            "span",
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)"
            },
            {
                duration: 0.3,
                ease: "easeInOut",
                delay : stagger(0.05)
            },
        );
    };

    useEffect(() => {
        startAnimating();
    }, []);

   
    return (
        <div
            ref={scope}
            className="text-zinc-950 text-xs flex-1 overflow-y-scroll min-h-0"
        >   
        {/* <button className="bg-black px-4 py-2 text-white" onClick={()=>startAnimating()}>reload</button> */}
            {text.split(" ").map((word, idx) => (
                <motion.span
                    key={idx}
                    className="inline-block min-h-4"
                    style={{ opacity: 0, filter: "blur(10px)",y:10}}
                >
                    {word} &nbsp;
                </motion.span>
            ))}
        </div>
    );
};
