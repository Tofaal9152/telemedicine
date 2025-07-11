"use client";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
const WebsocketText = () => {

  return (
   <MainContainer>
  <ChatContainer>
    <MessageList >
      <Message model={{ message: "Hello", sentTime: "just now", direction: "incoming" }} />
    </MessageList>
    <MessageInput placeholder="Type message..." />
  </ChatContainer>
</MainContainer>
  );
};

export default WebsocketText;
