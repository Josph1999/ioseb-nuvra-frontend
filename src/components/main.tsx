'use client'

import { useLanguage } from "@/contexts/language.context";
import { Box, Typography } from "@mui/material";

export default function Main() {
  const { renderLanguage } = useLanguage();

  return (
    <Box>
      <Typography>{renderLanguage("hello")}</Typography>
    </Box>
  );
}
