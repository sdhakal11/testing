import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js'; // adjust the path as needed

// Inside your AdvancedSearch component
const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

function submitForm(e) {
  e.preventDefault();
  // Your search logic here...
  const queryString = `title=true&q=${searchField}`;
  setSearchHistory(current => [...current, queryString]);
}

