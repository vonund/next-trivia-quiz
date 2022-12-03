import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import {
  fetchOptions,
  type ResponseOptions,
} from "../providers/fetch-options.provider";

interface Option {
  title: string;
  key: string;
}

type Options = Option[];

const Home: NextPage = () => {
  const [categories, setCategories] = useState<Options>([]);
  const [difficulties, setDifficulties] = useState<Options>([]);
  const limits = [3, 4, 5];

  const [difficulty, setDifficulty] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [limit, setLimit] = useState<number>();

  const { data: options, isLoading } = useQuery({
    queryKey: ["options"],
    queryFn: fetchOptions,
  });

  useEffect(() => {
    if (!options) return;

    const normalizeOptions = (options: ResponseOptions): Options => {
      return Object.keys(options)
        .sort()
        .reduce((acc: Options, option) => {
          return [
            ...acc,
            {
              title: option,
              key: option.replace(" & ", "_and_").toLocaleLowerCase(),
            },
          ];
        }, []);
    };

    const { byCategory, byDifficulty } = options;
    setCategories(normalizeOptions(byCategory));
    setDifficulties(normalizeOptions(byDifficulty));
  }, [options]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="block">
      <div className="flex">
        <div className="flex items-center">
          <h2 className="mr-3 font-semibold text-slate-300">Difficulty</h2>
          <div className="flex flex-nowrap">
            {difficulties.map(({ title, key }) => (
              <button
                className={classNames(
                  "ml-2 rounded p-3 px-4 text-center first:ml-0",
                  {
                    "bg-slate-700 hover:bg-slate-600": key !== difficulty,
                    "pointer-events-none bg-rose-500 shadow-lg shadow-pink-900/70":
                      key === difficulty,
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
                  "ml-2 rounded p-3 px-4 text-center first:ml-0",
                  {
                    "bg-slate-700 hover:bg-slate-600": item !== limit,
                    "pointer-events-none bg-rose-500 shadow-lg shadow-pink-900/70":
                      item === limit,
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
              className={classNames(
                "overflow-hidden text-ellipsis whitespace-nowrap rounded px-6 py-6 text-center font-semibold",
                {
                  "cursor-pointer  bg-slate-700 hover:bg-slate-600 hover:shadow-lg":
                    key !== category,
                  "pointer-events-none bg-rose-500 shadow-lg shadow-pink-900/70":
                    key === category,
                }
              )}
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
          className={classNames(
            "inline-block rounded px-14 py-5 align-top text-2xl",
            {
              "bg-pink-600 shadow-xl hover:bg-rose-500": category,
              "pointer-events-none bg-pink-600 text-pink-400 shadow-md":
                !category,
            }
          )}
        >
          Start a quiz!
        </Link>
      </div>
    </div>
  );
};

export default Home;
