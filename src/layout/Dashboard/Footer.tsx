import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

export default function Footer() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: "24px 16px 0px", mt: "auto" }}
    >
      <Typography variant="caption">&copy; Truck Driving School</Typography>
    </Stack>
  );
}
