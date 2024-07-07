import { Button, CircularProgress, SxProps } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

interface IProps {
  text: string;
  loading: boolean;
  sx?: SxProps;
  variant?: OverridableStringUnion<"text" | "outlined" | "contained">;
  size?: OverridableStringUnion<"small" | "medium" | "large">;
  props?: any;
}

const ActionButton = ({
  text,
  sx,
  size,
  variant = "contained",
  loading,
  ...props
}: IProps) => {
  const getLoadingText = (originalText: any) => {
    const lowerText = originalText.toLowerCase();
    if (lowerText.endsWith("e")) {
      return `${originalText.slice(0, -1)}ing`;
    } else if (
      ["a", "e", "i", "o", "u"].includes(lowerText[lowerText.length - 1])
    ) {
      return `${originalText}ing`;
    } else {
      return `${originalText}ing`;
    }
  };

  return (
    <Button
      type="submit"
      sx={sx}
      size={size}
      variant={variant}
      disabled={loading}
      startIcon={loading && <CircularProgress size={20} color="inherit" />}
      {...props}
    >
      {loading ? getLoadingText(text) : text}
    </Button>
  );
};

export default ActionButton;
