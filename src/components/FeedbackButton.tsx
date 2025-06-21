import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function FeedbackFloatingButton() {
  return (
    <div className="fixed bottom-25 -right-9 z-50 -rotate-90">
      <Link
        href={process.env.NEXT_PUBLIC_FEEDBACK_FORM || ""}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "default" }) + " shadow-lg"}
      >
        💬 Feedback
      </Link>
    </div>
  );
}
// fixed right-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-right z-50
