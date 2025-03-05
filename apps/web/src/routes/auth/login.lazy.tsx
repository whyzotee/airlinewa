import { loginApiLoginPostMutation } from "@/client/@tanstack/react-query.gen";
import { LOGO_PATH } from "@/utils";
import { Avatar, Button, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const loginMutation = useMutation(loginApiLoginPostMutation());

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
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
          localStorage.setItem("token", data);
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
    <main className="w-screen h-screen">
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-6">
        <Avatar
          className="rounded-xl"
          alt="log"
          src={LOGO_PATH}
          sx={{ width: 96, height: 96 }}
        />
        <h1 className="text-3xl font-bold">Log in</h1>
        <p className="text-gray-500">
          you can continue your flight after log in
        </p>
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
      </div>
    </main>
  );
}
