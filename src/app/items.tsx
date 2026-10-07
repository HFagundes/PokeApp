import ListItems from "@/components/ListItems/ListItems";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Items() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ListItems />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FAFC",
    },
});
