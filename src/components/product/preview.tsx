import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { Product, ProductProps } from '../../models/models';
import { useEffect, useState } from "react";
import { ProductPropsService } from "../../services/product-props-service";
import FastImage from "react-native-fast-image";
import Quantity from "./quantity";

interface ProductPreviewViewProps {
    product: Product;
}

export default function ProductPreviewView(props: ProductPreviewViewProps) {
    const [productProps, setProductProps] = useState<ProductProps | null>();

    useEffect(() => {
        getProductProps(props.product.code);
    }, [props.product]);

    const getProductProps = async (code: string): Promise<void> => {
        const props = await ProductPropsService.getProduct(code);
        setProductProps(props);
    }

    return (
        <View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                <View style={{ marginRight: 50 }}>
                    <Text variant="titleLarge" style={{ marginBottom: -10 }}>
                        {props.product.label}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IconButton icon={'barcode'} size={20}></IconButton>
                        <Text variant="labelSmall">{props.product.code}</Text>
                    </View>
                </View>
                <View style={{ marginLeft: "auto" }}>
                    <Quantity value={props.product.quantity} />
                </View>
            </View>
            {productProps ? <>
                <View style={styles.imageContainer}>
                    <FastImage source={{ uri: productProps.image_front_small_url }} resizeMode={FastImage.resizeMode.contain} style={styles.image} />
                </View>
            </> : <></>}
            <View style={styles.actions}>
                <Button icon="close" mode="outlined" style={{ flexGrow: 1, marginRight: 5 }} onPress={() => console.log('Pressed')} disabled={props.product.quantity === 0}>
                    Diminuisci
                </Button>
                <Button icon="plus" mode="contained-tonal" style={{ flexGrow: 1, marginLeft: 5, }} onPress={() => console.log('Pressed')}>
                    Aggiungi
                </Button>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        marginVertical: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    image: {
        width: 150,
        height: 150,
    },
    actions: {
        flexDirection: "row",
        marginTop: 20
    }
})
