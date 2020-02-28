import localforage from "localforage";

const _localStorage: Storage = localStorage;

const localForage: LocalForage = localforage;

export { localForage, _localStorage as localStorage };
