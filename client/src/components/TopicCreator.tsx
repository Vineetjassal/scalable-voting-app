"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { createTopic } from "@/app/actions";

const TopicCreator = () => {
  const [input, setInput] = useState<string>("");

  const { mutate, error, isPending } = useMutation({
    mutationFn: createTopic,
  });

  return (
    <div className="mt-12 flex flex-col">
      <div className="flex gap-2">
        <Input
          className="bg-white min-w-64"
          placeholder="Enter topic here..."
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <Button
          disabled={isPending}
          onClick={() => mutate({ topicName: input })}
        >
          Create
        </Button>
      </div>
      {error && <p className="text-red-600 text-sm ">{error.message}</p>}
    </div>
  );
};

export default TopicCreator;
