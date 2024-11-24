import {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} from '../api/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import styles from './TodoList.module.scss';

const TodoList = () => {
    const [newTodo, setNewTodo] = useState( '' );

    console.log( 'useGetTodosQuery', useGetTodosQuery() );
    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = ( e ) => {
        e.preventDefault();
        addTodo( { userId: 1, title: newTodo, completed: false } );
        console.log( 'call addTodo' );
        setNewTodo( '' );
    };

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor={styles.newTodo}>Enter a new todo item</label>
            <div className={styles.newTodo}>
                <input
                    type="text"
                    id="newTodo"
                    value={newTodo}
                    onChange={( e ) => setNewTodo( e.target.value )}
                    placeholder="Enter new todo"
                />
            </div>
            <button className={styles.submit}>
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>;


    let content;
    if ( isLoading ) {
        content = <p>Loading...</p>;
    }
    else if ( isSuccess ) {
        // content = JSON.stringify( todos );
        content = todos.map( todo => {
            return (
                <article key={todo.id}>
                    <div className={styles.todo}>
                        <input
                            type='checkbox'
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo( { ...todo, completed: !todo.completed } )}
                        />
                        <label htmlFor={todo.id}>{todo.id}).{todo.title}</label>
                    </div>
                    <button className={styles.trash} onClick={() => deleteTodo( { id: todo.id } )}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            );
        } );
    }
    else if ( isError ) {
        content = <p>{error}</p>;
    }

    return (
        <main className={styles.myTodos}>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    );
};
export default TodoList;