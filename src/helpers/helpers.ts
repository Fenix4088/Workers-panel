import Toast from "light-toast";

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru", {
        year: "2-digit",
        month: "2-digit",
        day: "numeric"
    });
};

export const toast = (status: "success" | "fail" | "loading" | "info", message: string) => {
    switch (status) {
        case "success":
            Toast.success(message, 2000);
            break;
        case "fail":
            Toast.fail(message, 2000);
            break;
        case "info":
            Toast.info(message, 2000);
            break;
        default:
            throw new Error("Invoked without params");
    }
};
