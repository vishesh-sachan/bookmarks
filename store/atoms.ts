import { atom } from "recoil";

export const foldersAtom = atom({
    key: 'foldersAtom',
    default: [],
});
export const filesAtom = atom({
    key: 'filesAtom',
    default: [{_id:'', name:'',url:'',folder:''}],
});

export const updatedFilesAtom = atom({
    key: 'updatedFilesAtom',
    default:0
})

export const updatedFoldersAtom = atom({
    key: 'updatedFoldersAtom',
    default:0
})