/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { CSSProperties } from "react";
import Month from "../enums/month.enum";
import {
  daysOfTheWeek,
  generateCalendarDays,
  isCurrentMonth,
} from "../lib/calendar";
import { NAVBAR_HEIGHT } from "../lib/constants";

const calendar = generateCalendarDays(Month.JANUARY, 2022);

export default function Calendar() {
  return (
    <div style={calendarStyle}>
      <div style={daysOfTheWeekStyle}>
        {daysOfTheWeek.map((dayOfTheWeek) => (
          <div css={dayOfTheWeekStyle} key={`dayOfTheWeek-${dayOfTheWeek}`}>
            {dayOfTheWeek.substring(0, 3).toUpperCase()}
          </div>
        ))}
      </div>
      {calendar.map((week, index) => (
        <div css={weekStyle} key={`week-${index + 1}`}>
          {week.map((day) => (
            <div
              css={dayStyle}
              key={`day-${day.getTime()}`}
              is_current_month={isCurrentMonth(day, Month.JANUARY)}
              //   onClick={handleClick}
              role="button"
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const calendarStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  flex: "1",
  border: `1px solid ${grey[300]}`,
};

const daysOfTheWeekStyle = {
  display: "flex",
};
const dayOfTheWeekStyle = css({
  display: "flex",
  flex: "1 1 0",
  justifyContent: "center",
  borderRight: `1px solid ${grey[300]}`,
  ":last-child": {
    borderRight: "none",
  },
});

const weekStyle = css({
  display: "flex",
  flex: "1",
  borderBottom: `1px solid ${grey[300]}`,
  ":last-child": {
    borderBottom: "0px",
  },
});
const dayStyle = css({
  display: "flex",
  flex: "1 1 0",
  justifyContent: "center",
  borderRight: `1px solid ${grey[300]}`,
  '&[is_current_month="false"]': {
    backgroundColor: `${grey[200]}`,
    color: `${grey[600]}`,
  },
  ":last-child": {
    borderRight: "0",
  },
});
