import type {} from '@mui/material/themeCssVarsAugmentation';
import { ThemeOptions } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { getDesignTokens } from './themePrimitives';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from './customizations';

export default function getDashboardTheme(mode: any): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...dataGridCustomizations,
      ...datePickersCustomizations,
      ...treeViewCustomizations,
      ...inputsCustomizations,
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  };
}
