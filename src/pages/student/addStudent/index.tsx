import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Page from "components/ui/PageLayout";
import PersonalInformation from "./personalInformation";
import Address from "./address";
import { useEffect, useState } from "react";
import CourseDetails from "./courseDetails";
import { addStudent } from "services/student";
import ActionButton from "components/ui/ActionButton";
import { useNavigate } from "react-router";

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
    .min(1, "Contact number is required")
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid contact number format"
    )
    .refine((value) => value.replace(/[^\d+]/g, "").length >= 10, {
      message: "Contact number must have at least 10 digits",
    })
    .optional(),
  licenceNo: z.string().optional(),
  sin: z.string().optional(),
  dob: z.string({
    required_error: "Date of birth is required",
  }),
  language: z.enum(["english", "hindi"]),
  referredBy: z.enum(["", "pending", "approved", "rejected"]),
  fundingStatus: z.enum(["", "pending", "approved", "rejected"]),
  // address
  sameAddress: z.any().optional(),
  streetNo: z.string().min(1, "Street Number is required"),
  streetName: z.string().min(1, "Street Name is required"),
  city: z.string().min(1, "City is required"),
  province: z.enum(["", "pending", "approved", "rejected"]),
  postalCode: z.string().min(1, "Postal Code is required"),

  mailStreetNo: z.string().min(1, "Street Number is required").optional(),
  mailStreetName: z.string().min(1, "Street Name is required").optional(),
  mailCity: z.string().min(1, "City is required").optional(),
  mailPostalCode: z.string().min(1, "Postal Code is required").optional(),
  mailProvince: z.enum(["", "pending", "approved", "rejected"]).optional(),

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      sameAddress: false,
      language: "english",
      mailProvince: "",
      referredBy: "",
      fundingStatus: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const { sameAddress, ...restData } = data;

    setLoading(true);
    const body = {
      ...restData,
      internationalStudent: data?.internationalStudent === "yes" ? true : false,
    };

    addStudent({
      body,
    })
      .then((res: any) => {
        console.log("res", res);
        navigate("/student");
        //handle response here...
      })
      .catch((error: any) => {
        console.log("error", error);
        //handle error here...
      })
      .finally(() => {
        setLoading(false);
      });
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
            <ActionButton text="Add" sx={{ px: 5 }} loading={loading} />
            {/* <LoadingButton
              loading={isSubmitting}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Save and Continue
            </LoadingButton> */}
          </Stack>
        </form>
      </Box>
    </Page>
  );
};

export default AddStudent;
