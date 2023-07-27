import { FC, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { IGlobalContext, ITodo, ROLES } from '../../api/interfaces/interfaces';
import { TodoApi } from '../../api/todoApi';
import { errorToast, successToast } from '../../components/toasts/toasts';
import AddEditModal, { INPUT_TYPE } from '../../components/add-edit-modal/addEditModal';
import { Pencil } from 'react-bootstrap-icons';

interface IProps {
    context: IGlobalContext
}
export const HomePage: FC<IProps> = ({ context }) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [showAdding, setShowAdding] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<ITodo>();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        let result = context.roleId === ROLES.ADMIN ? await TodoApi.getAll() : await TodoApi.getAllForUser(context.userId);
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
        let result = await TodoApi.update(todo);
        if (result.statusCode !== 200) {
            errorToast(result.message);
            return false;
        }
        successToast("Todo edited successfully");
        getAll();
        setTodoToEdit(undefined);
        return true;
    }

    return (
        <div className='p-5' >
            <div className='d-flex justify-content-between'>
                <h1 className='py-3'>List of Todos</h1>
                <Button variant='success' onClick={() => setShowAdding(true)}>Add New</Button>
            </div>
            <Table striped hover className=''>
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
                    {todos.map((todo: any) => (
                        <tr key={todo.id}>
                            <td>{todo.name}</td>
                            <td>{todo.description}</td>
                            <td>{todo.createdAt}</td>
                            <td>{todo.updatedAt}</td>
                            <td>{todo.isComplete}</td>
                            <td><Pencil /></td>
                        </tr>
                    ))}
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
                        { key: "description", name: "Description", type: INPUT_TYPE.TEXT_AREA, value: todoToEdit.description, required: true },
                    ]}
                />
            }
        </div>
    );
}

export default HomePage;