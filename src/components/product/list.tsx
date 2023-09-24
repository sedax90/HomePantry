import { StyleSheet, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { Product, ProductProps } from '../../models/models';
import { ReactNode, useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import { handleError } from "../../utils/error-handler";
import { ProductPropsService } from "../../services/product-props-service";
import Quantity from "./quantity";

interface ProductListViewProps {
    product: Product;
    onPress?: (product: Product) => void;
}

export default function ProductListView(props: ProductListViewProps) {
    const [product, setProduct] = useState<Product>();
    const [productProps, setProductProps] = useState<ProductProps>();

    useEffect(() => {
        setProduct(props.product);
        getProductProps(props.product.code);
    }, [props.product]);

    const getProductProps = async (code: string): Promise<void> => {
        try {
            const productProps = await ProductPropsService.getProduct(code);

            if (productProps) {
                setProductProps(productProps);
            }
        }
        catch (e) {
            handleError(e);
        }
    }

    const getImage = (): ReactNode => {
        return (
            <>
                {productProps ? <View>
                    <FastImage source={{ uri: productProps.image_front_small_url }} resizeMode={FastImage.resizeMode.contain} style={{ width: 40, height: 40 }} />
                </View> : <></>}
            </>
        );
    }

    return (
        <>
            {product ? <>
                <View>
                    <List.Item
                        style={[styles.product, (product.quantity === 0) ? styles.empty : {}]}
                        title={product.label}
                        titleStyle={{ fontWeight: "700", marginRight: 40 }}
                        titleNumberOfLines={1}
                        description={props.product.code}
                        left={getImage}
                        right={props => <Quantity value={product.quantity} />}
                        onPress={() => { props?.onPress ? props.onPress(product) : null }}
                    />
                    <Divider></Divider>
                </View>
            </> : <></>}
        </>
    );
}

const styles = StyleSheet.create({
    product: {
        padding: 10,
    },
    empty: {
        // backgroundColor: "rgb(150,40,0)",
    }
});

