import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MainCard from "components/MainCard";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleStudent } from "services/student";
import {
  formatCurrency,
  fullName,
  getFullAddress,
  getInitials,
} from "utils/helpers";

const ViewStudent = () => {
  const theme = useTheme();
  const params = useParams();

  const [student, setStudent] = useState<any>({});

  const stringToColor = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  const CustomField = ({
    title,
    value,
    sx,
    titleSX,
    valueSX,
  }: {
    title: any;
    value: any;
    sx?: SxProps<Theme>;
    titleSX?: SxProps<Theme>;
    valueSX?: SxProps<Theme>;
  }) => {
    return (
      <Grid item xs={12} sm={6} sx={sx}>
        <Stack>
          <Typography color={grey[600]} sx={titleSX}>
            {title}
          </Typography>
          <Typography variant="subtitle1" fontWeight={500} sx={valueSX}>
            {value}
          </Typography>
        </Stack>
      </Grid>
    );
  };

  const fetchSingleStudent = useCallback(() => {
    // setLoading(true);
    getSingleStudent({
      //   query: { limit: viewPage, start: startIndex, search: "" },
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

  const rows = [
    {
      item: "Tution fees",
      date: "07/10/2024",
      receiptId: "1212",
      amount: "$123.00",
      paymentMode: "Cash",
      amountPaid: "$100.00",
    },
    {
      item: "Exam fees",
      date: "07/10/2024",
      receiptId: "1212",
      amount: "$123.00",
      paymentMode: "Cash",
      amountPaid: "$100.00",
    },
    {
      item: "Optional fees",
      date: "07/10/2024",
      receiptId: "1212",
      amount: "$123.00",
      paymentMode: "Cash",
      amountPaid: "$100.00",
    },
  ];

  const sessions = [
    { id: 1, title: "Session 1", description: "Introduction to the Course" },
    { id: 2, title: "Session 2", description: "Hands-on Practice" },
    { id: 3, title: "Session 3", description: "Q&A and Doubt Clearing" },
  ];

  const ADMISSION_REQ_FEES = [
    {
      item: "Tution Fee",
      amount: formatCurrency(student?.tutionFee),
    },
    {
      item: "Book Fee",
      amount: student?.bookFee ? formatCurrency(student?.bookFee) : "-",
    },
    {
      item: "Expendable supplies",
      amount: student?.expendableFee
        ? formatCurrency(student?.expendableFee)
        : "-",
    },
    {
      item: "Uniform and Equipment",
      amount: student?.uniformFee ? formatCurrency(student?.uniformFee) : "-",
    },
    {
      item: "Major Equipment",
      amount: student?.majorEquipmentFee
        ? formatCurrency(student?.majorEquipmentFee)
        : "-",
    },
    {
      item: "Field Trips",
      amount: student?.fieldTrips ? formatCurrency(student?.fieldTrips) : "-",
    },
    {
      item: "Professional/Exam Fees",
      amount: student?.examFee ? formatCurrency(student?.examFee) : "-",
    },
    {
      item: "Other Compulsory Fee",
      amount: student?.otherFee ? formatCurrency(student?.otherFee) : "-",
    },
    {
      item: "International Student Fees",
      amount: student?.internationalFee
        ? formatCurrency(student?.internationalFee)
        : "-",
    },
    {
      item: "Optional Fees",
      amount: student?.optionalFee ? formatCurrency(student?.optionalFee) : "-",
    },
  ];

  function calculateTotalFees(student: any) {
    const TOTAL_FEES = [
      { tutionFee: student?.tutionFee },
      { bookFee: student?.bookFee },
      { expendableFee: student?.expendableFee },
      { uniformFee: student?.uniformFee },
      { majorEquipmentFee: student?.majorEquipmentFee },
      { fieldTrips: student?.fieldTrips },
      { examFee: student?.examFee },
      { otherFee: student?.otherFee },
    ];

    return TOTAL_FEES.reduce((total, fee) => {
      const value = Object.values(fee)[0];
      return total + (typeof value === "number" ? value : 0);
    }, 0);
  }

  return (
    <MainCard content={false}>
      <Stack padding={3}>
        <Grid container spacing={1}>
          {/* HEADER */}
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Avatar
              alt="student profile"
              src={student?.studentProfilePic}
              sx={{
                width: 90,
                height: 90,
                bgcolor: () => {
                  return stringToColor(fullName(student?.firstName) || "");
                },
              }}
            >
              {getInitials(
                fullName(student?.firstName, student?.lastName) || ""
              )}
            </Avatar>
            <Stack textAlign="center" mt={1}>
              <Typography variant="h4">
                {fullName(student?.firstName, student?.lastName) || ""}
              </Typography>
              <Typography variant="overline">Student</Typography>
            </Stack>
          </Grid>

          {/* Personal Information */}
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600}>
              Personal Information
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* DATA */}
          <CustomField
            title="Full Name"
            valueSX={{ textTransform: "capitalize" }}
            value={fullName(student?.firstName, student?.lastName) || ""}
          />
          <CustomField title="Email" value={student?.email} />
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <CustomField
            title="Contact Number"
            value={student?.contactNo || "-"}
          />
          <CustomField
            title="Alternative Contact Number"
            value={student?.altContactNo || "-"}
          />
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <CustomField
            title="Date of Birth"
            value={student?.dob && moment(student?.dob).format("LL")}
          />
          <CustomField
            title="Gender"
            valueSX={{ textTransform: "capitalize" }}
            value={student?.gender}
          />
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <CustomField
            title="Permanent Address"
            value={getFullAddress(
              student?.streetNo,
              student?.streetName,
              student?.city,
              student?.postalCode
            )}
          />
          <CustomField
            title="Mailing Address"
            value={
              student?.mailStreetNo
                ? getFullAddress(
                    student?.mailStreetNo,
                    student?.mailStreetName,
                    student?.mailCity,
                    student?.mailPostalCode
                  )
                : "-"
            }
          />

          {/* Course Details */}
          <Grid item xs={12} mt={5}>
            <Typography variant="h5" fontWeight={600}>
              Course Details
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* DATA */}
          <CustomField
            title="Course Name"
            value={student?.courseName}
            valueSX={{ textTransform: "uppercase" }}
          />
          <CustomField
            title="Enrollment Date"
            value={
              student?.enrollDate && moment(student?.enrollDate).format("LL")
            }
          />
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <CustomField
            title="Commencement Date"
            value={
              student?.commencementDate &&
              moment(student?.commencementDate).format("LL")
            }
          />
          <CustomField
            title="Expected Completion Date"
            value={
              student?.completionDate &&
              moment(student?.completionDate).format("LL")
            }
          />
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <CustomField
            title="Campus"
            value={student?.campus}
            valueSX={{ textTransform: "uppercase" }}
          />
          <CustomField title="Campus Location" value={student?.campusLoc} />
          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Admission Requirements Fees */}
          <Grid item xs={12} mt={5}>
            <Typography variant="h5" fontWeight={600}>
              Admission Requirements Fees
            </Typography>
          </Grid>

          {/* DATA */}
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <caption>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h5">Total Fee</Typography>
                  <Typography variant="h5">
                    {formatCurrency(calculateTotalFees(student))}
                  </Typography>
                </Stack>
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Amount (CAN$)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ADMISSION_REQ_FEES.map((row) => (
                  <TableRow
                    key={row.item}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.item}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Title */}
          <Grid item xs={12} mt={5}>
            <Typography variant="h5" fontWeight={600}>
              Fees Transactions
            </Typography>
          </Grid>

          {/* DATA */}
          <TableContainer component={Paper} sx={{ my: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <caption>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h5">Total Fee</Typography>
                  <Typography variant="h5">$200.00</Typography>
                </Stack>
                {/* <Stack direction="row" justifyContent="space-between">
                  <CustomField title="First Name" value="Remy" />
                  <Divider orientation="vertical" />
                  <CustomField title="First Name" value="Remy" />
                </Stack> */}
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Receipt Id</TableCell>
                  <TableCell>Amount Paid (CAN$)</TableCell>
                  <TableCell>Payment Mode</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.item}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.receiptId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.paymentMode}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.amountPaid}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CustomField
            title="Total Paid"
            value="$100.00"
            sx={{
              bgcolor: theme.palette.mode === "light" ? grey[100] : "",
              p: 1,
            }}
          />
          <CustomField
            title="Balance"
            value="$90.00"
            sx={{
              bgcolor: theme.palette.mode === "light" ? grey[200] : "",
              p: 1,
            }}
          />
        </Grid>

        {/* Title */}
        <Grid item xs={12} mt={3}>
          <Typography variant="h5" fontWeight={600}>
            Sessions
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          {sessions.map((session) => (
            <Grid item xs={12} key={session.id}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h6">{session.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {session.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined">Join</Button>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default ViewStudent;
