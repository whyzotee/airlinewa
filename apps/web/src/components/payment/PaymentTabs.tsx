import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { usePaymentStore } from "@/lib/zustand";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useState } from "react";
import { PatternFormat } from "react-number-format";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="max-w-lg min-h-72"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const PaymentTabs = () => {
  const { setPayment, resetPayment } = usePaymentStore();
  const [value, setValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    resetPayment();
    setPayment({ ["type"]: newValue == 0 ? "CREDIT_DEBIT" : "WALLET" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ [e.target.id]: e.target.value.replace(/ /g, "") });
  };

  return (
    <Box className="flex p-4 border-gray-200 border-1 rounded-lg">
      <Tabs
        value={value}
        onChange={handleTabChange}
        orientation="vertical"
        aria-label="basic tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          icon={<CreditCardIcon />}
          iconPosition="start"
          label="บัตรเครดิต/บัตรเดบิต"
          {...a11yProps(0)}
        />
        <Tab
          icon={<AccountBalanceWalletIcon />}
          iconPosition="start"
          label="Wallet"
          {...a11yProps(1)}
        />
        {/* <Tab
          icon={<LocalAtmIcon />}
          iconPosition="start"
          label="Paypal"
          {...a11yProps(2)}
        /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className="flex flex-col gap-4">
          <PatternFormat
            id="number"
            onChange={handleInputChange}
            label="หมายเลขบัตร"
            valueIsNumericString
            customInput={TextField}
            format="#### #### #### ####"
            mask=" "
          />

          <div className="flex gap-4">
            <PatternFormat
              id="out_date"
              label="วันที่หมดอายุ"
              valueIsNumericString
              placeholder="MM/YY"
              customInput={TextField}
              format="##/##"
              mask=" "
              onChange={handleInputChange}
            />
            <PatternFormat
              id="cvv"
              label="CVC/CVV"
              valueIsNumericString
              placeholder="CVC/CVV"
              customInput={TextField}
              format="###"
              mask=" "
              onChange={handleInputChange}
            />
          </div>
          <TextField
            id="holder_name"
            label="ชื่อผู้ถือบัตร"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        
        Item Three
      </TabPanel> */}
    </Box>
  );
};

export default PaymentTabs;
