"use client";
import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.css'
import Link from 'next/link';

const getBasketFromStorage = () => {
    if (typeof window !== 'undefined') {
        const basket = localStorage.getItem('basket');
        return basket ? JSON.parse(basket) : [];
    }
    return [];
};

const writeFromBasketToStorage = (products) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('basket', JSON.stringify(products));
    }
};

function Products({ data, tableId }) {
    const [isOpen, setIsOpen] = useState(null);
    const [isBasketVisible, setIsBasketVisible] = useState(false);
    const [products, setProducts] = useState(getBasketFromStorage());
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        setIsBasketVisible(products.length > 0);
        const total = products.reduce((total, item) => total + item.price * item.count, 0);
        setTotalAmount(total);
        writeFromBasketToStorage(products);
    }, [products]);

    const toggleAccordion = (index) => {
        setIsOpen(isOpen === index ? null : index);
    };

    const getProductCount = (productName) => {
        const productInBasket = products.find(item => item.product === productName);
        return productInBasket ? productInBasket.count : 0;
    };

    const increment = (product) => {
        const currentCount = getProductCount(product.product);
        const updatedProducts = products.map(item =>
            item.product === product.product
                ? { ...item, count: currentCount + 1 }
                : item
        );
        if (!updatedProducts.some(item => item.product === product.product)) {
            updatedProducts.push({ ...product, count: 1 });
        }
        setProducts(updatedProducts);
    };

    const decrement = (product) => {
        const currentCount = getProductCount(product.product);
        if (currentCount > 0) {
            const updatedProducts = products.map(item =>
                item.product === product.product
                    ? { ...item, count: currentCount - 1 }
                    : item
            ).filter(item => item.count > 0);
            setProducts(updatedProducts);
        }
    };

    return (
        <main className={styles.main}>

            <div className={styles.navigate}>
                <Link href={`/admin/orders/${tableId}/add`} className={styles.linkText}>
                    &larr; Tüm Ürünler
                </Link>
            </div>

            {data.products.map((product, index) => (
                <div
                    key={index}
                    className={`${styles.accordion} ${isOpen === index ? styles.open : ''}`}
                >
                    <div
                        className={styles.accordionHeader}
                        onClick={() => toggleAccordion(index)}
                    >
                        {product.product}

                        <span>
                            {isOpen === index ? '▲' : '▼'}
                        </span>
                    </div>

                    <div className={styles.accordionContent}>
                        <div className={styles.table}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            {product.price} ₺
                                        </th>

                                        <th>
                                            {product.description}
                                        </th>

                                        <th>
                                            {product.stock ? (
                                                <div>
                                                    <button
                                                        onClick={() => increment(product)}
                                                        className={styles.arrowButton}
                                                        style={{ marginBottom: '1rem' }}
                                                    >
                                                        ▲
                                                    </button>
                                                    <br />
                                                    {getProductCount(product.product)}
                                                    <br />
                                                    <button
                                                        onClick={() => decrement(product)}
                                                        className={styles.arrowButton}
                                                        style={{ marginTop: '1rem' }}
                                                    >
                                                        ▼
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className={styles.button} style={{ backgroundColor: 'gray' }} disabled={true}>
                                                    Stokta yok
                                                </button>
                                            )}
                                        </th>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}

            <div className={`${styles.basket} ${isBasketVisible ? styles.visible : styles.hidden}`}>
                <br /><br />
                Seçili ürünler isteklere eklendi.
                <br /><br />

                <Link className={styles.link} href={`/admin/orders/${tableId}`}>
                    <button className={styles.button} style={{ width: '15rem', backgroundColor: '#0f522d' }}>
                        İSTEK İÇERİĞİNİ GÖRÜNTÜLE
                    </button>
                </Link>

            </div>
        </main>
    )
}

export default Products;