import React from 'react';

const UserProfileWrapper = ({children} : {children : React.ReactNode}) => {
    return (
        <div className={"w-full sm:col-span-9 flex flex-col gap-5"}>
            {children}
        </div>
    );
};

export default UserProfileWrapper;
