import React, { Component } from 'react';
import List from './List'
import './app.css';
import STORE from './store';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
}

class App extends Component {
     state = {
      store: STORE,
    }; 

  handleDeleteItem = (cardId) => {
    const { lists, allCards} = this.state.store;
    
    const newLists = lists.map(list => ({
      ...list, //Ask about the ... 
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId); //I am not sure what the omit function does

    this.setState({
      store: {
        list: newLists,
        allCards: newCards
      }
    })
  };  

  handleAddItem(key){ 
    const newCard = newRandomCard()

    const newLists = this.state.store.lists.map(list => { //undefined error off this
      if (list.id === key) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })

    this.setState({
      store: {
        list: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  };

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => ( //I am getting an Undefined error off store even thought it shows the correct information
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])} 
              onDeleteItem={this.handleDeleteItem}
              onAddItem={this.handleAddItem}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;