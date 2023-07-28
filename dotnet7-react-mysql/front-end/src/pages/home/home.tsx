import { FC, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { IGlobalContext, ITodo, ROLES } from '../../api/interfaces/interfaces';
import { TodoApi } from '../../api/todoApi';
import { confirmChoice, errorToast, successToast } from '../../components/toasts/toasts';
import AddEditModal, { INPUT_TYPE } from '../../components/add-edit-modal/addEditModal';
import { Pencil, Trash } from 'react-bootstrap-icons';
import Loading from '../../components/loading-spinner/loadingSpinner';

interface IProps {
    context: IGlobalContext
}
export const HomePage: FC<IProps> = ({ context }) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [showAdding, setShowAdding] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<ITodo>();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        setLoading(true);
        let result = context.roleId === ROLES.ADMIN ? await TodoApi.getAll() : await TodoApi.getAllForUser(context.userId);
        setLoading(false);
        if (result.statusCode !== 200) {
            errorToast(result.message);
            return;
        }
        setTodos(result.data);
    }

    const addNew = async (todo: ITodo): Promise<boolean> => {
        let result = await TodoApi.add({
            userId: context.userId,
            name: todo.name,
            description: todo.description,
        });
        if (result.statusCode !== 200) {
            errorToast(result.message);
            return false;
        }
        successToast("Todo added successfully", true);
        getAll();
        setShowAdding(false);
        return true;
    }
    const edit = async (todo: ITodo): Promise<boolean> => {
        if (!todoToEdit) {
            errorToast("Nothing is being edited!");
            return false;
        }

        let result = await TodoApi.update({
            id: todoToEdit?.id || 0,
            userId: context.userId,
            name: todo.name,
            description: todo.description,
        });
        if (result.statusCode !== 200) {
            errorToast(result.message, true);
            return false;
        }
        successToast("Todo edited successfully", true);
        getAll();
        setTodoToEdit(undefined);
        return true;
    }
    const deleteItem = async (id: number) => {
        let confirm = await confirmChoice("Are you sure you want to delete this todo?", "This action cannot be undone!");
        if (!confirm.isConfirmed) return;

        setLoading(true);
        let result = await TodoApi.delete(id);
        setLoading(false);
        if (result.statusCode !== 200) {
            errorToast(result.message, true);
            return;
        }

        successToast("Todo deleted successfully", true);
        getAll();
    }


    return (
        <div className='p-5' >
            <div className='d-flex justify-content-between'>
                <h1 className='py-3'>List of Todos</h1>
                <Button variant='success' onClick={() => setShowAdding(true)}>Add New</Button>
            </div>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Is Complete</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !loading &&
                        todos.map((todo: ITodo) => (
                            <tr key={todo.id}>
                                <td>{todo.name}</td>
                                <td>{todo.description}</td>
                                <td>{todo.createdAt}</td>
                                <td>{todo.updatedAt}</td>
                                <td>{todo.isComplete}</td>
                                <td>
                                    <div className='d-flex justify-content-evenly'>
                                        <Pencil className='hover-pointer' onClick={() => setTodoToEdit(todo)} />
                                        <Trash className='hover-pointer bg-red' onClick={() => deleteItem(todo.id)} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    {
                        loading &&
                        <tr>
                            <td colSpan={6} className='text-center'><Loading /></td>
                        </tr>
                    }
                </tbody>
            </Table>


            {
                showAdding &&
                <AddEditModal
                    title='Add New'
                    cancel={() => setShowAdding(false)}
                    submit={addNew}
                    fields={[
                        { key: "name", name: "Name", type: INPUT_TYPE.TEXT, value: "", required: true },
                        { key: "description", name: "Description", type: INPUT_TYPE.TEXT, value: "", required: true },
                    ]}
                />
            }

            {
                todoToEdit &&
                <AddEditModal
                    title='Edit'
                    cancel={() => setTodoToEdit(undefined)}
                    submit={edit}
                    fields={[
                        { key: "name", name: "Name", type: INPUT_TYPE.TEXT, value: todoToEdit.name, required: true },
                        { key: "description", name: "Description", type: INPUT_TYPE.TEXT, value: todoToEdit.description, required: true },
                    ]}
                />
            }
        </div>
    );
}

export default HomePage;