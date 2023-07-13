import React from "react";

const ChatCard = () => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
      <div className="w-[20%]">
        <img className="h-14 w-14 rounded-full"
          src="https://media.istockphoto.com/id/541152916/photo/healthy-green-trees-in-forest-of-spruce-fir-and-pine.webp?s=1024x1024&w=is&k=20&c=pH4aH8u4mW0czUAe8Iv7lGhMf8-h03eiYh4USoCY1kM="
          alt=""
        />
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between items-center">
            <p className="text-lg">username</p>
            <p className="text-sm">timestamp</p>
        </div>
        <div className="flex justify-between items-center">
            <p>message...</p>
            <div className="flex space-x-2 items-center">
                <p className="text-xs py-1 px-2 text-white bg-green-500 rounded-full">10</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
