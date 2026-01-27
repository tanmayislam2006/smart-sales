import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-muted px-4",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input id="password" type="password" required />
              </Field>
            </FieldGroup>

            {/* Login Button */}
            <Button className="w-full" type="submit">
              Login
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              onClick={() => toast.success("Google login clicked")}
              variant="outline"
              type="button"
              className="w-full"
            >
              Login with Google
            </Button>

            <FieldDescription className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="font-medium hover:underline">
                Sign up
              </a>
            </FieldDescription>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
