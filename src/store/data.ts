import { v4 as uuidv4 } from "uuid";
import overview from "../assets/pie.png";
import checklist from "../assets/checklist.png";
import insight from "../assets/insights.png";
import agency from "../assets/agency.png";
import billing from "../assets/billing.png";
import page from "../assets/page.png";
import user from "../assets/user-circle.png";
import business from "../assets/business.png";
import document from "../assets/document.png";
import professional from "../assets/professional.png";
import security from "../assets/security.png";
import dp from "../assets/initial-dp.png";
import cover from "../assets/cover.png";
import badge from "../assets/medal.png";

export type LanguageType =
  | {
      id: string;
      name: string;
    }
  | undefined
  | null;

export type MyAccountProfileData =
  | {
      avatar: File | string | undefined | null;
      cover: string;
      username: string;
      badgeIcon: string;
      badgeName: string;
      exp: string;
      fullName: string;
      professionalTitle: string;
      email: string;
      address: string;
      whatsapp: number;
      languages: Array<LanguageType>;
    }
  | undefined
  | null;

export type TabPanelObjectDataType = {
  id: string;
  acountTabLable: string;
  icon: string;
  panelData: MyAccountProfileData | null | undefined;
};

export type TabPanelDataType = Array<TabPanelObjectDataType> | undefined | null;

const data = [
  { tabLabel: "Overview", icon: overview, tabPanelData: null },
  { tabLabel: "Listing", icon: checklist, tabPanelData: null },
  { tabLabel: "Insight", icon: insight, tabPanelData: null },
  { tabLabel: "Report", icon: page, tabPanelData: null },
  { tabLabel: "Agency", icon: agency, tabPanelData: null },
  { tabLabel: "Billing", icon: billing, tabPanelData: null },
  {
    tabLabel: "My Account",
    icon: user,
    tabPanelData: [
      {
        id: uuidv4(),
        acountTabLable: "Profile",
        icon: user,
        panelData: {
          avatar: dp,
          cover,
          username: "Rajesh Kumar",
          badgeIcon: badge,
          badgeName: "Gold",
          exp: "8+ years",
          fullName: "Rajesh Kumar",
          professionalTitle: "Not specified",
          email: "rajesh@findleagents.com",
          address: "3891 Ranchview Dr.Richardson,California 62639",
          whatsapp: 7896541230,
          languages: [
            { id: uuidv4(), name: "English" },
            { id: uuidv4(), name: "Hindi" },
            { id: uuidv4(), name: "Kannada" },
          ],
        },
      },
      {
        id: uuidv4(),
        acountTabLable: "Professional",
        icon: professional,
        panelData: null,
      },
      {
        id: uuidv4(),
        acountTabLable: "Business",
        icon: business,
        panelData: null,
      },
      {
        id: uuidv4(),
        acountTabLable: "Documents",
        icon: document,
        panelData: null,
      },
      {
        id: uuidv4(),
        acountTabLable: "Security",
        icon: security,
        panelData: null,
      },
    ],
  },
];

export const withIds = data.map((item) => ({
  ...item,
  id: uuidv4(),
}));
