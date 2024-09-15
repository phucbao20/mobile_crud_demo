import { Controller, useForm } from "react-hook-form";
import { Text, View} from "react-native";
import { Button, TextInput } from 'react-native-paper';

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })
  const onSubmit = (data: any) => {
    console.log(data)
    reset({ 
      firstName: "",
      lastName: ""})
  }

  return (
    <View className="flex flex-1 justify-center">
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="First Name"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />

        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (

          <TextInput
          label="Last Name"
          onBlur={onBlur}
          value={value}
          onChangeText={onChange}
        />
        )}
        name="lastName"
      />
      <Button icon="camera" mode="contained" onPress={handleSubmit(onSubmit)}>
        Press me
      </Button>
    </View>
  );
}
