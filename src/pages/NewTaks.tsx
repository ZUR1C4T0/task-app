import { Link, Route, useRouter } from "@tanstack/react-router";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { rootRoute } from "../Root";
import { TASKS_KEY, Task, saveTask } from "../hooks/useTasks";
import { useMutation } from "@tanstack/react-query";

export const newTaskRoute = new Route({
    path: "/new-task",
    component: NewTaks,
    getParentRoute: () => rootRoute,
});

export function NewTaks() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { mutate: addTask } = useMutation([TASKS_KEY], saveTask);
    const { navigate } = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = (data: unknown) => {
        const task = new Task(data as Task);
        console.log(task);
        addTask(task);
        navigate({ to: "/" });
    };

    return (
        <div className="container px-4 py-5 text-center d-flex flex-column align-items-center">
            <h1 className="display-5 fw-bold mb-4">Nueva Tarea</h1>
            <form
                className="d-flex flex-column gap-3 align-items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className={`form-control ${
                        errors.description?.type === "required" && "is-invalid"
                    }`}
                    type="text"
                    placeholder="Descripción"
                    {...register("description", { required: true })}
                />

                {errors.description?.type === "required" && (
                    <div className="alert alert-danger w-100" role="alert">
                        La descripción no puede estar vacía
                    </div>
                )}

                <input
                    className={`form-control ${
                        errors.dueDate?.type === "required" && "is-invalid"
                    }`}
                    type="date"
                    {...register("dueDate", { required: true })}
                />

                {errors.dueDate?.type === "required" && (
                    <div className="alert alert-danger w-100" role="alert">
                        La fecha no puede estar vacía
                    </div>
                )}

                <button className="btn btn-primary mb-3" type="submit">
                    Ingresar Tarea
                </button>
            </form>
            <Link to="/" className="btn btn-outline-danger">
                Volver
            </Link>
        </div>
    );
}
