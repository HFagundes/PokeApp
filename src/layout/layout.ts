import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        margin: 10,
        alignItems: "center",
    },
    pokemonDisplayName: {
        fontWeight: "bold",
        fontSize: 30
    },
    pokemonDisplayImage: {
        width: "100%",
        height: "100%"
    },
    pokemonTypeImage: {
        width: 50,
        height: 50,
        marginHorizontal: 40
    },
    pokemonInfo: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    logotipo: {
        width: "75%",
        margin: 20,
    }
});