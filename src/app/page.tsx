/** @format */
"use client";
import Image from "next/image";
import desktopDividerImg from "@/assets/images/pattern-divider-desktop.svg";
import mobileDividerImg from "@/assets/images/pattern-divider-mobile.svg";
import diceIcon from "@/assets/images/icon-dice.svg";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";

type SlipData = {
  slip: {
    id: number;
    advice: string;
  };
};

export default function Home() {
  const api = `https://api.adviceslip.com/advice/${generateRandomNumber()}`;

  const [dataFetched, setDataFetched] = useState(true);

  const { refetch, data, isLoading } = useQuery<SlipData>(
    "adviceData",
    async () => {
      const res = await fetch(api);
      return await res.json();
    },
    {
      enabled: dataFetched
    }
  );

  useEffect(() => {
    setDataFetched(false);
  }, []);

  const handleRefreshClick = () => {
    refetch(); // Call refetch to fetch the data again
  };

  return (
    <div className="p-8 min-h-screen bg-dark-blue flex  sm:items-center pt-40 sm:pt-8 justify-center w-full text-white font-manrope">
      {/* main advice box */}
      <section className="h-fit  relative pt-8 px-2 flex items-center flex-col bg-dark-grayish-blue rounded-xl w-[350px] sm:w-[470px]">
        <p className="text-neon-green mb-6 font-semibold tracking-[3px] text-sm">
          ADVICE {data?.slip?.id}
        </p>

        <section className="text-[28px] min-h-[100px] font-semibold  text-center mb-5 text-light-cyan">
          {isLoading ? (
            <p className="">loading.....</p>
          ) : (
            <p className="">“{data?.slip?.advice}”</p>
          )}
        </section>

        {/* border */}
        <section className="mb-16">
          <Image
            className=" sm:hidden"
            src={mobileDividerImg}
            alt="divider-image"
          />
          <Image
            className="hidden sm:flex"
            src={desktopDividerImg}
            alt="divider-image"
          />
        </section>

        {/* dice button  */}
        <button
          onClick={handleRefreshClick}
          className=" -bottom-[30px] absolute bg-neon-green h-16 flex items-center justify-center w-16 rounded-full    hover:shadow-custom-neo-glow cursor-pointer "
        >
          <Image src={diceIcon} alt="dice-icon" />
        </button>
      </section>
    </div>
  );
}

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 224) + 1; // Generates random number between 1 and 224
}
