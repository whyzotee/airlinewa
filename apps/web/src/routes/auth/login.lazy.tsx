import { authLoginMutation } from "@/client/@tanstack/react-query.gen";
import { useAuthStore } from "@/lib/zustand";
import { isDev } from "@/utils";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

export const Route = createLazyFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const loginMutation = useMutation(authLoginMutation());
  const authStore = useAuthStore();

  const form = useForm({
    defaultValues: {
      email: isDev ? "t@1.dev" : "",
      password: isDev ? "t" : "",
    },
    validators: {
      onChange: z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      if (loginMutation.isPending) return;

      const { email, password } = value;

      const login = loginMutation.mutateAsync({
        body: {
          email,
          password,
        },
      });

      toast.promise(login, {
        loading: "Loading...",
        success: (data) => {
          // @ts-ignore
          const userId = data.id;

          authStore.login({
            userId,
            name: data.name,
            email: data.email,
          });
          navigate({ to: "/" });

          return "Login success.";
        },
        error: (err) => {
          const error = err as AxiosError;

          // @ts-ignore
          const errorDetail = error.response?.data.detail;
          if (errorDetail === "CREDENTIAL_INVALID") {
            return "Credential invalid!";
          }

          return err.message;
        },
      });
      console.debug(value);
    },
  });

  return (
    <>
      <Typography variant="h4">{"Login"}</Typography>
      <Typography variant="inherit">
        you can continue your flight after log in
      </Typography>

      <form
        className="flex flex-col gap-4 max-w-lg w-full"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => (
            <TextField
              id={field.name}
              name={field.name}
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              size="small"
              disabled={loginMutation.isPending}
              value={field.state.value}
              onChange={(evt) => field.handleChange(evt.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <TextField
              id={field.name}
              name={field.name}
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              autoComplete="off"
              disabled={loginMutation.isPending}
              value={field.state.value}
              onChange={(evt) => field.handleChange(evt.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />

        <Button variant="contained" disableElevation fullWidth type="submit">
          Log in
        </Button>

        <p className="text-gray-500">No have any account?</p>
        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            navigate({
              to: "/auth/register",
            })
          }
        >
          Register
        </Button>
      </form>
    </>
  );
}
