import SearchBar from './SearchBar'
import FilterPanel from './FilterPanel'
import { searchStrategies, getSearchStrategy, searchByTitle } from './searchStrategies'
import useDebouncedValue from './useDebouncedValue'
import TaskFilterCoordinator from './TaskFilterCoordinator'

export { default as SearchBar } from './SearchBar'
export { default as FilterPanel } from './FilterPanel'
export { default as useDebouncedValue } from './useDebouncedValue'
export { default as TaskFilterCoordinator } from './TaskFilterCoordinator'

export type { Task, SearchStrategy } from './searchStrategies'
export { searchStrategies, getSearchStrategy, searchByTitle } from './searchStrategies'

export default {
  SearchBar,
  FilterPanel,
  useDebouncedValue,
  TaskFilterCoordinator,
  searchStrategies,
  getSearchStrategy,
  searchByTitle,
}
