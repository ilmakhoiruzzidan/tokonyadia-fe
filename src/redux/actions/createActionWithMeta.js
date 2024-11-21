import { createAsyncThunk } from '@reduxjs/toolkit';

const createActionWithMeta = (typePrefix, asyncFunction, { conditionKey, metaType } = {}) =>
    createAsyncThunk(
        typePrefix,
        asyncFunction,
        {
            condition: (_, { getState }) => {
                if (!conditionKey) return true;
                const { ui } = getState();
                return !ui[conditionKey];
            },
            getPendingMeta: () => {
                if (!metaType) return {};
                return { type: metaType };
            },
        }
    );

export default createActionWithMeta;
