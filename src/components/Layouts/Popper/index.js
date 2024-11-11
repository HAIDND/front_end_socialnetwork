import cx from 'clsx';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Popper.module.scss';

function Wrapper() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <ul className="card-max">
                <li>{products.title}</li>
            </ul>
        </>
    );
}

export default Wrapper;
