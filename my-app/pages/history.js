import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js'; // adjust the path as needed
import { useRouter } from 'next/router';
import { ListGroup, Button, Card } from 'react-bootstrap';
import styles from '@/styles/History.module.css'; // adjust the path as needed

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    e.preventDefault();
    router.push(`/artwork?${searchHistory[index]}`);
  }

  function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(current => {
      let x = [...current];
      x.splice(index, 1)
      return x;
    });
  }

  if (parsedHistory.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>
            Nothing Here. Try searching for some artwork.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <ListGroup>
      {parsedHistory.map((historyItem, index) => (
        <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
          {Object.keys(historyItem).map(key => (
            <span key={key}>{key}: <strong>{historyItem[key]}</strong> </span>
          ))}
          <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>×</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
