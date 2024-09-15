import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from "react-redux";
import { useCreatePostMutation, useGetByIdQuery, useUpdateProductMutation } from "../Product/product.service";
import { RootState } from "../Product/store";
import { Product } from "../Product/product.type";
import { useEffect } from "react";

export default function HomeScreen() {
    const productId = useSelector((state: RootState) => state.product.productId)
    const [createPost, createPostResult] = useCreatePostMutation()
    const [updatePost] = useUpdateProductMutation()
    const { data } = useGetByIdQuery(productId)

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Product>();

    const onSubmit: SubmitHandler<Product> = async (data: Product) => {
        console.log(123);

        if (productId) {
            // await updatePost({
            //     body: data,
            //     id: productId
            // }).unwrap();
            console.log("update");

        }
        else {
            // await createPost(data).unwrap();
            //
            console.log("create");
        }
        reset();
    }

    useEffect(() => {
        if (productId && data) {
            reset({
                id: data.id.toString(),
                name: data.name,
                brand: data.brand,
                date: data.date
            })
        } else {
            reset({
                id: "",
                name: "",
                brand: "",
                date: ""
            })
        }

    }, [productId])
    return (
        <View className="flex flex-1 justify-center">

           {
            <Controller
            disabled
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    label="Id"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    className="hidden"
                />

            )}
            name="id"
            
        />
           }

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Name"
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                    />

                )}
                name="name"
            />
            {errors.name && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (

                    <TextInput
                        label="Brand"
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                    />
                )}
                name="brand"
            />
            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (

                    <TextInput
                        label="Date"
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                    />
                )}
                name="date"
            />
            <Button icon="camera" mode="contained" onPress={handleSubmit(onSubmit)}>
                Press me
            </Button>
        </View>
    );
}
