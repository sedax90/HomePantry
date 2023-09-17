import { StyleSheet } from "react-native";
import { ActivityIndicator, Modal } from "react-native-paper";
// import { Camera, useCameraDevices } from "react-native-vision-camera";
// import { BarcodeFormat, useScanBarcodes } from "vision-camera-code-scanner";

interface CameraScanProps {
    visible: boolean;
    onDismiss: () => void;
}

export default function CameraScan(props: CameraScanProps) {
    // const devices = useCameraDevices();
    // const device = devices.back;

    // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.EAN_13], {
    //     checkInverted: true,
    // });

    return (
        <Modal visible={props.visible} contentContainerStyle={styles.modal} onDismiss={props.onDismiss}>
            {/* {device ?
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                />
                : <ActivityIndicator animating={true} />
            } */}
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        height: "100%",
        overflow: "hidden",
    },
})

