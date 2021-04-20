import Toast from "light-toast";
import {getWorkersSA} from "../pages/WorkersTable/workersTableReducer";
import {Dispatch} from "redux";

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


export const getTotalPagesList = (selectValue: string, targetArrLength: number, dispatch: Dispatch): Array<number> => {
    let pages: Array<number>;
    if(selectValue !== "all") {
        const pagesCount: number = Math.ceil(targetArrLength / +selectValue);
        pages = Array.from({length: pagesCount}, (v, k) => k+1);
    } else {
        pages = [1];
        dispatch(getWorkersSA())
    }

    return pages;

}


export const calcPagination = (pages: Array<number>, current: number) => {
    let last = pages.length,
        delta = 2,
        left = current - delta,
        right = current + delta,
        range = [],
        rangeWithDots = [],
        l;

    range.push(1);
    for (let i = current - delta; i <= current + delta; i++) {
        if (i >= left && i < right && i < last && i > 1) {
            range.push(i);
        }
    }
    range.push(last);
    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
};
