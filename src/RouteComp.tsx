import DownloadComp from "./DownloadComp";
import HomeComp from "./HomeComp";
import SharedComp from "./SharedComp";
import HelpComp from "./HelpComp";
import { useRoute } from "./helpers";

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
  return <HomeComp />;
}
