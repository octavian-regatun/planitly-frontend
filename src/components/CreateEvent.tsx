import DateRangeIcon from "@mui/icons-material/DateRange"
import LocationIcon from "@mui/icons-material/LocationOn"
import TitleIcon from "@mui/icons-material/Title"
import DescriptionIcon from "@mui/icons-material/ViewHeadline"
import { DatePicker, DateTimePicker } from "@mui/lab"
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material"
import { FormikHelpers, useFormik } from "formik"
import { useSnackbar } from "notistack"
import { CSSProperties } from "react"
import invariant from "tiny-invariant"
import * as yup from "yup"
import { Location } from "../interfaces/location.interface"
import { User } from "../interfaces/user.interface"
import EventsApi from "../lib/eventsApi"
import LocationsApi from "../lib/locationsApi"
import { useUserStore } from "../lib/stores"

interface FormValues {
  title: string
  description: string
  startDate: Date | null
  endDate: Date | null
  fullDay: boolean
  locationName: string
}

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  startDate: yup
    .date()
    .typeError("Invalid date format")
    .required("Start date is required"),
  endDate: yup
    .date()
    .typeError("Invalid date format")
    .required("End date is required"),
})

class DatePickersTouched {
  startDate: boolean
  endDate: boolean

  constructor(startDate: boolean, endDate: boolean) {
    this.startDate = startDate
    this.endDate = endDate
  }

  reset() {
    this.startDate = false
    this.endDate = false
  }

  set(startDate: boolean, endDate: boolean) {
    this.startDate = startDate
    this.endDate = endDate
  }
}

const datePickersTouched = new DatePickersTouched(false, false)

function renderStartDatePicker(formik: ReturnType<typeof useFormik>) {
  return formik.values.fullDay ? (
    <DatePicker
      label="Start Date *"
      value={formik.values.startDate}
      onChange={(value) => {
        formik.setFieldValue("startDate", value?.$d)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name="startDate"
          error={Boolean(
            formik.errors.startDate && datePickersTouched.startDate
          )}
          helperText={<span>{formik.errors.startDate as string}</span>}
          className={formik.errors.endDate ? "CreateEvent-errorMargin" : ""}
        />
      )}
    />
  ) : (
    <DateTimePicker
      label="Start Date *"
      value={formik.values.startDate}
      onChange={(value) => {
        formik.setFieldValue("startDate", value?.$d)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name="startDate"
          error={Boolean(
            formik.errors.startDate && datePickersTouched.startDate
          )}
          helperText={<span>{formik.errors.startDate as string}</span>}
          className={formik.errors.endDate ? "CreateEvent-errorMargin" : ""}
        />
      )}
    />
  )
}

function renderEndDatePicker(formik: ReturnType<typeof useFormik>) {
  return formik.values.fullDay ? (
    <DatePicker
      label="End Date *"
      value={formik.values.endDate}
      onChange={(value) => {
        formik.setFieldValue("endDate", value?.$d)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name="endDate"
          error={Boolean(formik.errors.endDate && datePickersTouched.endDate)}
          helperText={<span>{formik.errors.endDate as string}</span>}
          className={formik.errors.startDate ? "CreateEvent-errorMargin" : ""}
        />
      )}
    />
  ) : (
    <DateTimePicker
      label="End Date *"
      value={formik.values.endDate}
      onChange={(value) => {
        formik.setFieldValue("endDate", value?.$d)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name="endDate"
          error={Boolean(formik.errors.endDate && datePickersTouched.endDate)}
          helperText={<span>{formik.errors.endDate as string}</span>}
          className={formik.errors.startDate ? "CreateEvent-errorMargin" : ""}
        />
      )}
    />
  )
}

export default function CreateEvent() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  async function handleSubmit(
    values: FormValues,
    formik: FormikHelpers<FormValues>
  ): Promise<void> {
    const user = useUserStore.getState().user as User
    const { title, description, startDate, endDate, fullDay, locationName } =
      values

    invariant(startDate, "startDate is null")
    invariant(endDate, "endDate is null")

    let location: Location | undefined

    if (locationName) {
      location = await LocationsApi.create({
        name: locationName,
        authorId: user.id,
      })
    }

    const eventResponse = await EventsApi.create({
      title,
      description: description || undefined,
      startDate,
      endDate,
      fullDay,
      locationId: location?.id,
      authorId: user.id,
    })

    if (eventResponse?.status === 201) {
      enqueueSnackbar(eventResponse.data.message, { variant: "success" })
    } else {
      enqueueSnackbar("unknown error", { variant: "error" })
    }
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      fullDay: false,
      locationName: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    onReset: () => datePickersTouched.reset(),
  })

  return (
    <form className="CreateEvent" onSubmit={formik.handleSubmit}>
      <Typography variant="h4">
        <b>New Event</b>
      </Typography>
      <div className="CreateEvent-textFieldWithIcon">
        <TitleIcon />
        <TextField
          name="title"
          label="Title *"
          variant="outlined"
          size="small"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
      </div>
      <div className="CreateEvent-textFieldWithIcon">
        <DescriptionIcon />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          size="small"
          multiline
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>
      <div className="CreateEvent-textFieldWithIcon">
        <DateRangeIcon />
        {renderStartDatePicker(formik as any)}
        {renderEndDatePicker(formik as any)}
      </div>
      <div className="CreateEvent-checkboxContainer">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              name="fullDay"
              value={formik.values.fullDay}
              onChange={formik.handleChange}
            />
          }
          label="Full Day"
        />
      </div>
      <div className="CreateEvent-textFieldWithIcon">
        <LocationIcon />
        <TextField
          name="locationName"
          label="Location"
          variant="outlined"
          size="small"
          fullWidth
          value={formik.values.locationName}
          onChange={formik.handleChange}
        />
      </div>
      <div className="CreateEvent-buttonContainer">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => datePickersTouched.set(true, true)}
        >
          Add Event
        </Button>
      </div>
    </form>
  )
}
