import { v4 as uuidv4 } from "uuid";
import overview from "../assets/pie.png";
import checklist from "../assets/checklist.png";
import insight from "../assets/insights.png";
import agency from "../assets/agency.png";
import billing from "../assets/billing.png";
import page from "../assets/page.png";
import user from "../assets/user-circle.png";

const data = [
  { tabLabel: "Overview", icon: overview, tabPanelData: [] },
  { tabLabel: "Listing", icon: checklist, tabPanelData: [] },
  { tabLabel: "Insight", icon: insight, tabPanelData: [] },
  { tabLabel: "Report", icon: page, tabPanelData: [] },
  { tabLabel: "Agency", icon: agency, tabPanelData: [] },
  { tabLabel: "Billing", icon: billing, tabPanelData: [] },
  {
    tabLabel: "My Account",
    icon: user,
    tabPanelData: [
      { acountTabLable: "Profile", icon: user },
      { acountTabLable: "Professional", icon: user },
      { acountTabLable: "Business", icon: user },
      { acountTabLable: "Documents", icon: user },
      { acountTabLable: "Security", icon: user },
    ],
  },
];

export const withIds = data.map((item) => ({
  ...item,
  id: uuidv4(),
}));
