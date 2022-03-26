import {useTheme} from '@react-navigation/native';

const useThemeColors = () => {
  const {colors} = useTheme();
  const themeColors = {
    secondary: colors.text,
    ...colors,
  };
  return themeColors;
};

export default useThemeColors;
