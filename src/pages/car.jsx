import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import  '../App.css'; 

const Car = () => {
    const [car, setCar] = useState([]);
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [img, setImg] = useState('');
    const [id, setId] = useState('');
    const [show, setShow] = useState(true);

    let data = collection(db, 'box');

    useEffect(() => {
        onSnapshot(data, (snapshot) => {
            let malumot = [];
            snapshot.docs.forEach((doc) => {
                malumot.push({ ...doc.data(), id: doc.id });
            });
            setCar(malumot);
        });
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        const dataBase = collection(db, 'box');
        await addDoc(dataBase, {
            name: name,
            job: job,
            img: img,
            id: uuidv4()
        });
        setName('');
        setJob('');
        setImg('');
    };

    const handleDelete = async (id) => {
        const deletePost = doc(db, 'box', id);
        await deleteDoc(deletePost);
        setCar(car.filter(item => item.id !== id));
    };

    const handleEdit = (name, job, img, id) => {
        setName(name);
        setJob(job);
        setImg(img);
        setId(id);
        setShow(false);
    };

    const handleUpdate = async () => {
        if (!id) {
            console.error("ID is undefined");
            return;
        }
        const updateData = doc(db, 'box', id);
        await updateDoc(updateData, { name, job, img });
        setName('');
        setJob('');
        setImg('');
        setId('');
        setShow(true);
    };

    return (
        <div className="container mx-auto p-4" id='nmadr'>
            <div className="text-center mb-6">
                <h1 className="text-3xl font-medium title-font mb-2 text-gray-900">Crud </h1>
                <p className="leading-relaxed text-gray-500">This project created by Javohir Coder.</p>
            </div>
            <div className="flex justify-center mb-6">
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="job">
                                Job
                            </label>
                            <input value={job} onChange={(e) => setJob(e.target.value)} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
                                Image URL
                            </label>
                            <input value={img} onChange={(e) => setImg(e.target.value)} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex items-center justify-between">
                            {show ? (
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCreate}>
                                    Create
                                </button>
                            ) : (
                                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleUpdate}>
                                    Update
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {car.map(item => (
                    <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img className=" p-5 h-70 w-full object-cover" src={item.img} alt={item.name} />
                        <div className="p-2">
                            <h1 className="text-[35px] text-center font-bold mb-2">{item.name}</h1>
                            <h2 className="text-gray-700 text-center text-[25px] mb-4">{item.job}</h2>
                            <div className="flex justify-around">
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEdit(item.name, item.job, item.img, item.id)}>
                                    <a href="#nmadr">Edit</a>
                                </button>
                            </div>
                            <br />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Car;
