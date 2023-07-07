import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Pressable, Text, View } from "react-native";

export default function PaymentScreen() {
  const { confirmPayment } = useStripe();

  const handleSubmit = () => {
    const paymentIntentId = 'pi_1234567890';
    const confirmParams = {
      amount: 1000,
      currency: 'USD',
    };
    const returnUrl = 'https://www.example.com/success';

    confirmPayment(paymentIntentId, confirmParams, returnUrl)
      .then((result) => {
        console.log('Payment confirmed successfully', result);
      })
      .catch((error) => {
        console.log('Payment confirmation failed', error);
      });
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 10,
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      {/* <Pressable onPress={handleSubmit}>
        <Text>Submit</Text>
      </Pressable> */}
    </View>
  );
}