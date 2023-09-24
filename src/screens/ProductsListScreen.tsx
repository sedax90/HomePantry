import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Product } from '../models/models';
import { handleError } from '../utils/error-handler';
import { Modal, Snackbar, Text } from 'react-native-paper';
import ProductListView from '../components/product/list';
import CameraScan from '../components/camera-scan';
import ProductPreviewView from '../components/product/preview';
import { useIsFocused } from '@react-navigation/native';
import { ProductService } from '../services/product-service';

interface ProductsListScreenProps {
  navigation: any;
}

export const ProductsListScreen = (props: ProductsListScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [onOverviewProduct, setOnOverviewProduct] = useState<Product | null>();
  const [overviewVisible, setOverviewVisible] = useState<boolean>(false);
  const [removedProduct, setRemovedProduct] = useState<Product>();
  const [productRemovedAlertVisible, setProductRemovedAlertVisible] = useState<boolean>(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchProducts();
  }, [isFocused]);

  const fetchProducts = async () => {
    ProductService.getInstance().getProducts("pantry_1").then(
      (products) => {
        // Sort by quantity ASC
        products.sort((a, b) => {
          return a.quantity - b.quantity;
        });

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

  const onProductFounded = (product: Product): void => {
    console.debug("product", product);

    setOnOverviewProduct(product);
    setOverviewVisible(true);
  }

  const onProductRemoved = async (product: Product): Promise<void> => {
    setProductRemovedAlertVisible(true);
    setRemovedProduct(product);
    await fetchProducts();
  }

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
  });

  return (
    <View style={styles.mainView}>
      <FlatList data={products} renderItem={(row) => (<ProductListView product={row.item} onPress={onProductPress} />)} />

      <Modal visible={overviewVisible && onOverviewProduct !== undefined} onDismiss={onDetailDismiss} contentContainerStyle={styles.detailModal}>
        {onOverviewProduct ? <ProductPreviewView product={onOverviewProduct}></ProductPreviewView> : <></>}
      </Modal>

      <CameraScan onProductFounded={onProductFounded} onProductAdded={onProductFounded} onProductRemoved={onProductRemoved}></CameraScan>

      <Snackbar visible={productRemovedAlertVisible && removedProduct != null} onDismiss={() => setProductRemovedAlertVisible(false)} duration={2000}>
        <Text style={{ color: "white" }}>Prodotto {removedProduct?.label} rimosso.</Text>
      </Snackbar>
    </View>
  );
};

