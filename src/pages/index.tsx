import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Link from "next/link";

const CATEGORIES: CategoriesResponse = {
  "Arts & Literature": ["arts", "literature", "arts_and_literature"],
  "Film & TV": ["movies", "film", "film_and_tv"],
  "Food & Drink": ["food_and_drink", "food", "drink"],
  "General Knowledge": ["general_knowledge"],
  Geography: ["geography"],
  History: ["history"],
  Music: ["music"],
  Science: ["science"],
  "Society & Culture": ["society_and_culture", "society", "culture"],
  "Sport & Leisure": ["sport_and_leisure", "sports", "sport"],
};

interface CategoriesResponse {
  [key: string]: string[];
}
interface Category {
  title: string;
  alias: string;
}

type Categories = Category[];

interface PageProps {
  difficulties: string[];
  categories: Categories;
  limits: number[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const categories: Categories = [];

  for (const key of Object.keys(CATEGORIES)) {
    const alias = key.replace(" & ", "_and_").toLocaleLowerCase();
    categories.push({
      title: key,
      alias,
    });
  }

  const props: PageProps = {
    difficulties: ["easy", "medium", "hard"],
    limits: [3, 4, 5],
    categories,
  };

  return {
    props,
  };
};

const Home: NextPage<PageProps> = ({ categories, difficulties, limits }) => {
  const [queries, setQueries] = useState({
    category: "",
    difficulty: difficulties[0],
    limit: limits[0],
  });

  const buttonSm = `ml-2 first:ml-0 rounded px-4 p-3 text-center hover:shadow-lg`;
  const button = "bg-slate-700 hover:bg-slate-600";
  const buttonActive = "bg-rose-500 cursor-default";

  return (
    <div className="block">
      <div className="flex">
        <div className="flex items-center">
          <h2 className="mr-3 font-semibold text-slate-300">Difficulty</h2>
          <div className="flex flex-nowrap">
            {difficulties.map((difficulty) => (
              <button
                className={`${buttonSm} ${
                  difficulty !== queries.difficulty ? button : buttonActive
                }`}
                onClick={() => {
                  setQueries({
                    ...queries,
                    difficulty,
                  });
                }}
                key={difficulty}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
        <div className="ml-12 flex items-center">
          <h2 className="mr-3 font-semibold text-slate-300">Questions</h2>
          <div className="flex flex-nowrap">
            {limits.map((limit) => (
              <button
                className={`${buttonSm} ${
                  limit !== queries.limit ? button : buttonActive
                }`}
                onClick={() => {
                  setQueries({
                    ...queries,
                    limit,
                  });
                }}
                key={limit}
              >
                {limit}
              </button>
            ))}
          </div>
        </div>
      </div>
      {categories.length && (
        <>
          <h2 className="mb-6 mt-12 text-2xl font-semibold text-slate-300">
            Choose a category
          </h2>
          <div className="grid grid-cols-5 gap-x-6 gap-y-4">
            {categories.map((category) => {
              return (
                <button
                  className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded bg-slate-700 px-6 py-6 text-center font-semibold hover:bg-slate-600 hover:shadow-lg"
                  key={category.alias}
                  type="button"
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </>
      )}
      <div className="mt-12 text-center">
        <Link
          href="/quiz"
          className="inline-block rounded bg-pink-600 px-14 py-4 align-top text-2xl shadow-xl hover:bg-rose-500"
        >
          Start a quiz!
        </Link>
      </div>
    </div>
  );
};

export default Home;
