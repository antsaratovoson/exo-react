import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function Test() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);

    //script pour le todo list
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(false);

    const [valuePerso, setValuePerso] = useState(null);
    const [persos, setPersos] = useState([]);
    const [editingPerso, setEditindPerso] = useState(false);


    const inputRef = useRef();
    const inputPerso = useRef();
  

    console.log(editing);
    console.log(editingPerso);


    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleOnChangeTodo(e) {
        setValue(e.target.value);
        setEditing(!!value);
        setTimeout(() => { setEditing(false) }, 2000);
    }

    function handleSubmitTodo(e) {
        e.preventDefault();
        if (!value) {
            return false
        }
        addItem();
    }

    function addItem() {
        setItems([...items, { id: new Date().getTime(), text: value }]);
        setValue(null);
        inputRef.current.value = null;
    }

    function addPerso() {
        setPersos([...persos, { id: new Date().getTime(), text: valuePerso }]);
        setValuePerso(null);
        inputPerso.current.value = null;
    }

    function removeItem(id) {
        const filtered = items.filter((item) => item.id !== id);
        setItems(filtered);
    }

    function handleChangePerso(e) {
        setValuePerso(e.target.value);
        setEditindPerso(!!valuePerso);
        setTimeout(() => {
            setEditing(false)
        }, 2000)
    }

    function handleSubmitPerso(e) {
        e.preventDefault();
        if (!valuePerso) {
            return false
        }
        addPerso();
    }

    function removePerso(id) {
        const filteredPerso = persos.filter((persos => persos.id !== id));
        setPersos(filteredPerso);
    }

    useEffect(() => {
        setVisible('');
        if (name && email) {
            setVisible(true);
        }
    }, [name, email]);
    return (
        <div className="container">
            <h1>Test react app</h1>
            <div className="form-group mb-3">
                <label htmlFor="name" className="label-control">Votre nom</label>
                <input type="text" id="name" name="name" className="form-control" onChange={handleChangeName} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email" className="label-control">Votre email</label>
                <input type="text" id="email" name="email" className="form-control" onChange={handleChangeEmail} />
            </div>
            <div className="form-group">
                {!!name && !!email && `Vous avez ecrie ${name} et votre email est ${email}`}
                {!visible && <span className="text-danger">Veuillez remplir le champs</span>}
            </div>
            <div className="my-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="border p-3">
                            <h2>Todo list list</h2>
                            <form onSubmit={handleSubmitTodo}>
                                <div className="form-group">
                                    <label htmlFor="todo">Ajouter todo</label>
                                    <input ref={inputRef} type="text" className="form-control" id="todo" name="todo" onChange={handleOnChangeTodo} />
                                </div>
                                <div className="form-group mt-3">
                                    <button type="submit" className="btn btn-primary">Ajouter</button>
                                </div>
                            </form>
                            <div className="content-item w-50 my-5">
                                <h4>List group item</h4>
                                <ul className="list-group">
                                    {items.map((item, index) => (
                                        <li className="list-group-item" key={index}>{item.text} <button class="btn btn-danger btn-sm ms-auto" onClick={() => removeItem(item.id)} >Supprimer</button></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="border p-3">
                            <h2>Todo list Role</h2>
                            <div className="content-personnage">
                                <form onSubmit={handleSubmitPerso}>
                                    <div className="form-group">
                                        <label htmlFor="personnage" className='label-control'>Ajouter votre Personnage</label>
                                        <input ref={inputPerso} type="text" className='form-control' id="personnage" name="personnage" onChange={handleChangePerso} />
                                    </div>
                                    <div className="form-group my-3">
                                        <button type="submit" className="btn btn-primary">Ajouter</button>
                                    </div>
                                </form>
                            </div>
                            <div className="content-item-peronnage">
                                <h4>List personnage</h4>
                                <ul className="list-group">
                                    {
                                        persos.map((perso, index) => (
                                            <li className="list-group-item d-flex" key={index}>{perso.text}<button className="btn btn-danger btn-sm ms-auto" onClick={() => removePerso(perso.id)}>Supprimer</button> </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
