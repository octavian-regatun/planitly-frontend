import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationIcon from "@mui/icons-material/LocationOn";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/ViewHeadline";
import { DatePicker, DateTimePicker } from "@mui/lab";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import * as yup from "yup";
import { User } from "../interfaces/user.interface";
import { createEvent } from "../lib/event";
import { createLocation } from "../lib/location";
import { redirectToError } from "../lib/redirects";
import { useUserStore } from "../lib/stores";

function renderStartDatePicker(formik: any) {
  return formik.values.isFullDay ? (
    <DatePicker
      label="Start Date *"
      value={formik.values.startDate}
      onChange={(value) => {
        formik.setFieldValue("startDate", value?.$d);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name="startDate"
          error={formik.errors.startDate && formik.touched.startDate}
          helperText={formik.errors.startDate}
        />
      )}
    />
  ) : (
    <DateTimePicker
      label="Start Date *"
      value={formik.values.startDate}
      onChange={(value) => {
        formik.setFieldValue("startDate", value?.$d);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name="startDate"
          error={formik.errors.startDate && formik.touched.startDate}
          helperText={formik.errors.startDate}
        />
      )}
    />
  );
}

function renderEndDatePicker(formik: any) {
  return formik.values.isFullDay ? (
    <DatePicker
      label="End Date *"
      value={formik.values.endDate}
      onChange={(value) => {
        formik.setFieldValue("endDate", value?.$d);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name="endDate"
          error={formik.errors.endDate && formik.touched.endDate}
          helperText={formik.errors.endDate}
        />
      )}
    />
  ) : (
    <DateTimePicker
      label="End Date *"
      value={formik.values.endDate}
      onChange={(value) => {
        formik.setFieldValue("endDate", value?.$d);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name="endDate"
          error={formik.errors.endDate && formik.touched.endDate}
          helperText={formik.errors.endDate}
        />
      )}
    />
  );
}

interface FormValues {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  fullDay: boolean;
  locationName: string;
}

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  locationName: yup.string().required("Location is required"),
});

async function handleSubmit(values: FormValues): Promise<void> {
  const user = useUserStore.getState().user as User;
  const { title, description, startDate, endDate, fullDay, locationName } =
    values;

  const location = await createLocation({
    name: values.locationName,
    lat: 0,
    lon: 0,
    authorId: user.id,
  });

  if (!location) redirectToError("Location could not be created");

  const event = await createEvent({
    title,
    description,
    startDate,
    endDate,
    fullDay,
    locationId: location?.id as number,
    authorId: user.id,
  });

  console.log(event);
}

export default function CreateEvent() {
  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      fullDay: false,
      locationName: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form style={formStyle} onSubmit={formik.handleSubmit}>
      <Typography variant="h4">
        <b>New Event</b>
      </Typography>
      <div style={textFieldWithIconStyle}>
        <TitleIcon />
        <TextField
          name="title"
          label="Title *"
          variant="outlined"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
      </div>
      <div style={textFieldWithIconStyle}>
        <DescriptionIcon />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          multiline
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>
      <div style={textFieldWithIconStyle}>
        <DateRangeIcon />
        {renderStartDatePicker(formik)}
        {renderEndDatePicker(formik)}
      </div>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          marginLeft: "3.5rem",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="fullDay"
              value={formik.values.fullDay}
              onChange={formik.handleChange}
            />
          }
          label="Full Day"
        />
      </div>
      <div style={textFieldWithIconStyle}>
        <LocationIcon />
        <TextField
          name="locationName"
          label="Location *"
          variant="outlined"
          fullWidth
          value={formik.values.locationName}
          onChange={formik.handleChange}
          error={
            formik.touched.locationName && Boolean(formik.errors.locationName)
          }
          helperText={formik.touched.locationName && formik.errors.locationName}
        />
      </div>
      <div style={buttonContainerStyle}>
        <Button type="submit" variant="contained" color="primary">
          Add Event
        </Button>
      </div>
    </form>
  );
}

const formStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "1rem",
  gap: "1rem",
};

const textFieldWithIconStyle: CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const buttonContainerStyle: CSSProperties = {
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
};
