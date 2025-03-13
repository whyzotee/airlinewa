import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { z } from "zod";

export const Route = createLazyFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: z
        .object({
          username: z.string().min(4),
          password: z.string().min(4),
          confirmPassword: z.string(),
        })
        .required()
        .refine(
          (values) => {
            return values.password === values.confirmPassword;
          },
          {
            message: "Passwords must match!",
            path: ["confirmPassword"],
          }
        ),
    },
    onSubmit: ({ value }) => {
      console.debug(value);
      toast("Function under development!");
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold">Register</h1>
      <p className="text-gray-500">you can continue your flight after log in</p>

      <form
        className="flex flex-col gap-4 max-w-lg w-full"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Stack className="gap-4">
          <form.Field
            name="username"
            children={(field) => {
              const { errors } = field.getMeta();
              const fieldError = errors.length > 0 ? errors[0] : undefined;

              return (
                <TextField
                  id={field.name}
                  name={field.name}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  size="small"
                  autoComplete="username"
                  value={field.state.value}
                  onChange={(evt) => field.handleChange(evt.target.value)}
                  onBlur={field.handleBlur}
                  error={!!fieldError}
                  helperText={fieldError && fieldError.message}
                />
              );
            }}
          />

          <form.Field
            name="password"
            children={(field) => {
              const { errors } = field.getMeta();
              const fieldError = errors.length > 0 ? errors[0] : undefined;

              return (
                <TextField
                  id={field.name}
                  name={field.name}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  size="small"
                  autoComplete="new-password"
                  value={field.state.value}
                  onChange={(evt) => field.handleChange(evt.target.value)}
                  onBlur={field.handleBlur}
                  error={!!fieldError}
                  helperText={fieldError && fieldError.message}
                />
              );
            }}
          />

          <form.Field
            name="confirmPassword"
            children={(field) => {
              const { errors } = field.getMeta();
              const fieldError = errors.length > 0 ? errors[0] : undefined;

              return (
                <TextField
                  id={field.name}
                  name={field.name}
                  label="Confirm password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  size="small"
                  autoComplete="new-password"
                  value={field.state.value}
                  onChange={(evt) => field.handleChange(evt.target.value)}
                  onBlur={field.handleBlur}
                  error={!!fieldError}
                  helperText={fieldError && fieldError.message}
                />
              );
            }}
          />

          <Button variant="contained" disableElevation fullWidth type="submit">
            Sign up
          </Button>
        </Stack>

        <p className="text-gray-500">Already have account?</p>

        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            navigate({
              to: "/auth/login",
            })
          }
        >
          Log in
        </Button>
      </form>
    </>
  );
}
