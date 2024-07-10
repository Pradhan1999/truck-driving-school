import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MainCard from "components/MainCard";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { getSingleStudent } from "services/student";

const ViewStudent = () => {
  const params = useParams();

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

  const CustomField = ({ title, value }: any) => {
    return (
      <Grid item xs={6}>
        <Stack>
          <Typography color={grey[600]}>{title}</Typography>
          <Typography variant="subtitle1" fontWeight={500}>
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
        // setStudentData(res);
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
    { item: "Tution fees", amount: "$123.00" },
    { item: "Exam fees", amount: "$200.00" },
    { item: "Book fees", amount: "$200.00" },
    { item: "Optional fees", amount: "$200.00" },
  ];

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
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{
                width: 90,
                height: 90,
                bgcolor: () => {
                  return stringToColor("Remy Sharp");
                },
              }}
            >
              RS
            </Avatar>
            <Stack textAlign="center" mt={1}>
              <Typography variant="h4">Remy Sharp</Typography>
              <Typography variant="overline">Student</Typography>
            </Stack>
          </Grid>

          {/* Title */}
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600}>
              Personal Information
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* DATA */}
          <CustomField title="First Name" value="Remy" />
          <CustomField title="Email" value="remy@gmail.com" />
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <CustomField title="First Name" value="Remy" />
          <CustomField title="Email" value="remy@gmail.com" />

          {/* Title */}
          <Grid item xs={12} mt={3}>
            <Typography variant="h5" fontWeight={600}>
              Educational background
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* DATA */}
          <CustomField title="First Name" value="Remy" />
          <CustomField title="Email" value="remy@gmail.com" />
          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Title */}
          <Grid item xs={12} mt={3}>
            <Typography variant="h5" fontWeight={600}>
              Fees Structure
            </Typography>
          </Grid>

          {/* DATA */}
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <caption>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h5">Total Fee</Typography>
                  <Typography variant="h5">$200.00</Typography>
                </Stack>
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Amount (CAN$)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
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
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default ViewStudent;
