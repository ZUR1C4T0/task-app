import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    TASKS_KEY,
    Task,
    deleteTask,
    markTaskAsDone,
} from "../../hooks/useTasks";

export default function TaskCard(task: Task) {
    const queryClient = useQueryClient();
    const { mutate: markAsComplete } = useMutation(
        [TASKS_KEY],
        markTaskAsDone,
        {
            onSuccess: () =>
                queryClient.invalidateQueries({ queryKey: [TASKS_KEY] }),
        }
    );
    const { mutate: deleteATask } = useMutation([TASKS_KEY], deleteTask, {
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [TASKS_KEY] }),
    });

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="mt-3">
                <img
                    src={task.done ? "img/done.png" : "img/pending.png"}
                    alt={task.done ? "Tarea realizada" : "Tarea pendiente"}
                    className="card-img-top"
                    style={{ width: "60px" }}
                />
            </div>

            <div className="card-body">
                <h5 className="card-title">{task.description}</h5>
                <p className="card-text">{task.dueDate}</p>
                <div className="d-flex flex-column gap-3">
                    {!task.done && (
                        <button
                            className="btn btn-primary"
                            onClick={() => markAsComplete(task.id)}
                        >
                            Finalizar tarea
                        </button>
                    )}
                    <button
                        className="btn btn-danger"
                        onClick={() => deleteATask(task.id)}
                    >
                        Eliminar tarea
                    </button>
                </div>
            </div>
        </div>
    );
}
