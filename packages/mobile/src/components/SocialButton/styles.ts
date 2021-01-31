import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: 56,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 8,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
