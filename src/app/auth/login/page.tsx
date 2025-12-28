import { Github } from "lucide-react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { Button } from "~/components/ui/button";
import { auth } from "~/server/better-auth";

export default async function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <form>
        <Button
          className="cursor-pointer"
          formAction={async () => {
            "use server";
            // passing headers is required for Better Auth to properly
            // manage OAuth state cookies during the authentication flow
            const res = await auth.api.signInSocial({
              headers: await headers(),
              body: {
                provider: "github",
                callbackURL: "/dashboard",
              },
            });
            if (!res.url) {
              throw new Error("No URL returned from signInSocial");
            }
            redirect(res.url);
          }}
        >
          Continue with Github
          <Github />
        </Button>
      </form>
    </div>
  );
}
