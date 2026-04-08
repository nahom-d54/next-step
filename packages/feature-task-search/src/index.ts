import SearchBar from './SearchBar'
import { searchStrategies, getSearchStrategy, searchByTitle } from './searchStrategies'
import useDebouncedValue from '../../ui-components/src/useDebouncedValue'

export { default as SearchBar } from './SearchBar'
export { default as useDebouncedValue } from '../../ui-components/src/useDebouncedValue'

export type { Task, SearchStrategy } from './searchStrategies'
export { searchStrategies, getSearchStrategy, searchByTitle } from './searchStrategies'

export default {
  SearchBar,
  useDebouncedValue,
  searchStrategies,
  getSearchStrategy,
  searchByTitle,
}
