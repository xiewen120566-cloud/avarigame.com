"use client";
import { PropsWithChildren } from "react";
import { Box, Button, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import LocaleSwitcher from "./locale-switcher";
import SideNav from "./side-nav";
import { getTargetHref } from "@/utils";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { CategoryRecord } from "@/services/data";
export const DesktopNavlink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => {
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const activeBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  return (
    <Button
      as="a"
      size="sm"
      variant="ghost"
      href={href}
      rounded="full"
      color="text.primary"
      _hover={{ bg: hoverBg }}
      _active={{ bg: activeBg }}
    >
      {children}
    </Button>
  );
};
export default function Header({
  hostname,
  categories,
}: {
  hostname: string;
  categories: CategoryRecord[];
}) {
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const headerBg = useColorModeValue(
    "rgba(240, 253, 244, 0.92)",
    "rgba(8,9,13,0.92)"
  );
  return (
    <Flex
      alignItems="center"
      gap={{ base: 3, md: 6, lg: 12 }}
      height={{ base: 14, md: 16 }}
      position="sticky"
      px={{ base: 3, md: 4, lg: 6 }}
      py={3}
      top={0}
      w="full"
      zIndex="sticky"
      bg={headerBg}
      backdropFilter="saturate(180%) blur(10px)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Box
        as="a"
        href={getTargetHref(locale, "/", searchParams.get("channel"))}
      >
        <Heading
          as="h1"
          size={{ base: "sm", md: "md" }}
          color="text.primary"
          fontWeight="extrabold"
          letterSpacing="tight"
        >
          {hostname.toUpperCase()}
        </Heading>
      </Box>
      <Flex flex={1} hideBelow="lg" justifyContent="space-between" gap={12}>
        <Flex justifyContent="flex-end">
          {categories.map((category) => (
            <DesktopNavlink
              href={getTargetHref(locale, `/category/${category.alias}`)}
              key={category.id}
            >
              {category.name}
            </DesktopNavlink>
          ))}
        </Flex>
        <Flex gap={1}>
          <LocaleSwitcher />
        </Flex>
      </Flex>
      <Flex hideFrom="lg" justifyContent="flex-end" flex={1}>
        <SideNav categories={categories} />
      </Flex>
    </Flex>
  );
}
