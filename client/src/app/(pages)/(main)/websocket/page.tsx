import dynamic from "next/dynamic";
const WebsocketTest = dynamic(
  () => import("@/components/pages/websocket/Websocket")
);

const page = () => {
  return (
    <div>
      <WebsocketTest />
    </div>
  );
};

export default page;
