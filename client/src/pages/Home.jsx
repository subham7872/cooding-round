import React, { useEffect, useState } from "react";

const Home = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);
  return (
    <>
      <h1 className="text-3xl text-blue-400 font-bold text-center mt-72">
        Welcome to the Kyptronix LLp
      </h1>
      {userEmail && (
        <p className="text-xl text-gray-700 text-center mt-4">
          Logged in as: {userEmail}
        </p>
      )}
    </>
  );
};

export default Home;
