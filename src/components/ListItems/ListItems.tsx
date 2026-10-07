import Items from "@/interface/Items";
import ItemsRequests from "@/service/ItemsRequests";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ListItems() {
    const [items, setItems] = useState<Items[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const handleFetchItems = async (currentOffset: number, append = false) => {
        try {
            if (append) {
                setIsMoreLoading(true);
            } else {
                setIsLoading(true);
            }

            const data = await ItemsRequests.fetchItemsList(currentOffset, 20);

            if (data) {
                if (data.length < 20) {
                    setHasMore(false);
                }

                if (append) {
                    setItems((prev) => [...prev, ...data]);
                } else {
                    setItems(data);
                }
            }
        } catch (error) {
            console.error("Erro ao carregar itens:", error);
        } finally {
            setIsLoading(false);
            setIsMoreLoading(false);
        }
    };

    useEffect(() => {
        handleFetchItems(0, false);
    }, []);

    const handleLoadMore = () => {
        if (isLoading || isMoreLoading || !hasMore) return;
        handleFetchItems(items.length, true);
    };

    const formatName = (name: string) => {
        return name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const formatId = (id?: number) => {
        if (!id) return "";
        return `#${String(id).padStart(3, "0")}`;
    };

    const renderFooter = () => {
        if (!isMoreLoading) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#FF3E3E" />
            </View>
        );
    };

    if (isLoading && items.length === 0) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FF3E3E" />
                <Text style={styles.loadingText}>Carregando Itens...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Itens</Text>
                <Text style={styles.headerSubtitle}>
                    {items.length} itens carregados
                </Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) =>
                    item.item_id ? String(item.item_id) : item.item_name
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {/* Sprite */}
                        <View style={styles.spriteContainer}>
                            {item.item_sprite ? (
                                <Image
                                    source={{ uri: item.item_sprite }}
                                    style={styles.itemSprite}
                                    contentFit="contain"
                                    transition={200}
                                />
                            ) : (
                                <View style={styles.spritePlaceholder} />
                            )}
                        </View>

                        {/* Info */}
                        <View style={styles.infoContainer}>
                            <Text style={styles.itemName}>
                                {formatName(item.item_name)}
                            </Text>
                            {item.item_id && (
                                <Text style={styles.itemId}>
                                    {formatId(item.item_id)}
                                </Text>
                            )}
                        </View>
                    </View>
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.noResultsText}>
                            Nenhum item encontrado
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FAFC",
        width: "100%",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7FAFC",
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#718096",
        fontWeight: "500",
    },
    noResultsText: {
        fontSize: 16,
        color: "#A0AEC0",
        fontWeight: "500",
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EDF2F7",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2D3748",
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 13,
        color: "#A0AEC0",
        fontWeight: "500",
        marginTop: 2,
    },
    listContent: {
        padding: 12,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        borderRadius: 16,
        padding: 12,
        shadowColor: "#1A202C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#EDF2F7",
    },
    spriteContainer: {
        width: 52,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7FAFC",
        borderRadius: 12,
        marginRight: 14,
    },
    itemSprite: {
        width: 44,
        height: 44,
    },
    spritePlaceholder: {
        width: 36,
        height: 36,
        backgroundColor: "#E2E8F0",
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#2D3748",
    },
    itemId: {
        fontSize: 12,
        fontWeight: "700",
        color: "#A0AEC0",
        marginTop: 2,
    },
    footerLoader: {
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});
