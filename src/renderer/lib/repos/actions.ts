import { SearchService } from '../../../services/searchService'
import { Dispatch, Action } from 'redux'

export enum ActionTypes {
  LOAD_REPOS = 'LOAD_REPOS',
  CREATE_INDEX_COMPLETED = 'CREATE_INDEX_COMPLETED',
  CREATE_README_INDEX_COMPLETED = 'CREATE_README_INDEX_COMPLETED',
}

export function loadRepos() {
  return {
    type: ActionTypes.LOAD_REPOS,
  }
}

export function createIndexCompleted(count: number) {
  return {
    type: ActionTypes.CREATE_INDEX_COMPLETED,
    payload: {
      processedCount: count,
    },
  }
}

export function createReadmeIndexCompleted(count: number) {
  return {
    type: ActionTypes.CREATE_README_INDEX_COMPLETED,
    payload: {
      processedCount: count,
    },
  }
}
