import React from "react";
import { Typography, TypographyProps } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

export interface IText extends TypographyProps {
  children: React.ReactNode;
  variant?: Variant;
  textTransform?: any;
  [x: string]: any;
}

export const Text: React.FC<IText> = (props) => {
  const { children, variant, textTransform, ...rest } = props;
  return (
    <Typography
      textTransform={textTransform}
      variant={variant}
      {...rest}
    >
      {children}
    </Typography>
  );
}

Text.defaultProps = {
  textTransform: "none"
}