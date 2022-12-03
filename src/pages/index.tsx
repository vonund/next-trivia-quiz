import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

interface Option {
  title: string;
  key: string;
}

type Options = Option[];

interface Metadata {
  byCategory: {
    [key: string]: number;
  };
  byDifficulty: {
    [key: string]: number;
  };
}

const useQuizOptions = () => {
  const [categories, setCategories] = useState<Options>([]);
  const [difficulties, setDifficulties] = useState<Options>([]);

  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: async (): Promise<Metadata> => {
      const response = await fetch("https://the-trivia-api.com/api/metadata");
      return response.json();
    },
  });

  useEffect(() => {
    if (!metadata) return;

    const categoriesMap: Options = [];
    const difficultiesMap: Options = [];
    for (const category of Object.keys(metadata.byCategory)) {
      categoriesMap.push({
        title: category,
        key: category.replace(" & ", "_and_").toLocaleLowerCase(),
      });
    }
    for (const difficulty of Object.keys(metadata.byDifficulty)) {
      if (difficulty.toLocaleLowerCase() === "null") continue;
      difficultiesMap.push({
        title: difficulty,
        key: difficulty.replace(" & ", "_and_").toLocaleLowerCase(),
      });
    }

    setCategories(categoriesMap);
    setDifficulties(difficultiesMap);
  }, [metadata]);

  return {
    limits: [3, 4, 5],
    difficulties,
    categories,
  };
};

const Home: NextPage = () => {
  const { categories, difficulties, limits } = useQuizOptions();

  const [difficulty, setDifficulty] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [limit, setLimit] = useState<number>();

  return (
    <div className="block">
      <div className="flex">
        <div className="flex items-center">
          <h2 className="mr-3 font-semibold text-slate-300">Difficulty</h2>
          <div className="flex flex-nowrap">
            {difficulties.map(({ title, key }) => (
              <button
                className={classNames(
                  "ml-2 rounded p-3 px-4 text-center first:ml-0 hover:shadow-lg",
                  {
                    "bg-slate-700 hover:bg-slate-600": key !== difficulty,
                    "cursor-default bg-rose-500": key === difficulty,
                  }
                )}
                onClick={() => {
                  setDifficulty(key);
                }}
                key={key}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
        <div className="ml-12 flex items-center">
          <h2 className="mr-3 font-semibold text-slate-300">Questions</h2>
          <div className="flex flex-nowrap">
            {limits.map((item) => (
              <button
                className={classNames(
                  "ml-2 rounded p-3 px-4 text-center first:ml-0 hover:shadow-lg",
                  {
                    "bg-slate-700 hover:bg-slate-600": item !== limit,
                    "cursor-default bg-rose-500": item === limit,
                  }
                )}
                onClick={() => {
                  setLimit(item);
                }}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <h2 className="mb-6 mt-12 text-2xl font-semibold text-slate-300">
        Choose a category
      </h2>
      <div className="grid grid-cols-5 gap-x-6 gap-y-4">
        {categories.map(({ title, key }) => {
          return (
            <button
              className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded bg-slate-700 px-6 py-6 text-center font-semibold hover:bg-slate-600 hover:shadow-lg"
              key={key}
              type="button"
              onClick={() => {
                setCategory(key);
              }}
            >
              {title}
            </button>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <Link
          href={`/quiz?category=${category}&difficulty=${difficulty}&limit=${limit}`}
          className="inline-block rounded bg-pink-600 px-14 py-4 align-top text-2xl shadow-xl hover:bg-rose-500"
        >
          Start a quiz!
        </Link>
      </div>
    </div>
  );
};

export default Home;
