import { Avatar, Button, Grid, Link, Stack, Typography } from "@mui/material";
import UploadFile from "components/ui/UploadFile";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";
import excel from "assets/images/common/excel.svg";
import { bulkImport, downloadExcel, validateImport } from "services/institute";
import { openSnackbar } from "api/snackbar";
import { Link as RouterLink } from "react-router-dom";

const UploadData = ({ handleNext, setActiveStep, setBulkData }: any) => {
  const [file, setFile] = useState();

  const handleBulkImport = () => {
    const formData = new FormData();
    if (file && file[0]) {
      formData.append("file", file[0]);
      validateImport({
        body: formData,
      })
        ?.then((response: any) => {
          if (response?.errors?.length == 0) {
            bulkImport({
              body: { records: response?.data?.map((val: any) => val?.data) },
            })?.then((res: any) => {
              console.log("res", res);
              if (res?.inserted == response?.data?.length) {
                openSnackbar({
                  open: true,
                  message: `Imported ${res?.inserted} ${res?.inserted == 0 ? "record" : "records"} successfully!`,
                  variant: "alert",
                  alert: {
                    color: "success",
                  },
                } as any);
                setActiveStep(2);
              }
            });
            // setActiveStep(2);
          } else {
            setBulkData(response);
            openSnackbar({
              open: true,
              message: `Error in ${response?.errors?.length || 0} ${response?.errors?.length == 1 ? "record" : "records"}`,
              variant: "alert",
              alert: {
                color: "error",
              },
            } as any);
            handleNext();
          }
        })
        ?.catch((err: any) => {
          console.log("err", err);
          openSnackbar({
            open: true,
            message: "An error occured!",
            variant: "alert",
            alert: {
              color: "error",
            },
          } as any);
        });
    }
  };

  return (
    <Grid xs={12}>
      <Stack spacing={4} alignItems="center" px={20}>
        <Typography color={"GrayText"} variant="h6">
          Use the template below to prepare your data
        </Typography>
        {/* <a href="/instituteTemplate.xlsx" download="">
          <Button
            variant="outlined"
            sx={{ height: '30px' }}
            startIcon={<Avatar src={excel} sx={{ height: 18, width: 18, borderRadius: 0 }} />}
            className="size-small"
          >
            Download Template
          </Button>
        </a> */}
        <Typography color="GrayText" variant="h6" textAlign="center">
          Once you are finished entering relevant data in template, click on the{" "}
          <br /> button below or drag and drop to upload prepared excel sheet
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1.5} alignItems="center">
              <UploadFile setFile={setFile} file={file} />
            </Stack>
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent="flex-end"
          width="100%"
        >
          <Link component={RouterLink} to="/college" color="text.primary">
            <Button
              sx={{ fontSize: 12, fontWeight: "500" }}
              color="secondary"
              variant="contained"
              onClick={() => {}}
            >
              Cancel
            </Button>
          </Link>
          <Button
            sx={{ fontSize: 12, fontWeight: "500" }}
            variant="contained"
            onClick={() => {
              handleBulkImport();
            }}
            endIcon={<ArrowRight />}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default UploadData;
