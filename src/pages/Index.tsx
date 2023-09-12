import { Link, Route } from "@tanstack/react-router";
import { rootRoute } from "../Root";
import TaskCard from "../components/tasks/TaskCard";
import { useQuery } from "@tanstack/react-query";
import { TASKS_KEY, getTasks } from "../hooks/useTasks";

export const indexRoute = new Route({
    path: "/",
    component: Index,
    getParentRoute: () => rootRoute,
});

export function Index() {
    const { data: tasks } = useQuery([TASKS_KEY], getTasks);

    return (
        <div className="px-4 py-5 text-center d-flex flex-column align-items-center">
            <div className="my-5">
                <h1 className="display-5 fw-bold mb-4">Mis tareas</h1>
                <Link to="/new-task" className="btn btn-secondary">
                    Crear Tarea
                </Link>
            </div>
            <div className="d-flex gap-4 justify-content-center">
                {tasks?.map((task) => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </div>
        </div>
    );
}
