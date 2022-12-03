import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { difficulty, category, limit } = query;

  return {
    props: {},
  };
};

const QuizPage: NextPage = () => {
  return <div>Quiz page</div>;
};

export default QuizPage;
