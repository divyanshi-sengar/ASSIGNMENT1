declare const arrowBtn: HTMLButtonElement;
declare const logoutBox: HTMLElement;
declare const records: HTMLElement;
declare const form: HTMLFormElement;
declare const statusSelect: HTMLSelectElement;
declare const personsField: HTMLElement;
declare const personsInput: HTMLInputElement;
declare const searchdata: HTMLInputElement;
declare const doc: HTMLInputElement;
declare const savebtn: HTMLButtonElement;
declare const menu_dots: HTMLButtonElement;
declare const dots_menu: HTMLDivElement;
declare const dot_wrapper: HTMLDivElement;
declare const addBtn: HTMLButtonElement;
declare const formData: HTMLDivElement;
declare const cancelBtn: HTMLButtonElement;
declare const statusselect: HTMLSelectElement;
declare const selectstatus: HTMLSelectElement;
interface User {
    id: number;
    name: string;
    input: string;
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