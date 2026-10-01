import type { Metadata } from "next";

import { StatusPage } from "@/components/sections/StatusPage";
import { CTAButton } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="We couldn’t find that page"
      text="The page may have moved, or the address may be mistyped. Try one of these instead."
      actions={
        <>
          <CTAButton href={routes.home} withArrow>
            Go to the homepage
          </CTAButton>
          <CTAButton href={routes.services} variant="secondary">
            Our services
          </CTAButton>
          <CTAButton href={routes.contact} variant="secondary">
            Contact us
          </CTAButton>
        </>
      }
    />
  );
}
