import React from 'react';

const InnerPageWrapper = ({children} : {
    children : React.ReactNode
}) => {
    return (
        <div
            style={{padding: "0 100px 0 100px"}}
            className={"col-span-full grid grid-cols-12 gap-[30px] mb-[30px]"}
        >
            {children}
        </div>
    );
};

export default InnerPageWrapper;
