import { View } from "react-native";
import { Text } from "react-native-paper";
import { Product } from '../../models/models';

interface ProductPreviewViewProps {
    product: Product;
}

export default function ProductPreviewView(props: ProductPreviewViewProps) {
    return (
        <View>
            <Text>{props.product.label}</Text>
        </View>
    );
}
