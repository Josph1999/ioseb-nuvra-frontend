"use client";

import { useLanguage } from "@/contexts/language.context";
import { Box, Typography } from "@mui/material";

export default function About() {
  const { renderLanguage } = useLanguage();

  return (
    <Box>
      <Typography>{renderLanguage("about")}</Typography>
    </Box>
  );
}
