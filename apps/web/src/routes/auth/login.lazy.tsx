import { loginApiLoginPostMutation } from "@/client/@tanstack/react-query.gen";
import { useAuthStore } from "@/lib/zustand";
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
  const loginMutation = useMutation(loginApiLoginPostMutation({}));
  const authStore = useAuthStore();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onChange: z.object({
        username: z.string(),
        password: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      if (loginMutation.isPending) return;

      const { username, password } = value;

      const login = loginMutation.mutateAsync({
        body: {
          username,
          password,
        },
      });

      toast.promise(login, {
        loading: "Loading...",
        success: (data) => {
          // @ts-ignore
          const userId = data.id;

          authStore.login({
            name: "",
            userId,
          });
          navigate({ to: "/flight" });

          return "Login success.";
        },
        error: (err) => {
          const error = err as AxiosError;
          console.log(error);

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
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="username"
          children={(field) => (
            <TextField
              id={field.name}
              name={field.name}
              label="Username"
              variant="outlined"
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
