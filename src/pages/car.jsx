import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const Car = () => {
    const [car, setCar] = useState([]);
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [img, setImg] = useState('');
    const [id, setId] = useState('');
    const [show, setShow] = useState(true);

    let data = collection(db, 'box');

    useEffect(() => {
        // const getData = async () => {
        //     const dataBase = await getDocs(collection(db, 'box'));
        //     const itemsList = dataBase.docs.map(doc => ({
        //         ...doc.data(), id: doc.id,
        //     }));
        //     setCar(itemsList);
        //     console.log(itemsList);
        // }
        // getData();

        onSnapshot(
        data, (snapshot) => {
            let malumot = [];

            snapshot.docs.forEach((doc) => {
                malumot.push({...doc.data(), id: doc.id });
            })
            setCar(malumot);
        }
        )
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
        // window.location.reload();
    }

    const handleDelete = async (id) => {
        const deletePost = doc(db, 'box', id);
        await deleteDoc(deletePost);
        setCar(car.filter(item => item.id !== id));
        // window.location.reload();
    };

    const handleEdit = async (name, job, img, id) => {
        console.log("Editing item with ID:", id); // Debugging log
        setName(name);
        setJob(job);
        setImg(img);
        setId(id);
        setShow(false);
    }

    const handleUpdate = async () => {
        if (!id) {
            console.error("ID is undefined");
            return;
        }
        console.log("Updating item with ID:", id); // Debugging log
        const updateData = doc(db, 'box', id);
        await updateDoc(updateData, { name, job, img });
        // window.location.reload();
    }

    return (
        <div className='' id='nmadr'>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"></h1>
                    {/* <div className="h-1 w-20 bg-indigo-500 rounded"></div> */}
                </div>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500"></p>
            </div>
            <div className="mx-auto">
                <label className='ml-[350px]' >
                    <span>name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="border border-black mx-2" />
                </label >
                <label >
                    <span>job</span>
                    <input value={job} onChange={(e) => setJob(e.target.value)} type="text" className="border border-black mx-2" />
                </label >
                <label >
                    <span>Img</span>
                    <input value={img} onChange={(e) => setImg(e.target.value)} type="text" className="border border-black mx-2" />
                </label>
            </div>
            {show ? <button className="border m-auto block text-white rounded-[15px] px-4 py-2 mt-2 bg-green-500" onClick={handleCreate}>Create</button> :

                <button className="border px-4  m-auto block py-2 rounded-[15px] mt-2 bg-orange-500" onClick={handleUpdate}>Update</button>}


            <div className="grid grid-cols-3">


                {car.map(item => (
                    <div key={item.id}>
                        <section className="text-black-600 body-font">
                            <div className="container px-5 py-5 mx-auto ">
                                <div className="flex flex-wrap -m-4">
                                    <div className=" p-4">
                                        <div className="bg-gray-100 p-6 rounded-lg w-[400px] h-[530px]">
                                            <img className="h-[300px] rounded-[50%] w-full object-cover object-center mb-6" src={item.img} alt="content" />
                                            <h1 className="text-lg text-center text-gray-900 text-[30px] font-medium title-font mb-4">Ismi: {item.name}</h1>
                                            <h2 className="leading-relaxed text-center text-[25px] text-base">Kasbi: {item.job}</h2>
                                            <br />
                                            <button className="border rounded-[16px]  px-4 py-2 mt-2 ml-[100px] bg-red-800 text-white" onClick={() => handleDelete(item.id)}>Delete</button>
                                            <button className="border rounded-[16px] px-4 py-2 mt-2 bg-blue-500 text-white" onClick={() => handleEdit(item.name, item.job, item.img, item.id)}><a href='#nmadr'>Update</a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Car;
