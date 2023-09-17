import { StyleSheet, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { Product } from '../../models/models';

interface ProductListViewProps {
    product: Product;
    onPress?: (product: Product) => void;
}

export default function ProductListView(props: ProductListViewProps) {
    return (
        <View>
            <List.Item
                style={styles.product}
                title={props.product.label}
                description={props.product.ean}
                left={props => <List.Icon {...props} icon="folder" />}
                right={props => <Text>1</Text>}
                onPress={() => { props?.onPress ? props.onPress(props.product) : null }}
            />
            <Divider></Divider>
        </View>
    );
}

const styles = StyleSheet.create({
    product: {
        padding: 10,
    }
})

