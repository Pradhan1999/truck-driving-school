import { zodResolver } from "@hookform/resolvers/zod";
import { Box, InputLabel, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Page from "components/ui/PageLayout";
import { LoadingButton } from "@mui/lab";
import PersonalInformation from "./personalInformation";
import Address from "./address";
import { useEffect } from "react";
import CourseDetails from "./courseDetails";

const amountValidation = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount")
  .transform((val) => parseFloat(val))
  .refine((val) => val >= 0, "Amount cannot be negative")
  .optional();

const schema = z.object({
  firstName: z.string().min(1, "Please Enter First Name"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Please Enter Last Name"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  userName: z.string().min(1, "Please Enter Username"),
  contactNo: z
    .string()
    .min(1, "Contact number is required")
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid contact number format"
    )
    .refine((value) => value.replace(/[^\d+]/g, "").length >= 10, {
      message: "Contact number must have at least 10 digits",
    }),
  altContactNo: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true; // Pass validation if the field is empty
        const digitsOnly = value.replace(/[^\d+]/g, "");
        return (
          digitsOnly.length >= 10 &&
          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value)
        );
      },
      {
        message:
          "Invalid contact number format. Must have at least 10 digits if provided.",
      }
    ),
  licenceNo: z.string().optional(),
  dob: z.string({
    required_error: "Date of birth is required",
  }),
  language: z.enum(["english", "hindi"]),
  // address
  sameAddress: z.any(),
  streetNo: z.string().min(1, "Street Number is required"),
  streetName: z.string().min(1, "Street Name is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  mailStreetNo: z.string().min(1, "Street Number is required"),
  mailStreetName: z.string().min(1, "Street Name is required"),
  mailCity: z.string().min(1, "City is required"),
  mailPostalCode: z.string().min(1, "Postal Code is required"),
  mailProvince: z.enum(["", "pending", "approved", "rejected"]),
  province: z.enum(["", "pending", "approved", "rejected"]),
  // course
  campus: z.string().min(1, "Campus is required"),
  enrollDate: z.string({
    required_error: "This field is required",
  }),
  commencementDate: z.string({
    required_error: "This field is required",
  }),
  completionDate: z.string({
    required_error: "This field is required",
  }),
  courseName: z.string().min(1, "Course Name is required"),
  campusLoc: z.string().min(1, "Campus Location is required"),
  internationalStudent: z.enum(["", "yes", "no"]),
  classroomSch: z.string().min(1, "Classroom Schedule is required"),
  practicalSch: z.string().min(1, "Practical Schedule is required"),
  tutionFee: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount")
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, "Amount cannot be negative"),
  bookFee: amountValidation,
  expendableFee: amountValidation,
  uniformFee: amountValidation,
  majorEquipmentFee: amountValidation,
  fieldTrips: amountValidation,
  examFee: amountValidation,
  otherFee: amountValidation,
  internationalFee: amountValidation,
  optionalFee: amountValidation,
  paymentDate: z.any(),
  amount: amountValidation,
  remainingAmount: amountValidation,
});

type FormData = z.infer<typeof schema>;

const AddStudent = () => {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      sameAddress: false,
      mailStreetNo: "",
      mailStreetName: "",
      mailProvince: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  const sameAddress = watch("sameAddress");
  const streetNo = watch("streetNo");
  const streetName = watch("streetName");
  const city = watch("city");
  const province = watch("province");
  const postalCode = watch("postalCode");

  useEffect(() => {
    if (sameAddress) {
      setValue("mailStreetNo", streetNo);
      setValue("mailStreetName", streetName);
      setValue("mailCity", city);
      setValue("mailProvince", province);
      setValue("mailPostalCode", postalCode);
    }
  }, [city, postalCode, province, sameAddress, setValue, streetName, streetNo]);

  return (
    <Page title="Add Student">
      <Box>
        <form name="add-student-form" onSubmit={handleSubmit(onSubmit)}>
          <PersonalInformation control={control} errors={errors} />

          <Address control={control} errors={errors} />

          <CourseDetails control={control} errors={errors} />

          {/* SUBMIT BUTTON */}
          <Stack direction="row" justifyContent="flex-end" mt={4}>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Save and Continue
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Page>
  );
};

export default AddStudent;
