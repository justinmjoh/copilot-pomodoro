import PomodoroTimer from "@/components/PomodoroTimer";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Pomodoro App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PomodoroTimer />
    </div>
  );
}
