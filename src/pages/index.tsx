import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();

  function handleSignIn() {
    signIn("github");
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      <button onClick={handleSignIn}>Login with github</button>
      {JSON.stringify(data)}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
