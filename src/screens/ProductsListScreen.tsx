import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Product } from '../models/models';
import { getProducts } from '../services/product-service';
import { handleError } from '../utils/error-handler';
import { Modal, Portal } from 'react-native-paper';
import ProductListView from '../components/product/list';
import CameraScan from '../components/camera-scan';
import ProductPreviewView from '../components/product/preview';

interface ProductsListScreenProps {
  navigation: any;
}

export const ProductsListScreen = (props: ProductsListScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [onOverviewProduct, setOnOverviewProduct] = useState<Product | null>();
  const [overviewVisible, setOverviewVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    getProducts("pantry_1").then(
      (products) => {
        setProducts(products);
      }
    ).catch(e => handleError(e));
  }

  const onProductPress = (product: Product) => {
    setOverviewVisible(true);
    setOnOverviewProduct(product);
  }

  const onDetailDismiss = (): void => {
    setOverviewVisible(false);
    setOnOverviewProduct(null);
  }

  const onBarcodeRead = (barcode: string | null): void => {
    console.debug("barcode", barcode);
  }

  return (
    <View style={styles.mainView}>
      <FlatList data={products} renderItem={(row) => (<ProductListView product={row.item} onPress={onProductPress} />)} />

      <Portal>
        <Modal visible={overviewVisible && onOverviewProduct !== undefined} onDismiss={onDetailDismiss} contentContainerStyle={styles.detailModal}>
          {onOverviewProduct ? <ProductPreviewView product={onOverviewProduct}></ProductPreviewView> : <></>}
        </Modal>
      </Portal>

      <CameraScan onBarcodeRead={(barcode) => onBarcodeRead(barcode)}></CameraScan>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: "100%",
  },
  detailModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  }
})

