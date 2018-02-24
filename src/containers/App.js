import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      {
        id: 'asd',
        name: 'Max',
        age: 28
      },
      {
        id: 'asd1',
        name: 'Manu',
        age: 29
      },
      {
        id: 'asd2',
        name: 'Stephanie',
        age: 26
      }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      //Distribute all the properties of the persons object into the new one
      ...this.state.persons[personIndex]
    };

    // Alternative ==> const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    //Copy of the original persons array
    const persons = [...this.state.persons];

    //Assignment of the id
    persons[personIndex] = person;

    this.setState({
      persons: persons
    })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = [...this.state.persons]; ES6 for .slice()
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons =
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />;
    }

    return (
      <div className="App">
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App;
