"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { NavigationSection } from "@/components/ui/navigation/NavigationSection";
import { NavigationItem } from "@/components/ui/navigation/NavigationItem";
import { NavigationDropdown } from "@/components/ui/navigation/NavigationDropdown";
import { NavigationSubItem } from "@/components/ui/navigation/NavigationSubItem";
import {
  navigationData,
  type NavigationItem as NavItem,
  type NavigationDropdown as NavDropdown,
} from "./navigationData";

export function AppSidebarNavigation() {
  const t = useTranslations();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({
    crm: false,
    hrm: false,
    ecommerce: false,
    jobs: false,
  });

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const isDropdown = (item: NavItem | NavDropdown): item is NavDropdown => {
    return "key" in item;
  };

  const locale = useLocale();
  return (
    <nav className="px-3">
      {navigationData.map((section, sectionIndex) => (
        <NavigationSection key={sectionIndex} title={t(section.titleKey)}>
          {section.items.map((item, itemIndex) => {
            if (isDropdown(item)) {
              return (
                <NavigationDropdown
                  key={itemIndex}
                  title={t(item.titleKey)}
                  icon={<item.icon className={item.iconSize === "sm" ? "h-4 w-4" : "h-4 w-4"} />}
                  isOpen={openDropdowns[item.key]}
                  onToggle={() => toggleDropdown(item.key)}
                >
                  {item.items.map((subItem, subIndex) => (
                    <NavigationSubItem
                      key={subIndex}
                      href={`/${locale}/${subItem.href}`}
                      icon={
                        <subItem.icon
                          className={subItem.iconSize === "sm" ? "h-3 w-3" : "h-4 w-4"}
                        />
                      }
                    >
                      {t(subItem.labelKey)}
                    </NavigationSubItem>
                  ))}
                </NavigationDropdown>
              );
            } else {
              return (
                <NavigationItem
                  key={itemIndex}
                  href={`/${locale}/${item.href}`}
                  icon={<item.icon className={item.iconSize === "sm" ? "h-3 w-3" : "h-4 w-4"} />}
                  isActive={item.isActive}
                >
                  {t(item.labelKey)}
                </NavigationItem>
              );
            }
          })}
        </NavigationSection>
      ))}
    </nav>
  );
}
