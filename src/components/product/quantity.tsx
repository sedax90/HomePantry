import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from 'react-native-paper';

interface QuantityProps {
    value: number;
}

export default function Quantity(props: QuantityProps) {
    const [quantity, setQuantity] = useState<number>(0);

    const theme = useTheme();

    useEffect(() => {
        setQuantity(props.value);
    }, [props.value]);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: quantity > 0 ? theme.colors.primary : theme.colors.error,
            fontWeight: "700",
            borderRadius: 40,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
        },
        quantity: {
            fontWeight: "100",
            color: "white",
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.quantity}>{quantity}</Text>
        </View>
    );
}

