"use client";

import { useEffect } from "react";

import { StatusPage } from "@/components/sections/StatusPage";
import { buttonClassName, CTAButton } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    // Surface the error in the browser console / monitoring; the digest matches server logs.
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      code="500"
      title="Something went wrong"
      text="An unexpected error occurred while loading this page. Please try again — if the problem continues, contact us."
      actions={
        <>
          <button type="button" className={buttonClassName()} onClick={() => retry()}>
            Try again
          </button>
          <CTAButton href={routes.home} variant="secondary">
            Go to the homepage
          </CTAButton>
        </>
      }
    />
  );
}
