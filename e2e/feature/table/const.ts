import mockInitTables from './mock/table.init.json' assert { type: 'json' };
import mockPostedTables from './mock/table.post.json' assert { type: 'json' };
import mockPatchedTables from './mock/table.patch.json' assert { type: 'json' };
import mockDeletedTables from './mock/table.delete.json' assert { type: 'json' };

export const initTable = mockInitTables.at(-1);

export const newestTable = mockPostedTables.at(-1);

export const updatedTable = mockPatchedTables.at(-1);

export const deletedTable = mockDeletedTables.at(-1);

export const QR_CODE_DOWNLOAD_URL = 'blob:http://localhost:5173/23063807-9f29-4acf-8da0-43c862ad3549';

export const FIXED_TIME = '2025-08-25T09:39:09.966Z';
