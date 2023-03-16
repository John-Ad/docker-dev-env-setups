
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ItemsApi } from "../../api/api";
import { Item } from "../../components/item/item";


export const Items = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        getAllItems();
    }, [])

    const getAllItems = async () => {
        let response = await ItemsApi.getAll();
        if (response.errorMessage !== "")
            return;

        setItems(response.data);
    }

    return (
        <div className="items">
            <h1>Items</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Item Description</th>
                        <th>Category ID</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <Item item={item} refresh={getAllItems} />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}