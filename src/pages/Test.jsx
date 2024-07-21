import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { FlashCard, CTAButton } from "@/components";
import { SyncLoader } from "react-spinners";
import { FaArrowDown } from "react-icons/fa6";

const Test = () => {
  // The topic for which flashcards need to be created
  const [searchTerm, setSearchTerm] = useState("");

  // The difficulty for the questions
  const [difficulty, setDifficulty] = useState("easy");

  // The questions array that is mapped for the flashcards
  const [questions, setQuestions] = useState([]);

  // Fetch Questions from the API
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getQuestions", searchTerm, difficulty],
    queryFn: () => {
      return axiosInstance.post("/getQuestions", {
        topic: searchTerm,
        difficulty: difficulty,
      });
    },
    staleTime: 60 * 1000 * 10,
    enabled: false,
  });

  // Set questions only if new ones are fetched - stops blank screen when parameters are changed
  useEffect(() => {
    if (data?.data?.questions?.length > 0) {
      setQuestions(data?.data?.questions);
    }
  }, [data?.data]);

  // Fetch data on click of the button
  const handleClick = () => {
    refetch();
  };

  return (
    <div className="bg-wave bg-no-repeat bg-cover min-h-screen">
      {/* Input for parameters */}
      <div className="py-10 flex justify-center ">
        <div className="flex w-[95%] md:w-fit py-10 px-10 flex-col items-center gap-y-8 bg-white rounded-xl shadow-xl">
          {/* Topic input text */}
          <p className="text-center font-medium">Enter your topic :</p>

          {/* Input box for topic */}
          <input
            type="text"
            value={searchTerm}
            placeholder="Enter the topic for the flashcards!"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-96 border-b-2 p-1 text-center bg-transparent outline-none"
          />

          {/* Difficulty text */}
          <p className="text-center font-medium">Choose Difficulty :</p>

          {/* Radio Button Group for difficulty */}
          <div className="flex justify-evenly gap-x-10">
            {/* Radio Button for difficulty : EASY */}
            <div className="flex gap-x-2 justify-center">
              <input
                type="radio"
                className="accent-cta"
                name="difficulty"
                value={"easy"}
                checked={difficulty == "easy"}
                onChange={(e) => setDifficulty(e.target.value)}
              />{" "}
              Easy
            </div>
            {/* Radio Button for difficulty : MEDIUM */}
            <div className="flex gap-x-2 justify-center">
              <input
                type="radio"
                className="accent-cta"
                name="difficulty"
                value={"medium"}
                checked={difficulty == "medium"}
                onChange={(e) => setDifficulty(e.target.value)}
              />{" "}
              Medium
            </div>
            {/* Radio Button for difficulty : HARD */}
            <div className="flex gap-x-2 justify-center">
              <input
                type="radio"
                className="accent-cta"
                name="difficulty"
                value={"hard"}
                checked={difficulty == "hard"}
                onChange={(e) => setDifficulty(e.target.value)}
              />{" "}
              Hard
            </div>
          </div>

          {/* Button to fetch flashcards */}
          <div className="mt-5 flex justify-center">
            <CTAButton
              // className="shadow p-2 w-fit bg-white rounded px-5 hover:shadow-md transition-all"
              onClick={handleClick}
              disabled={searchTerm?.length == 0 || isLoading}
              text="Create FlashCards"
            ></CTAButton>
          </div>

          {questions?.length > 0 && !isLoading && (
            <p className="text-cta font-medium flex gap-x-2 items-center">
              Your flashcards are ready! <FaArrowDown />
            </p>
          )}
        </div>
      </div>

      {/* Mapping flashcards */}
      {!isLoading && questions?.length > 0 && (
        <>
          <p className="text-center mt-14">
            Note : Questions & answers may be wrong.
          </p>
          <div className="flex flex-wrap justify-evenly gap-6 py-10 px-5">
            {questions?.length > 0 &&
              questions?.map((item, index) => {
                return (
                  <FlashCard
                    key={item?.question}
                    question={item?.question}
                    answer={item?.answer}
                  />
                );
              })}
          </div>
        </>
      )}

      {isLoading && (
        <div className="mt-16 lg:mt-20 flex justify-center items-center">
          <SyncLoader
            color={"#ffffff"}
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {questions?.length > 0 && !isLoading && (
        <div className="pt-8 pb-12 flex justify-center">
          <CTAButton
            className="bg-white text-hovercta hover:bg-white hover:scale-105"
            text={"Go Back up?"}
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Test;
