'use client';

import { createTheme } from "@mantine/core";
import { RED } from "@/constants/colors";
import { components } from "@/theme/components";

export const theme = createTheme({
	colors: {
		red: RED,
	},
	fontFamily: 'Poppins, Roboto, sans-serif',
	primaryColor: 'red',
	components: components,
});
