import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Modal } from "react-native-paper";
import { Camera, useCameraDevices } from "react-native-vision-camera";
// import { useScanBarcodes, BarcodeFormat } from '../../node_modules/vision-camera-v3-barcode-scanner/src/index';
import MOCKED_DATA from '../../assets/mock/products.json';

interface CameraScanProps {
    onBarcodeRead: (barcode: string | null) => void;
    onDismiss?: () => void;
}

export default function CameraScan(props: CameraScanProps) {
    const [cameraScanVisible, setCameraScanVisible] = useState<boolean>(false);

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
                const eans = products.map(e => e.ean);
                const ean = eans[Math.floor(Math.random() * eans.length)];
                onBarcodeRead(ean);
            }, 100);
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

    const onBarcodeRead = (barcode: string): void => {
        setCameraScanVisible(false);
        props.onBarcodeRead(barcode);
    }

    return (
        <>
            <FAB
                icon="barcode-scan"
                style={styles.fab}
                label='Scansiona'
                onPress={openBarcodeReader}
                size='medium'
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
