import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

interface ISocialButtonProps extends TouchableOpacityProps {
  buttonTitle: string;
  btnType: string;
  color: string;
  backgroundColor: string;
  iconType: 'font-awesome' | 'feather';
}

const SocialButton: React.FC<ISocialButtonProps> = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  iconType,
  ...rest
}) => {
  const bgColor = backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: bgColor }]}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        {iconType === 'font-awesome' ? (
          <FontAwesome
            name={btnType}
            style={styles.icon}
            size={22}
            color={color}
          />
        ) : (
          <Feather name={btnType} style={styles.icon} size={22} color={color} />
        )}
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, { color }]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;
