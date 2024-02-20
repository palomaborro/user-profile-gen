"use client";
import React, { useRef, useState } from "react";
import { generateUserDescriptionFromTheServer } from "../lib/actions";


export const ProductPlayground = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const textArea = useRef<HTMLTextAreaElement>(null);

    const products = [
        {
            id: 1,
            name: "Wireless Charging Pad",
            description: "This charging pad offers fast and efficient wireless charging for your devices.",
        },
        {
            id: 2,
            name: "Smart LED Light Bulb",
            description: "Control your lighting remotely with this smart LED bulb, compatible with various home automation systems.",
        },
        {
            id: 3,
            name: "Portable Bluetooth Speaker",
            description: "Take your music anywhere with this compact and powerful Bluetooth speaker, featuring long battery life.",
        },
        {
            id: 4,
            name: "Wireless Earbuds",
            description: "Enjoy high-quality sound and hassle-free listening with these sleek wireless earbuds, perfect for workouts and commuting.",
        },
        {
            id: 5,
            name: "Smart Thermostat",
            description: "Save energy and customize your home's temperature with this smart thermostat, accessible from your smartphone.",
        },
    ];

    interface Product {
        id: number;
        name: string;
        description: string;
    }

    const handleProductSelection = (product: Product) => {
        setSelectedProducts((prevProducts) => prevProducts.find((p) => p.id === product.id)
            ? prevProducts
            : [...prevProducts, product]
        );
    };

    const handleClick = async () => {
        if (loading || !selectedProducts.length) {
            return;
        }

        const productDescriptions = selectedProducts.map((p) => p.description);

        const description = await Promise.all(
            productDescriptions.map((products) => generateUserDescriptionFromTheServer({ products })
            )
        );

        if (textArea.current === null) {
            return;
        } else {
            textArea.current.value = description.join("\n");
        }

        setLoading(true);
    };

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <input
                        type="checkbox"
                        id={product.id.toString()}
                        name="product"
                        value={product.name}
                        onChange={() => handleProductSelection(product)} />
                    <label htmlFor={product.id.toString()}>
                        {product.name} - {product.description}
                    </label>
                </div>
            ))}
            <textarea
                id="result"
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="comment"
                rows={5}
                cols={40}
                ref={textArea} />
            <button onClick={handleClick}>Send</button>
        </div>
    );
};
