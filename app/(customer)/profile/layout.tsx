"use client";

import { api } from "@/api";
import { logoutUserFx } from "@/app/(customer)/model";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import UserProfileLeftSidebar from "@/components/organisms/bars/user-profile-left-sidebar/UserProfileLeftSidebar";
import { ResponsiveContainer } from "@/components/wrappers";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import { cn } from "@/utlis/cn";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";
import { ClassValue } from "clsx";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import useSWR from "swr";

const logoutCV: ClassValue[] = [
  "hidden lg:flex red-text hover:text-red-700 gap-2 ml-[-20px]",
  "p-4 rounded-xl hover:bg-red-50 fixed bottom-[30px]",
];

const UserProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const logout = useUnit(logoutUserFx);
  const breakpoint = useBreakpoint();
  const router = useRouter();

  const swr = useSWR("get_user", () => api.get("/user"));

  const isTabletOrLargerScreen = breakpoint === "xl" || breakpoint === "lg" || breakpoint === "2xl";

  const handleLogout = () => {
    logout().then((_) => router.push("/"));
  };

  if (swr.error) {
    router.push("/");
  }

  return (
    <IfRenderBlock condition={Boolean(swr.data)}>
      <ResponsiveContainer>
        <InnerPageWrapper classNames={{ desktopWrapper: "mt-3", mobileWrapper: "pt-0" }}>
          <IfRenderBlock condition={isTabletOrLargerScreen}>
            <div className="lg:col-span-4 xl:col-span-3">
              <UserProfileLeftSidebar />
              <IconTextButton
                icon={<FiLogOut size="18px" />}
                className={cn(logoutCV)}
                onClick={handleLogout}
                placement="left"
                text="Выйти"
              />
            </div>
          </IfRenderBlock>
          {children}
        </InnerPageWrapper>
      </ResponsiveContainer>
    </IfRenderBlock>
  );
};

export default UserProfileLayout;
