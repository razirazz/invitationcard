type LangType = "en" | "ml";

export const content: Record<
  LangType,
  {
    title: string;
    brideP: string;
    groomP: string;
    event: string;
    date: string;
    time: string;
    venue: string;
  }
> = {
  en: {
    title: "Razeena & Yousuf Ali",
    brideP: "Razzak & Mymoona",
    groomP: "Abdul Latheef & Zeenath",
    event: "Marriage Ceremony",
    date: "13 June 2026",
    time: "11 AM - 3 PM",
    venue: "Kottalath Gardenia, Chettippadi",
  },
  ml: {
    title: "റസീന & യൂസുഫലി",
    brideP: "റസാക്ക് & മൈമൂന",
    groomP: "അബ്ദുൽ ലത്തീഫ് & സീനത്ത്",
    event: "കല്യാണം",
    date: "2026 ജൂൺ 13",
    time: "11 മണി - 3 മണി",
    venue: "കൊട്ടലത്ത് ഗാർഡീനിയ, ചെട്ടിപ്പടി",
  },
};