import React from "react";

const GroupCardWrapper = ({children} : {
    children : React.ReactNode
}) => {
    return (
        <div className={"col-span-9 flex flex-col p-[30px] gap-[20px]" +
            "rounded-xl bg-white hover:drop-shadow-lg"}>
            {children}
        </div>
    );
};

export default GroupCardWrapper;
