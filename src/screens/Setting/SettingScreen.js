import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Container, Text} from '../../components';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
//ADD localhost address of your server
const API_URL = 'http://localhost:3000';
const SettingScreen = () => {
  const {colors} = useTheme();
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const {confirmPayment, loading} = useConfirmPayment();
  const fetchPaymentIntentClientSecret = async () => {
    const response = await axios.post(`${API_URL}/create-payment-intent`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // const {clientSecret, error} = response.json();

    const clientSecret = response.data.clientSecret;
    const error = response.data.error;
    if (response.data.error === '') {
      return {clientSecret, error};
    } else {
      return {clientSecret, error};
    }
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert('Please enter Complete card details and Email');
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const {clientSecret, error} = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      console.log('====Confirm Payement section ====>', clientSecret);
      if (error) {
        console.log('Unable to process payment');
      } else {
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
          type: 'Card',
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert('Payment Successful');
          console.log('Payment successful ', paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };
  return (
    <Container style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={value => setEmail(value)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={carddetails => {
          setCardDetails(carddetails);
        }}
      />
      <TouchableOpacity
        style={[styles.btnStyle, {borderColor: colors.card}]}
        disabled={loading}
        onPress={handlePayPress}>
        <Text> Pay</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  input: {
    backgroundColor: '#efefefef',

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: '#efefefef',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  btnStyle: {
    alignItems: 'center',
    borderWidth: 1,
    elevation: 1,
    padding: 15,
    borderRadius: 10,
  },
});
