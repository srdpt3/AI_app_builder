import React from "react";
import { Settings, LogOut, HelpCircle, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
const SideBarFooter = () => {
  const options = [
    {
      name: "Settings",
      icon: <Settings />,
    },
    {
      name: "Logout",
      icon: <LogOut />,
    },
    {
      name: "Help",
      icon: <HelpCircle />,
    },
    {
      name: "My Subscription",
      icon: <CreditCard />,
    },
  ];
  return (
    <div className=" items-center gap-2 p-2  mb-10">
      {options.map((option) => (
        <Button
          variant="ghost"
          key={option.name}
          className="w-full my-3 flex justify-start gap-2 p-2 rounded hover:bg-gray-100 transition-colors"
          onClick={() => console.log(`${option.name} clicked`)}
        >
          {option.icon}
          <p>{option.name}</p>
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
