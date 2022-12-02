import type { GetServerSideProps, NextPage } from "next";

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
  categories: Categories;
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

  return {
    props: {
      categories,
    },
  };
};

const Home: NextPage<PageProps> = ({ categories }) => {
  return (
    <div className="block">
      {categories.map((category) => {
        return <div key={category.alias}>{category.title}</div>;
      })}
    </div>
  );
};

export default Home;
