import { Connection } from "./connection";

export class CategoriesApi {
    static BaseEndpoint = "/api/categories";

    /**
     * Get All Categories
     * @returns {Promise<{errorMessage:string, data: any}>}
     */
    static async getAll() {
        let response = await Connection.getRequest(this.BaseEndpoint, {});
        return response;
    }

    /**
     * Get Category
     * @param {number} id 
     * @returns {Promise<{errorMessage:string, data: any}>} 
     */
    static async get(id) {
        let response = await Connection.getRequest(this.BaseEndpoint + "/" + id, {});
        return response;
    }

    /**
     * Create Category
     * @param {{
     *    categoryId: number;
     *    categoryName: string;
     *    categoryDescription: string;
     *    createdAt: string;
     * }} category 
     * @returns {Promise<{errorMessage:string, data: any}>}
     */
    static async create(category) {
        let response = await Connection.postRequest(this.BaseEndpoint, category);
        return response;
    }

    /**
     * Delete Category
     * @param {number} id 
     * @returns {Promise<{errorMessage:string, data: any}>} 
     */
    static async delete(id) {
        let response = await Connection.deleteRequest(this.BaseEndpoint + "/" + id);
        return response;
    }
}

export class ItemsApi {
    static BaseEndpoint = "/api/items";

    /**
     * Get All Items
     * @returns {Promise<{errorMessage:string, data: any}>}
     */
    static async getAll() {
        let response = await Connection.getRequest(this.BaseEndpoint, {});
        return response;
    }

    /**
     * Get Item
     * @param {number} id 
     * @returns {Promise<{errorMessage:string, data: any}>} 
     */
    static async get(id) {
        let response = await Connection.getRequest(this.BaseEndpoint + "/" + id, {});
        return response;
    }

    /**
     * Create Item
     * @param {{
     *     itemId: number;
     *     categoryId: number;
     *     itemName: string;
     *     itemDescription: string;
     *     createdAt: string;
     * }} item 
     * @returns {Promise<{errorMessage:string, data: any}>}
     */
    static async create(item) {
        let response = await Connection.postRequest(this.BaseEndpoint, item);
        return response;
    }

    /**
     * Delete Item
     * @param {number} id 
     * @returns {Promise<{errorMessage:string, data: any}>}
     */
    static async delete(id) {
        let response = await Connection.deleteRequest(this.BaseEndpoint + "/" + id);
        return response;
    }
}