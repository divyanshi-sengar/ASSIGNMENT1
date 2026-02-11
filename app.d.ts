declare const arrowBtn: HTMLElement | null;
declare const logoutBox: HTMLElement | null;
declare const records: Element | null;
declare const form: Element | null;
declare const statusSelect: HTMLElement | null;
declare const personsField: HTMLElement | null;
declare const personsInput: HTMLElement | null;
declare const searchdata: HTMLElement | null;
declare const doc: HTMLElement | null;
declare const savebtn: Element | null;
declare const menu_dots: Element | null;
declare const dots_menu: Element | null;
declare const dot_wrapper: Element | null;
declare const addBtn: HTMLElement | null;
declare const formData: HTMLElement | null;
declare const cancelBtn: HTMLElement | null;
declare const statusselect: Element | null;
declare const selectstatus: HTMLElement | null;
type Status = "sign" | "pending" | "complete";
interface User {
    id: number;
    name: string;
    input: Status;
    date: string;
    time: string;
    personInput: string;
}
declare let userArray: User[];
declare let edit_id: number | null;
declare function saveData(userArray: User[]): void;
declare function displayData(): void;
declare function editData(id: number): void;
declare function deleteInfo(id: number): void;
declare function userTable(userdata: User[]): void;
//# sourceMappingURL=app.d.ts.map