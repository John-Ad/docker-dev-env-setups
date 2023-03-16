
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { CategoriesApi, ItemsApi } from '../../api/api';

/**
 * 
 * @param {{
 *  category:{
 *     categoryID: number,
 *     categoryName: string,
 *     categoryDescription: string,
 *     createdAt: string,
 *  },
 *  refresh: () => void
 * }} props 
 * @returns React.Component
 */
export const Category = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        let response = await ItemsApi.getAll({ categoryId: props.category.categoryID });
        if (response.errorMessage !== "")
            return;

        setItems(response.data);
    }

    const deleteCategory = async () => {
        let response = await CategoriesApi.delete(props.category.categoryID);
        if (response.errorMessage !== "")
            alert(response.errorMessage);

        props.refresh();
    }


    return (
        <div>
            <h1>
                {props.category.categoryName}
                <Button variant="danger" size="sm" className="float-end" onClick={deleteCategory}>Delete</Button>
            </h1>
            <p>
                {props.category.categoryDescription}
            </p>

            <hr />

            <h2>
                Items
            </h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.itemName}
                    </li>
                ))}
            </ul>
        </div>
    )
}