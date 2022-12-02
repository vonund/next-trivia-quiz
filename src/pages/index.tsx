import type { GetServerSideProps, NextPage } from "next";

const CATEGORIES = {
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

interface CategoryInterface {
  [key: string]: string[];
}

type PropsType = {
  categories: CategoryInterface | null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const props: PropsType = {
    categories: CATEGORIES,
  };

  return {
    props,
  };
};

const Home: NextPage<PropsType> = ({ categories }) => {
  console.log(categories);

  return <div className="block">page content</div>;
};

export default Home;
