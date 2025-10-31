import DownloadComp from "./DownloadComp";
import HomeComp from "./HomeComp";
import SharedComp from "./SharedComp";
import HelpComp from "./HelpComp";
import { useRoute } from "./helpers";
import AIVigilantComp from "./AIVigilantComp";
import GoogleTranslateVigilantComp from "./GoogleTranslateVigilantComp";

export default function RouteComp() {
  const route = useRoute();
  if (route === "download") {
    return <DownloadComp />;
  }
  if (route === "shared") {
    return <SharedComp />;
  }
  if (route === "help") {
    return <HelpComp />;
  }
  if (route === "ai-vigilant") {
    return <AIVigilantComp />;
  }
  if (route === "google-translate-vigilant") {
    return <GoogleTranslateVigilantComp />;
  }
  return <HomeComp />;
}
