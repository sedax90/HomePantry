import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Modal } from "react-native-paper";
import { Camera, useCameraDevices } from "react-native-vision-camera";
// import { useScanBarcodes, BarcodeFormat } from '../../node_modules/vision-camera-v3-barcode-scanner/src/index';
import MOCKED_DATA from '../../assets/mock/products.json';
import { Product } from "../models/models";
import { handleError } from "../utils/error-handler";
import { ProductService } from "../services/product-service";

interface CameraScanProps {
    onProductFounded: (product: Product) => void;
    onProductAdded: (product: Product) => void;
    onProductRemoved: (product: Product) => void;
    onDismiss?: () => void;
}

export default function CameraScan(props: CameraScanProps) {
    const [fabOpen, setFabOpen] = useState<boolean>(false);
    const [cameraScanVisible, setCameraScanVisible] = useState<boolean>(false);
    const [postBarcodeReadAction, setPostBarcodeReadAction] = useState<PostBarcodeReadAction>("search");

    const devices = useCameraDevices();
    const device = devices.back;

    // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.EAN_13], {
    //     checkInverted: true,
    // });

    useEffect(() => {
        // MOCK
        if (cameraScanVisible === true) {
            setTimeout(() => {
                const products = MOCKED_DATA;
                const codes = products.map(e => e.code);
                const code = codes[Math.floor(Math.random() * codes.length)];
                onBarcodeRead(code);
            }, 300);
        }
    }, [cameraScanVisible]);

    const onDismiss = (): void => {
        setCameraScanVisible(false);

        if (props.onDismiss) {
            props.onDismiss();
        }
    }

    const openBarcodeReader = (): void => {
        setCameraScanVisible(true);
    }

    const onActionAdd = (): void => {
        setPostBarcodeReadAction("add");
        openBarcodeReader();
    }

    const onActionRemove = (): void => {
        setPostBarcodeReadAction("remove");
        openBarcodeReader();
    }

    const onActionSearch = (): void => {
        setPostBarcodeReadAction("search");
        openBarcodeReader();
    }

    const onBarcodeRead = async (code: string): Promise<void> => {
        setCameraScanVisible(false);

        try {
            let product: Product | null;

            switch (postBarcodeReadAction) {
                case 'add':
                    product = await ProductService.getInstance().getProduct(code);
                    if (!product) {
                        // TODO
                        return;
                    }
                    else {
                        await ProductService.getInstance().increaseQuantity(code);
                        props.onProductAdded(product);
                    }
                    break;

                case 'remove':
                    product = await ProductService.getInstance().getProduct(code);
                    if (!product) {
                        // TODO
                        return;
                    }
                    else {
                        await ProductService.getInstance().decreaseQuantity(code);
                        props.onProductRemoved(product);
                    }
                    break;

                case 'search':
                    product = await ProductService.getInstance().getProduct(code);
                    if (!product) {
                        // TODO
                        return;
                    }
                    else {
                        props.onProductFounded(product);
                    }
                    break;
            }
        }
        catch (e) {
            handleError(e);
        }
    }

    return (
        <>
            <FAB.Group
                icon="barcode-scan"
                style={styles.fab}
                label='Scansiona'
                visible={true}
                open={fabOpen}
                onStateChange={(state) => setFabOpen(state.open)}
                actions={[
                    {
                        icon: "magnify",
                        label: "Cerca",
                        onPress: () => onActionSearch(),
                    },
                    {
                        icon: "plus",
                        label: "Aggiungi",
                        onPress: () => onActionAdd(),
                    },
                    {
                        icon: "close",
                        label: "Rimuovi",
                        onPress: () => onActionRemove(),
                    }
                ]}
            />
            <Modal visible={cameraScanVisible} contentContainerStyle={styles.modal} onDismiss={onDismiss}>
                {device ?
                    <View style={{ width: "100%", height: "100%" }}>
                        <Camera
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={true}
                        />
                        <View style={styles.redLine}></View>
                    </View>
                    : <ActivityIndicator animating={true} />
                }
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    modal: {
        backgroundColor: 'white',
        overflow: "hidden",
        height: "90%",
        margin: 20,
        borderRadius: 10,
    },
    redLine: {
        backgroundColor: "red",
        position: "absolute",
        zIndex: 1,
        height: 1,
        width: "100%",
        top: "50%",
    }
});

type PostBarcodeReadAction = "search" | "add" | "remove";