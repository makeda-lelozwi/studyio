import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Course from "./Courses/Course";
import Create from "./Create/Create";
import { CourseData } from "@/types";

interface TabPropData {
  tabs: string[];
  courses: CourseData[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, index, value }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TabComponent = ({ tabs, courses }: TabPropData) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log("Tabs panel courses: ", courses);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      {courses.map((course, index) => (
          <Course key={index} course={course} />
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Create />
      </CustomTabPanel>
    </Box>
  );
};

export default TabComponent;
