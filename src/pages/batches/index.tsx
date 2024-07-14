import { useState } from "react";

import { Button, Grid, IconButton, Stack } from "@mui/material";
import { Add, Filter } from "iconsax-react";

import Page from "components/ui/PageLayout";
import ThemeButton from "components/ui/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledField from "components/ui/ControlledField";
import Date from "components/ui/Date";

const schema = z.object({
  name: z.string().min(1, "Batch Name is required"),
  from: z.string({
    required_error: "From Date is required",
  }),
  to: z.string({
    required_error: "To Date is required",
  }),
});

type FormData = z.infer<typeof schema>;

const Batch = () => {
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  console.log("errors", errors);

  const onSubmit = (data: FormData) => {
    console.log("data", data);
  };

  return (
    <>
      <Page
        title="Batch"
        breadcrumbs={[{ label: "Batch", link: "/batch" }]}
        primaryAction={
          <Stack direction="row" spacing={1}>
            <ThemeButton
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpen(true)}
            >
              Add Batch
            </ThemeButton>
            <ThemeButton
              variant="outlined"
              startIcon={<Filter />}
              onClick={() => {
                setDrawer(true);
              }}
            >
              Filter
            </ThemeButton>
          </Stack>
        }
      >
        Batch table
        {/* <InstructorTable drawer={drawer} setDrawer={setDrawer} /> */}
      </Page>

      {/* ADD BATCH MODAL */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <form name="add-batch-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <DialogTitle>Create New Batch</DialogTitle>
            </Grid>
            <Grid item sx={{ mr: 1.5 }}>
              <IconButton color="secondary" onClick={handleClose}>
                <Add style={{ transform: "rotate(45deg)" }} />
              </IconButton>
            </Grid>
          </Grid>
          <DialogContent dividers sx={{ minHeight: 300 }}>
            <Stack padding={1}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ControlledField
                    name="name"
                    label="Batch Name"
                    placeholder="Enter Batch Name"
                    errors={errors}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Date
                    label="From Date"
                    name="from"
                    control={control}
                    error={errors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Date
                    label="To Date"
                    name="to"
                    control={control}
                    error={errors}
                  />
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ mr: 1 }} type="submit">
              Create Batch
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Batch;
