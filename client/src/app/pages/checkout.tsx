import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const CheckOut = () => {
  return (
    <main className="container mx-auto px-">
      <h1>Hello World</h1>
      <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
        <AccordionSummary id="panel-header" aria-controls="panel-content">
          Header
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionDetails>
      </Accordion>
    </main>
  );
};

export default CheckOut;
