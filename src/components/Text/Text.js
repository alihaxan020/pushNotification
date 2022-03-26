import * as React from 'react';
import {Text as BaseText, View} from 'react-native';
import useThemeColors from '../../hooks/useThemeColors';
import styles from './styles';

const Text = ({
  children,
  isPrimary,
  isSecondary,
  isWhite,
  isBold,
  isHeadingTitle,
  isCenter,
  isItalic,
  hasMargin,
  style,
  leftIcon,

  ...rest
}) => {
  const {primary, secondary, text} = useThemeColors();
  let color = text;
  let fontSize = 14;
  let marginTop = 0;
  let textAlign;
  let fontFamily;
  if (isSecondary) {
    color = secondary;
    fontSize = 13;
  }

  if (isHeadingTitle) {
    fontSize = 18;
  }

  if (isPrimary) {
    color = primary;
  }

  if (isWhite) {
    color = 'white';
  }

  if (isCenter) {
    textAlign = 'center';
  }

  if (hasMargin) {
    marginTop = 10;
  }

  const fontWeight = isBold ? 'bold' : 'normal';

  const renderText = () => {
    return (
      <BaseText
        {...rest}
        style={[
          {
            color,
            fontWeight,
            fontSize,
            textAlign,
            marginTop,
            fontFamily,
          },
          style,
        ]}>
        {children}
      </BaseText>
    );
  };

  return leftIcon ? (
    <View style={styles.container}>
      <View
        style={[
          styles.icon,
          {
            marginTop,
          },
        ]}>
        {leftIcon}
      </View>
      {renderText()}
    </View>
  ) : (
    renderText()
  );
};

export default Text;
