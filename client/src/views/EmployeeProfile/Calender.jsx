import { useEffect, useState } from "react";
import React from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import axios from "axios";

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "isSelected" && prop !== "isHovered" && prop !== "isInRange",
})(({ theme, isSelected, isHovered, isInRange, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.action.hover,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  ...(isInRange && {
    backgroundColor: theme.palette.primary.light,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));
function Day(props) {
  const { day, selectedDay, startDate, endDate, hoveredDay, ...other } = props;

  // eslint-disable-next-line react/prop-types
  const isInRange = day.isBetween(startDate, endDate, null, "[]");
  // eslint-disable-next-line react/prop-types
  const isSelected = day.isSame(startDate, "day") || day.isSame(endDate, "day");

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isSelected}
      isInRange={isInRange}
      isHovered={!isSelected && !isInRange && day.isSame(hoveredDay, "day")}
    />
  );
}

export default function Calendar() {
  useEffect(() => {
    getEmployeeHistory();
  }, []);

  const [employeeHistory, setEmployeeHistory] = useState();
  const [startDate, setStartDate] = React.useState(
    dayjs(employeeHistory?.startDate)
  );
  const [endDate, setEndDate] = React.useState(dayjs(employeeHistory?.endDate));
  const [dailyReport, setDailyReport] = useState("Nikhil");
  const [openOnClick, setOpenOnClick] = useState(false);
  const handleDailyClick = (date) => {
    console.log(date);
    setOpenOnClick(true);
    // fetch the data from api
    setDailyReport(date);
  };

  const getEmployeeHistory = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/getLeaveEmployee",
        config
      );
      console.log(response.data.data.at(-1));
      setStartDate(dayjs(response.data.data.at(-1).startDate));
      setEndDate(dayjs(response.data.data.at(-1).endDate));
    } catch (error) {
      console.error("Error fetching employee history:", error);
    }
  };

  return (
    <div className="pt-32 z-10  scale-[2] ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={startDate}
          onChange={(e) => handleDailyClick(`${e.$y}-${e.$M + 1}-${e.$D}`)}
          showDaysOutsideCurrentMonth
          displayWeekNumber
          slots={{ day: Day }}
          slotProps={{
            day: (ownerState) => ({
              selectedDay: startDate,
              startDate: startDate,
              endDate: endDate,
            }),
          }}
        />
      </LocalizationProvider>

      <dialog
        open={openOnClick}
        className="rounded-[12px] absolute z-50    w-[500px] min-h-[300px] top-0 mt-44 bg-black text-white"
      >
        <h2 className="mt-2 text-center">Daily Report</h2>
        <h3 className=" text-center">{dailyReport}</h3>

        <h3 className="mt-8 text-center">Todays Report </h3>
        <div className="flex flex-col gap-8 p-2 rounded-lg  w-[21rem] mx-auto border ">
          <div className=" ">
            <h2>Done the Frontend</h2>
            <a
              target="_blank"
              href={`https://github.com/ArohiSoftware/emplyeemanagement/compare/main...code-sharad:emplyeemanagement:main`}
              className="text-[12px] font-light hover:underline"
            >
              Github Commits
            </a>
          </div>

          <p className="text-sm">Improved the UI of EMS</p>
        </div>
        <button
          className="absolute top-2  right-4"
          onClick={() => setOpenOnClick(false)}
        >
          x
        </button>
      </dialog>
    </div>
  );
}
