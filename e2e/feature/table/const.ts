import mockInitTables from './mock/table.init.json' assert { type: 'json' };
import mockPostedTables from './mock/table.post.json' assert { type: 'json' };
import mockPatchedTables from './mock/table.patch.json' assert { type: 'json' };
import mockDeletedTables from './mock/table.delete.json' assert { type: 'json' };

export const initTable = mockInitTables.at(-1);

export const newestTable = mockPostedTables.at(-1);

export const updatedTable = mockPatchedTables.at(-1);

export const deletedTable = mockDeletedTables.at(-1);

export const FIXED_TIME = '2025-08-25T09:39:09.966Z';

export const FIRST_TABLE_POS = { X: 80, Y: 150 };
export const SECOND_TABLE_POS = { X: 160, Y: 500 };
export const MODAL_QR_CODE_POS = { X: 1000, Y: 350 };
