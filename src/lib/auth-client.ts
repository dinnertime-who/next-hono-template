import { createAuthClient } from "better-auth/client";
import {
  adminClient,
  anonymousClient,
  lastLoginMethodClient,
  multiSessionClient,
  organizationClient,
  usernameClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    adminClient(), //
    usernameClient(),
    anonymousClient(),
    organizationClient(),
    lastLoginMethodClient(),
    multiSessionClient(),
  ],
});
