import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Page from "components/ui/PageLayout";
import PersonalInformation from "./personalInformation";
import Address from "./address";
import { useCallback, useEffect, useState } from "react";
import CourseDetails from "./courseDetails";
import { addStudent, getSingleStudent, updateStudent } from "services/student";
import ActionButton from "components/ui/ActionButton";
import { useNavigate, useParams } from "react-router";
import { enqueueSnackbar } from "notistack";

const amountValidation = z
  .union([z.string(), z.number()])
  .refine((val) => {
    if (typeof val === "string") {
      return /^\d+(\.\d{1,2})?$/.test(val);
    }
    return true;
  }, "Please enter a valid amount")
  .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
  .refine((val) => val >= 0, "Amount cannot be negative")
  .optional()
  .or(z.literal(""));

const schema = z.object({
  firstName: z.string().min(1, "Please Enter First Name"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Please Enter Last Name"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other", ""], {
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
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid contact number format"
    )
    .refine((value) => value.replace(/[^\d+]/g, "").length >= 10, {
      message: "Contact number must have at least 10 digits",
    })
    .optional()
    .or(z.literal("")),
  licenceNo: z.string().optional(),
  sin: z.string().optional(),
  dob: z.string({
    required_error: "Date of birth is required",
  }),
  language: z.enum(["english", "hindi"]),
  referredBy: z.enum(["", "pending", "approved", "rejected"]),
  fundingStatus: z.enum(["pending", "approved", "rejected"]),
  // address
  sameAddress: z.any().optional(),
  streetNo: z.string().min(1, "Street Number is required"),
  streetName: z.string().min(1, "Street Name is required"),
  city: z.string().min(1, "City is required"),
  province: z.enum(["", "pending", "approved", "rejected"]),
  postalCode: z.string().min(1, "Postal Code is required"),

  mailStreetNo: z.string().optional(),
  mailStreetName: z.string().optional(),
  mailCity: z.string().optional(),
  mailPostalCode: z.string().optional(),
  mailProvince: z.string().optional(),
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
  internationalStudent: z.enum(["yes", "no"]),
  classroomSch: z.string().min(1, "Classroom Schedule is required"),
  practicalSch: z.string().min(1, "Practical Schedule is required"),
  tutionFee: z
    .union([z.string(), z.number()])
    .refine((val) => {
      if (typeof val === "string") {
        return /^\d+(\.\d{1,2})?$/.test(val);
      }
      return true;
    }, "Please enter a valid amount")
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
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
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<any>({});

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      sameAddress: false,
      language: "english",
      mailProvince: "",
      referredBy: "",
      fundingStatus: "pending",
      gender: "",
      altContactNo: "",
      internationalStudent: "no",
    },
  });

  const onSubmit = (data: FormData) => {
    const { sameAddress, ...restData } = data;

    setLoading(true);
    const body = {
      ...restData,
      internationalStudent: data?.internationalStudent === "yes" ? true : false,
    };

    if (params?.id) {
      // update code
      updateStudent({
        pathParams: { id: params?.id },
        body,
      })
        .then((res: any) => {
          //handle response here...
          enqueueSnackbar("Student updated successfully", {
            variant: "success",
          });
        })
        .catch((error: any) => {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      addStudent({
        body,
      })
        .then((res: any) => {
          navigate("/student");
          enqueueSnackbar("Student added successfully", {
            variant: "success",
          });
          //handle response here...
        })
        .catch((error: any) => {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
          //handle error here...
        })
        .finally(() => {
          setLoading(false);
        });
    }
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

  // SCROLL TO ERROR
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

  const fetchSingleStudent = useCallback(() => {
    // setLoading(true);
    getSingleStudent({
      pathParams: { id: params?.id },
    })
      .then((res) => {
        setStudent(res);
        console.log("res", res);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [params?.id]);

  useEffect(() => {
    fetchSingleStudent();
  }, [fetchSingleStudent]);

  useEffect(() => {
    reset({
      ...Object.fromEntries(
        Object.entries(student || {}).map(([key, value]) => [key, value ?? ""])
      ),
      gender: student?.gender || "",
      altContactNo: student?.altContactNo || "",
      internationalStudent:
        student?.internationalStudent === true ? "yes" : "no",
    });
  }, [params.id, reset, student]);

  return (
    <Page
      title={params?.id ? "Edit Student" : "Add Student"}
      breadcrumbs={[
        { label: "Student", link: "/student" },
        { label: params?.id ? "Edit" : "Add", link: "/student/add" },
      ]}
    >
      <Box>
        <form name="add-student-form" onSubmit={handleSubmit(onSubmit)}>
          <PersonalInformation control={control} errors={errors} />

          <Address control={control} errors={errors} />

          <CourseDetails control={control} errors={errors} />

          {/* SUBMIT BUTTON */}
          <Stack direction="row" justifyContent="flex-end" mt={4}>
            <ActionButton
              text={params?.id ? "Update" : "Add"}
              sx={{ px: 5 }}
              loading={loading}
            />
          </Stack>
        </form>
      </Box>
    </Page>
  );
};

export default AddStudent;
