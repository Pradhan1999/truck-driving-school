import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Page from "components/ui/PageLayout";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import OtherDetails from "./courseDetails";
import PersonalInformation from "./personalInformation";

const amountValidation = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount")
  .transform((val) => parseFloat(val))
  .refine((val) => val >= 0, "Amount cannot be negative")
  .optional();

const schema = z.object({
  campus: z.string().optional(),
  course: z.string().optional(),
  subject: z.string().optional(),
  instructorName: z.string().optional(),
  dob: z.string().optional(),
  licNo: z.string().optional(),
  licExpiryNo: z.string().optional(),
  licClass: z.string().optional(),
  driverHistory: z.string().optional(),
  driverAbstract: z.string().optional(),
  dermitPoints: z.string().optional(),
  experience: z.string().optional(),
  // qualification
  couseName: z.string().optional(),
  provider: z.string().optional(),
  authorizedBy: z.string().optional(),
  certificationDate: z.string().optional(),
  recertification: z.enum(["yes", "no"]).optional(),
  // reference
  refName: z.string().optional(),
  refContactNo: z
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
  dateVerified: z.string().optional(),
  // personal info
  contactNumber: z
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
  email: z.string().email("Invalid email address").optional(),
  streetNo: z.string().min(1, "Street Number is required").optional(),
  streetName: z.string().min(1, "Street Name is required").optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  educationalQualification: z.string().optional(),
  employmentDate: z.string().optional(),
  unavailableFrom: z.string().optional(),
  unavailableTo: z.string().optional(),
  medicalDue: z.string().optional(),
  criminalRecord: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const AddInstructor = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      // sameAddress: false,
    },
  });

  const onSubmit = (data: FormData) => {
    const payload = { ...data };
    console.log("payload", payload);

    // const addInstructor = useCallback(() => {
    //     setLoading(true);
    //     addInstructor({
    //       query: { query },
    //       pathParams: { pathParams },
    //       body: { body },
    //     })
    //       .then((res:any) => {
    //         //handle response here...
    //       })
    //       .catch((error:any) => {
    //         //handle error here...
    //        })
    //       .finally(() => {
    //         setLoading(false);
    //       });
    //   }, [queryDependency]);

    //   useEffect(() => {
    //     addInstructor();
    //   }, [addInstructor]);
  };

  return (
    <Page title="Add Instructor">
      <Box>
        <form name="add-instructor-form" onSubmit={handleSubmit(onSubmit)}>
          <OtherDetails control={control} errors={errors} />

          <PersonalInformation control={control} errors={errors} />

          {/* SUBMIT BUTTON */}
          <Stack direction="row" justifyContent="flex-end" mt={4}>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Add
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Page>
  );
};

export default AddInstructor;
