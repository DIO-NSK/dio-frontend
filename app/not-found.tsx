import MobileNavbar from "@/components/mobile/moleculas/bars/MobileNavbar/MobileNavbar";
import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";
import { Footer } from "@/components/organisms/footer/Footer";
import { Flex, HStack, Image } from "@chakra-ui/react";
import { Content } from "./components/NotFoundContent";

const NotFound = () => (
  <>
    <Navbar />
    <Searchbar />
    <MobileNavbar />
    <Flex width="100%" alignItems="center" justifyContent="center">
      <HStack gap="4rem">
        <Image
          className="hidden sm:flex md:w-[300px] lg:w-[290px] xl:w-[350px] object-cover"
          src="https://storage.yandexcloud.net/dio-static-images/bottle-404.png"
          alt="Фирменный кулер DIO"
        />
        <Content />
      </HStack>
    </Flex>
    <Footer />
  </>
);

export default NotFound;
