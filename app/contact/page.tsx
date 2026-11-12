import InteriorPage from "@/components/InteriorPages";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("contact");

export default function Page() {
  return <InteriorPage section="contact" />;
}
