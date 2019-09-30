import { createSelector } from 'reselect'

import {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE,
} from '../constants/TodoFilters'

const getVisibilityFilter = (state) => state.visibilityFilter;
const getTasks = (state) => state.tasks;

export const getVisibleTasks = createSelector(
    [getTasks, getVisibilityFilter],
    (tasks, visibilityFilter) => {
        switch (visibilityFilter) {
            case SHOW_ALL:
                return tasks;
            case SHOW_COMPLETED:
                return tasks.filter((t) => t.isDone);
            case SHOW_ACTIVE:
                return tasks.filter((t) => !t.isDone);
            default:
                throw new Error(`Unknown filter: ${visibilityFilter}`)
        }
    },
)