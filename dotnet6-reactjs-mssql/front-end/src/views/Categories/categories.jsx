import React, { useState, useEffect } from 'react';
import { Accordion, Button } from "react-bootstrap";
import { CategoriesApi } from '../../api/api';
import { Category } from '../../components/category/category';

export const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = async () => {
        let response = await CategoriesApi.getAll();
        if (response.errorMessage !== "")
            return;

        setCategories(response.data);
    }

    return (
        <div className="categories">
            <h1>
                Categories
                <Button variant="success" size="sm" onClick={() => { }} className="float-end">Add</Button>
            </h1>
            <Accordion>
                {categories.map((category, index) => (
                    <Accordion.Item eventKey={index}>
                        <Category category={category} refresh={getAllCategories} />
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    )
}