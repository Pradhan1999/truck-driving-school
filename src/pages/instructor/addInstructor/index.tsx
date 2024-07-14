import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Page from "components/ui/PageLayout";
import { LoadingButton } from "@mui/lab";
import OtherDetails from "./otherDetails";
import PersonalInformation from "./personalInformation";
import { useEffect, useState } from "react";
import { addInstructor } from "services/instructor";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";

const schema = z.object({
  // personal info
  first_name: z.string().min(1, "Please Enter First Name"),
  last_name: z.string().min(1, "Please Enter Last Name"),
  dob: z.string().optional(),
  phone: z
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
  // qualification
  campus: z.string().optional(),
  course: z.string().optional(),
  subject: z.string().optional(),
  instructorName: z.string().optional(),
  licNo: z.string().optional(),
  licExpiryNo: z.string().optional(),
  licClass: z.string().optional(),
  driverHistory: z.string().optional(),
  driverAbstract: z.string().optional(),
  dermitPoints: z.string().optional(),
  experience: z.string().optional(),
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
});

type FormData = z.infer<typeof schema>;

const AddInstructor = () => {
  const navigate = useNavigate();

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
    addInstructor({
      body: {
        ...data,
        // remove this field later
        instructorName: "Jhon Doe",
        recertification: data?.recertification === "yes" ? true : false,
        contactNumber: "8989898989",
        profilePic: "https://dummyimage.com/600x400/000/fff",
      },
    })
      .then((res: any) => {
        navigate("/instructor");
        enqueueSnackbar("Instructor added successfully", {
          variant: "success",
        });
        //handle response here...
      })
      .catch((error: any) => {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
        //handle error here...
      });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstErrorField: any = document.querySelector(
        `[name="${Object.keys(errors)[0]}"]`
      );
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [errors]);

  return (
    <Page title="Add Instructor">
      <Box>
        <form name="add-instructor-form" onSubmit={handleSubmit(onSubmit)}>
          <PersonalInformation control={control} errors={errors} />

          <OtherDetails control={control} errors={errors} />

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
