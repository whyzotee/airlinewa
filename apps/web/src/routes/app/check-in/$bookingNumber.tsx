import { PassengerResponse } from "@/client";
import {
  bookingBookingOptions,
  bookingCheckInMutation,
} from "@/client/@tanstack/react-query.gen";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import dayjs from "dayjs";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/app/check-in/$bookingNumber")({
  loader: async ({ context, params }) => {
    const { bookingNumber } = params;
    try {
      await context.queryClient.ensureQueryData(
        bookingBookingOptions({
          path: {
            booking_number: bookingNumber,
          },
        })
      );
    } catch (err) {
      console.error(err);
      throw notFound();
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <p>Booking not found!</p>,
});

function RouteComponent() {
  const { bookingNumber } = Route.useParams();
  const navigate = Route.useNavigate();

  const signMap = useMemo(
    () => [
      {
        title: "Explosive",
        imagePath: "image002-01.webp",
      },
      {
        title: "Gases",
        imagePath: "image003-01.webp",
      },
      {
        title: "Flammable liquids",
        imagePath: "image003-04.webp",
      },
      {
        title: "Flammable solids",
        imagePath: "image004-01.webp",
      },
      {
        title: "Oxidizing substances",
        imagePath: "image005-01.webp",
      },
      {
        title: "infectious substances",
        imagePath: "image006-02.webp",
      },
      {
        title: "Toxic substances",
        imagePath: "image006-01.webp",
      },
      {
        title: "Radioactive materia",
        imagePath: "image007-02.webp",
      },
      {
        title: "Corrosive substances",
        imagePath: "image008-01.webp",
      },
      {
        title: "Miscellaneous dangerous substances",
        imagePath: "image009-01.webp",
      },
    ],
    []
  );

  const bookingQuery = useSuspenseQuery(
    bookingBookingOptions({
      path: {
        booking_number: bookingNumber,
      },
    })
  );

  const booking = bookingQuery.data;

  const checkInMutation = useMutation(bookingCheckInMutation());

  const form = useForm({
    defaultValues: {
      passengers: [...booking.passengers],
    } as {
      passengers: PassengerResponse[];
    },
    onSubmit: ({ value }) => {
      console.debug(value);
    },
  });

  const steps = [
    "Fill passenger details",
    "Accept acknowledgement",
    "Accept Hazardous Substances Policy",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  // const isStepOptional = (step: number) => {
  //   return false;
  // };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinishCheckIn = useCallback(() => {
    const checkIn = checkInMutation.mutateAsync({
      path: {
        booking_number: booking.id,
      },
    });

    toast.promise(checkIn, {
      loading: "Checking in...",
      success: () => {
        navigate({
          to: "/app/ticket",
          search: {
            booking_id: booking.id,
          },
        });
        return "Check in success.";
      },
      error: () => {
        return "Check in error";
      },
    });
  }, [booking.id, checkInMutation, navigate]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <div>
              <Typography variant="h6" gutterBottom>
                {"Select and fill in your passenger information."}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {`Seat reservation number: ${booking.id}`}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                {booking.origin[0]} to {booking.destination[0]}
              </Typography>

              <form.Field
                name="passengers"
                mode="array"
                children={(field) => {
                  return (
                    <List component={Stack} spacing={2}>
                      {field.state.value.map((passenger, i) => (
                        <Paper key={i}>
                          <ListItem
                            component={Stack}
                            direction="row"
                            sx={{
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {/* <form.Field
                                name={`passengers[${i}].checked`}
                                children={(fieldChecked) => (
                                  <Checkbox
                                    name={fieldChecked.name}
                                    id={fieldChecked.name}
                                    value={fieldChecked.state.value}
                                    onChange={(_, checked) => {
                                      fieldChecked.handleChange(checked);
                                    }}
                                  />
                                )}
                              /> */}

                              <ListItemText primary={<PersonIcon />} />
                              <Typography
                                ml={2}
                              >{`${passenger.name} ${passenger.lastname}`}</Typography>
                            </Box>

                            <Chip
                              variant="outlined"
                              color="error"
                              size="small"
                              label="Not check in"
                            />
                          </ListItem>
                          <Divider />

                          <Box p={3}>
                            <TextField
                              label="Birthday"
                              value={dayjs(passenger.birthday).format(
                                "DD/MM/YYYY"
                              )}
                              disabled
                            />
                          </Box>
                        </Paper>
                      ))}
                    </List>
                  );
                }}
              />

              <Button
                type="button"
                onClick={() => {
                  handleNext();
                }}
                // sx={{ mx: "auto", width: 400 }}
                size="large"
                variant="contained"
                fullWidth
              >
                {"Continue"}
              </Button>
            </div>
          )}

          {activeStep === 1 && (
            <Stack
              sx={{
                display: "flex",
                placeItems: "center",
                justifyItems: "center",
                alignItems: "center",
                p: 8,
              }}
            >
              <Box>
                <Typography variant="h6">
                  Acknowledgement of Carrying Original and Correct Travel
                  Documents:
                </Typography>

                <Typography mt={2}>
                  I confirm that the information provided herein is true and
                  correct and will carry the original and correct travel
                  documents with me on the date of departure.
                </Typography>

                <Typography mt={2}>
                  In the event of being refused entry at the destination due to
                  the incorrect information provided herein and/or any other
                  issues related to the Passenger's travel documents, I hereby
                  acknowledge and agree that I shall be liable for all fines
                  levied by any government agency on the Airline Operator
                  (including any entities within the AirlineWa Group) or any
                  other costs incurred by the Airline Operator and shall
                  reimburse such costs or fines to the Airline Operator.
                </Typography>

                <Typography>
                  I have read and agree to carry the original valid travel
                  documents.
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  component={Paper}
                  p={3}
                  mt={3}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      toast.success("Cancel check in success.");
                      navigate({
                        to: "/app/check-in",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => handleNext()}
                  >
                    Confirm
                  </Button>
                </Stack>
              </Box>
            </Stack>
          )}

          {activeStep === 2 && (
            <Stack
              sx={{
                p: 8,
              }}
            >
              <Typography variant="h5">
                Hazardous Substances Regulations
              </Typography>

              <Typography variant="body1" color="textSecondary">
                Display of carry-on items and checked baggage
              </Typography>

              <Typography>
                AirlineWa does not permit the carriage of dangerous goods and
                prohibited items. Dangerous goods are items that AirAsia, in its
                reasonable opinion, may be dangerous or pose a danger to health,
                safety and/or property, whether contained in cabin baggage or
                checked baggage.
              </Typography>

              <Typography fontWeight={700} mt={2}>
                Prohibited Items
              </Typography>

              <Typography>
                The following list of prohibited items is not exhaustive and
                there may be additional items not included here.
              </Typography>

              <Grid2
                container
                spacing={{ xs: 2, md: 3 }}
                // columns={{ xs: 4, md: 6 }}
                columns={6}
                mt={2}
              >
                {signMap.map((sign, i) => (
                  <Grid2
                    key={i}
                    sx={{
                      // justifyContent: "center",
                      // alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    <img
                      alt={sign.title}
                      src={import.meta.env.BASE_URL + "sign/" + sign.imagePath}
                      // height={50}
                      width={80}
                    />

                    <Typography>{sign.title}</Typography>
                  </Grid2>
                ))}
              </Grid2>

              <Typography>
                In addition to the items listed above, please refer to the list
                of prohibited items as specified in the Terms and Conditions of
                Carriage, Section 8.
              </Typography>

              <Paper sx={{ mt: 3, p: 3 }}>
                <Typography>
                  I have read and agree to the AirlineWa Hazardous Substances
                  Policy.
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      toast.success("Cancel check in success.");
                      navigate({
                        to: "/app/check-in",
                      });
                    }}
                  >
                    {"Not agreed"}
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    // onClick={() => handleNext()}
                    onClick={handleFinishCheckIn}
                  >
                    {"Agree"}
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          )}

          {/* {activeStep === 2} */}

          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            <Box sx={{ flex: "1 1 auto" }} />

            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
        </React.Fragment>
      )}
    </Box>
  );
}
