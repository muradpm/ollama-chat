"use client";

import { useChat } from "ai/react";
import { MemoizedMarkdown } from "./memoized-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useScrollChat } from "@/hooks/use-scroll-chat";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id: "chat",
    experimental_throttle: 50,
  });

  const scrollRef = useScrollChat(messages);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex-1">
        <ScrollArea className="h-[calc(100vh-12rem)] p-4" ref={scrollRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 mb-4 items-start ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role !== "user" && (
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage src="/bot-avatar.png" />
                </Avatar>
              )}
              <div
                className={`flex items-center rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  <MemoizedMarkdown id={message.id} content={message.content} />
                </div>
              </div>
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                  <AvatarImage src="/user-avatar.png" />
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
      <MessageInput />
    </div>
  );
}

const MessageInput = () => {
  const { input, handleSubmit, handleInputChange } = useChat({ id: "chat" });

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
