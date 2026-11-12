import Link from "next/link";
import { Icon } from "@/components/Icons";

export default function NotFound() {
  return <main id="main-content" className="not-found"><span className="eyebrow">404 / OUT OF FRAME</span><h1>Let&apos;s get you back in focus.</h1><p>We couldn&apos;t find that page. Your next step starts here.</p><Link href="/" className="button button-dark">Back to SIVIM <Icon name="arrow" size={19} /></Link></main>;
}
