import Items from "@/interface/Items";

class ItemsRequests {
    private api_url;

    constructor() {
        this.api_url = 'https://pokeapi.co/api/v2/item/';
    }

    async fetchItemsList(offset = 0, limit = 20) {
        try {
            const api_response = await fetch(`${this.api_url}?offset=${offset}&limit=${limit}`);

            if (api_response.ok) {
                const jsonData = await api_response.json();
                
                const itemsPromises = jsonData.results.map(async (item: any) => {
                    const urlParts = item.url.split('/');
                    const idString = urlParts[urlParts.length - 2];
                    const id = parseInt(idString, 10);

                    let item_sprite = "";
                    try {
                        const detailResponse = await fetch(`https://pokeapi.co/api/v2/item/${id}/`);
                        if (detailResponse.ok) {
                            const detailData = await detailResponse.json();
                            item_sprite = detailData.sprites?.default || "";
                        }
                    } catch (err) {
                        console.error(`Erro ao buscar detalhes/sprite do item ID ${id}:`, err);
                    }

                    return {
                        item_name: item.name,
                        item_id: id,
                        item_sprite: item_sprite
                    } as Items;
                });

                const items = await Promise.all(itemsPromises);
                return items;
            }
        } catch (error) {
            console.error(`[service/ItemsRequests] Erro ao fazer requisição à API. ${error}`);
        }
    }
}

export default new ItemsRequests;