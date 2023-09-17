import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Product } from '../models/models';
import { getProducts } from '../services/product-service';
import { handleError } from '../utils/error-handler';
import { FAB, Modal, Portal, Text } from 'react-native-paper';
import ProductListView from '../components/product/list';
import CameraScan from '../components/camera-scan';

interface ProductsListScreenProps {
  navigation: any;
}

export const ProductsListScreen = (props: ProductsListScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [onOverviewProduct, setOnOverviewProduct] = useState<Product | null>();
  const [overviewVisible, setOverviewVisible] = useState<boolean>(false);
  const [cameraScanVisible, setCameraScanVisible] = useState<boolean>(false);

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

  const openCameraScan = (): void => {
    setCameraScanVisible(true);
  }

  return (
    <View style={styles.mainView}>
      <FlatList data={products} renderItem={(row) => (<ProductListView product={row.item} onPress={onProductPress} />)} />
      <FAB
        icon="barcode-scan"
        style={styles.fab}
        label='Scansiona'
        onPress={openCameraScan}
        size='medium'
      />

      <Portal>
        <Modal visible={overviewVisible && onOverviewProduct !== undefined} onDismiss={onDetailDismiss} contentContainerStyle={styles.detailModal}>
          <Text>{onOverviewProduct?.label}</Text>
        </Modal>
      </Portal>

      <Portal>
        <CameraScan visible={cameraScanVisible} onDismiss={() => {
          setCameraScanVisible(false);
        }}></CameraScan>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: "100%",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  detailModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  }
})

