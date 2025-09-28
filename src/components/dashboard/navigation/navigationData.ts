import { ComponentType } from "react";
import {
  RiDashboardLine,
  RiHeartLine,
  RiUserLine,
  RiBuildingLine,
  RiShoppingBagLine,
  RiBriefcaseLine,
  RiFileTextLine,
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiChat1Line,
  RiMailLine,
} from "@remixicon/react";

export interface NavigationItem {
  href: string;
  icon: ComponentType<{ className?: string }>;
  iconSize?: "sm" | "md";
  labelKey: string;
  isActive?: boolean;
}

export interface NavigationDropdown {
  titleKey: string;
  icon: ComponentType<{ className?: string }>;
  iconSize?: "sm" | "md";
  key: string;
  items: NavigationItem[];
}

export interface NavigationSection {
  titleKey: string;
  items: (NavigationItem | NavigationDropdown)[];
}

export const navigationData: NavigationSection[] = [
  {
    titleKey: "sidebar.main",
    items: [
      {
        href: "/dashboard",
        icon: RiDashboardLine,
        iconSize: "md",
        labelKey: "sidebar.dashboard",
        isActive: true,
      },
    ],
  },
  {
    titleKey: "sidebar.apps",
    items: [
      {
        titleKey: "sidebar.crmApps",
        icon: RiHeartLine,
        iconSize: "md",
        key: "crm",
        items: [
          {
            href: "/contacts",
            icon: RiUserLine,
            iconSize: "sm",
            labelKey: "sidebar.contacts",
          },
          {
            href: "/companies",
            icon: RiBuildingLine,
            iconSize: "sm",
            labelKey: "sidebar.companies",
          },
          {
            href: "/deals",
            icon: RiFileTextLine,
            iconSize: "sm",
            labelKey: "sidebar.deals",
          },
          {
            href: "/deals-overview",
            icon: RiFileTextLine,
            iconSize: "sm",
            labelKey: "sidebar.dealsOverview",
          },
          {
            href: "/leads",
            icon: RiUserLine,
            iconSize: "sm",
            labelKey: "sidebar.leads",
          },
          {
            href: "/leads-overview",
            icon: RiUserLine,
            iconSize: "sm",
            labelKey: "sidebar.leadsOverview",
          },
        ],
      },
      {
        titleKey: "sidebar.hrmApps",
        icon: RiUserLine,
        iconSize: "md",
        key: "hrm",
        items: [
          {
            href: "/company",
            icon: RiBuildingLine,
            iconSize: "sm",
            labelKey: "sidebar.company",
          },
          {
            href: "/projects",
            icon: RiFileTextLine,
            iconSize: "sm",
            labelKey: "sidebar.projects",
          },
          {
            href: "/payroll",
            icon: RiMoneyDollarCircleLine,
            iconSize: "sm",
            labelKey: "sidebar.payroll",
          },
          {
            href: "/invoice",
            icon: RiFileTextLine,
            iconSize: "sm",
            labelKey: "sidebar.invoice",
          },
          {
            href: "/contacts",
            icon: RiUserLine,
            iconSize: "sm",
            labelKey: "sidebar.contacts",
          },
        ],
      },
      {
        titleKey: "sidebar.ecommerceApps",
        icon: RiBuildingLine,
        iconSize: "md",
        key: "ecommerce",
        items: [
          {
            href: "/ecommerce-admin",
            icon: RiBuildingLine,
            iconSize: "sm",
            labelKey: "sidebar.ecommerceAdmin",
          },
          {
            href: "/ecommerce-customer",
            icon: RiShoppingBagLine,
            iconSize: "sm",
            labelKey: "sidebar.ecommerceCustomer",
          },
        ],
      },
      {
        titleKey: "sidebar.jobsApps",
        icon: RiBriefcaseLine,
        iconSize: "md",
        key: "jobs",
        items: [
          {
            href: "/full-calendar",
            icon: RiCalendarLine,
            iconSize: "sm",
            labelKey: "sidebar.fullCalendar",
          },
          {
            href: "/chat",
            icon: RiChat1Line,
            iconSize: "sm",
            labelKey: "sidebar.chat",
          },
          {
            href: "/email",
            icon: RiMailLine,
            iconSize: "sm",
            labelKey: "sidebar.email",
          },
        ],
      },
    ],
  },
];
