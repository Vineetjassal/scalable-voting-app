import { redis } from "@/lib/redis";
import React from "react";
import ClientPage from "./ClientPage";

type TopicPageProps = { params: { topic: string } };

const TopicPage = async ({ params }: TopicPageProps) => {
  const { topic } = params;

  // to retreieve data that belongs to a range(scores, which are essentially the no. of occureneces of the memebers) from redis
  const initialData = await redis.zrange<(string | number)[]>(
    `room:${topic}`,
    0,
    49,
    {
      withScores: true,
    }
  );

  // initialData format: [redis, 3, is, 2, great, 6]

  let words: { text: string; value: number }[] = [];

  for (let i = 0; i < initialData.length; i = i + 2) {
    const [text, value] = initialData.slice(i, i + 2);
    if (typeof text === "string" && typeof value === "number") {
      words.push({ text, value });
    }
  }
  // [{text:"hello",value:5}]
  await redis.incr("served-requests");

  return <ClientPage topicName={topic} initialData={words} />;
};

export default TopicPage;
