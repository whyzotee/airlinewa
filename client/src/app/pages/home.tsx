// import { useState } from "react";
// import logo from "/logo.jpg";
import { Link } from "react-router-dom";
import preview from "/preview.webm";
import { Button } from "@mui/material";

const Home = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const handleClick = () => setIsOpen(true);

  return (
    <main>
      <div className="fixed h-screen w-screen bg-black opacity-75"></div>
      <video
        className="fixed min-h-full min-w-full -z-10 bg-black object-cover"
        autoPlay
        loop
        muted
      >
        <source src={preview} type="video/mp4" />
      </video>
      <div className="flex flex-col h-screen justify-center items-center bg-transparent relative gap-4">
        <div className="flex gap-4">
          {/* <Avatar className="rounded-xl" size="2xl" imageUrl={logo} /> */}
          <div className="text-white">
            <h1 className="text-2xl">Fly with Airlinewa</h1>
            <p>you never die alone</p>
          </div>
        </div>

        {/* <Button
            className="text-white border border-white rounded-lg cursor-pointer"
            onClick={handleClick}
          >
            Fly Now, Book Here
          </Button> */}
        <Button
          variant="outlined"
          className="text-white border border-white rounded-lg cursor-pointer"
        >
          <Link to="/checkout">Comming Soon</Link>
        </Button>
        {/* <Drawer open={isOpen} setOpen={setIsOpen}>
            <Drawer.Panel position="top" className="bg-white p-8 rounded-b-xl">
              <div className="flex gap-4">
                <HomeDropDown />
                <HomeDropDown /> 
                <Input
                  aria-label="default"
                  className="border-red-300 border rounded-lg w-56"
                />
                <Checkbox
                  label="เที่ยวบินเฉพาะแอร์ไลน์วา"
                  id="withLabel"
                  className=""
                />
              </div>
            </Drawer.Panel>
          </Drawer> */}
      </div>
    </main>
  );
};

export default Home;
