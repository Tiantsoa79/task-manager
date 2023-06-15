import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Calculates the time difference between the server time and client time.
 * @param {Date} serverTime - The server time.
 * @param {Date} clientTime - The client time.
 * @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
 */
const calculateTimeDifference = (serverTime, clientTime) => {
  const difference = Math.abs(serverTime - clientTime) / 1000; // Difference in seconds

  const days = Math.floor(difference / (24 * 60 * 60));
  const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((difference % (60 * 60)) / 60);
  const seconds = Math.floor(difference % 60);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export default function Home() {
  const router = useRouter();
  const [serverTime, setServerTime] = useState(null);

  useEffect(() => {
    // Fetch server time when component mounts
    fetch("/api/server-time")
      .then((response) => response.json())
      .then((data) => setServerTime(new Date(data.serverTime)));
  }, []);

  const moveToTaskManager = () => {
    router.push("/tasks");
  };

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          <p>
            Server time:{" "}
            <span className="serverTime">
              {serverTime ? serverTime.toLocaleString() : "Loading..."}
            </span>
          </p>
          {serverTime && (
            <p>
              Time diff:{" "}
              <span className="timeDiff">
                {calculateTimeDifference(serverTime, new Date())}
              </span>
            </p>
          )}
        </div>
        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
