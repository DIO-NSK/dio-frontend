import { $userCredentials } from "@/app/(customer)/model";
import Text from "@/components/atoms/Text/Text";
import { HStack } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { FiLogIn, FiLogOut } from "react-icons/fi";

export const LogInHeader = ({ onManageRole }: { onManageRole: () => void }) => {
  const userCredentials = useUnit($userCredentials);

  return (
    <HStack w="full" gap="1rem" pb="28px" className="border-b-2 border-light-gray" onClick={onManageRole}>
      {userCredentials ? <FiLogOut className={"text-info-red"} /> : <FiLogIn className="text-link-blue" />}
      <Text>{userCredentials ? "Выйти" : "Войти"}</Text>
    </HStack>
  );
};
