"use client";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

import { Language, useLanguage } from "@/contexts/language.context";
import Link from "next/link";

export function AppHeader() {
  const { renderLanguage, changeLanguage, language } = useLanguage();

  const handleChangeLanguage = () => {
    if (language === Language.RO) {
      changeLanguage(Language.ENG);

      return;
    }

    changeLanguage(Language.RO);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display: 'flex', gap: '18px'}}>
          <Link href={language === Language.RO ? "/ro" : "/en"}>
            {renderLanguage("home")}
          </Link>
          <Link href={language === Language.RO ? "/ro/about" : "/en/about"}>
            {renderLanguage("about")}
          </Link>
          <Button color="inherit" onClick={handleChangeLanguage}>
            {renderLanguage("language")}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
