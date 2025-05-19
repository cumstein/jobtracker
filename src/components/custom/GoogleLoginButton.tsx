import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

function GoogleLoginButton() {
  return <Button onClick={() => signIn("google")}>Sign in With Google</Button>;
}
export default GoogleLoginButton;
