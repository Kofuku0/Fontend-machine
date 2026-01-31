"use client";
import { useState } from "react";

const NUMBER_OF_FACES = 6;
const MIN_NUMBER_OF_DICE = 1;
const MAX_NUMBER_OF_DICE = 12;

const DICESMAP: Record<number, string[]> = {
  1: ["top-1/2 translate-x-[140%] -translate-y-1/2"],
  2: ["left-1 top-1", "bottom-1 right-1"],
  3: ["top-[6px] translate-x-[140%]", "bottom-2 left-1", "bottom-2 right-2"],
  4: ["top-[6px] left-2", "top-[6px] right-2", "bottom-2 left-2", "bottom-2 right-2"],
  5: [
    "top-[6px] left-2",
    "top-[6px] right-2",
    "bottom-2 left-2",
    "bottom-2 right-2",
    "translate-y-[200%] translate-x-[190%]",
  ],
  6: [
    "top-[6px] left-2",
    "top-[6px] right-2",
    "bottom-2 left-2",
    "bottom-2 right-2",
    "translate-y-[200%] translate-x-[65%]",
    "translate-y-[200%] right-2",
  ],
};

function rollDice(numberOfDice: number) {
  return Array.from({ length: numberOfDice }, () =>
    Math.floor(Math.random() * NUMBER_OF_FACES) + 1
  );
}

export default function App() {
  const [rolledDice, setRolledDice] = useState<number[]>([]);

  return (
    <div className="wrapper p-4 text-black">
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          const form = event.currentTarget;
          const data = new FormData(form);

          const numberOfDices = Number(data.get("dice-count"));
          setRolledDice(rollDice(numberOfDices));
        }}
      >
        <div className="flex gap-2">
          <label htmlFor="dice-input">Number of dice</label>

          <input
            id="dice-input"
            name="dice-count"
            required
            type="number"
            min={MIN_NUMBER_OF_DICE}
            max={MAX_NUMBER_OF_DICE}
            className="border border-black rounded-xl"
          />
        </div>

        <button className="px-6 py-2 bg-amber-300 rounded-xl" type="submit">
          Roll
        </button>
      </form>

      {rolledDice.length > 0 && (
        <div className="w-100 bg-gray-500 mt-4 flex gap-2 flex-wrap">
          {rolledDice.map((item, index) => {
            return <Dice key={index} value={item} />;
          })}
        </div>
      )}
    </div>
  );
}

function Dice({ value }: { value: number }) {
  return (
    <div className="relative h-15 w-15 mt-2 bg-black">
      {DICESMAP[value].map((dotPosition, ix) => (
        <div
          key={ix}
          className={`absolute h-3 w-3 bg-white ${dotPosition}`}
        />
      ))}
    </div>
  );
}
